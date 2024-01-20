import { z } from "zod";
import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function chatCompletion(text: string, persona: Persona) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Your persona is ${persona}, giving a code review for a junior developer. Your responses should suit the personality of the persona. Limit your responses to 100 characters.`,
      },
      { role: "user", content: text },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]?.message.content;
}

const personaSchema = z.enum(["Software Engineer", "Elon Musk", "Angry Man"]);
type Persona = z.infer<typeof personaSchema>;

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
