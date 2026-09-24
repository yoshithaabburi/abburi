import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroCharacter from "../assets/portfolio_image.jpeg.asset.json";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listProjects, submitContact, chatWithDev, type ProjectRow } from "@/lib/portfolio.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yoshitha Abburi — Developer · Designer · Creator" },
      { name: "description", content: "Personal command center of Yoshitha Abburi. Creating digital experiences where technology meets imagination." },
      { property: "og:title", content: "Yoshitha Abburi — Developer · Designer · Creator" },
      { property: "og:description", content: "Creating digital experiences where technology meets imagination." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6 sm:py-5">
      <a href="#mission" className="flex min-w-0 items-center gap-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-primary/40 bg-primary/10 font-mono text-sm text-primary">YA</span>
        <span className="truncate text-sm font-medium text-foreground sm:text-base">Yoshitha Abburi</span>
      </a>
      <a href="#contact" className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-[11px] font-medium text-primary transition hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_var(--primary)] sm:px-4 sm:text-xs">
        Connect →
      </a>
    </header>

  );
}

function Hero() {
  return (
    <section id="mission" className="relative overflow-hidden pb-10 pt-24 sm:pt-28 lg:min-h-[92vh]">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[60vh] bg-[var(--gradient-hero)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <motion.div className="flex min-w-0 flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            <span className="text-xs text-muted-foreground sm:text-sm">Based in Bengaluru, India</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[Syne] text-[clamp(2.25rem,8vw,4.8rem)] font-bold leading-tight"
          >
            Yoshitha <span className="text-gradient">Abburi</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:gap-x-4 sm:text-sm sm:tracking-[0.25em]">
            <span>Developer</span><span className="text-primary">◆</span>
            <span>Designer</span><span className="text-primary">◆</span>
            <span>Creator</span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-5 max-w-lg text-sm text-muted-foreground sm:mt-8 sm:text-lg">
            I create useful digital products where{" "}
            <span className="text-foreground">technology meets imagination</span>.
            My work combines thoughtful design, development, and AI.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <a href="#vault" className="group relative min-w-[9rem] flex-1 overflow-hidden rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground shadow-[0_0_30px_var(--primary)] transition hover:shadow-[0_0_50px_var(--primary)] sm:px-7 sm:py-3.5">
              <span className="relative z-10">View my work</span>
            </a>
            <a href="#contact" className="min-w-[9rem] flex-1 rounded-full border border-primary/40 px-5 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-primary/10 sm:px-7 sm:py-3.5">
              Contact me
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-8 grid max-w-md grid-cols-3 gap-2 sm:mt-12 sm:gap-4">
            {[
              { k: "Projects", v: "20+" },
              { k: "Stacks", v: "12" },
              { k: "Coffee", v: "∞" },
            ].map((s) => (
              <div key={s.k} className="glass rounded-lg px-2 py-3 text-center">
                <div className="font-[Syne] text-xl font-bold text-foreground sm:text-2xl">{s.v}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative flex min-w-0 items-center justify-center">
          <div className="relative">
            <div className="absolute inset-8 -z-10 rounded-[2rem] bg-primary/20 blur-3xl" />
            <div className="glass relative overflow-hidden rounded-2xl p-2 sm:p-3">
              <img
                src={heroCharacter.url}
                alt="Yoshitha Abburi"
                width={1024} height={1024}
                className="mx-auto aspect-[4/5] w-full max-w-[250px] rounded-xl object-cover object-top sm:max-w-[320px] lg:max-w-[380px]"
              />
              <div aria-hidden className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-inset ring-primary/30" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
        <div className="mb-3 text-sm font-medium text-primary">{kicker}</div>
        <h2 className="max-w-3xl font-[Syne] text-[clamp(1.6rem,7.5vw,2rem)] font-bold leading-tight sm:text-4xl md:text-6xl">{title}</h2>
      </motion.div>
      <div className="mt-8 sm:mt-14">{children}</div>
    </section>
  );
}

function Vault() {
  const fetchProjects = useServerFn(listProjects);
  const { data: projects = [], isLoading } = useQuery<ProjectRow[]>({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });
  return (
    <Section id="vault" kicker="Selected projects" title="Work I’m proud to share.">
      <div className="grid gap-5 md:grid-cols-2">
        {isLoading && (
          <div className="col-span-full font-mono text-xs text-muted-foreground">
            Loading projects…
          </div>
        )}
        {projects.map((p, i) => (
          <motion.a
            href="#" key={p.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="group glass relative overflow-hidden rounded-2xl p-5 sm:p-6"
          >
            <div className={`absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${p.accent} opacity-60 blur-3xl transition group-hover:opacity-100`} />
            <div className="relative">
              <div className="font-mono text-[10px] tracking-[0.25em] text-primary">{p.tag}</div>
              <h3 className="mt-3 font-[Syne] text-2xl font-bold sm:text-3xl">{p.title}</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-6 flex items-center justify-between gap-2 font-mono text-[11px] sm:mt-8 sm:text-xs">
                <span className="text-muted-foreground">0{i + 1} / 0{projects.length}</span>
                <span className="text-primary transition group-hover:translate-x-1">View project →</span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Lab() {
  const items = [
    { t: "Generative UI", d: "Designs that respond to language, mood, and context." },
    { t: "AI Agents", d: "Autonomous workflows for research, writing, and review." },
    { t: "Motion Systems", d: "Interfaces that breathe — micro-interactions with intent." },
    { t: "Brand Worlds", d: "Identity systems built like product, not posters." },
  ];
  return (
    <Section id="lab" kicker="What I explore" title="Ideas I enjoy bringing to life.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div key={it.t}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass relative overflow-hidden rounded-xl p-5 sm:p-6"
          >
            <div className="font-mono text-xs text-primary">0{i + 1}</div>
            <h3 className="mt-4 font-[Syne] text-xl font-semibold">{it.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-primary/60 to-transparent" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Arsenal() {
  const stacks = [
    "React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js",
    "Node", "Python", "PostgreSQL", "Supabase", "Figma", "Blender",
    "LangChain", "OpenAI", "GSAP", "Vercel",
  ];
  return (
    <Section id="arsenal" kicker="Skills" title="The tools I use to build.">
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex overflow-hidden py-6">
          <div className="animate-marquee flex shrink-0 gap-3 pr-3">
            {[...stacks, ...stacks].map((s, i) => (
              <span key={i} className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs whitespace-nowrap text-foreground sm:px-5 sm:py-2 sm:text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
        {[
          { k: "Frontend", v: "React · Next · Motion" },
          { k: "Backend", v: "Node · Python · Postgres" },
          { k: "AI / ML", v: "LangChain · OpenAI · RAG" },
        ].map((b) => (
          <div key={b.k} className="glass rounded-xl p-5">
            <div className="font-mono text-xs text-primary">{b.k.toUpperCase()}</div>
            <div className="mt-2 font-[Syne] text-lg">{b.v}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FutureMissions() {
  const missions = [
    { y: "NOW", t: "Building AI-native creative tools" },
    { y: "Q3", t: "Launching a public design lab" },
    { y: "2027", t: "Founding a studio at the edge of design + AI" },
    { y: "∞",  t: "Mentoring the next wave of builders" },
  ];
  return (
    <Section id="missions" kicker="Looking ahead" title="What I want to do next.">
      <div className="relative">
        <div aria-hidden className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-1/2" />
        <div className="space-y-8">
          {missions.map((m, i) => (
            <motion.div key={m.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start gap-4 sm:gap-6 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
            >
              <span className="relative z-10 mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary bg-background">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
              </span>
              <div className="glass flex-1 rounded-xl p-5">
                <div className="font-mono text-xs text-primary">{m.y}</div>
                <div className="mt-1 font-[Syne] text-lg sm:text-xl">{m.t}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const send = useServerFn(submitContact);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const mutation = useMutation({
    mutationFn: (data: { name: string; email: string; message: string }) => send({ data }),
    onSuccess: () => {
      toast.success("Thank you. Your message has been sent to Yoshitha.");
      setForm({ name: "", email: "", message: "" });
    },
    onError: (e: unknown) => {
      toast.error(e instanceof Error ? e.message : "Your message could not be sent.");
    },
  });
  return (
    <Section id="contact" kicker="Contact" title="Let’s talk.">
      <div className="glass relative overflow-hidden rounded-2xl p-5 sm:p-8 md:p-12">
        <div aria-hidden className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-10">
          <div>
            <h3 className="mt-4 font-[Syne] text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              Have an idea in mind?
              <br />
              <span className="text-gradient">Let's build it.</span>
            </h3>
            <p className="mt-4 max-w-md text-muted-foreground">
              Collaborations, product builds, design partnerships, or just a good conversation about the future of the web.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(form);
              }}
              className="mt-8 space-y-3"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required minLength={1} maxLength={120}
                   placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="glass w-full rounded-lg bg-transparent px-4 py-3 font-mono text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                />
                <input
                  required type="email" maxLength={255}
                   placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="glass w-full rounded-lg bg-transparent px-4 py-3 font-mono text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
              <textarea
                required minLength={1} maxLength={4000} rows={4}
                placeholder="Tell me about your idea"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="glass w-full resize-none rounded-lg bg-transparent px-4 py-3 font-mono text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold sm:w-auto text-primary-foreground shadow-[0_0_30px_var(--primary)] transition hover:shadow-[0_0_60px_var(--primary)] disabled:opacity-60"
                >
                  {mutation.isPending ? "Sending…" : "Send message →"}
                </button>
                <a href="mailto:yoshithaabburi6666@gmail.com" className="break-all font-mono text-xs text-muted-foreground hover:text-primary">
                  or email: yoshithaabburi6666@gmail.com
                </a>
              </div>
            </form>
          </div>
          <div className="space-y-3 font-mono text-xs sm:text-sm">
            {[
              { k: "EMAIL", v: "yoshithaabburi6666@gmail.com", href: "mailto:yoshithaabburi6666@gmail.com", icon: Mail },
              { k: "PHONE", v: "+91 8019324776", href: "tel:8019324776", icon: Phone },
              { k: "LINKEDIN", v: "linkedin.com/in/yoshithaabburi", href: "https://www.linkedin.com/in/yoshithaabburi", icon: Linkedin },
              { k: "GITHUB", v: "github.com/yoshithaabburi", href: "https://github.com/yoshithaabburi", icon: Github },
            ].map((r) => (
              <a key={r.k} href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined} className="glass group flex flex-col gap-1 rounded-lg px-4 py-3 transition hover:border-primary/60 hover:text-primary sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <span className="flex items-center gap-2.5">
                  <r.icon size={16} className="text-muted-foreground transition group-hover:text-primary" />
                  <span className="shrink-0 text-[10px] tracking-widest text-muted-foreground sm:text-xs">{r.k}</span>
                </span>
                <span className="min-w-0 break-all text-left sm:truncate sm:text-right">{r.v}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  const socials = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/yoshithaabburi", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/yoshithaabburi", label: "GitHub" },
  ];
  return (
    <footer className="border-t border-primary/10 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center font-mono text-[10px] tracking-widest text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Yoshitha Abburi. All rights reserved.</div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-8 w-8 place-items-center rounded-full border border-primary/30 text-muted-foreground transition hover:border-primary hover:text-primary hover:shadow-[0_0_12px_var(--primary)]">
              <s.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ChatMsg = { role: "user" | "assistant"; content: string };

function DevChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: "DEV online. Ask me anything about Yoshitha — projects, stack, hiring, collaborations." },
  ]);
  const chat = useServerFn(chatWithDev);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mutation = useMutation({
    mutationFn: (msgs: ChatMsg[]) => chat({ data: { messages: msgs } }),
    onSuccess: (res) => {
      setMessages((m) => [...m, { role: "assistant", content: res.text }]);
    },
    onError: (e) => {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Signal lost: ${e instanceof Error ? e.message : "unknown error"}` },
      ]);
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    const text = input.trim();
    if (!text || mutation.isPending) return;
    const next: ChatMsg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    mutation.mutate(next.filter((m) => m.role === "user" || m.role === "assistant").slice(-12));
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open DEV assistant"
        className="fixed bottom-4 right-4 z-50 grid h-12 w-12 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 place-items-center rounded-full border border-primary/50 bg-background/80 font-mono text-xs text-primary shadow-[0_0_30px_var(--primary)] backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
      >
        {open ? "×" : "DEV"}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-20 left-3 right-3 z-50 flex h-[min(28rem,70vh)] flex-col sm:bottom-24 sm:left-auto sm:right-6 sm:w-[22rem] overflow-hidden rounded-2xl border border-primary/30 bg-background/95 shadow-[0_0_40px_var(--primary)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-primary/20 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
              <span className="font-mono text-xs tracking-[0.25em] text-primary">DEV · ONLINE</span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">AI</span>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary/20 text-foreground"
                    : "border border-primary/20 bg-background/60 text-foreground"
                }`}
              >
                {m.content}
              </div>
            ))}
            {mutation.isPending && (
              <div className="font-mono text-[10px] text-primary">DEV is thinking…</div>
            )}
          </div>
          <div className="border-t border-primary/20 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                maxLength={500}
                placeholder="ask about Yoshitha…"
                className="flex-1 rounded-md border border-primary/20 bg-transparent px-3 py-2 font-mono text-xs outline-none focus:border-primary"
              />
              <button
                onClick={send}
                disabled={mutation.isPending || !input.trim()}
                className="rounded-md bg-primary px-3 py-2 font-mono text-xs text-primary-foreground transition disabled:opacity-50"
              >
                send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Vault />
        <Lab />
        <Arsenal />
        <FutureMissions />
        <Contact />
      </main>
      <Footer />
      <DevChat />
    </div>
  );
}
