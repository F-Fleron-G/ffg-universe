import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, CheckCircle2, AlertCircle } from "lucide-react";
import PageHead from "./components/PageHead";

const sections = [
  { id: "about", label: "About Me" },
  { id: "release", label: "Release" },
  { id: "books", label: "Books" },
  { id: "contact", label: "Contact Me" },
];

const CTA = "btn-cta inline-flex items-center justify-center h-10 w-44 rounded-full bg-neutral-900 text-white border border-black/20 hover:bg-neutral-700 transition text-[14px] md:text-[13px] leading-none tracking-[0.02em]";


export default function AuthorPage() {
  const [open, setOpen] = useState(false);
  const [showMoreRelease, setShowMoreRelease] = useState(false);

  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<null | { type: "success" | "error"; text: string }>(null);

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
        title="Author – Frederic G. Fleron Grignard"
        description="Books, releases, and writings by Frederic G. Fleron Grignard."
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
            right: 'calc((100vw - min(100vw, 72rem))/2 + 1rem)',
          }}
        >
          <Home className="h-5 w-5" />
        </a>
        <nav className="mx-auto max-w-6xl px-4 pt-3 pb-[2px] flex items-center justify-between">
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
                  <a href={`#${s.id}`} className="block py-2 text-sm hover:opacity-70" onClick={() => setOpen(false)}>
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
      <section id="home" className="scroll-mt-24 py-20 bg-[#5b5a59] text-[#c4c3c0]">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">

            {/* Portrait image first on mobile */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-[72vw] sm:w-72 md:w-96 aspect-square rounded-full border-2 border-[#dec09a] shadow-lg overflow-hidden">
                <img
                  src="/Author_image.jpg"
                  alt="Author portrait of Frederic G. Fleron Grignard"
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
                text-1xl md:text-1xl italic leading-snug
                text-center md:text-left text-[#dec09a]
                pl-4 sm:pl-5 border-l-2 border-[#dec09a]
                space-y-1
              "
            >
              <h2>"Writing My Way Through The Human Condition"</h2>
            </blockquote>
           
              <h1 className="mt-4 leading-tight text-[#c4c3c0] text-5xl sm:text-5xl md:text-6xl">
                FREDERIC G. <br /> FLERON <br /> GRIGNARD
              </h1>
              <p className="mt-6 text-[clamp(10px,3.2vw,14px)] md:text-base tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.3em] opacity-90 text-[#dec09a] whitespace-nowrap">
                Author · Philosopher · Soul Explorer
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <main className="relative mx-auto max-w-4xl px-4">

        {/* ABOUT */}
        <section id="about" className="relative scroll-mt-24 pt-24 pb-0">
          <div className="rounded-[10px] border-4 border-[#5b5a59] px-8 py-12 md:px-10 md:py-14 bg-white">
            <h2 className="text-3xl text-center mb-8">Entre les Mots et Moi</h2>
            <div className="space-y-4 mx-auto max-w-[50ch] text-[17px] text-center leading-6">
              <p>
                I’m a trilingual lyricist, author, and thinker. Raised in Spain, I
                grew up navigating a complex cultural identity—Spanish at home, French
                with family, and English at school.
              </p>
              <p>
                That mix shaped my worldview and my earliest experiences of
                communication, belonging, and self-expression. Often misunderstood
                because of language confusion, I developed a deep compassion for
                anyone who feels “different” or silenced by narrow definitions of
                normality.
              </p>
              <p>
                Over time, those challenges became insight. My work explores mental
                health, ego, emotional balance, and spiritual growth. I write to
                entertain, to question, and to laugh at modern life—and maybe say
                something true about the strangeness of being human.
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

          {/* RELEASE */}
          <section id="release" className="relative scroll-mt-24 py-24">
            <div className="rounded-[10px] border-4 bg-[#dec09a] border-[#5b5a59] px-8 py-12 md:px-10 md:py-14">              
              <h2 className="mb-2 text-center">
                <span className="alien-title">DISCOVER THE ALIEN IN DISGUISE:</span>
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide mb-6 text-center">A Thought-Provoking Debut Memoir</h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">            
                <div className="aspect-[2/3] flex items-center justify-center p-3 overflow-hidden -mt-6 sm:-mt-5 md:-mt-6">
                  <img
                    src="/the-alien-in-disguise.png"
                    alt="The Alien In Disguise — Book cover"
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="relative -mt-3 sm:-mt-4 md:mt-0 space-y-3 md:space-y-4 leading-6 text-neutral-900 text-center md:text-left md:max-w-prose md:ml-auto">
                  
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
                  What happens when a shape-shifting alien blob slips into a human body and tries to make sense of life on Earth?
                </p>
                <p>
                  <em>The Alien in Disguise: Trying to Understand Life on Earth</em> invites readers into a touching, humorous, and philosophical exploration of what it means to exist among humans—when you’re not quite one of them.
                </p>

                {/* Collapsible content */}
                <div
                  id="release-more"
                  className={`${showMoreRelease ? 'block' : 'hidden'} space-y-4`}
                  aria-hidden={!showMoreRelease}
                >
                  <p>
                    Told through the perspective of Blob—a curious, adaptable being from another planet—the book reflects on the confusion, contradictions, and beauty of human behaviour, emotions, and society. Blob isn’t here to conquer; only to understand. But fitting in proves far more difficult than anticipated.
                  </p>
                  <p>
                    This is a book for anyone who has ever felt out of place, misunderstood, or a little alien in their own world.
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
                  onClick={() => setShowMoreRelease(v => !v)}
                >
                  {showMoreRelease ? 'Read Less' : 'Read More'}
                </button>                  
                </div>        
              </div>            
              <div className="mt-10 text-center">              
                <div className="flex justify-center">
                  <a
                    href="https://mybook.to/thealienindisguise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA}
                  >
                    Check It Out!
                  </a>
                </div>  
              </div>  
            </div>       
          </section>        

      {/* BOOKS — three preview covers with full-size overlay */}
      <section id="books" className="relative scroll-mt-24 py-24">
        <div className="rounded-[10px] border-4 border-[#5b5a59] px-8 py-12 md:px-10 md:py-14 bg-[#5b5a59]">
          <h2 className="text-3xl text-center mb-10 text-[#c4c3c0]">Books: Now & Next</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {/* Card 1 */}
            <div className="group relative flex flex-col items-center">
              {/* Base cover */}
              <div className="relative w-64 sm:w-56 md:w-60 aspect-[2/3] rounded-md overflow-hidden mx-auto
                      ">
                <img
                  src="/el-alien-disfrazado.png"
                  alt="El Alien Disfrazado — Book cover"
                  className="absolute inset-0 w-full h-full object-cover md:object-contain"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />

                {/* Desktop overlay */}
                <div
                  className="hidden md:flex absolute inset-0 rounded-md bg-[rgba(255,255,255,0.8)] text-neutral-900 backdrop-blur-sm
                            shadow-[0_8px_24px_rgba(0,0,0,0.25)] p-4 flex-col items-center justify-center
                            opacity-0 translate-y-2 pointer-events-none transition border-2 border-[#000000]
                            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                  aria-hidden="true"
                >
                  <div className="w-full max-h-[50%]">
                    <img 
                      src="/Peek_Image_ES.png" 
                      alt="Image from book El Alien Disfrazado" 
                      className="w-full h-full object-contain rounded" 
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      />
                  </div>
                  <p className="text-sm leading-5 text-center mt-2 px-2 p-2">
                    ¿Qué pasa cuando un “blob” alienígena se mete en un cuerpo humano y trata de entender la vida en la Tierra?
                  </p>
                  <a
                    href="https://mybook.to/elaliendisfrazado"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA}
                  >
                    Take A Peek
                  </a>
                </div>
              </div>

              {/* Mobile details */}
             <div className="md:hidden text-center w-64 sm:w-56 mx-auto mt-0 space-y-6">
                  <p className="text-m leading-6 my-0">
                    ¿Qué pasa cuando un “blob” alienígena se mete en un cuerpo humano y trata de entender la vida en la Tierra?
                  </p>
                  <a
                    href="https://mybook.to/elaliendisfrazado"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA}
                  >
                    Take A Peek
                  </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative flex flex-col items-center">
              <div className="relative w-64 sm:w-56 md:w-60 aspect-[2/3] overflow-hidden mx-auto">
                <img
                  src="/hi-i-am-dad.png"
                  alt="Hi, I Am Dad — Book cover"
                  className="absolute inset-0 w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                <div
                  className="hidden md:flex absolute inset-0 rounded-md bg-[rgba(255,255,255,0.8)] text-neutral-900 backdrop-blur-sm
                            shadow-[0_8px_24px_rgba(0,0,0,0.25)] p-4 flex-col items-center justify-center
                            opacity-0 translate-y-2 pointer-events-none transition border-2 border-[#000000]
                            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                  aria-hidden="true"
                >
                  <div className="w-full max-h-[50%]">
                    <img 
                      src="/C1-Loyalty.png" 
                      alt="Image from book Hi, I Am Dad" 
                      className="w-full h-full object-contain rounded"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      />
                  </div>

                  <p className="text-sm leading-5 text-center mt-2 px-2 p-2">
                    "You are more than what you produce. You are more than what you solve. You are worthy, even when you stop.”
                  </p>
                  <a
                    href="https://mybook.to/hiamdad-fgf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA}
                  >
                    Take A Peek
                  </a>
                </div>
              </div>

              <div className="md:hidden text-center w-64 sm:w-56 mx-auto mt-0 space-y-6">
                  <p className="text-m leading-6 my-0">
                    "You are more than what you produce. You are more than what you solve. You are worthy, even when you stop.”
                  </p>
                  <a
                    href="https://mybook.to/hiamdad-fgf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA}
                  >
                    Take A Peek
                  </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative flex flex-col items-center">
              <div className="relative w-64 sm:w-56 md:w-60 aspect-[2/3] overflow-hidden mx-auto">
                <img
                  src="/NBR_2026.png"
                  alt="Future Release 2026"
                  className="absolute inset-0 w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
              
            </div>
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
            <p className="text-center mb-8 opacity-80">
              If something resonates with you — or if you’re just curious — don’t hesitate to get in touch.
            </p>
            <form
              action="https://formsubmit.co/e3a4e25ccb1ba58c8eb4d9477175cdcb"
              method="POST"
              onSubmit={handleAuthorSubmit}
              className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6"
            >
              {/* visible fields */}
              <input
                type="text"
                name="name"
                required
                className="rounded-[10px] border bg-white p-3 focus:outline-none focus:ring-1 focus:ring-[#dec09a]/60 focus:border-[#dec09a] transition text-sm"
                placeholder="Your Name"
              />
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="rounded-[10px] border bg-white p-3 focus:outline-none focus:ring-1 focus:ring-[#dec09a]/60 focus:border-[#dec09a] transition text-sm"
                placeholder="Your Email *"
              />
              <input
                type="text"
                name="subject"
                className="rounded-[10px] border bg-white p-3 md:col-span-2 focus:outline-none focus:ring-1 focus:ring-[#dec09a]/60 focus:border-[#dec09a] transition text-sm"
                placeholder="Subject"
              />
              <textarea
                name="message"
                required
                className="rounded-[10px] border bg-white p-3 md:col-span-2 h-40 focus:outline-none focus:ring-1 focus:ring-[#dec09a]/60 focus:border-[#dec09a] transition resize-y text-sm"
                placeholder="What's on your mind?"
              />

              {/* hidden config */}
              <input type="hidden" name="_subject" value="New message from AUTHOR page" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://www.ffg-universe.com/author#contact" />

              {/* spam honeypot */}
              <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

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
          <p className="m-0">“New words are on the way.</p>
          <p className="m-0">Check back for the next release!”</p>
        </blockquote>

        {/* Center: copyright */}
        <div className="text-center text-sm">
        <p> © {new Date().getFullYear()} Frederic G. Fleron Grignard</p><p>All rights reserved</p> 
        </div>

        {/* Right: socials */}
        <div className="flex justify-center md:justify-end items-center gap-5">
 
          {/* Instagram */}
          <a
            href="https://instagram.com/fleronverse"
            target="_blank" rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#c4c3c0] hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dec09a]"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>

          {/* Amazon */}
          <a
            href="https://www.amazon.de/stores/Frederic-G.-Fleron-Grignard/author/B0FGZ58L81?language=en&ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true"
            target="_blank" rel="noopener noreferrer"
            aria-label="Amazon Author Page"
            className="text-[#c4c3c0] hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dec09a]"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            
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
                {toast.type === "success" ? "Message sent" : "Something went wrong"}
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