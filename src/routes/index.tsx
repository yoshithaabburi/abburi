import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroCharacter from "../assets/hero-character.png";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listProjects, submitContact, chatWithNova, type ProjectRow } from "@/lib/portfolio.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yoshitha Abburi — Developer · Designer · Creator" },
      { name: "description", content: "Personal command center of Yoshitha Abburi. Creating digital experiences where technology meets imagination." },
      { property: "og:title", content: "Yoshitha Abburi — Developer · Designer · Creator" },
      { property: "og:description", content: "Creating digital experiences where technology meets imagination." },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "mission", label: "Mission Control" },
  { id: "vault", label: "Project Vault" },
  { id: "lab", label: "Creative Lab" },
  { id: "arsenal", label: "Digital Arsenal" },
  { id: "missions", label: "Future Missions" },
  { id: "contact", label: "Contact Terminal" },
];

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 16); y.set(e.clientY - 16); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full border border-primary/70 mix-blend-screen md:block"
    >
      <div className="absolute inset-[10px] rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
    </motion.div>
  );
}

function Particles() {
  const dots = Array.from({ length: 28 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i * 0.7) % 8;
        const dur = 8 + ((i * 13) % 10);
        const size = 1 + (i % 3);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/60"
            style={{
              left: `${left}%`,
              width: size, height: size,
              boxShadow: "0 0 8px var(--primary)",
              animation: `digital-rain ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function Loader({ done }: { done: () => void }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        const n = p + Math.random() * 18;
        if (n >= 100) { clearInterval(id); setTimeout(done, 400); return 100; }
        return n;
      });
    }, 120);
    return () => clearInterval(id);
  }, [done]);
  return (
    <motion.div
      initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
    >
      <div className="font-mono text-xs tracking-[0.3em] text-primary">INITIALIZING_COMMAND_CENTER</div>
      <div className="mt-6 h-px w-64 overflow-hidden bg-primary/20">
        <motion.div className="h-full bg-primary shadow-[0_0_20px_var(--primary)]" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 font-mono text-[10px] text-muted-foreground">{Math.floor(pct)}% · loading subsystems</div>
    </motion.div>
  );
}

function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <a href="#mission" className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-md border border-primary/40 bg-primary/10 font-mono text-sm text-primary">YA</span>
        <span className="hidden font-mono text-xs tracking-widest text-muted-foreground sm:block">YOSHITHA.SYS</span>
      </a>
      <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-primary/15 hover:text-foreground">
            {n.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_var(--primary)]">
        Connect →
      </a>
    </header>
  );
}

function TypingLine({ text }: { text: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => setI(i + 1), 40);
      return () => clearTimeout(t);
    }
  }, [i, text]);
  return (
    <span className="font-mono text-sm text-primary">
      {text.slice(0, i)}<span className="animate-blink">▍</span>
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yChar = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const tilt = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 80, damping: 18 });
  const sry = useSpring(ry, { stiffness: 80, damping: 18 });
  const onMove = (e: React.MouseEvent) => {
    const el = tilt.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8); rx.set(-py * 8);
  };

  return (
    <section id="mission" ref={ref} className="relative min-h-screen overflow-hidden pt-28">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[60vh] bg-[var(--gradient-hero)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <motion.div style={{ opacity }} className="flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">SYSTEM ONLINE · BENGALURU, IN</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[Syne] text-6xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]"
          >
            YOSHITHA
            <br />
            <span className="text-gradient">ABBURI</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            <span>Developer</span><span className="text-primary">◆</span>
            <span>Designer</span><span className="text-primary">◆</span>
            <span>Creator</span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-8 max-w-lg text-lg text-muted-foreground">
            Creating digital experiences where{" "}
            <span className="text-foreground">technology meets imagination</span>.
            I build products, design interfaces, and experiment with AI from my own command center.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-6 glass inline-flex w-fit items-center gap-3 rounded-md px-4 py-2.5">
            <span className="font-mono text-xs text-muted-foreground">$</span>
            <TypingLine text="boot --identity yoshitha.abburi --mode=creator" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="mt-10 flex flex-wrap gap-4">
            <a href="#vault" className="group relative overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_var(--primary)] transition hover:shadow-[0_0_50px_var(--primary)]">
              <span className="relative z-10">Enter the Vault</span>
            </a>
            <a href="#contact" className="rounded-full border border-primary/40 px-7 py-3.5 text-sm font-semibold text-foreground transition hover:bg-primary/10">
              Open Terminal
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-12 grid max-w-md grid-cols-3 gap-4">
            {[
              { k: "Projects", v: "20+" },
              { k: "Stacks", v: "12" },
              { k: "Coffee", v: "∞" },
            ].map((s) => (
              <div key={s.k} className="glass rounded-lg px-3 py-3 text-center">
                <div className="font-[Syne] text-2xl font-bold text-foreground">{s.v}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          ref={tilt}
          onMouseMove={onMove}
          onMouseLeave={() => { rx.set(0); ry.set(0); }}
          style={{ y: yChar, perspective: 1200 }}
          className="relative flex items-center justify-center"
        >
          <motion.div style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }} className="relative">
            <motion.div className="animate-pulse-glow absolute inset-6 -z-10 rounded-[2rem] bg-primary/40 blur-3xl" />
            <div className="glass animate-float relative overflow-hidden rounded-[2rem] p-3">
              <img
                src={heroCharacter}
                alt="Yoshitha Abburi — futuristic developer command center"
                width={1024} height={1024}
                className="h-auto w-full max-w-[520px] rounded-[1.5rem] object-cover"
              />
              <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[1.5rem] ring-1 ring-inset ring-primary/30" />
            </div>

            {/* Floating HUD chips */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
              className="glass absolute -left-6 top-12 hidden rounded-lg px-3 py-2 font-mono text-[10px] text-primary md:block">
              ◉ uptime: 99.9%
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
              className="glass absolute -right-4 top-28 hidden rounded-lg px-3 py-2 font-mono text-[10px] text-foreground md:block">
              <div className="text-muted-foreground">deploying…</div>
              <div className="text-primary">build #142 ✓</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
              className="glass absolute -bottom-4 left-10 hidden rounded-lg px-3 py-2 font-mono text-[10px] md:block">
              <span className="text-muted-foreground">status: </span><span className="text-primary">CREATING</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
        SCROLL ↓ TO ENTER
      </div>
    </section>
  );
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
        <div className="mb-3 font-mono text-xs tracking-[0.3em] text-primary">// {kicker}</div>
        <h2 className="max-w-3xl font-[Syne] text-4xl font-bold leading-tight md:text-6xl">{title}</h2>
      </motion.div>
      <div className="mt-14">{children}</div>
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
    <Section id="vault" kicker="02 / PROJECT VAULT" title="Selected builds from the lab.">
      <div className="grid gap-5 md:grid-cols-2">
        {isLoading && (
          <div className="col-span-full font-mono text-xs text-muted-foreground">
            // fetching project vault from command center…
          </div>
        )}
        {projects.map((p, i) => (
          <motion.a
            href="#" key={p.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="group glass relative overflow-hidden rounded-2xl p-6"
          >
            <div className={`absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${p.accent} opacity-60 blur-3xl transition group-hover:opacity-100`} />
            <div className="relative">
              <div className="font-mono text-[10px] tracking-[0.25em] text-primary">{p.tag}</div>
              <h3 className="mt-3 font-[Syne] text-3xl font-bold">{p.title}</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-8 flex items-center justify-between font-mono text-xs">
                <span className="text-muted-foreground">0{i + 1} / 0{projects.length}</span>
                <span className="text-primary transition group-hover:translate-x-1">view module →</span>
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
    <Section id="lab" kicker="03 / CREATIVE LAB" title="Where ideas get prototyped at 3 AM.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div key={it.t}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass relative overflow-hidden rounded-xl p-6"
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
    <Section id="arsenal" kicker="04 / DIGITAL ARSENAL" title="The toolkit on my workstation.">
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex overflow-hidden py-6">
          <div className="animate-marquee flex shrink-0 gap-3 pr-3">
            {[...stacks, ...stacks].map((s, i) => (
              <span key={i} className="rounded-full border border-primary/30 bg-primary/5 px-5 py-2 font-mono text-sm text-foreground whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
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
    <Section id="missions" kicker="05 / FUTURE MISSIONS" title="Where this command center is headed.">
      <div className="relative">
        <div aria-hidden className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-1/2" />
        <div className="space-y-8">
          {missions.map((m, i) => (
            <motion.div key={m.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start gap-6 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
            >
              <span className="relative z-10 mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary bg-background">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
              </span>
              <div className="glass flex-1 rounded-xl p-5">
                <div className="font-mono text-xs text-primary">{m.y}</div>
                <div className="mt-1 font-[Syne] text-xl">{m.t}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" kicker="06 / CONTACT TERMINAL" title="Open a channel.">
      <div className="glass relative overflow-hidden rounded-2xl p-8 md:p-12">
        <div aria-hidden className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="font-mono text-xs text-primary">{">"} initiating handshake…</div>
            <h3 className="mt-4 font-[Syne] text-3xl font-bold leading-tight md:text-4xl">
              Got an idea worth shipping?
              <br />
              <span className="text-gradient">Let's build it.</span>
            </h3>
            <p className="mt-4 max-w-md text-muted-foreground">
              Collaborations, product builds, design partnerships, or just a good conversation about the future of the web.
            </p>
            <a href="mailto:yoshithaabburi6666@gmail.com" className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_var(--primary)] transition hover:shadow-[0_0_60px_var(--primary)]">
              yoshithaabburi6666@gmail.com →
            </a>
          </div>
          <div className="space-y-3 font-mono text-sm">
            {[
              { k: "EMAIL", v: "yoshithaabburi6666@gmail.com" },
              { k: "LINKEDIN", v: "/in/yoshitha-abburi" },
              { k: "GITHUB", v: "@yoshitha" },
              { k: "TWITTER", v: "@yoshithabuilds" },
              { k: "DRIBBBLE", v: "/yoshitha" },
            ].map((r) => (
              <a key={r.k} href="#" className="glass flex items-center justify-between rounded-lg px-4 py-3 transition hover:border-primary/60 hover:text-primary">
                <span className="text-xs tracking-widest text-muted-foreground">{r.k}</span>
                <span>{r.v}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-primary/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 font-mono text-[10px] tracking-widest text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} YOSHITHA.ABBURI · ALL SIGNALS RESERVED</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          SYSTEM STATUS: ONLINE
        </div>
      </div>
    </footer>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative min-h-screen">
      {loading && <Loader done={() => setLoading(false)} />}
      <CustomCursor />
      <Particles />
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
    </div>
  );
}
