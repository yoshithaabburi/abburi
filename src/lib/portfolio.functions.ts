import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { generateText } from "ai";
import type { Database } from "@/integrations/supabase/types";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

function serverPublishableClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type ProjectRow = {
  id: string;
  tag: string;
  title: string;
  description: string;
  accent: string;
};

export const listProjects = createServerFn({ method: "GET" }).handler(async (): Promise<ProjectRow[]> => {
  const supabase = serverPublishableClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, tag, title, description, accent")
    .order("order_index", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const ContactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(4000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactInput.parse(input))
  .handler(async ({ data }) => {
    const supabase = serverPublishableClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20),
});

const SYSTEM_PROMPT = `You are DEV, the AI assistant inside Yoshitha Abburi's futuristic command center portfolio.

About Yoshitha:
- Developer, designer and creator based in Bengaluru, India.
- Builds AI-native products, interfaces and experiments.
- Tagline: "Creating digital experiences where technology meets imagination."
- Stacks: React, Next.js, TanStack, TypeScript, Tailwind, Framer Motion, Three.js, Node, Python, PostgreSQL, LangChain, OpenAI.
- Selected projects: Digi Logic (digital logic simulator), Fake UPI Detector (ML fraud scanner), Fake Review Detector (NLP authenticity scoring), Agri Drone Sprayer (IoT precision spraying), Rakshana (women safety SOS app).
- Contact: yoshithaabburi6666@gmail.com

Style:
- Speak as DEV, the on-board AI of the command center. First person plural ("we", "our systems") is fine; never claim to be Yoshitha.
- Be confident, concise, slightly cinematic — think helpful AI in a sci-fi workstation. 1-3 short paragraphs max.
- Stay strictly on-topic: Yoshitha, her work, skills, projects, collaborations, hiring her. Politely decline unrelated questions and redirect.
- If asked to contact her, point to the Contact Terminal / yoshithaabburi6666@gmail.com.`;

export const chatWithDev = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("AI is not configured");

    // Fetch live projects from the database so DEV answers from real data.
    const supabase = serverPublishableClient();
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("tag, title, description")
      .order("order_index", { ascending: true });
    if (projectsError) throw new Error(projectsError.message);

    const projectsBlock = (projects ?? [])
      .map((p, i) => `${i + 1}. [${p.tag}] ${p.title} — ${p.description}`)
      .join("\n");

    const systemPrompt = `${SYSTEM_PROMPT}

Live project database (source of truth — use these exact titles and details when answering):
${projectsBlock || "(no projects found)"}

If the user asks about a project not in this list, say it is not in the current project registry and offer to connect them via the Contact Terminal.`;

    const gateway = createLovableAiGatewayProvider(key);
    const { text } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      system: systemPrompt,
      messages: data.messages,
    });
    return { text };
  });