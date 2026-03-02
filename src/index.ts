import { basekit, FieldType, field, FieldComponent, FieldCode } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 域名白名单 - 火山引擎方舟API + 飞书附件
basekit.addDomainList(['volces.com', 'feishu.cn', 'feishucdn.com']);

basekit.addField({
  i18n: {
    messages: {
      'zh-CN': {
        'apiKey': 'API Key',
        'apiKeyPlaceholder': '火山引擎方舟 API Key',
        'endpointId': '模型端点 ID',
        'endpointIdPlaceholder': '如 ep-xxxxxxxxxxxx-xxxxx',
        'prompt': '视频提示词',
        'firstFrameUrl': '首帧图片URL（可选）',
        'firstFrameUrlPlaceholder': '公开图片URL，如 https://example.com/first.png',
        'lastFrameUrl': '尾帧图片URL（可选）',
        'lastFrameUrlPlaceholder': '公开图片URL，如 https://example.com/last.png',
        'firstFrameAttach': '首帧图片附件（可选）',
        'duration': '视频时长',
        'ratio': '画面比例',
        'generateAudio': '生成音频',
        'yes': '是',
        'no': '否',
        'videoUrl': '视频地址',
        'status': '生成状态',
        'taskId': '任务ID',
      },
      'en-US': {
        'apiKey': 'API Key',
        'apiKeyPlaceholder': 'Volcengine Ark API Key',
        'endpointId': 'Model Endpoint ID',
        'endpointIdPlaceholder': 'e.g. ep-xxxxxxxxxxxx-xxxxx',
        'prompt': 'Video Prompt',
        'firstFrameUrl': 'First Frame URL (Optional)',
        'firstFrameUrlPlaceholder': 'Public image URL, e.g. https://example.com/first.png',
        'lastFrameUrl': 'Last Frame URL (Optional)',
        'lastFrameUrlPlaceholder': 'Public image URL, e.g. https://example.com/last.png',
        'firstFrameAttach': 'First Frame Attachment (Optional)',
        'duration': 'Duration',
        'ratio': 'Aspect Ratio',
        'generateAudio': 'Generate Audio',
        'yes': 'Yes',
        'no': 'No',
        'videoUrl': 'Video URL',
        'status': 'Status',
        'taskId': 'Task ID',
      },
      'ja-JP': {
        'apiKey': 'API Key',
        'apiKeyPlaceholder': '火山エンジンArk API Key',
        'endpointId': 'モデルエンドポイントID',
        'endpointIdPlaceholder': '例: ep-xxxxxxxxxxxx-xxxxx',
        'prompt': '動画プロンプト',
        'firstFrameUrl': '最初フレームURL（任意）',
        'firstFrameUrlPlaceholder': '公開画像URL',
        'lastFrameUrl': '最後フレームURL（任意）',
        'lastFrameUrlPlaceholder': '公開画像URL',
        'firstFrameAttach': '最初フレーム添付（任意）',
        'duration': '動画の長さ',
        'ratio': 'アスペクト比',
        'generateAudio': 'オーディオ生成',
        'yes': 'はい',
        'no': 'いいえ',
        'videoUrl': '動画URL',
        'status': 'ステータス',
        'taskId': 'タスクID',
      },
    }
  },

  // 定义捷径的入参
  formItems: [
    {
      key: 'apiKey',
      label: t('apiKey'),
      component: FieldComponent.Input,
      props: { placeholder: t('apiKeyPlaceholder') },
      tooltips: [{ type: 'text', content: '在火山引擎方舟控制台获取：https://console.volcengine.com/ark' }],
      validator: { required: true }
    },
    {
      key: 'endpointId',
      label: t('endpointId'),
      component: FieldComponent.Input,
      props: { placeholder: t('endpointIdPlaceholder') },
      tooltips: [{ type: 'text', content: '在火山引擎方舟控制台创建的推理接入点ID，如 ep-20260302170532-hndgm' }],
      validator: { required: true }
    },
    {
      key: 'prompt',
      label: t('prompt'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text],
      },
      tooltips: [{ type: 'text', content: '文生视频必填；图生视频可选' }],
      validator: { required: false }
    },
    {
      key: 'firstFrameUrl',
      label: t('firstFrameUrl'),
      component: FieldComponent.Input,
      props: { placeholder: t('firstFrameUrlPlaceholder') },
      tooltips: [{ type: 'text', content: '可选：输入首帧图片的公开URL（PNG/JPG/WEBP），实现图生视频' }],
      validator: { required: false }
    },
    {
      key: 'lastFrameUrl',
      label: t('lastFrameUrl'),
      component: FieldComponent.Input,
      props: { placeholder: t('lastFrameUrlPlaceholder') },
      tooltips: [{ type: 'text', content: '可选：输入尾帧图片的公开URL，与首帧配合实现首尾帧控制' }],
      validator: { required: false }
    },
    {
      key: 'firstFrameAttach',
      label: t('firstFrameAttach'),
      component: FieldComponent.FieldSelect,
      props: { supportType: [FieldType.Attachment] },
      tooltips: [{ type: 'text', content: '可选：从附件字段选取首帧图片（优先使用上方URL）' }],
      validator: { required: false }
    },
    {
      key: 'ratio',
      label: t('ratio'),
      component: FieldComponent.SingleSelect,
      props: {
        options: [
          { label: '16:9 横屏', value: '16:9' },
          { label: '9:16 竖屏', value: '9:16' },
          { label: '1:1 方形', value: '1:1' },
          { label: '21:9 超宽', value: '21:9' },
          { label: '自适应（图生视频）', value: 'adaptive' },
        ]
      },
      validator: { required: true }
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
      validator: { required: true }
    },
    {
      key: 'generateAudio',
      label: t('generateAudio'),
      component: FieldComponent.Radio,
      props: {
        options: [
          { label: t('yes'), value: 'true' },
          { label: t('no'), value: 'false' },
        ]
      },
    },
  ],

  // 返回结果类型
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

  // 执行函数
  execute: async (formItemParams: {
    apiKey: string;
    endpointId: string;
    prompt: { type: string; text: string }[];
    firstFrameUrl: string;
    lastFrameUrl: string;
    firstFrameAttach: { name: string; size: number; type: string; tmp_url: string }[];
    ratio: { label: string; value: string };
    duration: { label: string; value: string };
    generateAudio: { label: string; value: string };
  }, context) => {
    const { apiKey, endpointId, prompt, firstFrameUrl, lastFrameUrl, firstFrameAttach, ratio, duration, generateAudio } = formItemParams;

    function debugLog(arg: any, showContext = false) {
      if (!showContext) {
        console.log(JSON.stringify({ arg, logID: context.logID }), '\n');
        return;
      }
      console.log(JSON.stringify({ formItemParams, context, arg }), '\n');
    }

    debugLog('=====Seedance 1.5 Pro start=====v2', true);

    // 提取提示词
    let promptText = '';
    if (Array.isArray(prompt)) {
      promptText = prompt.map((item: any) => item.text || '').join('');
    } else if (typeof prompt === 'string') {
      promptText = prompt;
    }

    // 判断是否有图片输入（首帧URL、尾帧URL、首帧附件任一有值）
    const hasFirstFrameUrl = firstFrameUrl && typeof firstFrameUrl === 'string' && firstFrameUrl.trim().startsWith('http');
    const hasLastFrameUrl = lastFrameUrl && typeof lastFrameUrl === 'string' && lastFrameUrl.trim().startsWith('http');
    const hasFirstFrameAttach = firstFrameAttach && Array.isArray(firstFrameAttach) && firstFrameAttach.length > 0;
    const hasAnyImage = hasFirstFrameUrl || hasLastFrameUrl || hasFirstFrameAttach;

    // 文生视频模式下提示词必填；图生视频模式下提示词可选
    if (!promptText?.trim() && !hasAnyImage) {
      return { code: FieldCode.ConfigError, msg: '===提示词和图片至少需要提供一项' };
    }

    // ========== 构建 content 数组 ==========
    const content: any[] = [];

    // 提示词（可选）
    if (promptText?.trim()) {
      content.push({ type: 'text', text: promptText.trim() });
    }

    // 首帧图片：优先URL输入，其次附件字段
    let firstFrameSrc = '';
    if (firstFrameUrl && typeof firstFrameUrl === 'string' && firstFrameUrl.trim().startsWith('http')) {
      firstFrameSrc = firstFrameUrl.trim();
      debugLog({ '===首帧使用URL': firstFrameSrc });
    } else if (firstFrameAttach && Array.isArray(firstFrameAttach) && firstFrameAttach.length > 0) {
      const img = firstFrameAttach[0];
      if (img?.tmp_url && /\.(png|jpg|jpeg|webp)$/i.test(img.name || '')) {
        try {
          const imgRes = await context.fetch(img.tmp_url, { method: 'GET' });
          const imgBuffer = await imgRes.arrayBuffer();
          const base64 = Buffer.from(imgBuffer).toString('base64');
          const ext = (img.name.match(/\.(png|jpg|jpeg|webp)$/i)?.[1] || 'png').toLowerCase();
          const mimeMap: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' };
          firstFrameSrc = `data:${mimeMap[ext] || 'image/png'};base64,${base64}`;
          debugLog({ '===首帧附件已转base64': img.name });
        } catch (e) {
          debugLog({ '===首帧附件下载失败': String(e) });
        }
      }
    }

    if (firstFrameSrc) {
      content.push({
        type: 'image_url',
        image_url: { url: firstFrameSrc },
        role: 'first_frame',
      });
    }

    // 尾帧图片（仅支持URL输入）
    if (lastFrameUrl && typeof lastFrameUrl === 'string' && lastFrameUrl.trim().startsWith('http')) {
      content.push({
        type: 'image_url',
        image_url: { url: lastFrameUrl.trim() },
        role: 'last_frame',
      });
      debugLog({ '===尾帧使用URL': lastFrameUrl.trim() });
    }

    // ========== 构建请求体（参数为顶层字段） ==========
    const requestBody: any = {
      model: endpointId?.trim() || 'ep-20260302170532-hndgm',
      content: content,
      duration: parseInt(duration?.value || '5', 10),
      ratio: ratio?.value || '16:9',
      watermark: false,
    };

    // 生成音频（默认开启）
    requestBody.generate_audio = generateAudio?.value !== 'false';

    debugLog({ '===请求体': { ...requestBody, content: `[${content.length} items]` } });

    // fetch 封装（手动添加 Authorization header）
    const authHeader = `Bearer ${apiKey?.trim()}`;
    const fetchApi = async <T = any>(url: string, init: any): Promise<T> => {
      try {
        init.headers = { ...init.headers, 'Authorization': authHeader };
        const res = await context.fetch(url, init);
        const resText = await res.text();
        debugLog({ [`===fetch ${url}`]: { status: res.status, resText: resText.slice(0, 4000) } });
        return JSON.parse(resText);
      } catch (e) {
        debugLog({ [`===fetch error ${url}`]: String(e) });
        throw e;
      }
    };

    try {
      // ========== 第一步：创建任务 ==========
      const createResult = await fetchApi<any>(
        'https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        },
      );

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
      debugLog(`===轮询开始, taskId: ${taskId}`);
      let attempts = 0;
      const maxAttempts = 60; // 5秒间隔 × 60次 = 5分钟

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;

        const getResult = await fetchApi<any>(
          `https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/${taskId}`,
          { method: 'GET' },
          );

        const status = getResult?.status;
        debugLog({ [`===轮询#${attempts}`]: status });

        if (status === 'succeeded') {
          let videoUrl = '';
          if (getResult.content) {
            if (typeof getResult.content === 'object' && !Array.isArray(getResult.content)) {
              videoUrl = getResult.content.video_url || '';
            } else if (Array.isArray(getResult.content)) {
              for (const item of getResult.content) {
                if (item.video_url) {
                  videoUrl = typeof item.video_url === 'string' ? item.video_url : item.video_url.url || '';
                  break;
                }
              }
            }
          }
          if (!videoUrl && getResult.output) {
            videoUrl = getResult.output.video_url || getResult.output.url || '';
          }

          const res = getResult.resolution || '';
          const dur = getResult.duration || '';
          const rat = getResult.ratio || '';

          return {
            code: FieldCode.Success,
            data: {
              id: taskId,
              videoUrl: videoUrl || '视频已生成，请查看任务详情',
              status: `成功 ${res} ${rat} ${dur}s`.trim(),
              taskId: taskId,
            }
          };
        }

        if (status === 'failed') {
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
      }

      return {
        code: FieldCode.Success,
        data: {
          id: taskId,
          videoUrl: '生成超时，请通过任务ID查询结果',
          status: '超时',
          taskId: taskId,
        }
      };

    } catch (e) {
      debugLog({ '===异常错误': String(e) });
      return { code: FieldCode.Error, msg: '===Seedance异常: ' + String(e) };
    }
  },
});

export default basekit;
