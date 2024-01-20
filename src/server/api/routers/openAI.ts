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
    "status": <Add in whether the user passed the similarity test (PASS OR FAIL)>,
    "comments": <Add in your comments here, specifically, add in specific lines with errors and comments if any> 
  }`
  
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        You are working in a tech company. ${persona}.
        Respond in a JSON format, following the following response format: ${responseFormat}
        The following prompt contains both the intern's code, the sample answer, which is the intended answer, the context, as well as the sample response for correct and wrong answers
        You are to determine the similarity of the intern's code to the sample answer, and respond with PASS if the similarity passes the SIMILARITY thereshold of ${similarity*100}%, and FAIL otherwise.
        Refer to the context to customise your response
        You should get angrier and meaner the more different the intern's code is to the sample answer.
        If both answers are very similar, you should give a response that is similar to the sample correct response, and use the sample wrong response the more dissimilar the user's response is
        Your responses should also suit the personality of the persona. 
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
