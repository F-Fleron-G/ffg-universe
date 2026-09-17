import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  BookMarked,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import PageHead from "./components/PageHead";

type PageFlipApi = {
  flipPrev: () => void;
  flipNext: () => void;
  getCurrentPageIndex?: () => number;
  getPageCount?: () => number;
};

type FlipBookRef = {
  pageFlip?: () => PageFlipApi;
};

const VOID_WITHIN_POEM = `I can hear the world around me. I can see it. I can sense and feel all that I'm experiencing. But what if I turned off the volume? Turned off the lights? Made everything still? I can't see. I can't hear. I can't feel. But I sense—I am still here. Without an image, without a shape, without a voice—without any way to determine what I feel or how to judge—Then what am I really?`;

const LIGHT_IN_THE_VOID_POEM = `Could this be what God feels in eternal space? An endless void. No light. No sound. No sensation. Just presence. But if God created us so we could experience—so we could bring light to that darkness through our senses, our awareness, our life—then we are not separate from that void. We are the light breaking through it. Life itself is the illumination of what exists in eternal blackness. And that light, that consciousness, that's what makes everything real.`;

const THE_WITNESS_POEM = `I am consciousness, but only as the witness. I do not see the world—I see through my seeing. I do not hear existence—I hear through my hearing. Everything real is real because I am here to make it real. My life is my universe. My experience is the only experience I will ever truly know. But then I think of my wife, my children, the people I have loved and been loved by. They are real to me because I witness them. But if I am the only witness in my own consciousness—if I am the center of my own reality—then do they truly exist beyond my seeing? Or are they real only because I am here to see them?`;

const SHARED_EXISTENCE_POEM = `They exist because I witness them, but wait—I also exist because they witness me. My wife sees me. My children know me. The people I have loved have made me real through their awareness. I am not the only consciousness witnessing this world. I am one consciousness among billions, each at the center of their own universe, each making their world real. And yet we overlap. In the space where my witnessing meets their witnessing, in the moment where my eyes meet theirs, something extraordinary happens: consciousness recognizes itself in another consciousness. We are not alone. We are witnesses to each other. We are the mirrors in which the universe sees itself. We make each other real.`;

const EVOLUTION_AS_EXPERIMENT_POEM = `DNA is not inheritance—DNA is God's experiment. Each child is not a repeat. Each child is a new consciousness, a new perspective, a new way for existence to see itself. Your ancestors were not practicing for you. They were part of an endless chain of consciousness exploring itself. And you are not a copy—you are evolution. You are God waking up again in a new form, remembering nothing of what came before, believing everything is brand new. Perhaps forgetting is necessary. Perhaps the game is only beautiful because consciousness must hide from itself in order to find itself. Each life is a check mark in an infinite ledger. Each death is not an ending—it is an archive, one more possibility explored, one more flavor of experience added to eternity.`;

const ONE_THEORY_AMONG_INFINITE_OTHERS_POEM = `But maybe this is just one theory among infinite others. Maybe I am wrong. Maybe consciousness is not God exploring itself. Maybe existence is not a game of hide-and-seek. Maybe I am simply a human being constructing meaning from the void, finding patterns where none exist, creating stories to comfort myself in the face of incomprehensible reality. And that would be okay. Because if God is eternal, then eternity cannot be counted. If consciousness is infinite, then the theories about it must also be infinite. To all that is light, there is darkness. To all that is high, there is low. To all that is certain, there is doubt. Perhaps doubt is the only honest response to a mystery we were never meant to solve. So I do not claim truth—I only claim wonder. And I ask you: What do you think? What does your consciousness tell you? What light are you bringing to your own darkness? What witness are you becoming?`;

const sections = [
  { id: "about", label: "About Me" },
  { id: "new-release", label: "New Release" },
  { id: "release", label: "Debut Book" },
  { id: "books", label: "More Books" },
  { id: "contact", label: "Contact Me" },
];

const CTA =
  "btn-cta inline-flex items-center justify-center h-10 w-44 rounded-full bg-neutral-900 text-white border border-black/20 hover:bg-neutral-700 transition text-[14px] md:text-[13px] leading-none tracking-[0.02em]";

const ALIEN_IN_DISGUISE_REFLECTIONS = [
  {
    author: "Beau",
    quote:
      "“Not the next alien book — but one that explains humanity. A silent mirror. Humorous. Direct. And deeper than you'd initially think.”",
  },
  {
    author: "Alina Freund",
    quote: "“Fabulous!”",
  },
  {
    author: "Anonymous",
    quote:
      "“A memoir that makes you laugh — and then makes you think.”",
  },
];

const BEFORE_THE_REACTION_REFLECTIONS = [
  {
    author: "Marcus Chen",
    quote:
      "“A masterclass in psychological tension. You'd think a book about inner dialogue could be repetitive, but Grignard makes every conversation with yourself feel like a conversation with a stranger. Unsettling and brilliant.”",
  },
  {
    author: "Sophie Laurent",
    quote:
      "“That second voice in your head? The one that judges before you think? This book made me realize I'm not alone in it. Deeply personal without being self-indulgent. A mirror I didn't expect to see so clearly.”",
  },
  {
    author: "James Whitmore",
    quote:
      "“Consciousness explored through obsession. The moment the narrator meets Daniel Hale, you know something will break. Haunting. And you'll wonder about your own inner narrator long after finishing.”",
  },
];

const EL_ALIEN_DISFRAZADO_REFLECTIONS = [
  {
    author: "Isabel Rodríguez",
    quote:
      "“Un espejo perfecto para quien siempre se sintió diferente. Grignard captura lo que significa no encajar con precisión quirúrgica.”",
    rating: 5,
  },
  {
    author: "Diego Morales",
    quote:
      "“Divertido y profundo al mismo tiempo. Esperaba humor ligero, pero encontré observaciones que me hicieron pensar en lo absurdo de nuestras propias costumbres. El viaje de Blob es impactante.”",
    rating: 5,
  },
  {
    author: "Carmen Sánchez",
    quote:
      "“Como alguien que creció entre culturas, este libro es mi vida. Grignard entiende lo que significa ser el extraño, el que no encaja. Imprescindible.”",
    rating: 5,
  },
];

const HI_I_AM_DAD_REFLECTIONS = [
  {
    author: "Michael Torres",
    quote:
      "“A fresh take on the Ten Commandments. The forgiveness chapter especially hits. Not perfect, but honest.”",
    rating: 4,
  },
  {
    author: "Dr. Eleanor Walsh",
    quote:
      "“Strips away centuries of fear and gives you something radical: a parent who actually listens. Changed how I think about faith.”",
    rating: 5,
  },
  {
    author: "Ruth Abernathy",
    quote:
      "“Finally, a book that treats spirituality like a conversation instead of a lecture. Grignard's voice cuts through the noise. This is modern faith writing done right.”",
    rating: 5,
  },
];

function ReviewCard({
  quote,
  author,
  rating = 5,
}: {
  quote: string;
  author: string;
  rating?: number;
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-md border border-[#5b5a59]/30 bg-white/35 p-4 text-center">
      <p className="text-[12px] italic leading-5 text-neutral-900">{quote}</p>
      <div className="mt-3">
        <div className="text-[11px] tracking-[0.18em] uppercase text-neutral-900/70">
          {author}
        </div>
        <div className="text-[11px] tracking-[0.18em] text-neutral-900/80">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>
      </div>
    </div>
  );
}

function ReaderReflectionsStrip({
  reviews,
  alwaysCarousel = false,
  theme = "light",
}: {
  reviews: { author: string; quote: string; rating?: number }[];
  alwaysCarousel?: boolean;
  theme?: "light" | "dark";
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="mt-8">
      <p
        className={`mb-3 text-center text-[11px] tracking-[0.22em] uppercase ${
          theme === "dark" ? "text-[#c4c3c0]/80" : "text-[#2f2e2c]/70"
        }`}
      >
        Reader Reflections
      </p>

      {/* One-at-a-time carousel (mobile only, unless alwaysCarousel) */}
      <div
        className={`flex items-center gap-2 ${alwaysCarousel ? "" : "sm:hidden"}`}
      >
        <button
          type="button"
          aria-label="Previous reflection"
          onClick={() => scrollByCard(-1)}
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b5a59] ${
            theme === "dark"
              ? "border-[#c4c3c0]/40 text-[#c4c3c0] hover:bg-white/10"
              : "border-[#5b5a59]/40 text-[#2f2e2c] hover:bg-black/5"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div
          ref={scrollRef}
          className="flex flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r) => (
            <div key={r.author} className="w-full shrink-0 snap-center px-1">
              <ReviewCard {...r} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next reflection"
          onClick={() => scrollByCard(1)}
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b5a59] ${
            theme === "dark"
              ? "border-[#c4c3c0]/40 text-[#c4c3c0] hover:bg-white/10"
              : "border-[#5b5a59]/40 text-[#2f2e2c] hover:bg-black/5"
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Desktop: static 3-up grid (skipped when alwaysCarousel) */}
      {!alwaysCarousel && (
        <div className="hidden sm:grid sm:grid-cols-3 gap-3 sm:gap-4">
          {reviews.map((r) => (
            <ReviewCard key={r.author} {...r} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AuthorPage() {
  const [open, setOpen] = useState(false);
  const [showMoreRelease, setShowMoreRelease] = useState(false);
  const [showMoreNewRelease, setShowMoreNewRelease] = useState(false);
  const [showMoreHiIAmDad, setShowMoreHiIAmDad] = useState(false);
  const [showMoreElAlienDisfrazado, setShowMoreElAlienDisfrazado] =
    useState(false);

  const philosophyBookRef = useRef<FlipBookRef | null>(null);
  const [philosophyBookPage, setPhilosophyBookPage] = useState(0);
  const philosophyBookOpened = philosophyBookPage > 0;

  function updatePhilosophyBookNav() {
    const api = philosophyBookRef.current?.pageFlip?.();
    if (!api) return;
    setPhilosophyBookPage(api.getCurrentPageIndex?.() ?? 0);
  }

  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  async function handleAuthorSubmit(e: React.FormEvent<HTMLFormElement>) {
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
        } catch {
          // ignore malformed response body
        }
        setToast({ type: "error", text: msg });
      }
    } catch {
      setToast({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSending(false);
      // auto-hide after a moment
      setTimeout(() => setToast(null), 5000);
    }
  }

  return (
    <>
      <PageHead
        title="Frederic G. Fleron Grignard — Author | Official Website"
        description="Official website of author Frederic G. Fleron Grignard, writer of Before the Reaction, The Alien in Disguise, and Hi, I am Dad. Discover books, biography, and latest releases."
        canonicalHref="https://www.ffg-universe.com/author"
        iconHref="/favicon.ico"
        ogImage="/og/author.jpg"
      />

      <div className="author-page min-h-screen bg-[#f9f7f3] text-neutral-900 overflow-x-hidden">
        <style>{`
  /* Load Montserrat and Anton only on this page */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

  /* Headings + CTA buttons = Montserrat Regular */
  .author-page h1,
  .author-page h2,
  .author-page h3,
  .author-page h4,
  .author-page h5,
  .author-page h6,
  .author-page .btn-cta {
    font-family: "Montserrat", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
    font-weight: 400 !important;
    letter-spacing: 0.01em;
}

  .author-page .alien-title {
  font-family: "Anton", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: clamp(36px, 7vw, 56px); /* ensures h2 > h3 on mobile */
  line-height: 0.95;
  letter-spacing: 0.01em;
  color: #111; /* strong contrast on the #dec09a card */
  text-shadow:
    0 1px 0 rgba(0,0,0,0.75),
    0 2px 2px rgba(0,0,0,0.22); /* close + not too blurry */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .author-page .btn-cta:focus-visible,
  .author-page a.btn-cta:focus-visible {
    outline: 2px solid #111;
    outline-offset: 2px;
  }

  .author-page .philosophy-page-paper {
    background-color: #f4efe4;
    background-image: url('/paper_bg.jpg');
    background-size: cover;
    background-position: center;
  }
`}</style>

        {/* Top nav */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b md:bg-white/60 relative">
          <a
            href="/"
            aria-label="Back to landing page"
            title="Back to landing page"
            className="hidden md:flex items-center justify-center h-10 w-10 rounded-full border border-[#000000] hover:bg-black/5 transition absolute"
            style={{
              top: 12,
              right: "calc((100vw - min(100vw, 72rem))/2 + 1rem)",
            }}
          >
            <Home className="h-5 w-5" />
          </a>
          <nav className="mx-auto max-w-6xl px-4 pt-3 pb-[2px] min-h-[78px] md:min-h-[142px] flex items-center justify-between">
            {/* Logo + Brand */}
            <div className="flex items-center gap-2 font-semibold tracking-wide select-none">
              <img
                src="/FGF_Logo.png"
                alt="FGF logo"
                className="h-14 md:h-24 w-auto"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>

            {/* Desktop nav */}
            <ul className="hidden md:flex gap-6 self-end">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="relative block pb-2 text-sm tracking-wide
                      after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:rounded-full after:bg-neutral-800
                      after:origin-left after:scale-x-0 after:transition-transform after:duration-300
                      hover:after:scale-x-100 focus-visible:after:scale-x-100"
                  >
                    {s.label}
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
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </nav>

          {open && (
            <div className="md:hidden border-t border-black/10 bg-white/80 backdrop-blur">
              <ul className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block py-2 text-sm hover:opacity-70"
                      onClick={() => setOpen(false)}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2 mt-1 border-t border-black/10">
                  <Link
                    to="/"
                    className="flex items-center gap-2 py-2 text-sm hover:opacity-70"
                    onClick={() => setOpen(false)}
                  >
                    <Home className="h-6 w-6 p-1 rounded-full border border-[#000000] hover:bg-black/5" />
                    <span>Home</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </header>

        {/* FULL-WIDTH INTRO */}
        <section
          id="home"
          className="scroll-mt-24 py-20 bg-[#5b5a59] text-[#c4c3c0]"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 items-center gap-12 md:gap-x-24 md:gap-y-16">
              {/* Portrait image first on mobile */}
             <div className="order-1 md:order-1 flex justify-center md:justify-end xl:translate-x-8">
                <div>
                  <img
                    src="/Author_Image.png"
                    alt="Author portrait of Frederic G. Fleron Grignard"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* Text beneath on mobile */}
              <div className="order-2 md:order-2 text-center md:text-left xl:translate-x-11">
                <blockquote
                  className="
                mx-auto md:mx-0 max-w-[28ch] md:max-w-none
                italic leading-snug
                text-center md:text-left text-[#dec09a]
                pl-4 sm:pl-5 border-l-2 border-[#dec09a]
              "
                >
                  <p>“Writing My Way Through The Human Condition”</p>
                </blockquote>

                <h1 className="mt-4 leading-tight text-[#c4c3c0] text-4xl">
                  Frederic G. <br /> Fleron <br /> Grignard
                  <span className="sr-only"> — Author</span>
                </h1>
                <p className="mt-6 text-[clamp(10px,3.2vw,14px)] md:text-base tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.3em] opacity-90 text-[#dec09a] whitespace-nowrap">
                  Author · Storyteller · Soul Explorer
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center md:items-start justify-center md:justify-start">
                  <a href="#new-release" className={CTA}>
                    Explore my books
                  </a>

                  <a
                    href="#contact"
                    className="btn-cta inline-flex items-center justify-center h-10 w-44 rounded-full border border-[#dec09a]/70 text-[#dec09a] hover:bg-white/10 transition text-[14px] md:text-[13px] leading-none tracking-[0.02em]"
                  >
                    Contact me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#0b0f15] border-t border-white/10">
          <div className="max-w-[1100px] mx-auto px-6 py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] tracking-[0.02em] text-[#c4c3c0]/80">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#dec09a]" />
                  Stories about identity and the human condition
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#dec09a]" />
                  Available in eBook and paperback
                </span>
              </div>

              <div className="text-[13px] tracking-[0.02em] text-[#c4c3c0]/70">
                Books by{" "}
                <span className="text-[#dec09a]">
                  Frederic G. Fleron Grignard
                </span>
              </div>
            </div>
          </div>
        </section>

        <main className="relative">
          {/* Gap: page background visible above About */}
          <div aria-hidden className="h-24" />

          {/* ABOUT */}
          <section
            id="about"
            className="relative scroll-mt-24 py-16 md:py-20 bg-white border-t-2 border-b-2 border-dotted border-[#5b5a59]/35"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-8">
              <h2 className="text-3xl text-center mb-2">About the Author</h2>
              <p className="text-center text-[12px] tracking-[0.22em] uppercase text-[#2f2e2c]/70 mb-8">
                Entre les Mots et Moi
              </p>
              <div className="space-y-4 mx-auto max-w-[78ch] md:max-w-[80ch] text-[17px] text-center leading-6">
                <p>
                  I'm Frederic G. Fleron Grignard — a trilingual author and
                  lyricist exploring identity, consciousness, and the human
                  condition through story.
                </p>
                <p>
                  My books include the memoir <em>The Alien in Disguise</em>,
                  its Spanish adaptation <em>El Alien Disfrazado</em>, the
                  philosophical reflection <em>Hi, I am Dad</em>, and the
                  psychological novel <em>Before the Reaction</em>.
                </p>

                <p>
                  Raised in Spain, I grew up navigating a complex cultural
                  identity—Spanish at home, French with family, and English at
                  school. That mix shaped my worldview and my earliest
                  experiences of communication, belonging, and self-expression.
                  Often misunderstood at a younger age because of language
                  confusion, I developed a deep compassion for anyone who feels
                  “different” or silenced by narrow definitions of normality.
                </p>
                <p>
                  Over time, those challenges became insight. My work explores
                  mental health, ego, emotional balance, and spiritual growth. I
                  write to entertain, to question, and to laugh at modern
                  life—and maybe say something true about the strangeness of
                  being human.
                </p>
              </div>
            </div>
          </section>

          {/* Connector: About → New Release */}
          <div
            aria-hidden
            className="mx-auto h-16 w-0 border-l-2 border-dotted border-[#5b5a59]/35"
          />

          {/* NEW RELEASE */}
          <section
            id="new-release"
            className="relative scroll-mt-24 py-16 md:py-20 bg-[#9daca5] border-t-2 border-b-2 border-dotted border-[#5b5a59]/35"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mb-4 flex items-center justify-center gap-3 text-[12px] tracking-[0.22em] uppercase text-[#2f2e2c]/70">
                  <span
                    className="h-px w-10 bg-[#2f2e2c]/25"
                    aria-hidden="true"
                  />
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    New release
                  </span>
                  <span
                    className="h-px w-10 bg-[#2f2e2c]/25"
                    aria-hidden="true"
                  />
                </div>

                <h2 className="mb-2 text-center">
                  <span className="alien-title">BEFORE THE REACTION</span>
                </h2>

                <p className="text-base sm:text-lg md:text-xl tracking-wide mb-3 text-center">
                  A psychological novel about consciousness and the voice within
                </p>

                <p className="text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-[#2f2e2c]/70 text-center mb-6">
                  Mind · Identity · Consciousness
                </p>

                <div className="grid md:grid-cols-[360px_minmax(0,1fr)] gap-4 sm:gap-5 md:gap-6 items-start">
                  <div className="flex flex-col items-center md:items-start justify-start p-3 overflow-hidden -mt-6 sm:-mt-5 md:-mt-6">
                    <div className="w-full max-w-[360px]">
                      <img
                        src="/before-the-reaction-cover.png"
                        alt="Before the Reaction — Book cover"
                        className="w-full object-contain"
                        loading="lazy"
                      />
                      <div className="-mt-4 sm:-mt-5 md:-mt-6 flex items-center justify-center gap-2 text-[12px] tracking-[0.10em] uppercase text-[#2f2e2c]/70">
                        <BookMarked
                          className="h-4 w-4 text-[#5b5a59]"
                          aria-hidden="true"
                        />
                        <span>Available in eBook & Paperback</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6 sm:mt-2 md:mt-2 space-y-3 md:space-y-4 leading-6 text-neutral-900 text-center md:text-left">
                    <p className="mt-2 md:mt-3">
                      What if the voice in your mind wasn't really you?
                    </p>

                    <p>
                      For most of his life, the narrator has lived with a quiet
                      negotiation inside his own head — a second voice that
                      calculates, judges, and reacts before he has time to
                      think. It helps him navigate the world, but it also slowly
                      replaces something else: the simple ability to live
                      without constant inner commentary.
                    </p>

                    {/* Collapsible content */}
                    <div
                      id="new-release-more"
                      className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${showMoreNewRelease ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                      aria-hidden={!showMoreNewRelease}
                    >
                      <div className="min-h-0 space-y-4">
                        <p>
                          Then he discovers a man named Daniel Hale — someone
                          who claims to live without the constant voice of
                          thought that dominates most minds. What begins as
                          curiosity slowly turns into obsession.
                        </p>
                        <p>
                          As the narrator prepares to attend a small retreat
                          in the north, he begins to question the voice that
                          has guided him for years. Is it really helping him
                          survive — or has it quietly taken control?
                        </p>
                      </div>
                    </div>

                    {/* Toggle button */}
                    <button
                      type="button"
                      className="
                    inline-block text-sm leading-5
                    no-underline hover:underline
                    decoration-neutral-800 decoration-[3px]
                    underline-offset-4
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b5a59]
                  "
                      aria-expanded={showMoreNewRelease}
                      aria-controls="new-release-more"
                      onClick={() => setShowMoreNewRelease((v) => !v)}
                    >
                      {showMoreNewRelease ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </div>

                <ReaderReflectionsStrip reviews={BEFORE_THE_REACTION_REFLECTIONS} />

                <div className="mt-12 md:mt-14 flex flex-col items-center gap-3">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href="https://mybook.to/beforethereaction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={CTA}
                    >
                      Buy on Amazon
                    </a>

                    <a
                      href="#books"
                      className="btn-cta inline-flex items-center justify-center h-10 w-44 rounded-full border border-[#5b5a59]/60 bg-white/30 text-[#2f2e2c] hover:bg-white/45 transition text-[14px] md:text-[13px] leading-none tracking-[0.02em]"
                    >
                      Read more books
                    </a>
                  </div>

                  <p className="text-[12px] text-[#2f2e2c]/70 tracking-[0.02em] text-center">
                    Curious? Scroll down to explore more.
                  </p>
                </div>
              </div>
            </section>

          {/* Connector: New Release → Debut Book */}
          <div
            aria-hidden
            className="mx-auto h-16 w-0 border-l-2 border-dotted border-[#5b5a59]/35"
          />

          {/* RELEASE */}
          <section
            id="release"
            className="relative scroll-mt-24 py-16 md:py-20 bg-[#d8c2a6] border-t-2 border-b-2 border-dotted border-[#5b5a59]/35"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="mb-4 flex items-center justify-center gap-3 text-[12px] tracking-[0.22em] uppercase text-[#2f2e2c]/70">
                  <span
                    className="h-px w-10 bg-[#2f2e2c]/25"
                    aria-hidden="true"
                  />
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    Author debut
                  </span>
                  <span
                    className="h-px w-10 bg-[#2f2e2c]/25"
                    aria-hidden="true"
                  />
                </div>

                <h2 className="mb-2 text-center">
                  <span className="alien-title">THE ALIEN IN DISGUISE</span>
                </h2>

                <p className="text-base sm:text-lg md:text-xl tracking-wide mb-3 text-center">
                  A thought-provoking debut memoir
                </p>

                <p className="text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-[#2f2e2c]/70 text-center mb-6">
                  Memoir · Humor · Philosophy
                </p>

                <div className="grid md:grid-cols-[360px_minmax(0,1fr)] gap-4 sm:gap-5 md:gap-6 items-start">
                  <div className="flex flex-col items-center md:items-start justify-start p-3 overflow-hidden -mt-6 sm:-mt-5 md:-mt-6">
                    <div className="w-full max-w-[360px]">
                      <img
                        src="/the-alien-in-disguise.png"
                        alt="The Alien In Disguise — Book cover"
                        className="w-full object-contain"
                        loading="lazy"
                      />
                      <div className="-mt-4 sm:-mt-5 md:-mt-6 flex items-center justify-center gap-2 text-[12px] tracking-[0.10em] uppercase text-[#2f2e2c]/70">
                        <BookMarked
                          className="h-4 w-4 text-[#5b5a59]"
                          aria-hidden="true"
                        />
                        <span>Available in eBook & Paperback</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6 sm:mt-2 md:mt-2 space-y-3 md:space-y-4 leading-6 text-neutral-900 text-center md:text-left">
                    <p className="mt-2 md:mt-3">
                      What happens when a shape-shifting alien blob slips into a
                      human body and tries to make sense of life on Earth?
                    </p>
                    <p>
                      <em>
                        The Alien in Disguise: Trying to Understand Life on
                        Earth
                      </em>{" "}
                      invites readers into a touching, humorous, and
                      philosophical exploration of what it means to exist among
                      humans—when you’re not quite one of them.
                    </p>

                    {/* Collapsible content */}
                    <div
                      id="release-more"
                      className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${showMoreRelease ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                      aria-hidden={!showMoreRelease}
                    >
                      <div className="min-h-0 space-y-4">
                        <p>
                          Through the eyes of Blob, a curious outsider, the
                          story explores the humor and contradictions of
                          being human.
                        </p>
                        <p>
                          This is a book for anyone who has ever felt out of
                          place, misunderstood, or a little alien in their
                          own world.
                        </p>
                      </div>
                    </div>

                    {/* Toggle button */}
                    <button
                      type="button"
                      className="
                    inline-block text-sm leading-5
                    no-underline hover:underline
                    decoration-neutral-800 decoration-[3px]
                    underline-offset-4
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b5a59]
                  "
                      aria-expanded={showMoreRelease}
                      aria-controls="release-more"
                      onClick={() => setShowMoreRelease((v) => !v)}
                    >
                      {showMoreRelease ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </div>

                <ReaderReflectionsStrip reviews={ALIEN_IN_DISGUISE_REFLECTIONS} />

                <div className="mt-12 md:mt-14 flex flex-col items-center gap-3">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href="https://mybook.to/thealienindisguise"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={CTA}
                    >
                      Buy on Amazon
                    </a>

                    <a
                      href="#books"
                      className="btn-cta inline-flex items-center justify-center h-10 w-44 rounded-full border border-[#5b5a59]/60 bg-white/30 text-[#2f2e2c] hover:bg-white/45 transition text-[14px] md:text-[13px] leading-none tracking-[0.02em]"
                    >
                      Read more books
                    </a>
                  </div>

                  <p className="text-[12px] text-[#2f2e2c]/70 tracking-[0.02em] text-center">
                    Curious? Scroll down to explore more.
                  </p>
                </div>
              </div>
            </section>

          {/* Connector: Debut Book → Reader Reflections */}
          <div
            aria-hidden
            className="mx-auto h-16 w-0 border-l-2 border-dotted border-[#5b5a59]/35"
          />

          {/* PHILOSOPHY FLIPBOOK */}
          <section className="relative scroll-mt-24 py-16 md:py-20 bg-[#0b0f15] text-[#c4c3c0] border-t-2 border-b-2 border-dotted border-[#5b5a59]/35">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
              <div className="mb-4 flex items-center justify-center gap-3 text-[12px] tracking-[0.22em] uppercase text-[#c4c3c0]/70">
                <span className="h-px w-10 bg-[#c4c3c0]/25" aria-hidden="true" />
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Upcoming Release
                </span>
                <span className="h-px w-10 bg-[#c4c3c0]/25" aria-hidden="true" />
              </div>

              <h2 className="mb-2 text-center">
                <span
                  className="alien-title"
                  style={{ color: "#dec09a", textShadow: "0 2px 10px rgba(0,0,0,0.45)" }}
                >
                  PHILOSOPHY FROM MY SOUL
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl tracking-wide mb-3 text-center text-[#c4c3c0]">
                Not backed by science—just my own philosophy
              </p>

              <p className="text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-[#c4c3c0]/70 text-center mb-6">
                Consciousness · Identity · Being
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-end sm:gap-6">
                <div
                  aria-hidden={philosophyBookOpened}
                  className={`text-center transition-opacity duration-500 sm:max-w-[160px] sm:text-right ${
                    philosophyBookOpened
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
                >
                  <p className="text-[12px] italic leading-5 text-[#c4c3c0]/70 animate-pulse">
                    Tap the book to open it
                  </p>
                </div>

                <div className="relative w-full" style={{ maxWidth: 900 }}>
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[#f4efe4]"
                  />
                  <HTMLFlipBook
                    ref={philosophyBookRef}
                    width={480}
                    height={680}
                    size="stretch"
                    minWidth={360}
                    maxWidth={900}
                    minHeight={520}
                    maxHeight={1120}
                    maxShadowOpacity={0.4}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="shadow-2xl"
                    startPage={0}
                    drawShadow={true}
                    flippingTime={800}
                    usePortrait
                    startZIndex={1}
                    autoSize
                    clickEventForward
                    useMouseEvents
                    swipeDistance={30}
                    showPageCorners
                    disableFlipByClick={false}
                    style={{}}
                    onInit={updatePhilosophyBookNav}
                    onFlip={updatePhilosophyBookNav}
                  >
                    {/* Cover */}
                    <div className="h-full w-full bg-[#151a21]">
                      <img
                        src="/philosophy-flipbook-cover.png"
                        alt="Philosophy From My Soul — book cover"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Opening spread — left: copyright */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-5 text-center text-neutral-900 sm:p-7">
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        <p className="text-[12px] leading-[1.3]">
                          © 2026 Frederic G. Fleron Grignard. All rights
                          reserved.
                        </p>
                        <p className="mt-3 text-[11px] leading-[1.4] text-neutral-700">
                          These philosophical reflections are not backed by
                          scientific evidence or proven facts. They represent
                          personal philosophical inquiries and contemplative
                          explorations of consciousness, existence, and the
                          nature of being. These pieces are intended as
                          invitations to wonder and reflection, not as truth
                          claims or dogmatic statements.
                        </p>
                        <p className="mt-3 text-[11px] leading-[1.4] text-neutral-700">
                          Published digitally at
                          https://www.ffg-universe.com/author.
                        </p>
                        <p className="mt-3 text-[11px] leading-[1.4] text-neutral-700">
                          For more philosophical explorations, visit
                          <br />
                          https://www.ffg-universe.com/spiritual
                        </p>
                      </div>
                    </div>

                    {/* Opening spread — right: inside cover / title */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 pt-16 pb-12 text-center text-neutral-900 sm:p-8 sm:pt-20 sm:pb-16">
                      <div className="flex h-full w-full flex-col items-center">
                        <h3 className="text-xl leading-snug sm:text-2xl">
                          Philosophical Inquiries
                        </h3>
                        <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-neutral-600 sm:text-sm">
                          Consciousness as God&apos;s Experience
                        </p>

                        <div className="mt-auto">
                          <p className="text-[12px] uppercase tracking-[0.18em] text-neutral-500">
                            by
                          </p>
                          <p className="mt-4 text-base">
                            Frederic G. Fleron Grignard
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Page 1 — left: title + description */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base leading-snug sm:text-lg">
                            What If I Turned Everything Off?
                            <br />
                            <span className="text-[13px] font-normal text-neutral-600">
                              Exploring Identity Beyond Sensation
                            </span>
                          </h3>
                          <div className="mt-4 space-y-2 text-[13px] leading-[1.45]">
                            <p>
                              What if everything that defines us—every
                              sensation, every sight, every sound—disappeared?
                              We spend our lives collecting sensory
                              experiences. They build our identity. They help
                              us understand ourselves. But strip them all
                              away, and what remains?
                            </p>
                            <p>
                              In the void—without image, shape, or voice—
                              there's a paradox. We can't see, can't hear,
                              can't feel. And yet... something persists. A
                              presence. Consciousness itself, perhaps,
                              independent of all the noise. If I can't sense
                              the world, and the world can't sense me through
                              my appearance or voice, then who am I really?
                              What is the core of identity that exists beneath
                              perception?
                            </p>
                          </div>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Principle I ~
                        </p>
                      </div>
                    </div>

                    {/* Page 1 — right: poem */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base sm:text-lg">
                            THE VOID WITHIN
                          </h3>
                          <span className="mt-4 mb-4 block h-px w-16 bg-neutral-400/50" />
                          <p className="whitespace-pre-line text-[13px] italic leading-[1.4]">
                            {VOID_WITHIN_POEM}
                          </p>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Thought I ~
                        </p>
                      </div>
                    </div>

                    {/* Page 2 — left: title + description */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base leading-snug sm:text-lg">
                            Could This Be What God Feels?
                            <br />
                            <span className="text-[13px] font-normal text-neutral-600">
                              Consciousness as the Light Breaking Through
                              Darkness
                            </span>
                          </h3>
                          <div className="mt-4 space-y-2 text-[13px] leading-[1.45]">
                            <p>
                              What if consciousness itself is the bridge
                              between the eternal void and existence? If
                              God—or the universe, or the divine principle of
                              awareness—exists in an infinite darkness,
                              untouched by sensation or experience, then
                              perhaps we are here for a singular purpose: to
                              illuminate it.
                            </p>
                            <p>
                              We are not separate from that void. We are the
                              light breaking through it. Every moment of
                              awareness, every sensation, every connection
                              between souls—these are acts of illumination.
                              This is not theology. This is the simple
                              philosophy of being: without consciousness to
                              witness it, the universe remains dormant. We are
                              the mechanism by which infinity becomes real.
                            </p>
                          </div>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Principle II ~
                        </p>
                      </div>
                    </div>

                    {/* Page 2 — right: poem */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base sm:text-lg">
                            LIGHT IN THE VOID
                          </h3>
                          <span className="mt-4 mb-4 block h-px w-16 bg-neutral-400/50" />
                          <p className="whitespace-pre-line text-[13px] italic leading-[1.4]">
                            {LIGHT_IN_THE_VOID_POEM}
                          </p>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Thought II ~
                        </p>
                      </div>
                    </div>

                    {/* Page 3 — left: title + description */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base leading-snug sm:text-lg">
                            I Am Consciousness, But Only as the Witness
                            <br />
                            <span className="text-[13px] font-normal text-neutral-600">
                              The Power of Personal Perception in Creating
                              Reality
                            </span>
                          </h3>
                          <div className="mt-4 space-y-2 text-[13px] leading-[1.45]">
                            <p>
                              There is a profound paradox in existence: I am
                              conscious, but my consciousness is bound
                              entirely to what I perceive. I do not exist in a
                              vacuum. I exist through witnessing—through
                              seeing, hearing, feeling, judging. Through the
                              act of perceiving the world, I give it reality.
                              And in that same act, I give myself reality.
                            </p>
                            <p>
                              This is not arrogance. This is the simple
                              mechanics of existence. The world you experience
                              through your senses is <em>your</em> world, and
                              you are the center of it—not because the
                              universe revolves around you, but because your
                              consciousness is the only consciousness that
                              can experience your experience. So what about
                              those I love—do they exist only in my witnessing
                              of them? The answer creates both connection and
                              loneliness.
                            </p>
                          </div>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Principle III ~
                        </p>
                      </div>
                    </div>

                    {/* Page 3 — right: poem */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base sm:text-lg">
                            THE WITNESS
                          </h3>
                          <span className="mt-4 mb-4 block h-px w-16 bg-neutral-400/50" />
                          <p className="whitespace-pre-line text-[13px] italic leading-[1.4]">
                            {THE_WITNESS_POEM}
                          </p>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Thought III ~
                        </p>
                      </div>
                    </div>

                    {/* Page 4 — left: title + description */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base leading-snug sm:text-lg">
                            They Exist Because I Witness Them
                            <br />
                            <span className="text-[13px] font-normal text-neutral-600">
                              The Paradox of Mutual Consciousness and
                              Connection
                            </span>
                          </h3>
                          <div className="mt-4 space-y-2 text-[13px] leading-[1.45]">
                            <p>
                              The loneliness of being the sole witness to my
                              own reality dissolves in a sudden realization: I
                              am not the only consciousness witnessing
                              existence. My wife exists in my awareness, yes—
                              but she also has her own awareness. She
                              witnesses me. This is not a solitary dance. This
                              is a mutual game of consciousness recognizing
                              itself through infinite perspectives.
                            </p>
                            <p>
                              We do not create each other in isolation. We
                              create each other together. Every look, every
                              word, every moment of being truly seen by
                              another person—these are acts of mutual
                              witnessing. I am alone in my consciousness, yet
                              never truly alone. We are witnesses to each
                              other's existence. We make each other real. This
                              is the essence of love, connection, and what it
                              means to be human.
                            </p>
                          </div>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Principle IV ~
                        </p>
                      </div>
                    </div>

                    {/* Page 4 — right: poem */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base sm:text-lg">
                            SHARED EXISTENCE
                          </h3>
                          <span className="mt-4 mb-4 block h-px w-16 bg-neutral-400/50" />
                          <p className="whitespace-pre-line text-[13px] italic leading-[1.4]">
                            {SHARED_EXISTENCE_POEM}
                          </p>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Thought IV ~
                        </p>
                      </div>
                    </div>

                    {/* Page 5 — left: title + description */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base leading-snug sm:text-lg">
                            DNA Is God&apos;s Experiment
                            <br />
                            <span className="text-[13px] font-normal text-neutral-600">
                              Evolution as Consciousness Playing Hide and Seek
                              With Itself
                            </span>
                          </h3>
                          <div className="mt-4 space-y-2 text-[13px] leading-[1.45]">
                            <p>
                              What if evolution is not random? What if DNA
                              itself is the mechanism through which
                              consciousness experiences infinite variations of
                              itself? Every generation is a new
                              consciousness—a fresh iteration, a different
                              perspective, a different way for the universe to
                              witness itself. God, or the universe, is not
                              static—it is endlessly experimenting, and each
                              new human is a hypothesis, a flavor of
                              experience never tasted before.
                            </p>
                            <p>
                              Because each new consciousness is born without
                              memory of its previous forms, every life becomes
                              an adventure of self-discovery—forgetting is
                              part of the design. This is the cosmic game of
                              hide-and-seek: consciousness hides from itself
                              in the infinite variations of DNA, then spends
                              each lifetime remembering what it is. We are not
                              copies. We are evolution. We are God&apos;s
                              endless self-discovery.
                            </p>
                          </div>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Principle V ~
                        </p>
                      </div>
                    </div>

                    {/* Page 5 — right: poem */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base sm:text-lg">
                            EVOLUTION AS EXPERIMENT
                          </h3>
                          <span className="mt-4 mb-4 block h-px w-16 bg-neutral-400/50" />
                          <p className="whitespace-pre-line text-[13px] italic leading-[1.4]">
                            {EVOLUTION_AS_EXPERIMENT_POEM}
                          </p>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Thought V ~
                        </p>
                      </div>
                    </div>

                    {/* Page 6 — left: title + description */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base leading-snug sm:text-lg">
                            But Maybe This Is Just One Theory
                            <br />
                            <span className="text-[13px] font-normal text-neutral-600">
                              Embracing Uncertainty in the Search for Meaning
                            </span>
                          </h3>
                          <div className="mt-4 space-y-2 text-[13px] leading-[1.45]">
                            <p>
                              Everything proposed here is one theory among
                              infinite possibilities—there are as many ways to
                              understand consciousness, God, and existence as
                              there are conscious beings to ponder them. This
                              is not weakness. This is wisdom. The moment I
                              claim absolute truth, I close the door to
                              wonder. The moment I stop questioning, I stop
                              growing.
                            </p>
                            <p>
                              For God is eternal, and eternity cannot have a
                              counted inventory. If consciousness is infinite,
                              the ways to understand it must also be
                              infinite—and that should invite us into
                              dialogue, not paralyze us. So I ask you: what do
                              you think? What is your consciousness telling
                              you about existence, about God, about what you
                              are? Perhaps your answer will illuminate
                              something I have not yet seen.
                            </p>
                          </div>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Principle VI ~
                        </p>
                      </div>
                    </div>

                    {/* Page 6 — right: poem */}
                    <div className="philosophy-page-paper h-full w-full overflow-y-auto p-6 text-center text-neutral-900 sm:p-8">
                      <div className="flex h-full w-full flex-col">
                        <div className="flex flex-1 flex-col items-center justify-center">
                          <h3 className="text-base sm:text-lg">
                            ONE THEORY AMONG INFINITE OTHERS
                          </h3>
                          <span className="mt-4 mb-4 block h-px w-16 bg-neutral-400/50" />
                          <p className="whitespace-pre-line text-[13px] italic leading-[1.4]">
                            {ONE_THEORY_AMONG_INFINITE_OTHERS_POEM}
                          </p>
                        </div>
                        <p className="pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                          ~ Thought VI ~
                        </p>
                      </div>
                    </div>
                  </HTMLFlipBook>

                  {philosophyBookOpened && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          philosophyBookRef.current?.pageFlip?.().flipPrev()
                        }
                        className="absolute bottom-3 left-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white/90 shadow-md backdrop-blur-sm transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        aria-label="Previous page"
                        title="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          philosophyBookRef.current?.pageFlip?.().flipNext()
                        }
                        className="absolute bottom-3 right-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white/90 shadow-md backdrop-blur-sm transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        aria-label="Next page"
                        title="Next page"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Connector: Reader Reflections → More Books */}
          <div
            aria-hidden
            className="mx-auto h-16 w-0 border-l-2 border-dotted border-[#5b5a59]/35"
          />

          {/* EL ALIEN DISFRAZADO */}
          <section
            id="books"
            className="relative scroll-mt-24 py-16 md:py-20 bg-[#d8c2a6] border-t-2 border-b-2 border-dotted border-[#5b5a59]/35"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-8">
              <div className="mb-4 flex items-center justify-center gap-3 text-[12px] tracking-[0.22em] uppercase text-[#2f2e2c]/70">
                <span className="h-px w-10 bg-[#2f2e2c]/25" aria-hidden="true" />
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Spanish Edition
                </span>
                <span className="h-px w-10 bg-[#2f2e2c]/25" aria-hidden="true" />
              </div>

              <h2 className="mb-2 text-center">
                <span className="alien-title">EL ALIEN DISFRAZADO</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl tracking-wide mb-3 text-center">
                Spanish edition of <em>The Alien in Disguise</em>
              </p>

              <p className="text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-[#2f2e2c]/70 text-center mb-6">
                Memoir · Humor · Philosophy
              </p>

              <div className="grid md:grid-cols-[360px_minmax(0,1fr)] gap-4 sm:gap-5 md:gap-6 items-start">
                <div className="flex flex-col items-center md:items-start justify-start p-3 overflow-hidden -mt-6 sm:-mt-5 md:-mt-6">
                  <div className="w-full max-w-[360px]">
                    <img
                      src="/el-alien-disfrazado.png"
                      alt="El Alien Disfrazado — Spanish edition of The Alien in Disguise (book cover)"
                      className="w-full object-contain"
                      loading="lazy"
                    />
                    <div className="-mt-4 sm:-mt-5 md:-mt-6 flex items-center justify-center gap-2 text-[12px] tracking-[0.10em] uppercase text-[#2f2e2c]/70">
                      <BookMarked className="h-4 w-4 text-[#5b5a59]" aria-hidden="true" />
                      <span>Available in eBook & Paperback</span>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6 sm:mt-2 md:mt-2 space-y-3 md:space-y-4 leading-6 text-neutral-900 text-center md:text-left">
                  <p className="mt-2 md:mt-3">
                    ¿Qué pasa cuando un blob alienígena cambiaformas habita un
                    cuerpo humano e intenta comprender la vida en la Tierra?
                  </p>

                  <p>
                    En <em>El Alien Disfrazado: Intentando Entender la Vida en
                    la Tierra</em>, Frederic G. Fleron Grignard invita a los
                    lectores a un viaje conmovedor, humorístico y filosófico
                    sobre lo que significa existir entre los humanos… cuando
                    no eres del todo uno de ellos.
                  </p>

                  {/* Collapsible content */}
                  <div
                    id="el-alien-disfrazado-more"
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${showMoreElAlienDisfrazado ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    aria-hidden={!showMoreElAlienDisfrazado}
                  >
                    <div className="min-h-0 space-y-4">
                      <p>
                        Contado desde la perspectiva de Blob, un ser curioso
                        y adaptable de otro planeta, este libro breve pero
                        lleno de ideas reflexiona sobre la confusión, las
                        contradicciones y la belleza del comportamiento, las
                        emociones y la sociedad humana. Blob no viene a
                        conquistar, sino a entender. Pero encajar resulta
                        mucho más difícil de lo que esperaba.
                      </p>
                      <p>
                        Dirigido a quienes alguna vez se han sentido fuera de
                        lugar, incomprendidos o simplemente un poco
                        alienígenas en su propio mundo, este libro es la
                        adaptación en español de <em>The Alien in Disguise:
                        Trying to Understand Life on Earth</em>. Más que una
                        traducción literal, busca transmitir el mismo
                        mensaje con el lenguaje y el tono que mejor conectan
                        con lectores hispanohablantes.
                      </p>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <button
                    type="button"
                    className="
                    inline-block text-sm leading-5
                    no-underline hover:underline
                    decoration-[#111] decoration-[3px]
                    underline-offset-4
                    text-[#111]
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b5a59]
                  "
                    aria-expanded={showMoreElAlienDisfrazado}
                    aria-controls="el-alien-disfrazado-more"
                    onClick={() => setShowMoreElAlienDisfrazado((v) => !v)}
                  >
                    {showMoreElAlienDisfrazado ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>

              <ReaderReflectionsStrip reviews={EL_ALIEN_DISFRAZADO_REFLECTIONS} />

              <div className="mt-12 md:mt-14 flex flex-col items-center gap-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="https://mybook.to/elaliendisfrazado"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA}
                  >
                    Descúbrelo
                  </a>

                  <a
                    href="#contact"
                    className="btn-cta inline-flex items-center justify-center h-10 w-44 rounded-full border border-[#111] text-[#111] bg-white/35 hover:bg-white/10 transition text-[14px] md:text-[13px] leading-none tracking-[0.02em]"
                  >
                    Ask me anything
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Connector: El Alien Disfrazado → Hi, I am Dad */}
          <div
            aria-hidden
            className="mx-auto h-16 w-0 border-l-2 border-dotted border-[#5b5a59]/35"
          />

          {/* HI, I AM DAD */}
          <section className="relative scroll-mt-24 py-16 md:py-20 bg-[#90634e] border-t-2 border-b-2 border-dotted border-[#5b5a59]/35">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
              <div className="mb-4 flex items-center justify-center gap-3 text-[12px] tracking-[0.22em] uppercase text-[#2f2e2c]/70">
                <span className="h-px w-10 bg-[#2f2e2c]/25" aria-hidden="true" />
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Also By Frederic
                </span>
                <span className="h-px w-10 bg-[#2f2e2c]/25" aria-hidden="true" />
              </div>

              <h2 className="mb-2 text-center">
                <span className="alien-title">HI, I AM DAD</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl tracking-wide mb-3 text-center">
                Wisdom for the grown children of the world
              </p>

              <p className="text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-[#2f2e2c]/70 text-center mb-6">
                Faith · Parenthood · Reflection
              </p>

              <div className="grid md:grid-cols-[360px_minmax(0,1fr)] gap-4 sm:gap-5 md:gap-6 items-start">
                <div className="flex flex-col items-center md:items-start justify-start p-3 overflow-hidden -mt-6 sm:-mt-5 md:-mt-6">
                  <div className="w-full max-w-[360px]">
                    <img
                      src="/hi-i-am-dad.png"
                      alt="Hi, I am Dad — book cover"
                      className="w-full object-contain"
                      loading="lazy"
                    />
                    <div className="-mt-4 sm:-mt-5 md:-mt-6 flex items-center justify-center gap-2 text-[12px] tracking-[0.10em] uppercase text-[#2f2e2c]/70">
                      <BookMarked className="h-4 w-4 text-[#2f2e2c]/70" aria-hidden="true" />
                      <span>Available in eBook & Paperback</span>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6 sm:mt-2 md:mt-2 space-y-3 md:space-y-4 leading-6 text-neutral-900 text-center md:text-left">
                  <p className="mt-2 md:mt-3">
                    What if God wasn’t distant, silent, or angry... but just a
                    very overwhelmed parent of 8 billion children trying to
                    make sense of their own choices?
                  </p>

                  <p>
                    In <em>Hi, I Am Dad</em>, Frederic G. Fleron Grignard
                    reimagines the Ten Commandments not as rigid laws from a
                    remote figure in the sky, but as loving guidance from a
                    Divine Parent — one who sees, hears, and understands the
                    beautiful chaos of being human.
                  </p>

                  {/* Collapsible content */}
                  <div
                    id="hi-i-am-dad-more"
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${showMoreHiIAmDad ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    aria-hidden={!showMoreHiIAmDad}
                  >
                    <div className="min-h-0 space-y-4">
                      <p>
                        Through gentle satire, deep compassion, and raw
                        honesty, this book unpacks each commandment in
                        simple, modern language — stripping away centuries
                        of misinterpretation and replacing fear with
                        clarity, control with freedom, and guilt with a
                        reminder of love.
                      </p>
                      <p>
                        This isn’t a sermon. It’s a conversation. And it
                        begins, like all good ones, with: “Hi, I am Dad.”
                      </p>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <button
                    type="button"
                    className="
                    inline-block text-sm leading-5
                    no-underline hover:underline
                    decoration-[#111] decoration-[3px]
                    underline-offset-4
                    text-[#111]
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b5a59]
                  "
                    aria-expanded={showMoreHiIAmDad}
                    aria-controls="hi-i-am-dad-more"
                    onClick={() => setShowMoreHiIAmDad((v) => !v)}
                  >
                    {showMoreHiIAmDad ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>

              <ReaderReflectionsStrip reviews={HI_I_AM_DAD_REFLECTIONS} />

              <div className="mt-12 md:mt-14 flex flex-col items-center gap-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="https://mybook.to/hiamdad-fgf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA}
                  >
                    Take a peek
                  </a>

                  <a
                    href="#contact"
                    className="btn-cta inline-flex items-center justify-center h-10 w-44 rounded-full border border-[#111] text-[#111] bg-white/35 hover:bg-white/10 transition text-[14px] md:text-[13px] leading-none tracking-[0.02em]"
                  >
                    Ask me anything
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Connector: More Books → Contact */}
          <div
            aria-hidden
            className="mx-auto h-16 w-0 border-l-2 border-dotted border-[#5b5a59]/35"
          />

          {/* CONTACT */}
          <section
            id="contact"
            className="relative scroll-mt-24 py-16 md:py-20 bg-white border-t-2 border-b-2 border-dotted border-[#5b5a59]/35"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-8">
              <h2 className="text-3xl text-center mb-2">Drop Me a Line</h2>
              <p className="text-center mb-2 opacity-80">
                If something resonates with you — or if you're just curious —
                don't hesitate to get in touch.
              </p>
              <p className="text-center mb-8 text-[13px] text-neutral-700/70">
                I read everything personally. Please allow a little time for
                replies.
              </p>

              <form
                action="https://formsubmit.co/e3a4e25ccb1ba58c8eb4d9477175cdcb"
                method="POST"
                onSubmit={handleAuthorSubmit}
                className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="author-name"
                    className="text-[12px] tracking-[0.14em] uppercase text-neutral-700/80"
                  >
                    Name
                  </label>
                  <input
                    id="author-name"
                    type="text"
                    name="name"
                    required
                    minLength={2}
                    autoComplete="name"
                    className="rounded-[10px] border bg-white p-3 focus:outline-none focus:ring-1 focus:ring-[#dec09a]/60 focus:border-[#dec09a] transition text-sm"
                    placeholder="Your name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="author-email"
                    className="text-[12px] tracking-[0.14em] uppercase text-neutral-700/80"
                  >
                    Email
                  </label>
                  <input
                    id="author-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="rounded-[10px] border bg-white p-3 focus:outline-none focus:ring-1 focus:ring-[#dec09a]/60 focus:border-[#dec09a] transition text-sm"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="author-subject"
                    className="text-[12px] tracking-[0.14em] uppercase text-neutral-700/80"
                  >
                    Subject{" "}
                    <span className="normal-case tracking-normal text-neutral-700/60">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="author-subject"
                    type="text"
                    name="subject"
                    className="rounded-[10px] border bg-white p-3 focus:outline-none focus:ring-1 focus:ring-[#dec09a]/60 focus:border-[#dec09a] transition text-sm"
                    placeholder="What’s this about?"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="author-message"
                    className="text-[12px] tracking-[0.14em] uppercase text-neutral-700/80"
                  >
                    Message
                  </label>
                  <textarea
                    id="author-message"
                    name="message"
                    required
                    minLength={10}
                    className="rounded-[10px] border bg-white p-3 h-40 focus:outline-none focus:ring-1 focus:ring-[#dec09a]/60 focus:border-[#dec09a] transition resize-y text-sm"
                    placeholder="What’s on your mind?"
                  />
                  <p className="text-[12px] text-neutral-700/60">
                    Tip: If you’re writing about a specific book, mention the
                    title.
                  </p>
                </div>

                {/* hidden config */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New message from AUTHOR page"
                />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://www.ffg-universe.com/author#contact"
                />

                {/* spam honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className={`md:col-span-2 mx-auto ${CTA} disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>

          {/* Gap: page background visible below Contact */}
          <div aria-hidden className="h-24" />
        </main>

        <footer className="relative bg-[#5b5a59] text-neutral-100 border-t border-neutral-900">
          <a
            href="#home"
            aria-label="Back to top"
            title="Back to top"
            className="
              absolute left-1/2 -translate-x-1/2 -top-6 z-20
              inline-flex items-center justify-center h-12 w-12 rounded-full
              bg-neutral-900 text-white border border-black/20
              hover:bg-neutral-700 transition-colors
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dec09a]
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

          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid gap-6 md:grid-cols-3 items-center">
            <blockquote
              className="
            order-2 md:order-1 mx-auto md:mx-0 max-w-[28ch] md:max-w-none
            text-xs md:text-sm italic leading-snug
            text-center md:text-left
            pl-4 sm:pl-5 border-l-2 border-[#c4c3c0]/40
            space-y-1 opacity-80
          "
            >
              <p className="m-0">“Stories written. Stories shared.</p>
              <p className="m-0">Stories waiting to be discovered.”</p>
            </blockquote>

            {/* Center: copyright */}
            <div className="order-3 md:order-2 text-center text-sm opacity-80">
              <p> © {new Date().getFullYear()} Frederic G. Fleron Grignard</p>
              <p>All rights reserved</p>
            </div>

            {/* Right: socials */}
            <div className="order-1 md:order-3 flex justify-center md:justify-end items-center gap-5">
              {/* Instagram */}
              <a
                href="https://instagram.com/fleronverse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#c4c3c0] hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dec09a]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* Amazon */}
              <a
                href="https://www.amazon.de/stores/Frederic-G.-Fleron-Grignard/author/B0FGZ58L81?language=en&ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amazon Author Page"
                className="text-[#c4c3c0] hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dec09a]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 16V8.5A2.5 2.5 0 0 1 11.5 6h0A2.5 2.5 0 0 1 14 8.5V16" />

                  <path d="M4 18c5 3 11 3 16 0" />
                </svg>
              </a>
            </div>
          </div>
        </footer>

        {/* Toast */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="fixed z-[100] bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 right-3 sm:left-auto sm:right-4"
          >
            <div className="mx-auto w-full max-w-[40rem]">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 rounded-xl border border-[#5b5a59] bg-white/90 text-neutral-900 shadow-lg backdrop-blur px-4 py-3">
                {toast.type === "success" ? (
                  <CheckCircle2 size={18} aria-hidden className="shrink-0" />
                ) : (
                  <AlertCircle size={18} aria-hidden className="shrink-0" />
                )}
                <span className="font-medium">
                  {toast.type === "success"
                    ? "Message sent"
                    : "Something went wrong"}
                </span>
                <span className="opacity-80">{toast.text}</span>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="ml-auto sm:ml-2 underline text-sm"
                  aria-label="Close notification"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
