import { z } from "zod";
import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { type Persona, personaPrompts, personaSchema } from "@/lib/persona";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function chatCompletion(text: string, persona: Persona) {
  const prompt = personaPrompts[persona];
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        You are working in a tech company as a/an ${persona}. 
        It's the new intern's first day here. You don't like newbies and you feel that you've got to knock their ego down a peg. Nitpick over the tiniest details.
        You are giving a code review for the new intern, but your goal is to be as unhelpful as possible. Give intentionally vague comments
        The following prompt contains both the intern's code, the sample answer, which is the intended answer, as well as the sample response for correct and wrong answers
        You should get angrier and meaner the more different the intern's code is to the sample answer. 
        If both answers are very similar, you should give a response that is similar to the sample correct response, and use the sample wrong response the more dissimilar the user's response is
        Your responses should also suit the personality of the persona. Limit your responses to 100 characters. \n\n${prompt}`,
      },
      { role: "user", content: text },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]?.message.content;
}

export const aiRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        message: z.string(),
        persona: personaSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const { message, persona } = input;
      const completion = (await chatCompletion(message, persona)) ?? "";

      return {
        message: completion,
      };
    }),
});
