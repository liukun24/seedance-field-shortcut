/**
 * 独立测试脚本 - 直接调用火山引擎方舟 Seedance 1.5 Pro API
 * 用法: node test/test-api.mjs
 */

const ARK_API_KEY = process.env.ARK_API_KEY || 'e730848e-ad16-4857-8b4c-e490a8fea310';
const BASE_URL = 'https://ark.cn-beijing.volces.com/api/v3';
const MODEL = 'ep-20260302170532-hndgm';

async function main() {
  console.log('========== Seedance 1.5 Pro API 测试 ==========\n');

  // 第一步：创建视频生成任务（纯文生视频）
  console.log('[1] 创建视频生成任务...');
  const createBody = {
    model: MODEL,
    content: [
      {
        type: 'text',
        text: '无人机以极快速度穿越复杂障碍或自然奇观，带来沉浸式飞行体验  --duration 5 --camerafixed false --watermark true'
      }
    ]
  };

  console.log('请求体:', JSON.stringify(createBody, null, 2));
  console.log(`URL: ${BASE_URL}/content_generation/tasks`);
  console.log(`API Key: ${ARK_API_KEY.slice(0, 8)}...${ARK_API_KEY.slice(-4)}\n`);

  const createRes = await fetch(`${BASE_URL}/contents/generations/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ARK_API_KEY}`,
    },
    body: JSON.stringify(createBody),
  });

  const createText = await createRes.text();
  console.log(`[1] 响应状态: ${createRes.status}`);
  console.log(`[1] 响应内容:\n${createText}\n`);

  let createResult;
  try {
    createResult = JSON.parse(createText);
  } catch (e) {
    console.error('JSON 解析失败，原始响应:', createText);
    return;
  }

  if (!createResult.id) {
    console.error('创建任务失败，没有返回 task id');
    console.log('完整响应:', JSON.stringify(createResult, null, 2));
    return;
  }

  const taskId = createResult.id;
  console.log(`[1] 任务创建成功! Task ID: ${taskId}\n`);

  // 第二步：轮询任务状态
  console.log('[2] 开始轮询任务状态...');
  let attempts = 0;
  const maxAttempts = 120; // 最多6分钟

  while (attempts < maxAttempts) {
    await new Promise(r => setTimeout(r, 3000));
    attempts++;

    const getRes = await fetch(`${BASE_URL}/contents/generations/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ARK_API_KEY}`,
      },
    });

    const getText = await getRes.text();
    let getResult;
    try {
      getResult = JSON.parse(getText);
    } catch (e) {
      console.log(`[2] 第${attempts}次轮询 - 响应解析失败: ${getText.slice(0, 200)}`);
      continue;
    }

    const status = getResult.status;
    console.log(`[2] 第${attempts}次轮询 - 状态: ${status}`);

    if (status === 'succeeded') {
      console.log('\n========== 视频生成成功! ==========');
      console.log('完整响应:', JSON.stringify(getResult, null, 2));

      // 尝试提取视频URL
      if (getResult.content && Array.isArray(getResult.content)) {
        for (const item of getResult.content) {
          if (item.type === 'video_url' && item.video_url?.url) {
            console.log(`\n视频URL: ${item.video_url.url}`);
          }
          if (item.type === 'video' && item.video?.url) {
            console.log(`\n视频URL: ${item.video.url}`);
          }
        }
      }
      if (getResult.output) {
        console.log('\nOutput:', JSON.stringify(getResult.output, null, 2));
      }
      return;
    }

    if (status === 'failed') {
      console.log('\n========== 视频生成失败 ==========');
      console.log('完整响应:', JSON.stringify(getResult, null, 2));
      return;
    }
  }

  console.log('\n========== 超时 ==========');
}

main().catch(console.error);
