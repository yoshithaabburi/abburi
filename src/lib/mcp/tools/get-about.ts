import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_about",
  title: "About Yoshitha",
  description:
    "Return Yoshitha Abburi's bio, tagline, skills, and public contact info.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            name: "Yoshitha Abburi",
            location: "Bengaluru, India",
            tagline:
              "Creating digital experiences where technology meets imagination.",
            roles: ["Developer", "Designer", "Creator"],
            focus: "AI-native products, interfaces and experiments.",
            skills: [
              "React", "Next.js", "TanStack", "TypeScript", "Tailwind",
              "Framer Motion", "Three.js", "Node.js", "Python",
              "PostgreSQL", "LangChain", "OpenAI",
            ],
            contact: {
              email: "yoshithaabburi6666@gmail.com",
              phone: "8019324776",
              linkedin: "https://www.linkedin.com/in/yoshithaabburi",
              github: "https://github.com/yoshithaabburi",
            },
          },
          null,
          2,
        ),
      },
    ],
  }),
});