import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// 1. 브라우저가 이 주소로 데이터를 보내면 실행됩니다.
export async function POST(req: Request) {
  // 2. 사용자가 보낸 대화 목록을 가져옵니다.
  const { messages } = await req.json();

  // 3. 구글 Gemini에게 대화를 요청합니다.
  const result = await streamText({
    model: google("gemini-1.5-flash"), // 무료 모델 사용
    messages,
    // 4. AI에게 '심리 분석가'라는 성격을 부여합니다. (가장 중요!)
    system: `너는 사용자의 답변을 통해 내면의 욕망이나 결핍을 분석하는 전문가야. 
    친절하지만 예리하게 질문해줘. 
    딱 3번의 대화가 끝나면 마지막에 반드시 [RESULT: 단어] 형식으로 사용자의 핵심 욕망을 한 단어로 요약해줘야 해.`,
  });

  // 5. AI의 답변을 실시간 스트리밍 형식으로 브라우저에 보내줍니다.
  return result.toTextStreamResponse();
}
