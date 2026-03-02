import { basekit, FieldType, field, FieldComponent, FieldCode, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 域名白名单 - 火山引擎方舟API
basekit.addDomainList(['volces.com']);

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      'zh-CN': {
        'prompt': '视频提示词',
        'promptTooltip': '选择包含视频描述文案的文本字段',
        'refImage': '参考图片（可选）',
        'refImageTooltip': '选择首帧参考图，不选则为纯文生视频',
        'duration': '视频时长',
        'cameraFixed': '固定镜头',
        'yes': '是（镜头不动）',
        'no': '否（镜头跟随运动）',
        'videoUrl': '视频地址',
        'status': '生成状态',
        'taskId': '任务ID',
      },
      'en-US': {
        'prompt': 'Video Prompt',
        'promptTooltip': 'Select text field containing video description',
        'refImage': 'Reference Image (Optional)',
        'refImageTooltip': 'Select first-frame reference image, leave empty for text-to-video',
        'duration': 'Duration',
        'cameraFixed': 'Fixed Camera',
        'yes': 'Yes (static camera)',
        'no': 'No (camera follows motion)',
        'videoUrl': 'Video URL',
        'status': 'Status',
        'taskId': 'Task ID',
      },
      'ja-JP': {
        'prompt': '動画プロンプト',
        'promptTooltip': '動画説明を含むテキストフィールドを選択',
        'refImage': '参考画像（任意）',
        'refImageTooltip': '最初のフレーム参考画像を選択',
        'duration': '動画の長さ',
        'cameraFixed': 'カメラ固定',
        'yes': 'はい（カメラ固定）',
        'no': 'いいえ（カメラ追従）',
        'videoUrl': '動画URL',
        'status': 'ステータス',
        'taskId': 'タスクID',
      },
    }
  },

  // 火山引擎方舟 API Key 授权
  authorizations: [
    {
      id: 'ark_auth',
      platform: 'volcengine',
      type: AuthorizationType.HeaderBearerToken,
      required: true,
      instructionsUrl: 'https://console.volcengine.com/ark',
      label: '火山引擎方舟 API Key',
      icon: {
        light: '',
        dark: '',
      }
    }
  ],

  // 定义捷径的入参
  formItems: [
    {
      key: 'prompt',
      label: t('prompt'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text],
      },
      tooltips: [
        {
          type: 'text',
          content: '选择包含视频描述文案的文本字段，如"无人机穿越峡谷"',
        }
      ],
      validator: {
        required: true,
      }
    },
    {
      key: 'refImage',
      label: t('refImage'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment],
      },
      tooltips: [
        {
          type: 'text',
          content: '可选：选择首帧参考图片的附件字段，实现图生视频。不选则为纯文生视频。',
        }
      ],
      validator: {
        required: false,
      }
    },
    {
      key: 'duration',
      label: t('duration'),
      component: FieldComponent.SingleSelect,
      props: {
        options: [
          { label: '5秒', value: '5' },
          { label: '10秒', value: '10' },
        ]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'cameraFixed',
      label: t('cameraFixed'),
      component: FieldComponent.Radio,
      props: {
        options: [
          { label: t('no'), value: 'false' },
          { label: t('yes'), value: 'true' },
        ]
      },
    },
  ],

  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Object,
    extra: {
      icon: {
        light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
      },
      properties: [
        {
          key: 'id',
          isGroupByKey: true,
          type: FieldType.Text,
          title: 'id',
          label: 'id',
          hidden: true,
        },
        {
          key: 'videoUrl',
          type: FieldType.Text,
          title: t('videoUrl'),
          label: t('videoUrl'),
          primary: true,
        },
        {
          key: 'status',
          type: FieldType.Text,
          title: t('status'),
          label: t('status'),
        },
        {
          key: 'taskId',
          type: FieldType.Text,
          title: t('taskId'),
          label: t('taskId'),
        },
      ],
    },
  },

  // 捷径执行函数
  execute: async (formItemParams: {
    prompt: { type: string; text: string }[];
    refImage: { name: string; size: number; type: string; tmp_url: string }[];
    duration: { label: string; value: string };
    cameraFixed: { label: string; value: string };
  }, context) => {
    const { prompt, refImage, duration, cameraFixed } = formItemParams;

    // 日志工具函数
    function debugLog(arg: any, showContext = false) {
      if (!showContext) {
        console.log(JSON.stringify({ arg, logID: context.logID }), '\n');
        return;
      }
      console.log(JSON.stringify({ formItemParams, context, arg }), '\n');
    }

    debugLog('=====Seedance 1.5 Pro start=====v1', true);

    // 从文本字段提取提示词
    let promptText = '';
    if (Array.isArray(prompt)) {
      promptText = prompt.map((item: any) => item.text || '').join('');
    } else if (typeof prompt === 'string') {
      promptText = prompt;
    }

    if (!promptText || !promptText.trim()) {
      debugLog({ '===提示词为空': formItemParams });
      return {
        code: FieldCode.ConfigError,
        msg: '===提示词为空',
      };
    }

    // 构建完整提示词（附加生成参数）
    const durationValue = duration?.value || '5';
    const cameraFixedValue = cameraFixed?.value || 'false';
    const fullPrompt = `${promptText.trim()}  --duration ${durationValue} --camerafixed ${cameraFixedValue} --watermark true`;

    // 构建 API 请求的 content 数组
    const content: any[] = [
      {
        type: 'text',
        text: fullPrompt,
      }
    ];

    // 如果提供了参考图片，添加到 content（图生视频模式）
    if (refImage && Array.isArray(refImage) && refImage.length > 0) {
      const firstImage = refImage[0];
      if (firstImage?.tmp_url) {
        content.push({
          type: 'image_url',
          image_url: {
            url: firstImage.tmp_url,
          }
        });
      }
    }

    debugLog({ '===请求参数': { fullPrompt, content, hasImage: content.length > 1 } });

    // 封装 fetch 函数
    const fetchApi = async <T = any>(url: string, init: any, authId?: string): Promise<T> => {
      try {
        const res = await context.fetch(url, init, authId);
        const resText = await res.text();
        debugLog({
          [`===fetch ${url}`]: {
            status: res.status,
            resText: resText.slice(0, 4000),
          }
        });
        return JSON.parse(resText);
      } catch (e) {
        debugLog({ [`===fetch error ${url}`]: String(e) });
        throw e;
      }
    };

    try {
      // ========== 第一步：创建视频生成任务 ==========
      debugLog('===创建视频生成任务...');
      const createResult = await fetchApi<any>(
        'https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'ep-20260302170532-hndgm',
            content: content,
          }),
        },
        'ark_auth'
      );

      debugLog({ '===创建任务结果': createResult });

      if (!createResult?.id) {
        return {
          code: FieldCode.Success,
          data: {
            id: `${Date.now()}`,
            videoUrl: `创建任务失败: ${JSON.stringify(createResult?.error || createResult).slice(0, 200)}`,
            status: '失败',
            taskId: '',
          }
        };
      }

      const taskId = createResult.id;

      // ========== 第二步：轮询任务状态 ==========
      debugLog(`===开始轮询任务状态, taskId: ${taskId}`);
      let attempts = 0;
      const maxAttempts = 180; // 最多轮询180次，每次3秒，约9分钟

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        attempts++;

        const getResult = await fetchApi<any>(
          `https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/${taskId}`,
          { method: 'GET' },
          'ark_auth'
        );

        const status = getResult?.status;
        debugLog({ [`===轮询第${attempts}次`]: { status, taskId } });

        if (status === 'succeeded') {
          debugLog({ '===视频生成成功': getResult });

          // 从返回结果中提取视频URL
          // 实际响应格式: { content: { video_url: "https://..." }, resolution, duration, ... }
          let videoUrl = '';

          if (getResult.content) {
            if (typeof getResult.content === 'object' && !Array.isArray(getResult.content)) {
              // content 是对象: { video_url: "..." }
              videoUrl = getResult.content.video_url || '';
            } else if (Array.isArray(getResult.content)) {
              // 兜底：content 是数组的情况
              for (const item of getResult.content) {
                if (item.video_url) {
                  videoUrl = typeof item.video_url === 'string' ? item.video_url : item.video_url.url || '';
                  break;
                }
              }
            }
          }

          // 兜底：尝试从 output 字段提取
          if (!videoUrl && getResult.output) {
            videoUrl = getResult.output.video_url || getResult.output.url || '';
          }

          const resolution = getResult.resolution || '';
          const durationInfo = getResult.duration || '';

          return {
            code: FieldCode.Success,
            data: {
              id: taskId,
              videoUrl: videoUrl || '视频已生成，URL解析中，请查看任务详情',
              status: `成功 ${resolution} ${durationInfo}s`.trim(),
              taskId: taskId,
            }
          };
        }

        if (status === 'failed') {
          debugLog({ '===视频生成失败': getResult });
          const errorMsg = getResult?.error?.message || getResult?.error || '未知错误';
          return {
            code: FieldCode.Success,
            data: {
              id: taskId,
              videoUrl: `生成失败: ${String(errorMsg).slice(0, 200)}`,
              status: '失败',
              taskId: taskId,
            }
          };
        }

        // 其他状态继续轮询（running, queued 等）
      }

      // 超时
      return {
        code: FieldCode.Success,
        data: {
          id: taskId,
          videoUrl: '生成超时（超过9分钟），请通过任务ID查询结果',
          status: '超时',
          taskId: taskId,
        }
      };

    } catch (e) {
      console.log('====Seedance error:', String(e));
      debugLog({ '===异常错误': String(e) });
      return {
        code: FieldCode.Error,
        msg: '===Seedance异常: ' + String(e),
      };
    }
  },
});

export default basekit;
