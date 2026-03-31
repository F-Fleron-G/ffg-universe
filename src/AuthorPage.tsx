import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  BookMarked,
} from "lucide-react";
import PageHead from "./components/PageHead";

const sections = [
  { id: "about", label: "About Me" },
  { id: "new-release", label: "New Release" },
  { id: "release", label: "Debut Book" },
  { id: "books", label: "More Books" },
  { id: "contact", label: "Contact Me" },
];

const CTA =
  "btn-cta inline-flex items-center justify-center h-10 w-44 rounded-full bg-neutral-900 text-white border border-black/20 hover:bg-neutral-700 transition text-[14px] md:text-[13px] leading-none tracking-[0.02em]";

export default function AuthorPage() {
  const [open, setOpen] = useState(false);
  const [showMoreRelease, setShowMoreRelease] = useState(false);
  const [showMoreNewRelease, setShowMoreNewRelease] = useState(false);

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
        } catch {}
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
          <nav className="mx-auto max-w-6xl px-4 pt-3 pb-2 md:pb-3 flex items-center justify-between">
            {/* Logo + Brand */}
            <div className="flex items-center gap-2 font-semibold tracking-wide select-none">
              <img
                src="/FGF_Logo.png"
                alt="FGF logo"
                className="h-10 md:h-[84px] w-auto"
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
            <div className="md:hidden border-t border-black/10 bg-white/95 backdrop-blur">
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
          <div className="mx-auto max-w-4xl px-4">
            <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
              {/* Portrait image first on mobile */}
              <div className="order-1 md:order-2 flex justify-center md:justify-end">
                <div className="w-[72vw] sm:w-72 md:w-80 aspect-[4/5] rounded-xl shadow-md overflow-hidden">
                  <img
                    src="/Author_image.jpg"
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
              <div className="order-2 md:order-1 text-center md:text-left">
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
                  Available in eBook, paperback, and hardcover
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

        <main className="relative mx-auto max-w-4xl px-4">
          {/* ABOUT */}
          <section id="about" className="relative scroll-mt-24 pt-24 pb-0">
            <div className="rounded-[10px] border-4 border-[#5b5a59] px-8 py-12 md:px-10 md:py-14 bg-white">
              <h2 className="text-3xl text-center mb-2">About the Author</h2>
              <p className="text-center text-[12px] tracking-[0.22em] uppercase text-[#2f2e2c]/70 mb-8">
                Entre les Mots et Moi
              </p>
              <div className="space-y-4 mx-auto max-w-[66ch] md:max-w-[68ch] text-[17px] text-center leading-6">
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

          {/* Connector: About → Release */}
          <div aria-hidden className="mx-auto w-[2px] h-24 bg-[#5b5a59]" />

          {/* RELEASE + BOOKS with a continuous vertical spine behind */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#5b5a59]"
            />

            {/* NEW RELEASE */}
            <section id="new-release" className="relative scroll-mt-24 py-24">
              <div className="rounded-[10px] border-4 bg-[#9daca5] border-[#5b5a59] px-8 py-12 md:px-10 md:py-14">
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

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
                  <div className="flex flex-col items-center justify-start p-3 overflow-hidden -mt-6 sm:-mt-5 md:-mt-6">
                    <div className="flex items-center justify-center w-full">
                      <img
                        src="/before-the-reaction-cover.png"
                        alt="Before the Reaction — Book cover"
                        className="w-full max-w-[360px] object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="-mt-4 sm:-mt-5 md:-mt-6 flex items-center justify-center gap-2 text-[12px] tracking-[0.10em] uppercase text-[#2f2e2c]/70">
                      <BookMarked
                        className="h-4 w-4 text-[#5b5a59]"
                        aria-hidden="true"
                      />
                      <span>Available in all formats</span>
                    </div>
                  </div>

                  <div className="relative mt-6 sm:mt-2 md:mt-2 space-y-3 md:space-y-4 leading-6 text-neutral-900 text-center md:text-left md:max-w-prose md:ml-auto">
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
                      className={`${showMoreNewRelease ? "block" : "hidden"} space-y-4`}
                      aria-hidden={!showMoreNewRelease}
                    >
                      <p>
                        Then he discovers a man named Daniel Hale — someone who
                        claims to live without the constant voice of thought
                        that dominates most minds. What begins as curiosity
                        slowly turns into obsession.
                      </p>
                      <p>
                        As the narrator prepares to attend a small retreat in
                        the north, he begins to question the voice that has
                        guided him for years. Is it really helping him survive —
                        or has it quietly taken control?
                      </p>
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

                <div className="mt-8 flex flex-col items-center gap-3">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href="https://www.amazon.com/dp/B0GRNKW2ZK"
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

            {/* RELEASE */}
            <section id="release" className="relative scroll-mt-24 py-24">
              <div className="rounded-[10px] border-4 bg-[#d8c2a6] border-[#5b5a59] px-8 py-10 md:px-10 md:py-12">
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

                <div className="grid md:grid-cols-[280px_minmax(0,1fr)] gap-4 sm:gap-6 md:gap-3 items-start">
                  <div className="flex flex-col items-center md:items-start justify-start p-3 overflow-hidden -mt-6 sm:-mt-5 md:-mt-6 md:-ml-14">
                    <div className="flex items-center justify-center w-full">
                      <img
                        src="/the-alien-in-disguise.png"
                        alt="The Alien In Disguise — Book cover"
                        className="w-full max-w-[240px] object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="-mt-4 sm:-mt-5 md:-mt-6 flex w-full max-w-[240px] md:max-w-none items-center justify-center gap-2 text-[10px] tracking-[0.10em] uppercase text-[#2f2e2c]/70">
                      <BookMarked
                        className="h-4 w-4 text-[#5b5a59]"
                        aria-hidden="true"
                      />
                      <span>Available in eBook & Paperback</span>
                    </div>
                  </div>

                  <div className="relative mt-4 sm:-mt-4 md:mt-0 space-y-3 md:space-y-4 leading-6 text-neutral-900 text-center md:text-left md:max-w-[74ch] md:-ml-6">
                    <img
                      src="/author_debut.png"
                      alt="Author debut — English edition"
                      className="
                      absolute -right-8 -top-14 w-44 z-10 
                      md:-top-12 md:-right-6 md:w-40
                      lg:-top-10
                      pointer-events-none select-none
                    "
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <p>
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
                      className={`${showMoreRelease ? "block" : "hidden"} space-y-4`}
                      aria-hidden={!showMoreRelease}
                    >
                      <p>
                        Through the eyes of Blob, a curious outsider, the story
                        explores the humor and contradictions of being human.
                      </p>
                      <p>
                        This is a book for anyone who has ever felt out of
                        place, misunderstood, or a little alien in their own
                        world.
                      </p>
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

                <div className="mt-8 flex flex-col items-center gap-3">
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

            {/* READER REFLECTIONS */}
            <section className="relative scroll-mt-24 py-24">
              <div className="rounded-[10px] border-4 border-[#5b5a59] px-8 py-12 md:px-10 md:py-14 bg-[#0b0f15] text-[#c4c3c0]">
                <h2 className="text-3xl text-center mb-2">
                  Reader Reflections
                </h2>

                <p className="text-center text-[13px] leading-6 text-[#c4c3c0]/80 mb-10 max-w-[70ch] mx-auto">
                  A few early reactions to <em>The Alien in Disguise</em> —
                  honest, thoughtful, and warmly encouraging.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Review 1 — Beau */}
                  <figure className="rounded-[12px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                    <blockquote className="text-[13px] leading-6 text-[#c4c3c0]/90">
                      <p className="italic">
                        “Not the next alien book — but one that explains
                        humanity. What happens when someone—or
                        something—observes our lives without all the filters we
                        use to numb ourselves? <em>Blob</em> isn’t a story about
                        space. It’s one about you. Me. All of us. A silent
                        mirror. Humorous. Direct. And deeper than you&apos;d
                        initially think. You don&apos;t need to be a science
                        fiction fan. Just a person with a sense of what&apos;s
                        real.”
                      </p>
                    </blockquote>

                    <figcaption className="mt-6 flex flex-col items-center gap-2">
                      <div className="text-[12px] tracking-[0.22em] uppercase text-[#dec09a]/90">
                        <cite className="not-italic">Beau</cite>
                      </div>
                      <div className="text-[12px] tracking-[0.18em] text-[#dec09a]">
                        ★★★★★
                      </div>
                    </figcaption>
                  </figure>

                  {/* Review 2 — Alina Freund */}
                  <figure className="rounded-[12px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                    <blockquote className="text-[13px] leading-6 text-[#c4c3c0]/90">
                      <p className="italic">“Fabulous!”</p>
                    </blockquote>

                    <figcaption className="mt-6 flex flex-col items-center gap-2">
                      <div className="text-[12px] tracking-[0.22em] uppercase text-[#dec09a]/90">
                        <cite className="not-italic">Alina Freund</cite>
                      </div>
                      <div className="text-[12px] tracking-[0.18em] text-[#dec09a]">
                        ★★★★★
                      </div>
                    </figcaption>
                  </figure>

                  {/* Review 3 — Anonymous */}
                  <figure className="rounded-[12px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                    <blockquote className="text-[13px] leading-6 text-[#c4c3c0]/90">
                      <p className="italic">
                        “A memoir that makes you laugh — and then makes you
                        think.”
                      </p>
                    </blockquote>

                    <figcaption className="mt-6 flex flex-col items-center gap-2">
                      <div className="text-[12px] tracking-[0.22em] uppercase text-[#dec09a]/70">
                        <cite className="not-italic">Anonymous</cite>
                      </div>
                      <div className="text-[12px] tracking-[0.18em] text-[#dec09a]">
                        ★★★★★
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </section>

            {/* BOOKS — Now & Next */}
            <section id="books" className="relative scroll-mt-24 py-24">
              <div className="rounded-[10px] border-4 border-[#5b5a59] px-8 py-12 md:px-10 md:py-14 bg-[#5b5a59]">
                <h2 className="text-3xl text-center mb-3 text-[#c4c3c0]">
                  More Books
                </h2>

                <p className="text-center text-[13px] leading-6 text-[#c4c3c0]/80 mb-10 max-w-[75ch] mx-auto">
                  Additional titles include <em>El Alien Disfrazado</em>{" "}
                  (Spanish edition of <em>The Alien in Disguise</em>) and
                  <em> Hi, I am Dad</em>, a modern reflection on the Ten
                  Commandments told through the voice of a Divine Parent.
                </p>

                <div className="grid sm:grid-cols-2 gap-10 place-items-center max-w-2xl mx-auto">
                  {/* Card 1 — Spanish edition */}
                  <article className="group relative flex flex-col items-center w-64 sm:w-56 md:w-60">
                    <div className="relative w-full aspect-[2/3] rounded-md overflow-hidden">
                      <img
                        src="/el-alien-disfrazado.png"
                        alt="El Alien Disfrazado — Spanish edition of The Alien in Disguise (book cover)"
                        className="absolute inset-0 w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />

                      {/* Desktop hover excerpt */}
                      <div
                        className="hidden md:flex absolute inset-0 rounded-md bg-[rgba(255,255,255,0.82)] text-neutral-900 backdrop-blur-sm
                              shadow-[0_10px_28px_rgba(0,0,0,0.28)] p-5 flex-col items-center justify-center
                              opacity-0 translate-y-2 pointer-events-none transition duration-300 border border-black/30
                              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                        aria-hidden="true"
                      >
                        <p className="text-[12px] tracking-[0.18em] uppercase text-neutral-800/70 mb-3">
                          Excerpt preview
                        </p>

                        <div className="w-full max-h-[52%]">
                          <img
                            src="/Peek_Image_ES.png"
                            alt="Excerpt preview from El Alien Disfrazado"
                            className="w-full h-full object-contain rounded"
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                          />
                        </div>

                        <p className="text-sm leading-5 text-center mt-3 px-2">
                          ¿Qué pasa cuando un “blob” alienígena se mete en un
                          cuerpo humano y trata de entender la vida en la
                          Tierra?
                        </p>
                      </div>
                    </div>

                    {/* Always-visible metadata */}
                    <div className="mt-5 text-center text-[#c4c3c0]">
                      <h3 className="text-[12px] tracking-[0.18em] uppercase text-[#dec09a]">
                        El Alien Disfrazado
                      </h3>
                      <p className="mt-2 text-[13px] leading-6 text-[#c4c3c0]/90">
                        Spanish edition of <em>The Alien in Disguise</em> —
                        rewritten for tone, humor, and cultural nuance (not a
                        literal translation).
                      </p>

                      <a
                        href="https://mybook.to/elaliendisfrazado"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${CTA} mt-5`}
                      >
                        Descúbrelo
                      </a>
                    </div>
                  </article>

                  {/* Card 2 — Hi, I am Dad */}
                  <article className="group relative flex flex-col items-center w-64 sm:w-56 md:w-60">
                    <div className="relative w-full aspect-[2/3] rounded-md overflow-hidden">
                      <img
                        src="/hi-i-am-dad.png"
                        alt="Hi, I am Dad — book cover"
                        className="absolute inset-0 w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />

                      {/* Desktop hover excerpt */}
                      <div
                        className="hidden md:flex absolute inset-0 rounded-md bg-[rgba(255,255,255,0.82)] text-neutral-900 backdrop-blur-sm
                              shadow-[0_10px_28px_rgba(0,0,0,0.28)] p-5 flex-col items-center justify-center
                              opacity-0 translate-y-2 pointer-events-none transition duration-300 border border-black/30
                              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                        aria-hidden="true"
                      >
                        <p className="text-[12px] tracking-[0.18em] uppercase text-neutral-800/70 mb-3">
                          Excerpt preview
                        </p>

                        <div className="w-full max-h-[52%]">
                          <img
                            src="/C1-Loyalty.png"
                            alt="Excerpt preview from Hi, I am Dad"
                            className="w-full h-full object-contain rounded"
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                          />
                        </div>

                        <p className="text-sm leading-5 text-center mt-3 px-2">
                          “You are more than what you produce. You are more than
                          what you solve. You are worthy, even when you stop.”
                        </p>
                      </div>
                    </div>

                    {/* Always-visible metadata */}
                    <div className="mt-5 text-center text-[#c4c3c0]">
                      <h3 className="text-[12px] tracking-[0.18em] uppercase text-[#dec09a]">
                        Hi, I am Dad
                      </h3>
                      <p className="mt-2 text-[13px] leading-6 text-[#c4c3c0]/90">
                        A fatherhood-inspired reflection on the Ten
                        Commandments—reframed as parental guidance, clarifying
                        their intent.
                      </p>

                      <a
                        href="https://mybook.to/hiamdad-fgf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${CTA} mt-5`}
                      >
                        Take a peek
                      </a>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </div>

          {/* Connector */}
          <div aria-hidden className="mx-auto w-[2px] h-24 bg-[#5b5a59]" />

          {/* CONTACT */}
          <section id="contact" className="relative scroll-mt-24 pt-0 pb-24">
            <div className="rounded-[10px] border-4 border-[#5b5a59] px-8 py-12 md:px-10 md:py-14 bg-white">
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
        </main>

        <footer className="relative bg-[#5b5a59] text-neutral-100">
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
            mx-auto md:mx-0 max-w-[28ch] md:max-w-none
            text-xs md:text-sm italic leading-snug
            text-center md:text-left
            pl-4 sm:pl-5 border-l-2 border-[#c4c3c0]/40
            space-y-1
          "
            >
              <p className="m-0">“Stories written. Stories shared.</p>
              <p className="m-0">Stories waiting to be discovered.”</p>
            </blockquote>

            {/* Center: copyright */}
            <div className="text-center text-sm">
              <p> © {new Date().getFullYear()} Frederic G. Fleron Grignard</p>
              <p>All rights reserved</p>
            </div>

            {/* Right: socials */}
            <div className="flex justify-center md:justify-end items-center gap-5">
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
