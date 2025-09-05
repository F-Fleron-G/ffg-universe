import React, { useEffect, useMemo, useRef, useState } from "react";
import { Mail, Instagram, Github } from "lucide-react";
import PageHead from "./components/PageHead";

interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

const MENU: MenuItem[] = [
  { label: "Author", href: "/author", external: true },
  { label: "Artist", href: "/artist", external: true },
  { label: "Software Engineer", href: "https://github.com/F-Fleron-G", external: true},
];

function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatch(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);
  return match;
}

export default function App() {
  const [showTip, setShowTip] = useState(false);

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");

  return (

     <>
    <PageHead
      title="Home – Frederic G. Fleron Grignard"
      description="Official website of Frederic G. Fleron Grignard – software engineer, author, and artist."
      iconHref="/favicon.ico"
    />

    <div className="min-h-screen bg-black text-slate-100 flex flex-col items-center justify-between px-6 pt-6 pb-6 gap-6 md:gap-10 relative overflow-hidden">
      {/* Keyframes */}
      <style>{`
        @keyframes drift { from { transform: translateY(0); } to { transform: translateY(100vh); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      {/* Universe background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 38%, rgba(120,150,255,0.08), transparent 60%)" }} />
        <StarField count={140} />
        <ShootingStars />
      </div>

      {/* INTRO (typewriter) */}
      <section className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 text-center min-h-[140px] md:min-h-[150px] overflow-hidden">
        <h1 className="font-heading tracking-wide text-sky-300/60 text-3xl md:text-4xl mb-4">
          Hi, I'm Frederic G. Fleron Grignard
        </h1>
        <TypewriterParagraph
          text={
            "Welcome to my Universe — a hand‑built space where you can explore my work."
          }
        />
      </section>

      {/* HERO */}
      <section className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-8">
        
        {/* Info icon  */}
        <button
          type="button"
          aria-label="How to use"
          onClick={() => setShowTip((v) => !v)}
          className="absolute top-3 left-3 z-20 h-8 w-8 rounded-full border border-sky-400/25 bg-white/5 backdrop-blur text-slate-100 flex items-center justify-center hover:border-sky-300/60 hover:bg-white/10 transition"
        >
          <span className="text-sm font-semibold">i</span>
        </button>

        {/* Popover */}
        {showTip && (
          <div
            role="dialog"
            aria-modal="false"
            className="absolute top-12 left-3 z-20 max-w-xs rounded-xl border border-white/15 bg-black/80 text-slate-100 p-3 text-sm shadow-lg backdrop-blur flex flex-col"  // ← added flex flex-col
          >
              Tip: the labels orbiting my portrait are clickable — tap one to dive in. 
              <button
            onClick={() => setShowTip(false)}
            className="mt-2 self-end text-xs text-sky-300/60 hover:text-slate-100"
          >
            Got it
          </button>
          </div>
        )}

        <div className="relative mx-auto aspect-square w-full max-w-xl">
          {/* 3D orbit */}
          <Orbit3D
            items={MENU}
            radius={isMobile ? 110 : isTablet ? 150 : 200}
            speedDegPerSec={20}
            centerOffsetPct={{ x: 50, y: 30 }}
            center={
            <div className="relative aspect-square w-[19rem] sm:w-[21rem] md:w-[25rem] lg:w-[29rem] xl:w-[32rem]">
              {/* Faint orbit ring */}
              <div 
                className="absolute -inset-1 rounded-full border border-sky-400/25 pointer-events-none"
                style={{ zIndex: 10 }}
              />
              <div
                className="relative rounded-full overflow-hidden border border-white/10 w-full h-full"
                style={{ boxShadow: "0 0 70px rgba(255,255,255,0.08)" }}
              >
                <picture>
                  <img src="/me-1024px.png"
                  srcSet="/me-512px.png 512w, /me-768px.png 768w, /me-1024px.png 1024w"
                  sizes="(min-width: 1280px) 32rem,
                        (min-width: 1024px) 29rem,
                        (min-width: 768px) 25rem,
                        (min-width: 640px) 21rem,
                        19rem"
                  alt="Portrait" className="h-full w-full object-cover"
                  width={1024}
                  height={1024}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
              </div>
            </div>
          }
          />
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 text-sm text-sky-300/60">
      <div className="flex w-full flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-4 text-center md:text-left">
        
        <div className="space-y-1">
          <div>© {new Date().getFullYear()} Frederic G. Fleron Grignard</div>
          <div>All rights reserved</div>
        </div>
       
          <div className="flex space-x-6 mt-2 md:mt-0">
            <a
              href="mailto:fleron.frederic@gmail.com?subject=Hello from FFG Universe&body=Hi Frederic,"
              className="text-sky-300/60 hover:text-slate-200 transition"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/fleronverse" target="_blank" rel="noreferrer" className="text-sky-300/60 hover:text-slate-200 transition" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://github.com/F-Fleron-G" target="_blank" rel="noreferrer" className="text-sky-300/60 hover:text-slate-200 transition" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
     </>
  );
}


// ---------- Tiny components ----------
function TypewriterParagraph({ text, speed = 50 }: { text: string; speed?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i < text.length) {
      const id = setTimeout(() => setI(i + 1), speed);
      return () => clearTimeout(id);
    }
  }, [i, text, speed]);

  const visible = text.slice(0, i);
  const parts = visible.split("\n\n");

  return (
    <div className="text-center md:text-center leading-relaxed whitespace-pre-line">
      {parts.map((p, idx) => (
        <p key={idx} className={idx === 0 ? "text-lg md:text-xl" : "mt-4 text-slate-300"}>
          {p}
          {idx === parts.length - 1 && i < text.length && (
            <span className="border-r border-white/70 ml-0.5" style={{ animation: "blink 1s step-end infinite" }} />
          )}
        </p>
      ))}
    </div>
  );
}

function StarField({ count = 120 }: { count?: number }) {
  const stars = useMemo(() => {
    const arr = [] as { left: number; top: number; size: number; opacity: number; delay: number; dur: number }[];
    for (let i = 0; i < count; i++) {
      arr.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        opacity: Math.random() * 0.6 + 0.4,
        delay: -Math.random() * 60,
        dur: 60 + Math.random() * 60,
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            filter: "blur(0.2px)",
            animation: `drift ${s.dur}s linear infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function ShootingStars() {
  const [stars, setStars] = useState<{ id: number; left: number; top: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setStars((prev) => [
        ...prev,
        { id, left: Math.random() * 100, top: Math.random() * 40 },
      ]);
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== id));
      }, 2000); // fade after 2s
    }, 15000); // every 15s

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute h-0.5 w-24 bg-gradient-to-l from-white to-transparent"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            transform: "rotate(20deg)",
            animation: "shoot 2s linear forwards",
          }}
        />
      ))}
      <style>{`
        @keyframes shoot {
          from { transform: translateX(0) rotate(20deg); opacity: 1; }
          to { transform: translateX(300px) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </>
  );
}

function Orbit3D({
  items,
  radius = 160,
  speedDegPerSec = 18,
  center,
  centerOffsetPct = { x: 50, y: 50 },
}: {
  items: MenuItem[];
  radius?: number;
  speedDegPerSec?: number;
  center: React.ReactNode;
  centerOffsetPct?: { x: number; y: number };
}) {
  const [deg, setDeg] = useState(0);
  const raf = useRef<number | null>(null);
  const last = useRef<number | null>(null);
  const step = 360 / Math.max(items.length, 1);

  useEffect(() => {
    const loop = (ts: number) => {
      if (last.current == null) last.current = ts;
      const dt = (ts - last.current) / 1000;
      last.current = ts;
      setDeg((d) => (d + speedDegPerSec * dt) % 360);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [speedDegPerSec]);

  const { back, front } = useMemo(() => {
    const toRad = (a: number) => (a * Math.PI) / 180;
    const list = items.map((item, i) => {
      const aDeg = deg + i * step;
      const a = toRad(aDeg);
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * radius;
      const depth = (z + radius) / (2 * radius); // 0..1
      const scale = 0.8 + depth * 0.4;
      const opacity = 0.6 + depth * 0.4;
      const zIndex = 50 + Math.round(depth * 100);
      const style: React.CSSProperties = {
        position: "absolute",
        left: `${centerOffsetPct.x}%`,
        top: `${centerOffsetPct.y}%`,
        transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
        transformOrigin: "center",
        opacity,
        zIndex,
        transition: "opacity 150ms linear, transform 50ms linear",
        willChange: "transform, opacity",
      };
      return { item, z, style } as const;
    });
    return { back: list.filter((p) => p.z < 0), front: list.filter((p) => p.z >= 0) };
  }, [items, radius, step, deg, centerOffsetPct.x, centerOffsetPct.y]);

  return (
    <div className="absolute inset-0" style={{ perspective: 1000, transformStyle: "preserve-3d" }}>
      {/* Back half */}
      {back.map(({ item, style }) => (
        <a key={`back-${item.label}`} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="select-none" style={style}>
          <Badge label={item.label} translucent />
        </a>
      ))}

    {/* Portrait */}
    <div
      className="absolute"
      style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 100 }}
    >
      {center}
    </div>

      {/* Front half */}
      {front.map(({ item, style }) => (
        <a key={`front-${item.label}`} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="select-none" style={{ ...style, zIndex: Math.max((style.zIndex as number) ?? 0, 120) }}>
          <Badge label={item.label} />
        </a>
      ))}
    </div>
  );
}

function Badge({ label, translucent }: { label: string; translucent?: boolean }) {
  return (
    <span
      className={
        "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition transform " +
        (translucent
          ? "border-white/10 bg-slate-800/30"
          : "border-white/20 bg-slate-900/80 hover:scale-110 hover:border-sky-400 hover:bg-slate-900/90 shadow-md cursor-pointer")
      }
      style={{ backdropFilter: "blur(3px)" }}
    >
      {label}
    </span>
  );
}
