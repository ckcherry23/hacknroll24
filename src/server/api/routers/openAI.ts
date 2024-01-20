import { z } from "zod";
import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { type Persona, personaPrompts, personaSchema } from "@/lib/persona";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function chatCompletion(text: string, persona: Persona, correctness: number) {
  const prompt = personaPrompts[persona];
  const responseFormat = `{
    "comments": <An array of strings. Add comments here. Add in specific lines with errors and comments if any. This should only include review messages>,
    "correctness": <CORRECTNESS. You check for CORRECTNESS by comparing the intern's code 
    and the sample answer. CORRECTNESS is also determined by the question of the prompt. 
    CORRECTNESS has a higher weightage than comparing the answer code 
    This should be a number between 0 and 100.>
  }`
  
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        ${persona}. 
        Strictly follow this format for your responses: ${responseFormat}
        The CORRECTNESS Threshold is: ${correctness*100}%. Code is considered to PASS if CORRECTNESS passes the CORRECTNESS Thereshold
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

export const aiRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        message: z.string(),
        persona: personaSchema,
        correctness: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const { message, persona, correctness: correctnessThreshold } = input;
      const completion = (await chatCompletion(message, persona, correctnessThreshold)) ?? "";

      return {
        message: completion,
      };
    }),
});
