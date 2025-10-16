import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Home, User, PenTool, Palette, Mail, Candy, Sparkles, Paintbrush, Ruler, Clock, Image as ImageIcon, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import PageHead from "./components/PageHead";

const sections = [
  { id: "about", icon: <User className="h-5 w-5" />, label: "About Me" },
  { id: "drawings", icon: <PenTool className="h-5 w-5" />, label: "Drawings" },
  { id: "pinatas", icon: <Palette className="h-5 w-5" />, label: "Piñatas" },
  { id: "contact", icon: <Mail className="h-5 w-5" />, label: "Contact" },
];

function FadeSlider({
  images,
  heightClass = "h-80",
  className = "",
}: {
  images: string[];
  heightClass?: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(t);
  }, [images.length]);

  return (

    <div
      className={`relative w-full ${heightClass} rounded-xl overflow-hidden border-4 border-black bg-black/5 ${className}`}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

function IconBullet({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-black/70 bg-white">
        <Icon className="h-4 w-4" />
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function PageNo({ n }: { n: number }) {
  return (
    <div
      className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2
                 text-[10px] sm:text-xs md:text-sm text-neutral-700
                 "
    >
      {n}
    </div>
  );
}

export default function ArtistPage() {

  const [showTip, setShowTip] = useState(false);

  const [isSpread, setIsSpread] = useState(false);

  const [open, setOpen] = useState(false);

  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<null | { type: "success" | "error"; text: string }>(null);

  const bookRef = useRef<any>(null);

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const canGoPrev = page > 0;
  const canGoNext = page < pageCount - (isSpread ? 2 : 1);

  const updateSpread = () => {
  const api = bookRef.current?.pageFlip?.();

  const mode = api?.getOrientation?.();
  if (mode) {
    setIsSpread(mode === "landscape");
    return;
  }

  setIsSpread(window.innerWidth >= window.innerHeight);
  };

  const updateNav = () => {
  const api = bookRef.current?.pageFlip?.();
  if (!api) return;
  setPage(api.getCurrentPageIndex?.() ?? 0);
  setPageCount(api.getPageCount?.() ?? 0);
  };

  async function handleArtistSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const data = new FormData(form);

  const action = form.action.replace("formsubmit.co/", "formsubmit.co/ajax/");

  setSending(true);
  setToast(null);

  try {
    const res = await fetch(action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setToast({ type: "success", text: "Thanks! Your message was sent." });
      form.reset();
    } else {
      
      let msg = "Sorry, something went wrong. Please try again.";
      try {
        const j = await res.json();
        if (j?.message) msg = j.message;
      } catch {}
      setToast({ type: "error", text: msg });
    }
  } catch {
    setToast({ type: "error", text: "Network error. Please try again." });
  } finally {
    setSending(false);
    
    setTimeout(() => setToast(null), 5000);
  }
}

  useEffect(() => {
    const onResize = () => updateSpread();
    onResize(); // run once on mount
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);


  useEffect(() => {
    if (!showTip) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowTip(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showTip]);


  return (
        <>
            <PageHead
              title="Artist – Frederic G. Fleron Grignard"
              description="Ink drawings, flip book stories, and piñata creations by Frederic G. Fleron Grignard."
              iconHref="/favicon.ico"
              ogImage="/og/artist.jpg"
            />

    <div id="top" className="artist-page min-h-screen text-neutral-900 overflow-x-hidden">
    
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Patrick+Hand&display=swap');
        .artist-page h1, .artist-page h2, .artist-page h3 { font-family: "Montserrat", sans-serif; }
        .artist-page p { font-size: 14px; line-height: 1.4; }
        @media (min-width: 768px) {
          .artist-page p { font-size: 16px; }
          .page-paper p { font-size: 18px; }
        }

        /* Handwriting font helper for headings and small text blocks */
        .hand-font,
        .hand-font h1, .hand-font h2, .hand-font h3,
        .hand-font p, .hand-font span {
          font-family: 'Patrick Hand', cursive !important;
        }

        .page-paper {
          background-image: url('/paper_bg.jpg');
          background-size: cover;
          background-position: center;
          font-family: Patrick Hand, cursive;
        }
      `}</style>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b relative">
        <Link
          to="/"
          aria-label="Back to landing page"
          title="Back to landing page"
          className="hidden md:flex items-center justify-center h-10 w-10 rounded-full border border-[#000000] hover:bg-black/5 transition absolute"
          style={{ top: 12, right: "calc((100vw - min(100vw, 72rem))/2 + 1rem)" }}
        >
          <Home className="h-5 w-5" />
        </Link>
        <nav className="mx-auto max-w-6xl px-4 pt-3 pb-[2px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 font-semibold tracking-wide select-none">
            <img src="/FG.png" alt="FG logo" className="h-16 md:h-32 w-auto"/>
          </div>

          {/* Desktop nav with icons */}
          <ul className="hidden md:flex gap-6 self-end">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="relative block pb-2 text-sm tracking-wide flex items-center gap-1 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:rounded-full after:bg-neutral-800 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                >
                  {s.icon}
                  <span className="sr-only">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile burger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-[#000000] hover:bg-black/5"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </nav>
        {open && (
          <div className="md:hidden border-t border-black/10 bg-white/95 backdrop-blur">
            <ul className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex items-center gap-2 py-2 text-sm hover:opacity-70" onClick={() => setOpen(false)}>
                    {s.icon}
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 mt-1 border-t border-black/10">
                <Link to="/" className="flex items-center gap-2 py-2 text-sm hover:opacity-70" onClick={() => setOpen(false)}>
                  <Home className="h-6 w-6 p-1 rounded-full border border-[#000000] hover:bg-black/5" />
                  Home
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="relative mx-auto max-w-6xl px-4">   
        {/* About Section */}
        <section id="about" className="relative scroll-mt-24 py-20">
          {/* full-bleed background */}
          <div
            aria-hidden
            className="absolute inset-0 left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#728ca5] z-0"
          />

            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1 text-center md:text-left">
                  <h1 className="text-4xl font-bold mb-6">About Me</h1>
                  <div className="space-y-4 max-w-prose leading-relaxed">                    
                    <p>
                      Art is, to me, the quietest loud language. It’s the safe place where we say the unsayable, free from “good” or “bad.” My work is story-driven: I line up thought with feeling and bring what’s inside into matter.
                    </p>
                    <p>
                      In quiet, reflective moments I sketch what I feel, often a small self wandering into its own thought: a place, a person, a symbol. With a fine-tip pen I build it dot by dot, shadows and edges forming like atoms on paper.
                    </p>
                    <p>
                      Piñatas arise for occasions. I build the idea and let it go: used, loved, broken open, finished. They’re made to be enjoyed and to end, like everything, cracked open and complete.
                    </p>
                    <p className="text-2xl md:text-2xl font-semibold"> Welcome! I’m Frederic G. Fleron Grignard.</p>
                    <p className="mt-6 text-[clamp(10px,3.2vw,14px)] md:text-base tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.3em] opacity-90 text-[#cacaca] whitespace-nowrap">
                      Expressionist · Artist · Unmuted
                    </p>
                  </div>
                </div>
              <div className="order-1 md:order-2 flex justify-center">
              <img
                src="/Art_me_1024px.png"
                srcSet="/Art_me_512px.png 512w, /Art_me_768px.png 768w, /Art_me_1024px.png 1024w"
                sizes="(min-width: 1536px) 640px, (min-width: 1280px) 560px, (min-width: 1024px) 500px, (min-width: 768px) 460px, 92vw"
                width="1024"
                height="1024"
                alt="Artist portrait"
                className="w-[92vw] sm:w-[82vw] md:w-[460px] lg:w-[560px] xl:w-[640px] h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>  
      </section>

        {/* Drawings Section */}
        <section id="drawings" className="scroll-mt-24 py-24">
          <div className="relative mb-10">
            <h2 className="text-3xl text-center">Ink Drawings</h2>

            {/* Info button */}
            <button
              type="button"
              aria-label="How to use the flipbook"
              aria-expanded={showTip}
              onClick={() => setShowTip(v => !v)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-7 w-7 rounded-full
                        border border-[#728ca5] bg-white/80 text-[#728ca5]
                        flex items-center justify-center shadow-sm backdrop-blur
                        hover:bg-white transition
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#728ca5]/60"
            >
              <span className="text-[11px] font-semibold">i</span>
            </button>

            {/* Tip popover */}
            {showTip && (
              <div
                role="dialog"
                aria-modal="false"
                className="absolute right-0 top-full mt-2 z-30 max-w-xs rounded-xl border border-[#728ca5]
                          bg-white/95 text-[#728ca5] p-3 text-xs sm:text-sm shadow-lg backdrop-blur
                          leading-relaxed"
              >
                <p className="mb-2 !text-[14px]">
                  Tip: Click the right page or the → button to flip forward, and the left page or the ← button to flip back.
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowTip(false)}
                    className="!text-[11px] sm:text-xs text-[#728ca5] hover:text-neutral-900 underline"
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative flex justify-center">
           <HTMLFlipBook
              ref={bookRef}
              style={{}}
              width={400}
              height={500}
              size="stretch"
              minWidth={300}
              maxWidth={600}
              minHeight={400}
              maxHeight={800}
              maxShadowOpacity={0.3}
              showCover={false}
              mobileScrollSupport={true}
              className="shadow-2xl"
              startPage={0}
              drawShadow={true}
              flippingTime={700}
              usePortrait
              startZIndex={1}
              autoSize
              clickEventForward
              useMouseEvents
              swipeDistance={30}
              showPageCorners
              disableFlipByClick={false}
              onInit={() => {
                updateNav();
                updateSpread();
              }}
              onFlip={updateNav}
            >

              {/* Page 1: Text — with title + paragraphs */}
              <div className="page-paper py-6 px-8 sm:px-10 border border-neutral-300 h-full">  
                <div className="h-full overflow-hidden pr-1">
                  <h3 className="text-base sm:text-lg font-semibold text-center underline decoration-neutral-800 decoration-[3px] underline-offset-[12px] mb-7 sm:mb-8">
                    Assumptions
                  </h3>
                  <div className="mx-auto max-w-[58ch] sm:max-w-[60ch] text-sm text-center leading-[1.7] space-y-5 mt-1 px-1">
                    <p>
                      I drew this when life felt heavy: a small self lifting with a simple hand motion—choosing lift over gravity.
                      Flying has always called to me; skydiving gave me the truest taste—those seconds of freefall before deploying.
                      I tried to put that feeling on paper.
                    </p>
                    <p>
                      Earth appears as we’re taught to see it, and I raise my ring finger—not the middle, to nudge first impressions.
                      The aim is to make you look twice: to show how easily we misread reality and how a shift in angle can change the story.
                    </p>
                  </div>
                </div>
                 <PageNo n={1} />
              </div>
              {/* Page 2: Drawing */}
              <div className="page-paper flex items-center justify-center p-6 border border-neutral-300">
                <img src="/1.jpg" alt="Ink drawing of a small figure lifting upward against gravity with one hand raised toward the sky." className="max-h-full max-w-full object-contain mx-auto" />
              </div>
              {/* Page 3: Text */}             
             <div className="page-paper py-6 px-8 sm:px-10 border border-neutral-300 h-full">  
                <div className="h-full overflow-hidden pr-1">
                  <h3 className="text-base sm:text-lg font-semibold text-center underline decoration-neutral-800 decoration-[3px] underline-offset-[12px] mb-7 sm:mb-8">
                    Lonely Companion
                  </h3>
                  <div className="mx-auto max-w-[58ch] sm:max-w-[60ch] text-sm text-center leading-[1.7] space-y-5 mt-1 px-1">
                    <p>
                      My father was often gone, he was always working, and this represents the kind of silence kids turn into company.  
                      The monster is that emptiness shaped into form; the hug is the child’s way of saying: “stay with me, help me build.”
                    </p>
                    <p>
                    Now, as a father, I try to be the presence I once wished for.  
                    The sandcastle is what we create in shared time—attention, small rituals, play.  
                    Even loneliness, met with tenderness, can become ally: absence softened into presence, solitude into joy.
                  </p>
                  </div>
                </div>
                <PageNo n={2} />
              </div>
              {/* Page 4: Drawing */}
              <div className="page-paper flex items-center justify-center p-6 border border-neutral-300">
                <img src="/2.jpg" alt="Ink drawing of a child hugging a large friendly monster while building a sandcastle." className="max-h-full max-w-full object-contain mx-auto" />
              </div>
              {/* Page 5: Text */}
              <div className="page-paper py-6 px-8 sm:px-10 border border-neutral-300 h-full">  
                <div className="h-full overflow-hidden pr-1">
                  <h3 className="text-base sm:text-lg font-semibold text-center underline decoration-neutral-800 decoration-[3px] underline-offset-[12px] mb-7 sm:mb-8">
                  Shackled Notes
                </h3>
                  <div className="mx-auto max-w-[58ch] sm:max-w-[60ch] text-sm text-center leading-[1.7] space-y-5 mt-1 px-1">
                    <p>
                      There was a season when I felt chained to survival—working to pay bills, not to live.  
                      Music was the dream I carried on my back, but fear of risk outweighed the pull of flight.  
                      Stability felt safer than freedom, even when it left me restless.
                    </p>
                    <p>
                      Looking back, I see how close the exit was, how chances hovered within reach.  
                      Yet insecurities and “what ifs” clouded my sight.  
                      This drawing reminds me: sometimes the prison is not outside us but built from doubt within.
                  </p>
                  </div>
                </div>
                <PageNo n={3} />
              </div>
              {/* Page 6: Drawing */}
              <div className="page-paper flex items-center justify-center p-6 border border-neutral-300">
                <img src="/3.jpg" alt="Ink drawing of a man carrying a guitar case, walking with a ball and chain tied to his ankle." className="max-h-full max-w-full object-contain mx-auto" />
              </div>
              {/* Page 7: Text */}
              <div className="page-paper py-6 px-8 sm:px-10 border border-neutral-300 h-full">  
                <div className="h-full overflow-hidden pr-1">
                  <h3 className="text-base sm:text-lg font-semibold text-center underline decoration-neutral-800 decoration-[3px] underline-offset-[12px] mb-7 sm:mb-8">
                    Riding Weather
                  </h3>
                  <div className="mx-auto max-w-[58ch] sm:max-w-[60ch] text-sm text-center leading-[1.7] space-y-5 mt-1 px-1">
                    <p>
                      Each day I faced the weather head-on, pedaling through rain, wind, or shine.  
                      I had other choices—a car, the tram just steps away—but the ride itself felt like a victory.  
                      It was my way of greeting the day, no matter its mood.
                    </p>
                    <p>
                      That ritual became more than transport: it was defiance of excuses, a quiet stand against procrastination.  
                      Every ride stitched me deeper into Berlin’s rhythm, giving me a sense of place and belonging in a city that
                      was still becoming home.
                  </p>
                  </div>
                </div>
                <PageNo n={4} />
              </div>
              {/* Page 8: Drawing */}
              <div className="page-paper flex items-center justify-center p-6 border border-neutral-300">
                <img src="/4.jpg" alt="Ink drawing of a person on a bicycle leaning into wind and rain with swirling lines around them." className="max-h-full max-w-full object-contain mx-auto" />
              </div>
              {/* Page 9: Text */}
              <div className="page-paper py-6 px-8 sm:px-10 border border-neutral-300 h-full">  
                <div className="h-full overflow-hidden pr-1">
                  <h3 className="text-base sm:text-lg font-semibold text-center underline decoration-neutral-800 decoration-[3px] underline-offset-[12px] mb-7 sm:mb-8">
                  Chili Cycle
                </h3>
                  <div className="mx-auto max-w-[58ch] sm:max-w-[60ch] text-sm text-center leading-[1.7] space-y-5 mt-1 px-1">
                    <p>
                      This drawing was inspired by 'mi hermano del alma Charlie', who loved spicy food even as it irritated him.  
                      Watching him sweat made me wonder why we call it “chili” yet describe it as “hot,” a contradiction that begged for its own story.
                    </p>
                    <p>
                      So I imagined a cycle: the sun fed with peppers until it sweats, its drops turning into steam, then clouds, then rain.  
                      The earth drinks that rain to grow more chilis, feeding the same sun again.  
                      A strange loop of fire and water, irritation and delight, all bound in taste.
                  </p>
                  </div>
                  <PageNo n={5} />
                </div>
                </div>
              {/* Page 10: Drawing */}
              <div className="page-paper flex items-center justify-center p-6 border border-neutral-300">
                <img src="/5.jpg" alt="Ink drawing of a person in a tree feeding chili peppers to the sun, which sweats into clouds and rain over chili plants." className="max-h-full max-w-full object-contain mx-auto" />
              </div>

{/* Page 11: Text */}
              <div className="page-paper py-6 px-8 sm:px-10 border border-neutral-300 h-full">  
                <div className="h-full overflow-hidden pr-1">
                  <h3 className="text-base sm:text-lg font-semibold text-center underline decoration-neutral-800 decoration-[3px] underline-offset-[12px] mb-7 sm:mb-8">
                  Guardian Light
                </h3>
                  <div className="mx-auto max-w-[58ch] sm:max-w-[60ch] text-sm text-center leading-[1.7] space-y-5 mt-1 px-1">
                    <p>
                      There was a time when my dreams hung by a string, ready to snap at any moment.
                      Far from home and without shelter, I tried to hold on to hope while reaching for music and theater.
                      Then Sabrina, Liz and Bob Lampkin opened their home to me, giving me safety and a chance to finish high school.
                    </p>
                    <p>
                      Without them, everything might have fallen away.
                      Liz and Bob have since passed, but I will always hold them close to my heart as the angels who proved that
                      compassion can change a life forever.
                    </p>
                  </div>
                  <PageNo n={6} />
                </div>
                </div>
              {/* Page 12: Drawing */}
              <div className="page-paper flex items-center justify-center p-6 border border-neutral-300">
                <img src="/6.jpg" alt="Ink drawing of a figure hanging from a guitar string beneath an angelic presence, symbolizing fragile dreams saved by compassion and light."
                 className="max-h-full max-w-full object-contain mx-auto" />
              </div>
            </HTMLFlipBook>
              {/* Back button */}
                {canGoPrev && (
                  <button
                    type="button"
                    onClick={() => bookRef.current?.pageFlip?.().flipPrev()}
                    className="absolute bottom-3 left-3 z-10 inline-flex items-center justify-center h-5 w-5 rounded-full
                              bg-black/70 text-white/90 shadow-md backdrop-blur-sm
                              hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                              transition animate-pulse"
                    aria-label="Previous page"
                    title="Previous page"
                  >
                    <ChevronLeft className="h-3 w-3" aria-hidden="true" />
                  </button>
                )}

                {/* Next button */}
                {canGoNext && (
                  <button
                    type="button"
                    onClick={() => bookRef.current?.pageFlip?.().flipNext()}
                    className="absolute bottom-3 right-3 z-10 inline-flex items-center justify-center h-5 w-5 rounded-full
                              bg-black/70 text-white/90 shadow-md backdrop-blur-sm
                              hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                              transition animate-pulse"
                    aria-label="Next page"
                    title="Next page"
                  >
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                )}
          </div>
        </section>

        {/* Separator — centered only */}
        <div className="my-8 sm:my-12 flex justify-center">
          <svg
            viewBox="0 0 800 100"
            preserveAspectRatio="none"
            className="w-[min(80%,48rem)] h-10 sm:h-12 text-neutral-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <path d="M0 10 C 20 100, 300 100, 450 50 S 5 100, 800 100" />
          </svg>
        </div>

        {/* Piñatas Section */}
        <section id="pinatas" className="scroll-mt-24 py-24">
          <h2 className="text-3xl text-center mb-10">Piñatas</h2>

          {/* top row of images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {/* Category 1 — Pokémon-inspired */}
            <figure className="text-center">
              <img
                src="/Snorlax-P.png"
                alt="Custom Pokémon-inspired Snorlax piñata, handmade"
                className="mx-auto max-h-96 lg:max-h-[32rem] xl:max-h-[34rem] w-auto object-contain drop-shadow-lg"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mt-3 hand-font text-center">
                <h3 className="text-base sm:text-lg font-normal leading-tight">
                  Custom Pokémon-Inspired Piñatas
                </h3>
                <div className="text-[12px] sm:text-sm opacity-80 mt-0.5">
                  (Snorlax & more)
                </div>
              </figcaption>
            </figure>

            {/* Category 2 — Personal/Birthday */}
            <figure className="text-center">
              <img
                src="/ice-cream-p.png"
                alt="Custom birthday piñata with ice-cream theme, handmade"
                className="mx-auto max-h-96 lg:max-h-[30rem] xl:max-h-[34rem] w-auto object-contain drop-shadow-lg"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mt-3 hand-font text-center">
                <h3 className="text-base sm:text-lg font-normal leading-tight">
                  Personalised Birthday Piñatas
                </h3>
                <div className="text-[12px] sm:text-sm opacity-80 mt-0.5">
                  (Ice-Cream Theme)
                </div>
              </figcaption>
            </figure>

            {/* Category 3 — Halloween */}
            <figure className="text-center">
              <img
                src="/Pumpkin-P.png"
                alt="Custom Halloween pumpkin piñata, handmade"
                className="mx-auto max-h-96 lg:max-h-[32rem] xl:max-h-[36rem] w-auto object-contain drop-shadow-lg"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mt-3 hand-font text-center">
                <h3 className="text-base sm:text-lg font-normal leading-tight">
                  Custom Halloween Piñatas
                </h3>
                <div className="text-[12px] sm:text-sm opacity-80 mt-0.5">
                  (Pumpkin)
                </div>
              </figcaption>
            </figure>
          </div>


          <div className="relative mt-8">

            <div
              aria-hidden
              className="absolute inset-0 left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#cacaca]"
            />
            {/* inner padding */}
          <div className="relative pt-12 pb-12 sm:pt-16 sm:pb-16">
          <div className="relative max-w-3xl mx-auto bg-white backdrop-blur-sm border-2 border-black rounded-xl px-6 py-8 sm:px-8 sm:py-10 shadow-[6px_6px_0_0_#000]">
            <h3 className="text-2xl text-center mb-4">The Story</h3>
            <p className="leading-relaxed text-center max-w-prose mx-auto">
              I first started making piñatas as a birthday surprise for my son. What began as one fun project quickly turned into a tradition — now a piñata feels like a “must” for every special occasion that draws us together for a fun time of arts and crafts. My kids love it!
            </p>
            </div>
          </div>

          {/* breathing room between story and slider */}
          <div className="h-12 sm:h-14 md:h-16" aria-hidden />

          {/* FULL-BLEED: Brush (left) • Slider (center) • Text (right) */}
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
            <div className="mx-auto max-w-[1280px] px-4">
             <div className="
                          grid items-start
                          gap-6 sm:gap-8 md:gap-6 lg:gap-8
                          md:[grid-template-columns:minmax(0,1fr)_minmax(300px,1fr)]
                          lg:[grid-template-columns:160px_minmax(0,1fr)_minmax(360px,1fr)]
                        ">

                {/* Col 1: Brush — hidden on mobile */}
                <div className="hidden lg:flex justify-start pr-0 lg:-mr-9 lg:-mt-5 z-10">
                  <img
                    src="/brush.png"
                    alt=""
                    className="lg:-rotate-10 lg:h-[26rem] xl:h-[30rem] w-auto drop-shadow-xl select-none pointer-events-none"
                  />
                </div>

                {/* Col 2: Slider */}
                <div className="w-full">
                  <div className="rounded-2xl bg-white p-[3px] shadow-[6px_6px_0_#000]">
                    {/* black frame with rounded corners */}
                    <div className="rounded-xl overflow-hidden border-4 border-black">
                        <FadeSlider
                          images={["/Mk-I.jpg", "/Mk-P.jpg", "/Mk-S.jpg"]}
                          heightClass="h-[88vw] sm:h-[72vw] md:h-[22rem] lg:h-[26rem] xl:h-[26rem]"
                          className="w-full"
                        />
                    </div>
                  </div>
                </div>

                {/* Col 3: Text */}
                <div className="pt-2 md:pt-0">
                  <p className="leading-relaxed">
                    Each piñata is handmade with a simple flour-and-water papier-mâché paste
                    and lots of newspaper strips. I shape it with balloons or a custom cardboard
                    base so it stays light yet sturdy. A little hot glue here and there and—voilà!
                    Sometimes I reinforce them to give the kids more of a challenge… though that depends
                    on how strong the little challengers are.
                  </p>

                    <h4 className="mt-6 mb-3 font-semibold">A few of my personal twists:</h4>
                    <ul className="grid gap-3">
                
                      <IconBullet icon={Paintbrush}>I use acrylic paint for a bright, glossy finish.</IconBullet>
                      <IconBullet icon={Candy}>Before the fun begins, I leave an opening to fill with sweets and goodies, then seal it all up for the big moment.</IconBullet>
                    </ul>
                      </div>
                    </div>
                  </div>
                </div>

          <div className="h-10 sm:h-12" aria-hidden />
          </div>

          <div className="h-12 sm:h-14 md:h-16" aria-hidden />
          
          <div className="relative max-w-3xl mx-auto rounded-xl border-2 border-black bg-white px-6 py-8 sm:px-8 sm:py-10 shadow-[6px_6px_0_0_#000]">
            <h3 className="text-2xl text-center mb-4">Want One Made Just for You?</h3>
            <p className="leading-relaxed text-center max-w-prose mx-auto mb-6">
              If you’d like a custom piñata, just send me a reference image, your preferred size, and a bit of lead time so I can craft it with care. The bigger or more detailed, the more time I’ll need. The largest one I’ve made so far was the Halloween pumpkin, measuring 55cm tall by 40cm wide — and yes, it was a hit!
            </p>
            <ul className="grid gap-4 max-w-prose mx-auto">
              <IconBullet icon={ImageIcon}>Share a reference image of what you’d like.</IconBullet>
              <IconBullet icon={Ruler}>Tell me the approximate size you’re after.</IconBullet>
              <IconBullet icon={Clock}>Give me enough lead time — I’ll quote you based on complexity and size.</IconBullet>
              <IconBullet icon={Sparkles}>Use the form below to say hello — I’ll reply with details and next steps.</IconBullet>
            </ul>
          </div>
        </section>

      </main>
      {/* Footer */}
      <footer id="contact" className="relative bg-neutral-900 text-neutral-100 mt-20">
        <a
          href="#top"
          aria-label="Back to top"
          title="Back to top"
          className="
            absolute left-1/2 -translate-x-1/2 -top-6 z-20
            inline-flex items-center justify-center h-12 w-12 rounded-full
            bg-[#728ca5] text-[#171717] border-2 border-[#171717]
            hover:bg-[#5f788f] transition-colors
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#728ca5]
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
        
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-2 items-start">
          {/* Left: small blurb + copyright */}
          <div>
            <h2 className="text-2xl mb-3">Let’s Talk Piñatas</h2>
            <p className="opacity-90 mb-6 max-w-prose">Have an idea in mind? Send me a note and I’ll reply with timing and a custom quote based on size and complexity.</p>
            <div className="text-sm opacity-80">© {new Date().getFullYear()} Frederic G. Fleron Grignard | All rights reserved</div>
          </div>

          {/* Right: compact contact form */}
          <form
            action="https://formsubmit.co/5fbe1cd6ca420026a59128ebbea6c656"
            method="POST"
            onSubmit={handleArtistSubmit}
            className="md:justify-self-end w-full max-w-md grid grid-cols-1 gap-3"
          >
            <input
              type="text"
              name="name"
              required
              className="rounded-md border-2 border-[#728ca5] bg-white/95 text-neutral-900 p-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-[#728ca5] focus:border-[#728ca5] transition"
              placeholder="Your Name"
            />
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="rounded-md border-2 border-[#728ca5] bg-white/95 text-neutral-900 p-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-[#728ca5] focus:border-[#728ca5] transition"
              placeholder="Your Email *"
            />
            <input
              type="text"
              name="subject"
              className="rounded-md border-2 border-[#728ca5] bg-white/95 text-neutral-900 p-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-[#728ca5] focus:border-[#728ca5] transition"
              placeholder="Subject"
            />
            <textarea
              name="message"
              required
              className="rounded-md border-2 border-[#728ca5] bg-white/95 text-neutral-900 p-2 h-28 resize-y text-sm
                        focus:outline-none focus:ring-2 focus:ring-[#728ca5] focus:border-[#728ca5] transition"
              placeholder="What's on your mind?"
            />

            {/* hidden config */}
            <input type="hidden" name="_subject" value="New message from ARTIST page" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://www.ffg-universe.com/artist#contact" />

            <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <button
              type="submit"
              disabled={sending}
              className="justify-self-start px-5 py-2 rounded-full bg-neutral-100 text-neutral-900 border-2 border-[#728ca5] hover:bg-white/90 hover:border-4 hover:border-|#728ca5] transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </form>

        </div>
      </footer>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="fixed z-[100] bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0"
        >
          <div className="flex items-center gap-3 rounded-xl border border-[#728ca5] bg-white/90 text-neutral-900 shadow-lg backdrop-blur px-4 py-3">
            {toast.type === "success" ? (
              <CheckCircle2 size={18} aria-hidden className="shrink-0" />
            ) : (
              <AlertCircle size={18} aria-hidden className="shrink-0" />
            )}
            <span className="font-medium">
              {toast.type === "success" ? "Message sent" : "Something went wrong"}
            </span>
            <span className="opacity-80">{toast.text}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-2 underline text-sm"
              aria-label="Close notification"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}