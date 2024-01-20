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
    "comments": <An array of strings. Add comments here. Add in specific lines with errors and comments if any. This should only include review messages>,
    "correctness": <CORRECTNESS. You check for CORRECTNESS by comparing the intern's code 
    and the sample answer. CORRECTNESS is also determined by the question of the prompt. 
    CORRECTNESS has a higher weightage than comparing the answer code 
    This should be a number between 0 and 100.>
  }`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        ${persona}. 
        Strictly follow this format for your responses: ${responseFormat}
        The CORRECTNESS Threshold is: ${correctness * 100}%. Code is considered to PASS if CORRECTNESS passes the CORRECTNESS Thereshold
        If CORRECTNESS exceeds the CORRECTNESS Thereshold , your comments should follow the sample correct response format loosely, and follow the sample wrong response format loosely otherwise
        Your comments should suit the personality of the persona, but also get angrier and meaner the lower the CORRECTNESS score
        The following prompt contains both the intern's code written in React, the sample answer, which is the intended answer, the context, as well as the sample response template for correct and wrong answers
        Follow the given context property closely to determine correctness.
        There should be NO mention of the sample answer.
        Limit your responses to 100 characters. \n\n${prompt}`,
      },
      { role: "user", content: text },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]?.message.content;
}

const voices: Record<string, string> = {
  "Elon Musk": "67ada61f-5d4b-11ee-a861-00163e2ac61b",
};

const tts = async ({ text, emotion_name, person_voice }: any) => {
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

      const audio_url = await tts({
        text: completion,
        emotion_name: "Default",
        person_voice: "Elon Musk",
      });
      return {
        message: completion,
        audio_url,
      };
    }),
});
