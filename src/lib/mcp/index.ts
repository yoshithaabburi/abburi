import { defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import getAboutTool from "./tools/get-about";
import submitContactTool from "./tools/submit-contact";

export default defineMcp({
  name: "yoshitha-portfolio-mcp",
  title: "Yoshitha Abburi Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for Yoshitha Abburi's portfolio command center. Use `get_about` for bio/contact, `list_projects` for the live project registry, and `submit_contact` to send her a message.",
  tools: [getAboutTool, listProjectsTool, submitContactTool],
});