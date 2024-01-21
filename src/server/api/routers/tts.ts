import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";

const voices: Record<string, string> = {
  "Donald Trump": "67aef070-5d4b-11ee-a861-00163e2ac61b",
  "Elon Musk": "67ada61f-5d4b-11ee-a861-00163e2ac61b",
  "Taylor Swift": "67ae4751-5d4b-11ee-a861-00163e2ac61b",
};

export const ttsRouter = createTRPCRouter({
  convert: publicProcedure
    .input(
      z.object({
        text: z.string(),
        emotion_name: z.string(),
        person_voice: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { text, emotion_name, person_voice } = input;

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
      console.log(response.data);
      return response.data.data.oss_url;
    }),
});
