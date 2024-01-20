import { z } from "zod";
import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { type Persona, personaPrompts, personaSchema } from "@/lib/persona";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function chatCompletion(text: string, persona: Persona, similarity: number) {
  const prompt = personaPrompts[persona];
  const responseFormat = `{
    "status": <respond with PASS if the SIMILARITY >= ${similarity*100}%, and FAIL otherwise>,
    "comments": <An array of strings. Add comments for the intern here. Add in specific lines with errors and comments if any. This should only include review messages and nothing else>,
    "similarity": <SIMILARITY. This should be a number between 0 and 100.>
  }`
  
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        ${persona}.
        Respond in a JSON format, following closely to this response format: ${responseFormat}
        You check for SIMILARITY by comparing the intern's code and the sample answer.
        The Similarity Threshold is: ${similarity*100}%. Code is considered to PASS if SIMILARITY passes the Similarity Thereshold
        If SIMILARITY exceeds the Similarity Thereshold , your comments should follow the sample correct response format loosely, and follow the sample wrong response format loosely otherwise
        Your comments should suit the personality of the persona, but also get angrier and meaner the lower the similarity score
        The following prompt contains both the intern's code written in React, the sample answer, which is the intended answer, the context, as well as the sample response for correct and wrong answers
        Refer to the given context to tailor your response.
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
        similarity: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const { message, persona, similarity } = input;
      const completion = (await chatCompletion(message, persona, similarity)) ?? "";

      return {
        message: completion,
      };
    }),
});
