import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Home, Mail, Music2 } from "lucide-react";
import PageHead from "./components/PageHead";

type Track = {
  id: string;
  title: string;
  file: string;
  mood?: string;
};

export default function MusicianPage() {
  const sections = {
    about: useRef<HTMLElement | null>(null),
    songs: useRef<HTMLElement | null>(null),
    album: useRef<HTMLElement | null>(null),
    contact: useRef<HTMLElement | null>(null),
  };

  const tracks: Track[] = useMemo(
    () => [
      { id: "bounce_around", title: "Bounce Around", file: "/music/previews/bounce_around.mp3", mood: "Upbeat / playful" },
      { id: "fast_train", title: "Fast Train", file: "/music/previews/fast_train.mp3", mood: "Driving / forward" },
      { id: "feel_alive", title: "Feel Alive", file: "/music/previews/feel_alive.mp3", mood: "Bright / energetic" },
      { id: "held_back", title: "Held Back", file: "/music/previews/held_back.mp3", mood: "Reflective / tense" },
      { id: "lovely_in_the_sun", title: "Lovely in the Sun", file: "/music/previews/lovely_in_the_sun.mp3", mood: "Warm / open" },
      { id: "my_home_is_in_heaven", title: "My Home Is in Heaven", file: "/music/previews/my_home_is_in_heaven.mp3", mood: "Spiritual / uplifting" },
    ],
    []
  );

  const [open, setOpen] = useState(false);

  const navSections = [
    { id: "about", label: "About" },
    { id: "songs", label: "Songs" },
    { id: "album", label: "Album" },
    { id: "contact", label: "Contact" },
  ] as const;

  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [legalOpen, setLegalOpen] = useState(false);

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLyricsOpen(false);
        setActiveTrack(null);
        setLegalOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const pauseOthers = useCallback((currentId: string) => {
    Object.entries(audioRefs.current).forEach(([id, el]) => {
      if (!el) return;
      if (id !== currentId && !el.paused) {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, []);

  const pageFont = `"Playfair Display", ui-serif, Georgia, Cambria, "Times New Roman", serif`;

  return (
    <main
      className="min-h-screen"
      style={{
        fontFamily: pageFont,
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(253, 230, 215, 0.75), transparent 60%)," +
          "radial-gradient(900px 500px at 80% 20%, rgba(226, 232, 255, 0.65), transparent 55%)," +
          "linear-gradient(180deg, rgba(255,255,255,0.90), rgba(255,255,255,0.78))",
      }}
    >
      <PageHead title="Musician — It sounds like you" />

      {/* Header */}
      <header className="bg-white/50 backdrop-blur border-b relative">

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
            <img src="/FG.png" alt="Musician logo" className="h-16 md:h-32 w-auto" />
          </div>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-6 self-end">
            {navSections.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    if (s.id === "about") scrollTo(sections.about);
                    if (s.id === "songs") scrollTo(sections.songs);
                    if (s.id === "album") scrollTo(sections.album);
                    if (s.id === "contact") scrollTo(sections.contact);
                  }}
                  className="relative block pb-2 text-sm tracking-wide after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:rounded-full after:bg-neutral-800 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                  style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile burger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-black/15 hover:bg-black/5"
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
          <div className="md:hidden border-t border-black/10 bg-white/80 backdrop-blur">
            <ul className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
              {navSections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 py-2 text-sm hover:opacity-70"
                    style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
                    onClick={() => {
                      setOpen(false);
                      if (s.id === "about") scrollTo(sections.about);
                      if (s.id === "songs") scrollTo(sections.songs);
                      if (s.id === "album") scrollTo(sections.album);
                      if (s.id === "contact") scrollTo(sections.contact);
                    }}
                  >
                    {s.label}
                  </button>
                </li>
              ))}

              <li className="pt-2 mt-1 border-t border-black/10">
                <Link to="/" className="flex items-center gap-2 py-2 text-sm hover:opacity-70" onClick={() => setOpen(false)}>
                  <Home className="h-6 w-6 p-1 rounded-full border border-black/15 hover:bg-black/5" />
                  Home
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <p className="text-sm uppercase tracking-[0.22em] opacity-70">Musician</p>
            <h1 className="mt-3 text-4xl md:text-6xl leading-tight">
              It sounds like you
            </h1>
            <p
              className="mt-5 max-w-2xl text-base md:text-lg opacity-80"
              style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
            >
              Short previews of original songs — written to give voice, tone, and melody to the things life puts us through.
              If something resonates, you can request to purchase a song or the full 7-song album.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo(sections.songs)}
                className="rounded-full border border-black/15 bg-white/60 px-5 py-2 text-sm hover:bg-white/80 transition"
                style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
              >
                Listen to previews
              </button>
              <button
                onClick={() => scrollTo(sections.contact)}
                className="rounded-full border border-black/15 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 transition"
                style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
              >
                Request purchase
              </button>
            </div>
          </div>

          {/* Cover */}
          <div className="md:justify-self-end">
            <div className="rounded-3xl border border-black/10 bg-white/40 p-3 shadow-sm">
              <img
                src="/music/cover.png"
                alt="Album cover — It sounds like you"
                className="w-full max-w-[420px] rounded-2xl object-cover"
              />
            </div>
            <p
              className="mt-3 text-xs opacity-70 text-center md:text-right"
              style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
            >
              Album artwork (placeholder)
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={sections.about} className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-black/10 bg-white/55 p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl">About</h2>
          <p
            className="mt-4 text-base md:text-lg opacity-85"
            style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
          >
            These songs were written over time — through delays, detours, responsibilities, and the strange humor of
            “almost making it.” They’re not here to compete with perfection. They’re here to connect.
          </p>
        </div>
      </section>

      {/* Songs */}
      <section ref={sections.songs} className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl md:text-3xl">Preview tracks</h2>
        <p
          className="mt-2 opacity-75"
          style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
        >
          35–40 second previews. Full tracks are shared privately upon purchase.{" "}
          <button
            type="button"
            onClick={() => setLegalOpen(true)}
            className="underline underline-offset-4 hover:opacity-80 transition"
          >
            More details…
          </button>
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {tracks.map((t) => (
            <article key={t.id} className="rounded-3xl border border-black/10 bg-white/55 p-5 md:p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl">{t.title}</h3>
                  {t.mood && (
                    <p className="mt-1 text-sm opacity-70" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}>
                      {t.mood}
                    </p>
                  )}
                </div>
              </div>

              <audio
                className="mt-4 w-full"
                controls
                preload="none"
                controlsList="nodownload"
                ref={(el) => {
                  audioRefs.current[t.id] = el;
                  if (el) {
                    el.volume = 0.6; // default medium volume
                  }
                }}
                onPlay={() => pauseOthers(t.id)}
              >
                <source src={t.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => scrollTo(sections.contact)}
                  className="rounded-full border border-black/15 bg-white/60 px-4 py-2 text-sm hover:bg-white/80 transition"
                  style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
                >
                  Inquire about this song
                </button>

                <button
                  onClick={() => {
                    setActiveTrack(t);
                    setLyricsOpen(true);
                  }}
                  className="rounded-full border border-black/15 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 transition"
                  style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
                >
                  Lyrics
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Album */}
      <section ref={sections.album} className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-black/10 bg-white/55 p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl">Full 7-song album</h2>
          <p className="mt-3 opacity-80" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}>
            Want the full set of seven songs? You can request an album purchase and I’ll share details privately
            (delivery + pricing) and send the full tracks after confirmation.
          </p>
          <button
            onClick={() => scrollTo(sections.contact)}
            className="mt-6 rounded-full border border-black/15 bg-white/60 px-5 py-2 text-sm hover:bg-white/80 transition"
            style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
          >
            Request album purchase
          </button>
        </div>
      </section>

      {/* Contact */}
      <section ref={sections.contact} className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="rounded-3xl border border-black/10 bg-white/55 p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl">Contact</h2>
          <p className="mt-3 opacity-80" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}>
            For now we’ll keep this simple: a direct email request. Next step we can add a real form (Formspree/Resend)
            if you want.
          </p>

          {/* Replace this email with yours */}
          <a
            href="mailto:you@example.com?subject=Music%20purchase%20request&body=Hi%20Frederic%2C%0A%0AI'm%20interested%20in%3A%0A-%20%5BIndividual%20song%20licensing%20/%20Full%20album%5D%0A-%20Track%20name%20(if%20applicable)%3A%20%0A%0AThank%20you!"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-5 py-2 text-sm hover:bg-white/80 transition"
            style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
          >
            <Mail className="h-4 w-4" />
            Email me
          </a>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p
            className="text-sm opacity-75"
            style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
          >
            © {new Date().getFullYear()} Frederic G. Fleron Grignard. All rights reserved.
          </p>

          <button
            type="button"
            onClick={() => setLegalOpen(true)}
            className="rounded-full border border-black/15 bg-white/60 px-4 py-2 text-sm hover:bg-white/80 transition"
            style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
          >
            Legal / Terms of use
          </button>
        </div>
      </footer>

      {lyricsOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Lyrics dialog"
          onClick={() => {
            setLyricsOpen(false);
            setActiveTrack(null);
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-white/90 p-6 md:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] opacity-70">Lyrics</p>
                <h3 className="mt-2 text-2xl" style={{ fontFamily: `"Playfair Display", ui-serif, Georgia, Cambria, "Times New Roman", serif` }}>
                  {activeTrack?.title ?? "Song"}
                </h3>
              </div>
              <button
                aria-label="Close lyrics"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white/70 hover:bg-white transition"
                onClick={() => {
                  setLyricsOpen(false);
                  setActiveTrack(null);
                }}
              >
                ✕
              </button>
            </div>

            <div className="mt-6 whitespace-pre-wrap leading-relaxed text-base opacity-90">
              {/* Replace this with real lyrics later */}
              Lyrics will be added here.
            </div>
          </div>
        </div>
      )}

      {legalOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Legal terms dialog"
          onClick={() => setLegalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-white/20 bg-white/90 p-6 md:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] opacity-70">Legal</p>
                <h3
                  className="mt-2 text-2xl"
                  style={{ fontFamily: `"Playfair Display", ui-serif, Georgia, Cambria, "Times New Roman", serif` }}
                >
                  Terms of use & copyright
                </h3>
              </div>
              <button
                aria-label="Close legal"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white/70 hover:bg-white transition"
                onClick={() => setLegalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4 leading-relaxed text-sm md:text-base opacity-90">
              <p>
                <strong>Preview-only listening:</strong> The audio on this page consists of short previews intended for evaluation.
                Full tracks are shared privately upon purchase.
              </p>
              <p>
                <strong>Copyright:</strong> All music, lyrics, and recordings are protected by copyright. No part of these previews
                may be reproduced, redistributed, sampled, or used in other works without written permission.
              </p>
              <p>
                <strong>Purchasing / licensing:</strong> If you want to purchase a song or the full album, please contact me.
                Terms (pricing, usage, delivery format) are confirmed privately.
              </p>
              <p>
                <strong>Respectful use:</strong> Please do not upload these previews to other platforms or share direct files publicly.
              </p>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
