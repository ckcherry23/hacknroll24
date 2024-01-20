import { z } from "zod";
import axios from "axios";
import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { type Persona, personaPrompts, personaSchema } from "@/lib/persona";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function chatCompletion(
  text: string,
  persona: Persona,
  correctness: number,
) {
  const prompt = personaPrompts[persona];
  const responseFormat = `{
    "status": <respond with PASS if the correctness of the intern's code passes the CORRECTNESS threshold of ${correctness * 100}%, and FAIL otherwise>,
    "comment": <Code review comment>
  }`

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        ${persona}.
        The following prompt contains both the intern's code written in React, the sample answer, which is the intended answer, the context, as well as the sample response for correct and wrong answers.
        ${prompt}.
        1) You check correctness similarity by comparing the intern's code and the sample answer. Correctness Threshold = ${correctness * 100}%.
        2) Code is good if similarity exceeds the Similarity Threshold. In this case, your comment should follow the sample correct response format loosely.
        3) If the similarity is lower than the Similarity Threshold, provide a brutal code review comment that suit the persona and become much harsher the lower the similarity score. 
        4) For code review comments, also add 2 rude hints that help the intern to fix their code.
        5) Limit your responses to 100 characters.
        6) Return in a proper JSON format, and absolutely nothing else: 
        ${responseFormat}
        `,
      },
      { role: "user", content: text },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log("content", completion.choices[0]?.message.content)
  return completion.choices[0]?.message.content;
}

const voices: Record<string, string> = {
  "Elon Musk": "67ada61f-5d4b-11ee-a861-00163e2ac61b",
};

type TTSProps = {
  text: string;
  emotion_name: string;
  person_voice: string;
};

const tts = async ({ text, emotion_name, person_voice }: TTSProps) => {
  const data = new FormData();
  data.append("isCancel", "true");
  data.append("accent", "English(US)");
  data.append("emotion_name", emotion_name);
  data.append("text", text);
  data.append("speed", "1");
  data.append("volume", "50");
  data.append("voice_id", voices[person_voice]!);
  data.append("article_title", "Unnamed");
  data.append("token", env.TTS_TOKEN);

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://tts-api.imyfone.com/v2/voice/tts",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language":
        "en-GB,en;q=0.9,en-US;q=0.8,zh-CN;q=0.7,zh;q=0.6,ms;q=0.5,zh-TW;q=0.4",
      Authorization: env.TTS_TOKEN,
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      Origin: "https://www.topmediai.com",
      Pragma: "no-cache",
      Referer: "https://www.topmediai.com/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
      "sec-ch-ua":
        '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      Cookie:
        "acw_tc=0bc1a98117057360155963553e7b8dfb406d65d92964b4c9914f5831a03c7c; route=1c81366973aa72da3e0fb079daefdf39|15e782a206e0755ba2ee29168ca11e3f",
    },
    data: data,
  };

  const response = await axios(config);
  return response.data.data.oss_url;
};

export const aiRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        message: z.string(),
        persona: personaSchema,
        correctness: z.number(),
      }),
    )
    .output(
      z.object({
        message: z.string(),
        audio_url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { message, persona, correctness: correctnessThreshold } = input;
      const completion =
        (await chatCompletion(message, persona, correctnessThreshold)) ?? "";

      let audio_url = "";
      // try {
      //   audio_url = await tts({
      //     text: completion,
      //     emotion_name: "Default",
      //     person_voice: "Elon Musk",
      //   });
      // } catch (err) {
      //   console.error("Something went wrong with the TTS", err);
      // }
      return {
        message: completion,
        audio_url,
      };
    }),
});
