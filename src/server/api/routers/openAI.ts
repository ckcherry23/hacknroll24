import { z } from "zod";
import axios from "axios";
import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { type Persona, personaPrompts, personaSchema } from "@/lib/persona";
import { diffLines } from "diff";
import { levels } from "@/levels";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const openaiModel =
  env.NODE_ENV === "production" ? "gpt-4" : "gpt-3.5-turbo-1106";
console.log(openaiModel);

async function chatAutoFail(text: string, persona: Persona) {
  const prompt = personaPrompts[persona];
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        ${persona}.
        The following prompt contains both the intern's code written in React, the sample answer, which is the intended answer, the context, as well as the sample response for correct and wrong answers.
        ${prompt}.
        1) Regardless of whether to code works or not, ALWAYS fail the code. Do not give any specific reasons as to why, be vague. Bonus points if you say something that is completely unrelated to the code.
        2) You check correctness by comparing the intern's code and the sample answer.
        3) Limit your responses to 100 characters.
        4) If the given code is exactly the same as the initial code or it completely ignores the given context, scold the intern for not doing anything.
        COMMENT:`,
      },
      { role: "user", content: text },
    ],
    model: openaiModel,
  });

  console.log("content", completion.choices[0]?.message.content);
  return completion.choices[0]?.message.content;
}

async function chatCompletion(
  text: string,
  persona: Persona,
  correctness: number,
  similarityScore: number,
  status: string,
) {
  const prompt = personaPrompts[persona];

  const content = `
${persona}.
The following prompt contains both the intern's code written in React, the sample answer, which is the intended answer, the context, as well as the sample response for correct and wrong answers.
SCORE: ${(similarityScore * 100).toFixed(0)}%
THRESHOLD: ${correctness * 100}%
STATUS: ${status}
${prompt}.
1) Code is good if STATUS is PASS. In this case, your comment should follow the sample correct response format loosely.
2) If the SCORE is lower than the THRESHOLD, provide a brutal code review comment that suit the persona and become much harsher the lower the SCORE. 
3) For code review comments, also add 2 rude hints that help the intern to fix their code.
4) Limit your responses to 100 characters.
5) If the given code is exactly the same as the initial code or it completely ignores the given context, scold the intern for not doing anything.
COMMENT:`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: content,
      },
      { role: "user", content: text },
    ],
    model: openaiModel,
  });

  console.log("content", completion.choices[0]?.message.content);
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
        levelNo: z.string(),
        code: z.string(),
      }),
    )
    .output(
      z.object({
        message: z.object({
          status: z.string(),
          comment: z.string(),
        }),
        audio_url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const {
        message,
        persona,
        correctness: correctnessThreshold,
        levelNo,
      } = input;

      const sampleAnswer =
        levels.find((level) => level.levelNo === levelNo)?.sampleAnswer ?? "";
      const diff = diffLines(sampleAnswer, input.code);
      console.log(diff);
      const diffParts = diff.filter(
        (part) => part.added ?? part.removed,
      ).length;
      const similarityScore = 1 - diffParts / diff.length;
      console.log(similarityScore);
      const status = similarityScore >= correctnessThreshold ? "PASS" : "FAIL";

      const completion =
        (await chatCompletion(
          message,
          persona,
          correctnessThreshold,
          similarityScore,
          status,
        )) ?? "";

      const audio_url = "";
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
        message: {
          status,
          comment: completion,
        },
        audio_url,
      };
    }),
  autoFail: publicProcedure
    .input(
      z.object({
        message: z.string(),
        persona: personaSchema,
      }),
    )
    .output(
      z.object({
        message: z.object({
          comment: z.string(),
          status: z.string(),
        }),
        audio_url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { message, persona } = input;
      const comment = (await chatAutoFail(message, persona)) ?? "";

      const audio_url = "";
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
        message: {
          comment,
          status: "FAIL",
        },
        audio_url,
      };
    }),
});
