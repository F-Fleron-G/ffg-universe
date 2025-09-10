import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Home, X, AlertTriangle, ChevronLeft, ChevronRight, Palette, BookOpen } from "lucide-react";
import PageHead from "./components/PageHead";

type TabId = "meditation" | "self" | "living" | "books";
type TabDef = { id: TabId; label: string; iconSrc: string; alt: string };

const TABS: TabDef[] = [
  { id: "meditation", label: "Meditation",        iconSrc: "/spiritual/icons/Meditation.svg",         alt: "Meditation" },
  { id: "self",       label: "Self-Awareness",    iconSrc: "/spiritual/icons/Awareness.svg",          alt: "Self-Awareness" },
  { id: "living",     label: "Art of Living",     iconSrc: "/spiritual/icons/Art-Of-Living.svg",      alt: "Art of Living" },
  { id: "books",      label: "Recommended Books", iconSrc: "/spiritual/icons/Recommended-Books.svg",  alt: "Recommended Books" },
];

const ORDER: TabId[] = ["self", "meditation", "living", "books"];
const nextOf = (id: TabId) => ORDER[(ORDER.indexOf(id) + 1) % ORDER.length];
const prevOf = (id: TabId) => ORDER[(ORDER.indexOf(id) + ORDER.length - 1) % ORDER.length];

function useOrbit(degPerSec = 18) {
  const [deg, setDeg] = useState(0);
  const raf = useRef<number | null>(null);
  const last = useRef<number | null>(null);

  useEffect(() => {
    const tick = (t: number) => {
      if (last.current == null) last.current = t;
      const dt = (t - last.current) / 1000;
      last.current = t;
      setDeg(d => (d + degPerSec * dt) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [degPerSec]);

  return deg;
}

export default function SpiritualPage() {
  const [active, setActive] = useState<TabId | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const [menuOpen, setMenuOpen] = useState(false);

  const deg = useOrbit(18);

  useEffect(() => {
    const step = params.get("step") as TabId | null;
    if (step && TABS.some(t => t.id === step)) setActive(step);
  }, [params]);

  const openStep = (id: TabId) => {
    setActive(id);
    navigate({ pathname: location.pathname, search: `?step=${id}` }, { replace: false });
  };
  const closeStep = () => {
    setActive(null);
    navigate({ pathname: location.pathname, search: "" }, { replace: false });
  };

  const [showDisclosure, setShowDisclosure] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!showDisclosure) return;
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setShowDisclosure(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [showDisclosure]);

  return (
    <>
      <PageHead
        title="Spiritual Guide – Frederic G. Fleron Grignard"
        description="Reflections, meditation, and the art of living — personal spiritual guidance by Frederic."
        iconHref="/favicon.ico"
        ogImage="/og-spiritual.png"
      />

      <div id="top" className="spiritual min-h-screen bg-black text-[#ffffff85] overflow-x-hidden flex flex-col">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600&family=Source+Sans+3:wght@400;500;600&display=swap');

          .spiritual * { font-family: "Source Sans 3", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }
          .spiritual h1, .spiritual h2, .spiritual h3, .spiritual .headline {
            font-family: "Archivo Narrow", ui-sans-serif, system-ui, -apple-system;
            font-weight: 600; color: #a28e72;
          }
 
          /* ---------- Orbit ---------- */
          /* Fallback animations */
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes spin-reverse { to { transform: rotate(-360deg); } }

          @property --rot { syntax: '<angle>'; initial-value: 0deg; inherits: true; }
          @keyframes orbit { to { transform: rotate(360deg); --rot: 360deg; } }

          .ring {
            background: rgba(20,20,24,0.2);         
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 10px 40px rgba(0,0,0,0.55);
            --radius: 180px;
            --tw-ring-shadow: none;
            animation: orbit 28s linear infinite;
          }
          /* Pause whole ring on hover for easy clicking */
          /* .ring:hover { animation-play-state: paused; } */
 
          .ring-slot { 
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle)));
          }

          /* Fallback: counter-rotate via animation */
          .ring-item-inner { transform: rotate(calc(-1 * var(--rot))); }
          /* fallback: animate reverse if --rot doesn't update */
          .no-var-rot .ring-item-inner { animation: spin-reverse 28s linear infinite; }
          .ring:hover .ring-item-inner { animation-play-state: paused; }

          /* Prefer: cancel rotation precisely using --rot variable */
          @supports (property: --rot) {
            .ring-item-inner { animation: none; transform: rotate(calc(-1 * var(--rot))); }
          }

          .menu-circle {
            width:  clamp(56px, 9.2vw, 80px);
            height: clamp(56px, 9.2vw, 80px);
            border-radius: 9999px;
            overflow: hidden;         
            background: var(--orbit-bg);
            border: 1px solid var(--orbit-border);
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 40px rgba(0,0,0,0.55);
            transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease;
          }

          .menu-circle--sm {
            width: 40px;
            height: 40px;
          }

          .menu-circle:hover {
            transform: scale(1.04);
            background: var(--orbit-bg-hover);
            border-color: var(--orbit-border);
          }

          @media (max-width: 360px) {
            .menu-circle { width: 52px; height: 52px; }
          }
          /* @media (prefers-reduced-motion: reduce) {
            .ring, .ring-item-inner { animation: none !important; }
          } */
          
            .ring, .ring-item-inner { will-change: transform; }

          /* ---------- Modal (smoke / fade-down) ---------- */
          @keyframes fade-down {
            0%   { opacity: 0; transform: translateY(-12px); filter: blur(1px); }
            100% { opacity: 1; transform: translateY(0);     filter: blur(0); }
          }
          .smoke-panel {
            background: rgba(20,20,24,0.92);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 10px 40px rgba(0,0,0,0.55);

            -webkit-mask-image: linear-gradient(
              to bottom,
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,1) 88%,
              rgba(0,0,0,0.98) 94%,
              rgba(0,0,0,0.95) 100%
            );
            mask-image: linear-gradient(
              to bottom,
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,1) 88%,
              rgba(0,0,0,0.98) 94%,
              rgba(0,0,0,0.95) 100%
            );
          }

          :root {
            --modal-dur: 560ms;
            --overlay-dur: 360ms;
            --modal-ease: cubic-bezier(.16,1,.3,1);
            --orbit-bg: rgba(255, 255, 255, 0.45);
            --orbit-bg-hover: rgba(255,255,255,0.24);
            --orbit-border: rgba(255,255,255,0.08);
          }

          /* Backdrop fade */
          @keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }

          /* Panel entrance */
          @keyframes modal-in {
            0%   { opacity: 0; transform: translateY(8px) scale(0.992); }
            70%  { opacity: 1; transform: translateY(0)   scale(1.001); }
            100% { opacity: 1; transform: translateY(0)   scale(1.000); }
          }

          /* Gentle stagger */
          @keyframes child-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

          /* Utility classes */
          .animate-overlay-in { animation: overlay-in var(--overlay-dur) ease-out both; }
          .animate-modal-in   { animation: modal-in var(--modal-dur) var(--modal-ease) both; transform-origin: 50% 8%; will-change: transform, opacity; contain: paint; }
          .modal-child-in { animation: child-in 440ms var(--modal-ease) both; } 
          .modal-child-in.delay-1 { animation-delay: 140ms; } 
          .modal-child-in.delay-2 { animation-delay: 220ms; } 

          @media (prefers-reduced-motion: reduce) {
            .animate-overlay-in, .animate-modal-in, .modal-child-in { animation: none !important; }
          }

          /* ---------- Buttons (shared) ---------- */
          .btn-orbit {
            display: inline-grid;
            place-items: center;
            border-radius: 9999px;
            background: var(--orbit-bg);
            border: 1px solid var(--orbit-border);
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 40px rgba(0,0,0,0.55);
            transition: background-color 180ms ease, border-color 180ms ease;
          }
          .btn-orbit:hover {
            background: var(--orbit-bg-hover);
            border-color: var(--orbit-border);
          }
          /* fixed sizes so these don't inherit the orbit's clamp */
          .btn-orbit--xs { width: 36px; height: 36px; } /* close X */
          .btn-orbit--sm { width: 40px; height: 40px; } /* Home, footer, prev/next */


          /* Centered panel on desktop; full-width on small screens */
          .modal-panel {
            max-height: calc(100vh - 1.5rem);
            max-height: calc(100dvh - 1.5rem); /* ⬅ progressive enhancement */
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          @media (min-width: 640px) {
            .modal-panel {
              width: min(92vw, 52rem);
              max-width: 52rem;
              border-radius: 1rem;
              max-height: calc(100vh - 4rem);
              max-height: calc(100dvh - 4rem); /* ⬅ */
            }
          }

          @media (orientation: landscape) {
            .modal-panel {
              max-height: calc(100vh - 3rem);
              max-height: calc(100dvh - 3rem); /* ⬅ */
            }
          }
          
          .modal-open { overflow: hidden; }
          .modal-overlay { overscroll-behavior: contain; }
          .modal-scroll {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            flex: 1 1 auto;
            min-height: 0; 
            overscroll-behavior: contain;
            padding-bottom: max(16px, env(safe-area-inset-bottom));
          }
          .modal-scroll::after {
            /* final spacer so the very last line is never clipped */
            content: "";
            display: block;
            height: max(8px, env(safe-area-inset-bottom));
            flex: 0 0 auto;
          }
          
          .content-inner {
            max-width: 68ch;   /* comfy reading width */
            margin: 0 auto;    /* center the block */
            text-align: center;/* center the text */
          }
          
          .ph { /* simple placeholder visual */
            background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
            border: 1px solid rgba(255,255,255,0.10);
          }
        `}</style>


        {/* Top nav */}
        <header className="sticky top-0 z-50 bg-black/60 backdrop-blur relative">
          <a
            href="/"
            aria-label="Back to landing page"
            title="Back to landing page"
            className="hidden md:flex items-center justify-center h-10 w-10 rounded-full border border-white/20 hover:bg-white/10 transition absolute"
            style={{
              top: 12,
              right: 'calc((100vw - min(100vw, 72rem))/2 + 1rem)',
            }}
          >
            <Home className="h-5 w-5" />
          </a>

          <nav className="mx-auto max-w-6xl px-4 pt-3 pb-[2px] flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 select-none">
              <img
                src="/spiritual/content/FG-Atom-Logo.png"
                alt="FGF logo"
                className="h-10 md:h-[84px] w-auto"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>

            <ul className="hidden md:flex gap-6 self-end">
              {[
                { id: 'cycle',  label: 'Cycle' },
                { id: 'about',  label: 'Intro'  },
                { id: 'contact',label: 'Contact'},
              ].map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="
                      relative block pb-2 text-sm tracking-wide text-[#ffffff85]
                      after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:rounded-full after:bg-[#ffffff85]
                      after:origin-left after:scale-x-0 after:transition-transform after:duration-300
                      hover:after:scale-x-100 focus-visible:after:scale-x-100
                    "
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Menu burger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-white/20 hover:bg-white/10 text-[#ffffff85]"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </nav>

          {/* Mobile drawer */}
          {menuOpen && (
            <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
              <ul className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
                {[
                  { id: 'cycle',  label: 'Cycle' },
                  { id: 'about',  label: 'Intro'  },
                  { id: 'contact',label: 'Contact'},
                ].map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block py-2 text-sm text-[#ffffff85] hover:opacity-80"
                      onClick={() => setMenuOpen(false)}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}

                <li className="pt-2 mt-1 border-t border-white/10">
                  <Link
                    to="/"
                    className="flex items-center gap-2 py-2 text-sm text-[#ffffff85] hover:opacity-80"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Home className="h-6 w-6 p-1 rounded-full border border-white/20 hover:bg-white/10" />
                    <span>Home</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </header>

        {/* MAIN */}
        <main className="spiritual relative mx-auto max-w-6xl px-4 pt-14 md:pt-16 pb-28 md:pb-36 flex-1">
          <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(120,150,255,0.10), transparent 60%)" }} />

          {/* portrait + orbit */}
          <section id="cycle" className="relative mx-auto w-[min(86vw,560px)] aspect-square scroll-mt-24">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <img
                src="/spiritual/content/spiritual-frederic.png"
                alt="Frederic meditating in lotus pose"
                className="w-full h-full object-cover bg-[rgba(20,20,24,0.7)]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            </div>

            {/* orbit layer */}
            <Ring
              className="ring absolute inset-0 rounded-full z-50"
              style={{
                transform: `rotate(${deg}deg)`,
                ["--rot" as any]: `${deg}deg`, 
                animation: "none",
              }}
            >
              {TABS.map((t, idx) => (
                <RingItem key={t.id} index={idx} total={TABS.length} onClick={() => openStep(t.id)} ariaLabel={t.label}>
                  <span className="menu-circle">
                    <img src={t.iconSrc} alt={`${t.alt} icon`} className="h-full w-full object-contain" />
                  </span>
                </RingItem>
              ))}
            </Ring>
          </section>

          <section className="mt-10 md:mt-12 block text-center max-w-2xl mx-auto">
            <h3 className="uppercase tracking-wide">Start anywhere: it’s a cycle</h3>
            <p className="mt-2 leading-relaxed whitespace-pre-line">
              {"Self-Awareness, Meditation, the Art of Living, and the right Books continually feed each other.\nPick what calls you — you can’t start in the wrong place."}
            </p>
          </section>

          {/* Divider above ABOUT */}
            <div className="mx-auto max-w-6xl px-4 mt-12 md:mt-16">
              <div className="flex items-center justify-center">
                <span className="h-px flex-1 bg-white/10 rounded-full mr-3" />
                <span className="inline-flex items-center justify-center h-9 w-9 bg-black/30 backdrop-blur-sm">
                  <img src="/spiritual/icons/separator.svg" alt="Lotus" className="h-5 w-5 object-contain" />
                </span>
                <span className="h-px flex-1 bg-white/10 rounded-full ml-3" />
              </div>
            </div>

          {/* ABOUT Section */}
          <section id="about"
            className="relative mt-8 md:mt-10 min-h-[460px] md:min-h-[560px] scroll-mt-24"
          >
            <div className="relative z-10 mx-auto max-w-6xl px-0 py-10 md:py-14 text-neutral-900"></div>
            {/* Full-bleed background layer */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 right-1/2 -mx-[50vw] z-0">
              <picture>
                <source
                  srcSet="/spiritual/content/about-silhouette-640.webp"
                  media="(max-width: 640px)"
                />
                <source
                  srcSet="/spiritual/content/about-silhouette-1152.webp"
                  media="(max-width: 1152px)"
                />
                <img
                  src="/spiritual/content/about-silhouette-2304.webp"
                  alt="Silhouette walking on a winding path toward the horizon"
                  className="absolute inset-0 h-full w-full object-contain object-bottom translate-y-0 sm:translate-y-[-6%] md:translate-y-[-12%]"
                />
              </picture>

              <div className="absolute inset-0 bg-[#ffffff73]" aria-hidden />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 md:h-40 bg-gradient-to-b from-black via-black to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-40 bg-gradient-to-t from-black via-black to-transparent" />

            </div>

            {/* Content container */}
            <div className="relative z-10 mx-auto max-w-6xl px-0 py-12 md:py-20 text-neutral-900">
              <h2 className="text-2xl md:text-2xl font-semibold mb-3">
                About This Path
              </h2>

              <div className="leading-relaxed max-w-2xl mr-auto text-left space-y-3">
                <p className="mt-2 leading-relaxed whitespace-pre-line">
              {`Hi, I’m Frederic G. Fleron Grignard. Titles are one way to define ourselves, but if I had to choose, I’d rather be known as a trusting friend than a “spiritual guide.” What I share here isn’t easy to sum up with labels. It’s less about definitions and more about experience — a collection of simple practices, reflections, and resources that have helped me along the way.
                This space is where I offer my personal approach to self-awareness and meditation, along with a few books that deeply shaped my journey. None of them were ones I set out to buy; they found their way to me, each planting a small seed. Those seeds sparked my curiosity to look inward.
                When I first sat down to meditate, I quickly noticed how restless my mind was, always stirring up thoughts into unpredictable outcomes. With time, I learned to sit with that movement instead of fighting it. Looking back, I sometimes think I could have saved myself a few obstacles if I had started earlier — but I also know that wandering is part of the process.
                What I share here is simple and practical: self-awareness, gentle meditation, everyday practices, and books that can support anyone who feels drawn to explore the art of living.
              `}
                </p>
                {/* bottom spacer */}
                <div aria-hidden className="h-8 md:h-12" style={{ height: 'max(4.5rem, env(safe-area-inset-bottom))' }} />

              </div>
            </div>
          </section>

          <div className="relative mx-auto max-w-6xl px-4 mt-16 md:mt-24">
            {/* thin separator line */}
            <span className="block h-px bg-white/10 rounded-full" />

            {/* Back to top button */}
            <a
              href="#top"
              aria-label="Back to top"
              title="Back to top"
              className="
                absolute left-1/2 -translate-x-1/2
                -top-5 md:-top-6 z-20
                inline-flex items-center justify-center h-12 w-12 rounded-full
                bg-[#a28e72] text-[#171717] border-2 border-[#171717]
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a28e72]
              "
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 15l7-7 7 7" />
              </svg>
            </a>
          </div>

          {/* Footer / Contact */}
          <footer id="contact" className="mt-10 md:mt-14">
            <div className="mx-auto max-w-6xl px-0 pt-8 pb-6 grid gap-10 md:grid-cols-2 items-start">           
              <div>
                <h2 className="text-2xl mb-3">Reach Out</h2>
                <p className="opacity-90 mb-6 max-w-prose">
                  If you’re curious or simply seeking a nudge toward stillness — send me a note and I'll get back to you.
                </p>

                {/* Icons row + disclosure popover */}
                <div className="mt-4 mb-8 md:mb-12 relative" ref={popRef}>
                  <div className="flex items-center gap-3">
                    {/* Disclosure icon (opens pop-up) */}
                    <button
                      type="button"
                      aria-label="Important disclosure"
                      aria-expanded={showDisclosure}
                      onClick={() => setShowDisclosure(v => !v)}
                      className="btn-orbit btn-orbit--sm text-neutral-900"
                    >
                      <AlertTriangle className="h-5 w-5" />
                    </button>

                    {/* Artist link */}
                    <a
                      href="https://www.ffg-universe.com/artist"
                      target="_blank"
                      rel="noopener"
                      aria-label="Artist page"
                      className="btn-orbit btn-orbit--sm text-neutral-900"
                      title="Artist"
                    >
                      <Palette className="h-5 w-5" />
                    </a>

                    {/* Author link */}
                    <a
                      href="https://www.ffg-universe.com/author"
                      target="_blank"
                      rel="noopener"
                      aria-label="Author page"
                      className="btn-orbit btn-orbit--sm text-neutral-900"
                      title="Author"
                    >
                      <BookOpen className="h-5 w-5" />
                    </a>
                  </div>

                  {/* Small pop-up card */}
                  {showDisclosure && (
                    <div
                      role="dialog"
                      aria-label="Important disclosure"
                      className="smoke-panel absolute bottom-[120%] left-0 w-[min(90vw,36rem)] rounded-xl p-4 md:p-5 z-[60]"
                      style={{ animation: 'modal-in var(--modal-dur) var(--modal-ease) both' }}
                    >      
                      <button
                        type="button"
                        aria-label="Close disclosure"
                        onClick={() => setShowDisclosure(false)}
                        className="absolute right-2 top-2 inline-flex items-center justify-center h-8 w-8 rounded-full btn-orbit btn-orbit--xs text-neutral-900"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <h3 className="text-1xl mb-3">IMPORTANT PLEASE READ</h3>
                      <p className="text-sm leading-relaxed pr-8">
                        I am not a psychologist, psychiatrist, or medical doctor. If you need medical or mental-health
                        support, please consult a qualified professional. What I offer here is spiritual guidance drawn
                        from lived experience, study, and personal philosophy.
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-6 text-sm text-[#ffffff85] opacity-80">© {new Date().getFullYear()} Frederic G. Fleron Grignard | All rights reserved</div>
              </div>

              <form
                action="https://formsubmit.co/5fbe1cd6ca420026a59128ebbea6c656"
                method="POST"
                className="md:justify-self-end w-full max-w-md grid grid-cols-1 gap-3"
              >
                <input type="text" name="name" required className="rounded-md border-2 border-[#000000] bg-[#ffffff73] text-neutral-900 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a28e72] focus:border-[#a28e72] transition placeholder:text-neutral-900/60" placeholder="Your Name" />
                <input type="email" name="email" required autoComplete="email" className="rounded-md border-2 border-[#000000] bg-[#ffffff73] text-neutral-900 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a28e72] focus:border-[#a28e72] transition placeholder:text-neutral-900/60" placeholder="Your Email *" />
                <input type="text" name="subject" className="rounded-md border-2 border-[#000000] bg-[#ffffff73] text-neutral-900 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a28e72] focus:border-[#a28e72] transition placeholder:text-neutral-900/60" placeholder="Subject" />
                <textarea name="message" required className="rounded-md border-2 border-[#000000] bg-[#ffffff73] text-neutral-900 p-2 h-28 resize-y text-sm focus:outline-none focus:ring-1 focus:ring-[#a28e72] focus:border-[#a28e72] transition placeholder:text-neutral-900/60" placeholder="What would you like to share?" />
                <input type="hidden" name="_subject" value="New message from SPIRITUAL page" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://ffg-universe.com/spiritual#contact" />
                <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                <button
                  type="submit"
                  className="justify-self-start px-5 py-2 rounded-full bg-[#ffffff73] text-neutral-900
                            border-4 border-[#a28e72] hover:border-[#a28e72] border-transparent
                            hover:bg-[#ffffff92] transition-colors duration-200 text-sm 
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a28e72]"
                >
                  Send
                </button>
              </form>
            </div>
          </footer>
        </main>

        {/* MODALS */}
        <ContentModal
          open={active === "meditation"}
          onClose={closeStep}
          title="Meditation"
          topImageSrc="/spiritual/content/Meditation-Bg.png"
          topImageAlt="Meditation-Hands resiting in meditation"
          onPrev={() => openStep(prevOf("meditation"))}
          onNext={() => openStep(nextOf("meditation"))}
          stepText={`Part ${ORDER.indexOf("meditation")+1} of ${ORDER.length} • loops`}
        >
          <div className="space-y-4">
            <p>
              A short note on how I came to meditation. There was a period when life lost its shape. 
              I felt neither sad nor worried — just numb, yet strangely present. I sensed I needed 
              stillness but did not know where to begin. Without really seeking it, I found myself 
              at a ten-day silent Vipassana retreat.
            </p>
            <p>
              Vipassana meditation is a bit like rediscovering something we already know. 
              When we are stressed or anxious, we often pause and breathe. 
              Without realising it, we do the right thing — and Vipassana confirms that intuition. 
              This is where self-awareness joins in, because meditation and self-awareness always walk 
              hand in hand.
             </p>
             <p> 
              The practice begins with the breath, sharpening focus one layer at a time, like peeling an onion. 
              Once the mind feels settled, the attention expands and gently scans through the whole body. 
              With practice, our sense of presence becomes clearer, and we notice that the “auto-pilot” we often 
              live on can be switched off at will. That is when life begins to feel more vivid, more conscious, and 
              more fully lived.
            </p>
            <p> 
              And this is where meditation naturally flows into the {" "}
              <a
                href="#living"
                onClick={(e) => { e.preventDefault(); openStep("living"); }}
                className="text-[#a28e72] hover:underline decoration-current underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a28e72]"
              >
                Art of Living 
              </a> — carrying awareness into the choices that shape our daily lives.             
            </p>      
            </div>
        </ContentModal>

        <ContentModal
          open={active === "self"}
          onClose={closeStep}
          title="Self-Awareness"
          topImageSrc="/spiritual/content/Awareness-Bg.png"
          topImageAlt="Awareness – candle staring at its own reflection"
          onPrev={() => openStep(prevOf("self"))}
          onNext={() => openStep(nextOf("self"))}
          stepText={`Part ${ORDER.indexOf("self")+1} of ${ORDER.length} • loops`}
        >
          <div className="space-y-4 leading-relaxed">
            <p>
              Nowadays we hear so many terms pointing us back to ourselves — the power of
              attraction, vibrations, enlightenment, and the list goes on. Each one carries
              a simple truth: if we were not alive to witness it, none of this would exist
              for us. We are the awareness that makes life real.
            </p>
            <p>
              Manifesting is a popular topic at the moment — picturing our dream home,
              partner, or lifestyle, and trying to “feel it” into being. But if you’ve tried
              this, you may have noticed it does not always work as we expect, and that can
              feel disappointing. The truth is, it is not wrong — it is simply easier than it
              seems. The key lies in how we approach it.
            </p>
            <p>
              Imagination is powerful, and if visualising helps spark joy or good feelings,
              then by all means use it. But the real magic is in catching the present moment —
              those flashes of goodness, that quiet essence of simply being alive. When you
              notice that and hold it a little longer, you begin to see the first steps of
              self-awareness taking shape.”
            </p>              
            <p> 
              When you are ready to deepen this, head over to the {" "}
              <a
                href="#meditation"
                onClick={(e) => { e.preventDefault(); openStep("meditation"); }}
                className="text-[#a28e72] hover:underline decoration-current underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a28e72]"
              >
                Meditation 
              </a> section.             
            </p>                  
          </div>
        </ContentModal>

        <ContentModal
          open={active === "living"}
          onClose={closeStep}
          title="Art of Living"
          topImageSrc="/spiritual/content/AOL-Bg.png"
          topImageAlt="Art of Living-Ladybird on a stick"
          onPrev={() => openStep(prevOf("living"))}
          onNext={() => openStep(nextOf("living"))}
          stepText={`Part ${ORDER.indexOf("living")+1} of ${ORDER.length} • loops`}
        >
          <div className="space-y-4 leading-relaxed">
            <p>
              The art of living can take many forms, but one thing is certain: it ought to feel joyful. 
              From my own experience, life was never meant to be heavy or negative — it was designed 
              to flow from a positive spark. Anything that works begins this way, and life is no 
              different. Our story is simply how we learn to keep that spark alive.
            </p>

            <p>
              To live well, we first get to know ourselves. If we feel unsatisfied, unhappy, or restless, 
              it is rarely solved by changing how we look or what we own. Instead, the real work is 
              within. Through meditation and focused awareness we learn to sit with ourselves, to see 
              beyond definitions, judgements, and appearances. What remains is simple: the natural state 
              we all once knew — pure, uncomplicated, and happy.
            </p>
            <p>
              If this stirs your curiosity, explore the{" "}
              <a
                href="#books"
                onClick={(e) => { e.preventDefault(); openStep("books"); }}
                className="text-[#a28e72] hover:underline decoration-current underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a28e72]"
              >
                Recommended Books
              </a>
              — companions that have supported me along the way.
            </p>
          </div>
        </ContentModal>

        <ContentModal
          open={active === "books"}
          onClose={closeStep}
          title="Recommended Books"
          topImageSrc="/spiritual/content/Book-Bg.png"
          topImageAlt="Recommended books: Self-Awareness, Meditation, Art of Living."
          bottomImageSrc="/spiritual/content/Bottom-Book-Rec.png"
          bottomImageAlt="Stack of favourite books with soft light"
          onPrev={() => openStep(prevOf("books"))}
          onNext={() => openStep(nextOf("books"))}
          stepText={`Part ${ORDER.indexOf("books")+1} of ${ORDER.length} • loops`}
        >
          <div className="space-y-4 leading-relaxed">
          <p>Here are a few great books that have shaped my path:</p>

          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong className="text-[#a28e72]">The Alchemist</strong> by Paulo Coelho — A tale that reminds us everything we 
              seek is already close at hand, yet the journey outward is often what helps us realise it.
            </li>
            <li>
              <strong className="text-[#a28e72]">The Fear Project</strong> by Jaimal Yogis — A clear-eyed look at fear, showing 
              how it is often misunderstood or misused, and how we can return to fear as a form of 
              intuition rather than insecurity.
            </li>
            <li>
              <strong className="text-[#a28e72]">The Power of Now</strong> by Eckhart Tolle — A modern classic. It brings home 
              a simple truth: the past is gone, the future is not here, and life can only be lived now.
            </li>
            <li>
              <strong className="text-[#a28e72]">The Dao</strong> by Lao Tzu — Seemingly simple, yet endlessly deep. It 
              challenges the mind and, at the same time, invites us to let go of concepts and return 
              to what we are at the core.
            </li>
            <li>
              <strong className="text-[#a28e72]">Think and Grow Rich</strong> by Napoleon Hill — On the surface, it’s about 
              wealth. But beneath that, it reveals how what we manifest depends less on possessions 
              and more on clarity, self-awareness, presence, and joy.
            </li>
          </ol>

            <p> 
              Books like these are not ends in themselves, but openings — pointers back to your own 
              experience. And so, in the spirit of the cycle, they return us to where we began:  {" "}
              <a
                href="#self"
                onClick={(e) => { e.preventDefault(); openStep("self"); }}
                className="text-[#a28e72] hover:underline decoration-current underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a28e72]"
              >
                Self-Awareness 
              </a>.             
            </p>              
        </div>
        </ContentModal>
      </div>
    </>
  );
}

/* ---------- Orbit helpers ---------- */

function Ring(
  { className = "", style, children }: { className?: string; style?: CSSProperties; children: ReactNode }
) {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const btn = el.querySelector<HTMLElement>(".menu-circle");
      const btnSize = btn ? btn.getBoundingClientRect().width : 64;
      const gap = 10;
      const radiusPx = Math.min(rect.width, rect.height) / 2 - btnSize / 2 - gap;
      el.style.setProperty("--radius", `${Math.max(0, radiusPx)}px`);
    };

    const ro = new ResizeObserver(compute);
    ro.observe(el);
    compute();
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ringRef} className={className} style={style} aria-hidden={true}>
      {children}
    </div>
  );
}


function RingItem({
  index,
  total,
  onClick,
  ariaLabel,
  children,
}: {
  index: number;
  total: number;
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
}) {
  const angle = (index / total) * 360;
  return (
    <div className="ring-slot" style={{ ["--angle" as any]: `${angle}deg` }}>
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className="ring-item-inner outline-none rounded-full grid place-items-center"
      >
        {children}
      </button>
    </div>
  );
}

/* ---------- Modal: image → h2 → text ---------- */
function ContentModal({
  open,
  onClose,
  title,
  children,
  topImageSrc,
  topImageAlt,
  topImageLabel,
  bottomImageSrc,
  bottomImageAlt,
  bottomImageLabel,
  onPrev,
  onNext,
  stepText,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  topImageSrc?: string;
  topImageAlt?: string;
  topImageLabel?: string;
  bottomImageSrc?: string;
  bottomImageAlt?: string;
  bottomImageLabel?: string;
  onPrev?: () => void;
  onNext?: () => void;
  stepText?: string;  
}) {

  const titleId = `modal-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
      requestAnimationFrame(() => panelRef.current?.focus());
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [open]);

  useEffect(() => {
    try {
      const supported = CSS && "registerProperty" in CSS;
      if (!supported) document.documentElement.classList.add("no-var-rot");
    } catch {
      document.documentElement.classList.add("no-var-rot");
    }
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Escape") onClose();
  if (e.key === "ArrowRight" && onNext) onNext();
  if (e.key === "ArrowLeft" && onPrev) onPrev();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* backdrop */}
      <div className="modal-overlay absolute inset-0 bg-black/60 backdrop-blur-sm animate-overlay-in z-[40]" onClick={onClose} aria-hidden />
   
      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="smoke-panel modal-panel fixed inset-x-0 top-2 sm:top-6 bottom-2 sm:bottom-6 mx-auto p-0 text-[#ffffff85] animate-modal-in z-[50]"
      >
        {/* close */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex items-center justify-center h-9 w-9 rounded-full btn-orbit btn-orbit--xs text-neutral-900 z-[60]"
        >
          <X className="h-5 w-5" />
        </button>

        {/* content */}
        <div className="modal-scroll flex flex-col">
          {topImageSrc ? (
              <img
                src={topImageSrc}
                alt={topImageAlt ?? ""}
                className="w-full aspect-[16/9] object-cover modal-child-in"
              />
            ) : (
                <div className="ph aspect-[16/9] w-full grid place-items-center text-sm text-[#ffffff85] modal-child-in">
              <span className="opacity-80">{topImageLabel ?? "Add image 1280×720"}</span>
            </div>
          )}

          <div className="px-4 py-4 md:px-6 md:py-5 modal-child-in delay-1">
            <div className="content-inner">
              <h2 id={titleId} className="text-xl md:text-2xl font-semibold mb-3">{title}</h2>
              <div className="text-[#ffffff85] leading-relaxed space-y-3">{children}</div>
              <p className="mt-4 text-xs opacity-70">
              For important notes, tap the{" "}
              <span className="inline-flex align-middle"><AlertTriangle className="h-3.5 w-3.5 -mt-0.5" /></span>
              {" "}icon in the footer.
            </p>
            </div>
          </div>

          {bottomImageSrc ? (
            <img
              src={bottomImageSrc}
              alt={bottomImageAlt ?? ""}
              className="w-full aspect-[16/9] object-cover modal-child-in delay-2"
            />
          ) : bottomImageLabel ? (
            <div className="ph aspect-[16/9] w-full grid place-items-center text-sm text-[#ffffff85] modal-child-in delay-2">
              <span className="opacity-80">{bottomImageLabel}</span>
            </div>
          ) : null}
        </div>

        {(onPrev || onNext) && (
          <div className="flex items-center justify-between px-4 pb-3 pt-3 md:px-6 border-t border-white/10">
            <button
              type="button"
              aria-label="Previous"
              onClick={onPrev}
              disabled={!onPrev}
              className="inline-grid place-items-center h-10 w-10 rounded-full btn-orbit btn-orbit--xs text-neutral-900 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {stepText ? (
              <span className="text-xs opacity-70">{stepText}</span>
            ) : <span />}

            <button
              type="button"
              aria-label="Next"
              onClick={onNext}
              disabled={!onNext}
              className="inline-grid place-items-center h-10 w-10 rounded-full btn-orbit btn-orbit--xs text-neutral-900 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
