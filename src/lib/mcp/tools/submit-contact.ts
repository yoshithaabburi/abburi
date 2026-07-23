import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export default defineTool({
  name: "submit_contact",
  title: "Send contact message",
  description:
    "Send a message to Yoshitha through the portfolio's contact terminal. Use for introductions, collaboration or hiring inquiries.",
  inputSchema: {
    name: z.string().trim().min(1).max(120).describe("Sender's full name."),
    email: z.string().trim().email().max(255).describe("Sender's email address."),
    message: z.string().trim().min(1).max(4000).describe("Message body (max 4000 chars)."),
  },
  annotations: { readOnlyHint: false, openWorldHint: false },
  handler: async ({ name, email, message }) => {
    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: "Message delivered to the Contact Terminal." }],
      structuredContent: { ok: true },
    };
  },
});