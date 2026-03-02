"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 域名白名单 - 火山引擎方舟API + 飞书附件
block_basekit_server_api_1.basekit.addDomainList(['volces.com', 'feishu.cn', 'feishucdn.com']);
block_basekit_server_api_1.basekit.addField({
    i18n: {
        messages: {
            'zh-CN': {
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
    // 火山引擎方舟 API Key 授权
    authorizations: [
        {
            id: 'ark_auth',
            platform: 'volcengine',
            type: block_basekit_server_api_1.AuthorizationType.HeaderBearerToken,
            required: true,
            instructionsUrl: 'https://console.volcengine.com/ark',
            label: '火山引擎方舟 API Key',
            icon: { light: '', dark: '' }
        }
    ],
    // 定义捷径的入参
    formItems: [
        {
            key: 'prompt',
            label: t('prompt'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            tooltips: [{ type: 'text', content: '文生视频必填；图生视频可选' }],
            validator: { required: false }
        },
        {
            key: 'firstFrameUrl',
            label: t('firstFrameUrl'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: { placeholder: t('firstFrameUrlPlaceholder') },
            tooltips: [{ type: 'text', content: '可选：输入首帧图片的公开URL（PNG/JPG/WEBP），实现图生视频' }],
            validator: { required: false }
        },
        {
            key: 'lastFrameUrl',
            label: t('lastFrameUrl'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: { placeholder: t('lastFrameUrlPlaceholder') },
            tooltips: [{ type: 'text', content: '可选：输入尾帧图片的公开URL，与首帧配合实现首尾帧控制' }],
            validator: { required: false }
        },
        {
            key: 'firstFrameAttach',
            label: t('firstFrameAttach'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: { supportType: [block_basekit_server_api_1.FieldType.Attachment] },
            tooltips: [{ type: 'text', content: '可选：从附件字段选取首帧图片（优先使用上方URL）' }],
            validator: { required: false }
        },
        {
            key: 'ratio',
            label: t('ratio'),
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
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
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
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
            component: block_basekit_server_api_1.FieldComponent.Radio,
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
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
            },
            properties: [
                {
                    key: 'id',
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: 'id',
                    label: 'id',
                    hidden: true,
                },
                {
                    key: 'videoUrl',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('videoUrl'),
                    label: t('videoUrl'),
                    primary: true,
                },
                {
                    key: 'status',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('status'),
                    label: t('status'),
                },
                {
                    key: 'taskId',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('taskId'),
                    label: t('taskId'),
                },
            ],
        },
    },
    // 执行函数
    execute: async (formItemParams, context) => {
        const { prompt, firstFrameUrl, lastFrameUrl, firstFrameAttach, ratio, duration, generateAudio } = formItemParams;
        function debugLog(arg, showContext = false) {
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
            promptText = prompt.map((item) => item.text || '').join('');
        }
        else if (typeof prompt === 'string') {
            promptText = prompt;
        }
        // 判断是否有图片输入（首帧URL、尾帧URL、首帧附件任一有值）
        const hasFirstFrameUrl = firstFrameUrl && typeof firstFrameUrl === 'string' && firstFrameUrl.trim().startsWith('http');
        const hasLastFrameUrl = lastFrameUrl && typeof lastFrameUrl === 'string' && lastFrameUrl.trim().startsWith('http');
        const hasFirstFrameAttach = firstFrameAttach && Array.isArray(firstFrameAttach) && firstFrameAttach.length > 0;
        const hasAnyImage = hasFirstFrameUrl || hasLastFrameUrl || hasFirstFrameAttach;
        // 文生视频模式下提示词必填；图生视频模式下提示词可选
        if (!promptText?.trim() && !hasAnyImage) {
            return { code: block_basekit_server_api_1.FieldCode.ConfigError, msg: '===提示词和图片至少需要提供一项' };
        }
        // ========== 构建 content 数组 ==========
        const content = [];
        // 提示词（可选）
        if (promptText?.trim()) {
            content.push({ type: 'text', text: promptText.trim() });
        }
        // 首帧图片：优先URL输入，其次附件字段
        let firstFrameSrc = '';
        if (firstFrameUrl && typeof firstFrameUrl === 'string' && firstFrameUrl.trim().startsWith('http')) {
            firstFrameSrc = firstFrameUrl.trim();
            debugLog({ '===首帧使用URL': firstFrameSrc });
        }
        else if (firstFrameAttach && Array.isArray(firstFrameAttach) && firstFrameAttach.length > 0) {
            const img = firstFrameAttach[0];
            if (img?.tmp_url && /\.(png|jpg|jpeg|webp)$/i.test(img.name || '')) {
                try {
                    const imgRes = await context.fetch(img.tmp_url, { method: 'GET' });
                    const imgBuffer = await imgRes.arrayBuffer();
                    const base64 = Buffer.from(imgBuffer).toString('base64');
                    const ext = (img.name.match(/\.(png|jpg|jpeg|webp)$/i)?.[1] || 'png').toLowerCase();
                    const mimeMap = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' };
                    firstFrameSrc = `data:${mimeMap[ext] || 'image/png'};base64,${base64}`;
                    debugLog({ '===首帧附件已转base64': img.name });
                }
                catch (e) {
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
        const requestBody = {
            model: 'ep-20260302170532-hndgm',
            content: content,
            duration: parseInt(duration?.value || '5', 10),
            ratio: ratio?.value || '16:9',
            watermark: false,
        };
        // 生成音频（默认开启）
        requestBody.generate_audio = generateAudio?.value !== 'false';
        debugLog({ '===请求体': { ...requestBody, content: `[${content.length} items]` } });
        // fetch 封装
        const fetchApi = async (url, init, authId) => {
            try {
                const res = await context.fetch(url, init, authId);
                const resText = await res.text();
                debugLog({ [`===fetch ${url}`]: { status: res.status, resText: resText.slice(0, 4000) } });
                return JSON.parse(resText);
            }
            catch (e) {
                debugLog({ [`===fetch error ${url}`]: String(e) });
                throw e;
            }
        };
        try {
            // ========== 第一步：创建任务 ==========
            const createResult = await fetchApi('https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            }, 'ark_auth');
            if (!createResult?.id) {
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
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
                const getResult = await fetchApi(`https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/${taskId}`, { method: 'GET' }, 'ark_auth');
                const status = getResult?.status;
                debugLog({ [`===轮询#${attempts}`]: status });
                if (status === 'succeeded') {
                    let videoUrl = '';
                    if (getResult.content) {
                        if (typeof getResult.content === 'object' && !Array.isArray(getResult.content)) {
                            videoUrl = getResult.content.video_url || '';
                        }
                        else if (Array.isArray(getResult.content)) {
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
                        code: block_basekit_server_api_1.FieldCode.Success,
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
                        code: block_basekit_server_api_1.FieldCode.Success,
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
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    id: taskId,
                    videoUrl: '生成超时，请通过任务ID查询结果',
                    status: '超时',
                    taskId: taskId,
                }
            };
        }
        catch (e) {
            debugLog({ '===异常错误': String(e) });
            return { code: block_basekit_server_api_1.FieldCode.Error, msg: '===Seedance异常: ' + String(e) };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0g7QUFDL0gsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBRXBFLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixlQUFlLEVBQUUsYUFBYTtnQkFDOUIsMEJBQTBCLEVBQUUseUNBQXlDO2dCQUNyRSxjQUFjLEVBQUUsYUFBYTtnQkFDN0IseUJBQXlCLEVBQUUsd0NBQXdDO2dCQUNuRSxrQkFBa0IsRUFBRSxZQUFZO2dCQUNoQyxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxHQUFHO2dCQUNULFVBQVUsRUFBRSxNQUFNO2dCQUNsQixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsUUFBUSxFQUFFLE1BQU07YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLGVBQWUsRUFBRSw0QkFBNEI7Z0JBQzdDLDBCQUEwQixFQUFFLHNEQUFzRDtnQkFDbEYsY0FBYyxFQUFFLDJCQUEyQjtnQkFDM0MseUJBQXlCLEVBQUUscURBQXFEO2dCQUNoRixrQkFBa0IsRUFBRSxtQ0FBbUM7Z0JBQ3ZELFVBQVUsRUFBRSxVQUFVO2dCQUN0QixPQUFPLEVBQUUsY0FBYztnQkFDdkIsZUFBZSxFQUFFLGdCQUFnQjtnQkFDakMsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUUsU0FBUzthQUNwQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsZUFBZSxFQUFFLGVBQWU7Z0JBQ2hDLDBCQUEwQixFQUFFLFNBQVM7Z0JBQ3JDLGNBQWMsRUFBRSxlQUFlO2dCQUMvQix5QkFBeUIsRUFBRSxTQUFTO2dCQUNwQyxrQkFBa0IsRUFBRSxjQUFjO2dCQUNsQyxVQUFVLEVBQUUsT0FBTztnQkFDbkIsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLGVBQWUsRUFBRSxTQUFTO2dCQUMxQixLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUUsS0FBSztnQkFDWCxVQUFVLEVBQUUsT0FBTztnQkFDbkIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRSxPQUFPO2FBQ2xCO1NBQ0Y7S0FDRjtJQUVELG9CQUFvQjtJQUNwQixjQUFjLEVBQUU7UUFDZDtZQUNFLEVBQUUsRUFBRSxVQUFVO1lBQ2QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsSUFBSSxFQUFFLDRDQUFpQixDQUFDLGlCQUFpQjtZQUN6QyxRQUFRLEVBQUUsSUFBSTtZQUNkLGVBQWUsRUFBRSxvQ0FBb0M7WUFDckQsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7U0FDOUI7S0FDRjtJQUVELFVBQVU7SUFDVixTQUFTLEVBQUU7UUFDVDtZQUNFLEdBQUcsRUFBRSxRQUFRO1lBQ2IsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDbEIsU0FBUyxFQUFFLHlDQUFjLENBQUMsV0FBVztZQUNyQyxLQUFLLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLENBQUMsb0NBQVMsQ0FBQyxJQUFJLENBQUM7YUFDOUI7WUFDRCxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDO1lBQ3RELFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7U0FDL0I7UUFDRDtZQUNFLEdBQUcsRUFBRSxlQUFlO1lBQ3BCLEtBQUssRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDO1lBQ3pCLFNBQVMsRUFBRSx5Q0FBYyxDQUFDLEtBQUs7WUFDL0IsS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO1lBQ3JELFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsQ0FBQztZQUM3RSxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1NBQy9CO1FBQ0Q7WUFDRSxHQUFHLEVBQUUsY0FBYztZQUNuQixLQUFLLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUN4QixTQUFTLEVBQUUseUNBQWMsQ0FBQyxLQUFLO1lBQy9CLEtBQUssRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMseUJBQXlCLENBQUMsRUFBRTtZQUNwRCxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLENBQUM7WUFDckUsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtTQUMvQjtRQUNEO1lBQ0UsR0FBRyxFQUFFLGtCQUFrQjtZQUN2QixLQUFLLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO1lBQzVCLFNBQVMsRUFBRSx5Q0FBYyxDQUFDLFdBQVc7WUFDckMsS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsb0NBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM5QyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLENBQUM7WUFDbEUsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtTQUMvQjtRQUNEO1lBQ0UsR0FBRyxFQUFFLE9BQU87WUFDWixLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNqQixTQUFTLEVBQUUseUNBQWMsQ0FBQyxZQUFZO1lBQ3RDLEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUU7b0JBQ1AsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7b0JBQ25DLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO29CQUNuQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtvQkFDakMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7b0JBQ25DLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO2lCQUMxQzthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtTQUM5QjtRQUNEO1lBQ0UsR0FBRyxFQUFFLFVBQVU7WUFDZixLQUFLLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUNwQixTQUFTLEVBQUUseUNBQWMsQ0FBQyxZQUFZO1lBQ3RDLEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUU7b0JBQ1AsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQzNCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2lCQUM5QjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtTQUM5QjtRQUNEO1lBQ0UsR0FBRyxFQUFFLGVBQWU7WUFDcEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDekIsU0FBUyxFQUFFLHlDQUFjLENBQUMsS0FBSztZQUMvQixLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFO29CQUNQLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO29CQUNsQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtpQkFDbkM7YUFDRjtTQUNGO0tBQ0Y7SUFFRCxTQUFTO0lBQ1QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLG9DQUFTLENBQUMsTUFBTTtRQUN0QixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLDZFQUE2RTthQUNyRjtZQUNELFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxHQUFHLEVBQUUsSUFBSTtvQkFDVCxZQUFZLEVBQUUsSUFBSTtvQkFDbEIsSUFBSSxFQUFFLG9DQUFTLENBQUMsSUFBSTtvQkFDcEIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsS0FBSyxFQUFFLElBQUk7b0JBQ1gsTUFBTSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsSUFBSSxFQUFFLG9DQUFTLENBQUMsSUFBSTtvQkFDcEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7b0JBQ3BCLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO29CQUNwQixPQUFPLEVBQUUsSUFBSTtpQkFDZDtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsUUFBUTtvQkFDYixJQUFJLEVBQUUsb0NBQVMsQ0FBQyxJQUFJO29CQUNwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztvQkFDbEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7aUJBQ25CO2dCQUNEO29CQUNFLEdBQUcsRUFBRSxRQUFRO29CQUNiLElBQUksRUFBRSxvQ0FBUyxDQUFDLElBQUk7b0JBQ3BCLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUNsQixLQUFLLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztpQkFDbkI7YUFDRjtTQUNGO0tBQ0Y7SUFFRCxPQUFPO0lBQ1AsT0FBTyxFQUFFLEtBQUssRUFBRSxjQVFmLEVBQUUsT0FBTyxFQUFFLEVBQUU7UUFDWixNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsR0FBRyxjQUFjLENBQUM7UUFFakgsU0FBUyxRQUFRLENBQUMsR0FBUSxFQUFFLFdBQVcsR0FBRyxLQUFLO1lBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDakUsT0FBTztZQUNULENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVELFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVyRCxRQUFRO1FBQ1IsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzFCLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRSxDQUFDO2FBQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN0QyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxrQ0FBa0M7UUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyxhQUFhLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkgsTUFBTSxlQUFlLEdBQUcsWUFBWSxJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ILE1BQU0sbUJBQW1CLEdBQUcsZ0JBQWdCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0csTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLElBQUksZUFBZSxJQUFJLG1CQUFtQixDQUFDO1FBRS9FLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEMsT0FBTyxFQUFFLElBQUksRUFBRSxvQ0FBUyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztRQUNuRSxDQUFDO1FBRUQsc0NBQXNDO1FBQ3RDLE1BQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQztRQUUxQixVQUFVO1FBQ1YsSUFBSSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBRUQsc0JBQXNCO1FBQ3RCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLGFBQWEsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2xHLGFBQWEsR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckMsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQzthQUFNLElBQUksZ0JBQWdCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM5RixNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLEdBQUcsRUFBRSxPQUFPLElBQUkseUJBQXlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDbkUsSUFBSSxDQUFDO29CQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ25FLE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUM3QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDekQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ3BGLE1BQU0sT0FBTyxHQUEyQixFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQztvQkFDeEgsYUFBYSxHQUFHLFFBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFdBQVcsV0FBVyxNQUFNLEVBQUUsQ0FBQztvQkFDdkUsUUFBUSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzVDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDWCxRQUFRLENBQUMsRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDekMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNYLElBQUksRUFBRSxXQUFXO2dCQUNqQixTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFO2dCQUNqQyxJQUFJLEVBQUUsYUFBYTthQUNwQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsaUJBQWlCO1FBQ2pCLElBQUksWUFBWSxJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDL0YsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDWCxJQUFJLEVBQUUsV0FBVztnQkFDakIsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxFQUFFLFlBQVk7YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELHVDQUF1QztRQUN2QyxNQUFNLFdBQVcsR0FBUTtZQUN2QixLQUFLLEVBQUUseUJBQXlCO1lBQ2hDLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQzlDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFJLE1BQU07WUFDN0IsU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQztRQUVGLGFBQWE7UUFDYixXQUFXLENBQUMsY0FBYyxHQUFHLGFBQWEsRUFBRSxLQUFLLEtBQUssT0FBTyxDQUFDO1FBRTlELFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqRixXQUFXO1FBQ1gsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFXLEdBQVcsRUFBRSxJQUFTLEVBQUUsTUFBZSxFQUFjLEVBQUU7WUFDdEYsSUFBSSxDQUFDO2dCQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxNQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDakMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzNGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDWCxRQUFRLENBQUMsRUFBRSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sQ0FBQyxDQUFDO1lBQ1YsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQztZQUNILGlDQUFpQztZQUNqQyxNQUFNLFlBQVksR0FBRyxNQUFNLFFBQVEsQ0FDakMscUVBQXFFLEVBQ3JFO2dCQUNFLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRTtnQkFDL0MsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO2FBQ2xDLEVBQ0QsVUFBVSxDQUNYLENBQUM7WUFFRixJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUN0QixPQUFPO29CQUNMLElBQUksRUFBRSxvQ0FBUyxDQUFDLE9BQU87b0JBQ3ZCLElBQUksRUFBRTt3QkFDSixFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUU7d0JBQ25CLFFBQVEsRUFBRSxXQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO3dCQUN4RixNQUFNLEVBQUUsSUFBSTt3QkFDWixNQUFNLEVBQUUsRUFBRTtxQkFDWDtpQkFDRixDQUFDO1lBQ0osQ0FBQztZQUVELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxFQUFFLENBQUM7WUFFL0IsbUNBQW1DO1lBQ25DLFFBQVEsQ0FBQyxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDakIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsbUJBQW1CO1lBRTNDLE9BQU8sUUFBUSxHQUFHLFdBQVcsRUFBRSxDQUFDO2dCQUM5QixNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxRQUFRLEVBQUUsQ0FBQztnQkFFWCxNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FDOUIsdUVBQXVFLE1BQU0sRUFBRSxFQUMvRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFDakIsVUFBVSxDQUNYLENBQUM7Z0JBRUYsTUFBTSxNQUFNLEdBQUcsU0FBUyxFQUFFLE1BQU0sQ0FBQztnQkFDakMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFNUMsSUFBSSxNQUFNLEtBQUssV0FBVyxFQUFFLENBQUM7b0JBQzNCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ3RCLElBQUksT0FBTyxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7NEJBQy9FLFFBQVEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7d0JBQy9DLENBQUM7NkJBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDOzRCQUM1QyxLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQ0FDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0NBQ25CLFFBQVEsR0FBRyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7b0NBQzFGLE1BQU07Z0NBQ1IsQ0FBQzs0QkFDSCxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDbEMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztvQkFDdEUsQ0FBQztvQkFFRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztvQkFDdkMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7b0JBQ3JDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO29CQUVsQyxPQUFPO3dCQUNMLElBQUksRUFBRSxvQ0FBUyxDQUFDLE9BQU87d0JBQ3ZCLElBQUksRUFBRTs0QkFDSixFQUFFLEVBQUUsTUFBTTs0QkFDVixRQUFRLEVBQUUsUUFBUSxJQUFJLGVBQWU7NEJBQ3JDLE1BQU0sRUFBRSxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUN6QyxNQUFNLEVBQUUsTUFBTTt5QkFDZjtxQkFDRixDQUFDO2dCQUNKLENBQUM7Z0JBRUQsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFLENBQUM7b0JBQ3hCLE1BQU0sUUFBUSxHQUFHLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxJQUFJLFNBQVMsRUFBRSxLQUFLLElBQUksTUFBTSxDQUFDO29CQUN6RSxPQUFPO3dCQUNMLElBQUksRUFBRSxvQ0FBUyxDQUFDLE9BQU87d0JBQ3ZCLElBQUksRUFBRTs0QkFDSixFQUFFLEVBQUUsTUFBTTs0QkFDVixRQUFRLEVBQUUsU0FBUyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTs0QkFDbkQsTUFBTSxFQUFFLElBQUk7NEJBQ1osTUFBTSxFQUFFLE1BQU07eUJBQ2Y7cUJBQ0YsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQztZQUVELE9BQU87Z0JBQ0wsSUFBSSxFQUFFLG9DQUFTLENBQUMsT0FBTztnQkFDdkIsSUFBSSxFQUFFO29CQUNKLEVBQUUsRUFBRSxNQUFNO29CQUNWLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLE1BQU0sRUFBRSxJQUFJO29CQUNaLE1BQU0sRUFBRSxNQUFNO2lCQUNmO2FBQ0YsQ0FBQztRQUVKLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkMsT0FBTyxFQUFFLElBQUksRUFBRSxvQ0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkUsQ0FBQztJQUNILENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCxrQkFBZSxrQ0FBTyxDQUFDIn0=