import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Home, Music4, Info, X, Mail, CircleCheckBig, AlertCircle, Scale, CheckCircle2 } from "lucide-react";

import PageHead from "./components/PageHead";

type Track = {
  id: string;
  title: string;
  file: string;
  mood?: string;
  lyrics: string;
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
      {
        id: "bounce_around",
        title: "Bounce Around",
        file: "/music/previews/bounce_around.mp3",
        mood: "Upbeat / Playful",
        lyrics: `Verse 1
        I can hear it
        Calling out to me
        I can feel it
        All over my skin
        A breeze that brings back 
        Good old memories
        Comes and goes
        Dancing in the wind

        If only I knew then
        What now I see clear
        Man it wouldn't have
        Taken me years
        So now I'll say 
        Live day after day
        Yes now I'll say 
        Live day after day

        Chorus
        And go bounce, yes go bounce
        Go bounce around
        Go bounce somewhere
        Yes go bounce, yes go bounce
        Go bounce around
        Go bounce somewhere

        Yes go bounce, yes go bounce 
        Go bounce around
        Go bounce somewhere
        Hey go bounce, yes go bounce 
        Go bounce around 
        Go bounce somewhere

        Verse 2
        I sank beneath the surface
        While trying to stay afloat
        And when the whistle blew 
        That's when I saw the boat

        Not knowing what I had
        Is when I lost track
        And man it's messed up
        To end up like that
        So now I'll say
        Live day after day
        Yes now I'll say
        Live day after day

        Final chorus
        And go bounce, yes go bounce
        Go bounce around
        Go bounce somewhere
        Yes go bounce, yes go bounce
        Go bounce around
        Go bounce somewhere

        Yes go bounce, yes go bounce 
        Go bounce around
        Go bounce somewhere
        Hey go bounce, yes go bounce 
        Go bounce around 
        Go bounce somewhere

        Yes go bounce, yes go bounce
        Go bounce around
        Go bounce somewhere
        Yes go bounce, yes go bounce 
        Go bounce around 
        Go bounce somewhere

        Yes go bounce, yes go bounce
        Go bounce around 
        Go bounce somewhere
        Hey go bounce, yes go bounce
        Go bounce around 
        Go bounce somewhere`
        ,
      },
      {
        id: "fast_train",
        title: "Fast Train",
        file: "/music/previews/fast_train.mp3",
        mood: "Driving / Forward",
        lyrics: `Verse 1
        There goes another town
        Flashing past
        As I'm staring out the window
        With my eyes fixed on the stars
        I'm remembering things I've done
        All those years have gone by
        So many different places
        I have left behind

        Pre-chorus
        I'm heading out somewhere
        As far as this fast train will take me
        Where I'm hoping that maybe
        I will find some peace of mind

        After hard times 
        I can say that I'm ready 
        To stay on course, keep it steady
        And have a laugh
        Yes live a while

        Chorus
        And oh I wish I had the cure
        To avoid the pain 
        I've had endure
        And how my life had been much more
        Than figuring out
        How to go on 
        How to go on

        Verse 2
        Here comes someone else 
        With the need to talk
        I'll ask the usual questions 
        Like where're you coming from?
        But I'll spice things up a bit
        Tell me all about your dreams
        Did you do all you wished for? 
        Or is there more to see?

        Pre-chorus
        I'm heading out somewhere
        As far as this fast train will take me
        Where I'm hoping that maybe
        I will find some peace of mind

        After hard times 
        I can say that I'm ready 
        To stay on course, keep it steady
        And have a laugh 
        Yes live a while

        Final chorus
        And oh I wish I had the cure
        To avoid the pain 
        I've had endure
        And how my life had been much more
        Than figuring out
        How to go on 
        
        And oh I wish I had the cure
        To avoid the pain 
        I've had endure
        And how my life had been much more
        Than figuring out
        How to go on 
        How to go on`
        ,
      },
      {
        id: "feel_alive",
        title: "Feel Alive",
        file: "/music/previews/feel_alive.mp3",
        mood: "Bright / Energetic",
        lyrics: `Verse 1 
        Fairy tales can happen sometimes 
        So when they happen
        Try to make them last 
        Maybe that's what it's all about
        Memories to cherish with a smile
        
        Chorus 
        And maybe we could try
        Only for a while
        Laughing will bring the beauty out 
        And hope that we can see 
        Far beyond the clouds
        That darkened our lives in the past
        
        Verse 2 
        Lullabies were always sweet to tell
        In soften whispers spoken to her ears 
        Those were times 
        I'd close my eyes and breathe
        Every inch I felt of her skin 
        
        Bridge
        'Cause for so long I couldn't help 
        But scream at the sky 
        And ask the rain to stop
        Like the tears in my eyes 
        So go on sunshine
        And brake the night with light 
        I want to feel alive 
        
        Final chorus 
        And maybe we could try 
        Only for a while 
        Laughing will bring the beauty out 
        And maybe we can see
        Far beyond the clouds
        That darkened our lives in the past`,
      },
      {
        id: "held_back",
        title: "Held Back",
        file: "/music/previews/held_back.mp3",
        mood: "Reflective / Tense",
        lyrics: `Chorus
        So many times
        That I felt in life
        Like I was given the chance
        To get what I want
        But I held back
        I held back

        It makes it harder now
        To live with regret
        Knowing after all
        It was my mistake
        'Cause I held back
        I held back

        And who could I pass the blame to?
        Oh, so selfish of me
        And would it be worth to attempt to
        After all this time do what I should?

        Verse 1
        I should have tried it out
        Though it seemed insane
        I should have asked her out
        Or at least got her name
        I should have spoken up
        When I was being blamed
        Instead of doing nothing
        Just to be afraid

        I should have packed my things
        And travelled far away
        I should have taken risks
        Instead of playing it safe
        I know I should do something
        Before it gets too late
        I can't go on like this
        I've got to make a change

        Post-chorus
        'Cause I know
        Ah, ah, ah
        Yes I know
        Ah, ah, ah
        Yes I know
        It's not too late

        Yes I know
        Ah, ah, ah
        Yes I know
        Ah, ah, ah
        Yes I know
        It's not too late

        Chorus
        So many times
        That I felt in life
        Like I was given the chance
        To get what I want
        But I held back
        I held back

        It makes it harder now
        To live with regret
        Knowing after all
        It was my mistake
        'Cause I held back
        I held back

        And who could I pass the blame to?
        Oh, so selfish of me
        And would it be worth to attempt to
        After all this time do what I should?

        Verse 2
        I should have stopped trying
        Being someone else
        I should have spent more time
        Deep within myself
        I should ignore
        All the nonsense in my head
        And accept the fact
        Being me is okay

        I should resist the urge
        To be a hypocrite
        And care so much about
        What other people think
        To live my life
        Just the way it is
        Instead of doing
        Quite the opposite

        Post-chorus
        'Cause I know
        Ah, ah, ah
        Yes I know
        Ah, ah, ah
        Yes I know
        It's not too late

        Yes I know
        Ah, ah, ah
        Yes I know
        Ah, ah, ah
        Yes I know
        It's not too late

        Final chorus
        So many times
        That I felt in life
        Like I was given the chance
        To get what I want
        But I held back
        I held back`
        ,
      },
      {
        id: "lovely_in_the_sun",
        title: "Lovely in the Sun",
        file: "/music/previews/lovely_in_the_sun.mp3",
        mood: "Warm / Open",
        lyrics: `Verse 1
        Suddenly it's come to me
        What I searched, a remedy
        I walked the miles and lived quite wild
        Among the mess is where I found
        That nothing is what's supposed to be
        And that is how I've learned to see
        He or she can join the game
        The rules apply to all the same
        
        Chorus
        In the sun is lovely
        Lovely, lovely, lovely
        In the sun is lovely
        Lovely, in the sun

        In the sun is lovely
        Lovely, lovely, lovely
        In the sun is lovely
        Lovely, in the sun

        Verse 2
        I plant good seeds for Heaven's sakes
        On harvest day we'll celebrate
        What we sow is what we reap
        So share the joy with who we meet
        Call our friends and families
        Let us be in harmony
        Pass the laughs hand in hand
        And play the songs that make us dance

        Chorus
        In the sun is lovely
        Lovely, lovely, lovely
        In the sun is lovely
        Lovely, in the sun

        In the sun is lovely
        Lovely, lovely, lovely
        In the sun is lovely
        Lovely, in the sun

        Bridge
        Oh I know
        If we help a bit
        It comes right back
        Like all, we do
        Has the same effect
        Of the boomerang
        
        So walk along
        The path of love 
        I'll be waiting on
        For you
        Now come
        If you want

        Chorus
        In the sun is lovely
        Lovely, lovely, lovely
        In the sun is lovely
        Lovely, in the sun

        In the sun is lovely
        Lovely, lovely, lovely
        In the sun is lovely
        Lovely, in the sun

        In the sun is lovely
        Lovely, lovely, lovely
        In the sun is lovely
        Lovely, in the sun

        In the sun is lovely
        Lovely, lovely, lovely
        In the sun is lovely
        Lovely, in the sun
        `,
      },
      {
        id: "my_home_is_in_heaven",
        title: "My Home is in Heaven",
        file: "/music/previews/my_home_is_in_heaven.mp3",
        mood: "Spiritual / Uplifting",
        lyrics: `Verse 1
        I sold my soul
        For a short-lived reputation
        But now I'm old
        I owe my debt to the Devil
        Now he don't care
        About my good intentions
        He'll drag me down to Hell
        Though my home's in Heaven
        
        Verse 2
        I've done you wrong Lord
        Won't you give me redemption?
        You know I was young
        Ruled by temptations
        Now he don't care
        About love and affection
        He'll drag me down to Hell
        Though my home's in Heaven

        Chorus
        I've been walking down the line, Lord
        Night and day
        Stepped into the dark
        Kept one foot in grace
        And if the Devil comes calling
        I will shout your name
        Lord have mercy please
        Before it's too late

        Verse 3
        I shook his hand
        In the burn of desire
        He promised me gold
        I got to feeding the fire
        Now he don't care 
        About those I inspire
        He'll drag me down to Hell
        Though my home's in Heaven

        Chorus
        I've been walking down the line, Lord
        Night and day
        Stepped into the dark
        Kept one foot in grace
        And if the Devil comes calling
        I will shout your name
        Lord have mercy please
        Before it's too late

        I've been walking down the line, Lord
        Night and day
        Stepped into the dark
        Kept one foot in grace
        And if the Devil comes calling
        I will shout your name
        Lord have mercy please
        Before it's too late`,
      },
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

  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  
  const [legalOpen, setLegalOpen] = useState(false);
  
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<null | { type: "success" | "error"; text: string }>(null);

  const [contactPreset, setContactPreset] = useState<null | { subject?: string; message?: string }>(null);
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLyricsOpen(false);
        setActiveTrack(null);
        setLegalOpen(false);
        setHowItWorksOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!contactPreset) return;
    if (contactPreset.subject !== undefined) setContactSubject(contactPreset.subject);
    if (contactPreset.message !== undefined) setContactMessage(contactPreset.message);
  }, [contactPreset]);

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

  async function handleMusicianSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setToast(null);

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);

      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Request failed");

      setToast({ type: "success", text: "Thanks! Your message was sent." });
      form.reset();
      setContactSubject("");
      setContactMessage("");
      setContactPreset(null);
    } catch {
      setToast({ type: "error", text: "Please try again in a moment." });
    } finally {
      setSending(false);
      window.setTimeout(() => setToast(null), 6000);
    }
  }

  return (
    <main
      className="min-h-screen musician-page"
      style={{
        backgroundColor: "#efe6d8",
      }}
    >
      <div id="home" />
      <PageHead title="Musician — It sounds like you" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap');

        .musician-page {
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
        }

        .musician-page h1,
        .musician-page h2,
        .musician-page h3 {
          font-family: "Cormorant Garamond", ui-serif, Georgia, Cambria, "Times New Roman", serif;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

      `}</style>


      {/* Header */}
      <header className="bg-black/5 backdrop-blur border-b border-black/10 relative">

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
            <img src="/music/logo.png" alt="Musician logo" className="h-16 md:h-32 w-auto" />
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
          <div className="md:hidden border-t border-black/10 bg-black/5">
            <ul className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
              {navSections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 py-2 text-sm hover:opacity-70"
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
            <p className="text-sm uppercase tracking-[0.22em] opacity-70">Album</p>
            <h1 className="mt-3 text-4xl md:text-6xl leading-tight">
              It sounds like you
            </h1>
            <div className="mt-4 flex items-start gap-2 max-w-xl text-black/80">
              <p className="mt-4 max-w-xl text-black/80">
                Short previews of original songs — written to give voice, tone, and melody to the things life puts us through. If something resonates, you can request to purchase a song or the full 6-song album.
                <button
                  type="button"
                  onClick={() => setHowItWorksOpen(true)}
                  className="ml-2 inline-flex h-6 w-6 translate-y-[2px] items-center justify-center rounded-full border border-black/15 text-black/70 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                  aria-label="How it works"
                >
                  <Info size={20} strokeWidth={1.5} />
                </button>
              </p>

            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo(sections.songs)}
                className="rounded-full border border-black/15 bg-white/60 px-5 py-2 text-sm hover:bg-white/80 transition"
              >
                Listen to previews
              </button>
              <button
                onClick={() => scrollTo(sections.contact)}
                className="rounded-full border border-black/15 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 transition"
              >
                Request purchase
              </button>
            </div>
          </div>

          {/* Cover */}
          <div className="md:justify-self-end">
            <div className="rounded-3xl border border-black/10 bg-white/40 p-3 shadow-sm">
              <img
                src="/music/cover.jpg"
                alt="Album cover — It sounds like you"
                className="w-full max-w-[420px] rounded-2xl object-cover"
              />
            </div>
            <p
              className="mt-3 text-xs text-black/50 text-center md:text-right"
            >
              Original composition & artwork
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={sections.about} className="py-12 md:py-16">
        <div className="bg-black/5 border-y border-black/10">
          <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Profile image */}
            <div className="flex justify-center md:justify-start items-end -mb-10 md:-mb-10">
              <img
                src="/music/about.png"
                alt="Frederic G. Fleron Grignard"
                className="w-full max-w-[600px] h-auto"
              />
            </div>

            {/* About text */}
            <div className="mt-4 md:mt-4">
              <h2 className="text-3xl md:text-4xl">About</h2>
                <p className="mt-3 text-sm md:text-base opacity-85" style={{ lineHeight: "1.5" }}>
                  Music is how my soul sounds when it speaks. It carries the footsteps of the places I have walked, the faces that stayed with me, and the feelings that asked to be heard. Each song arrives like a memory returning, dressed in melody, shaped into words, and offered as it came to me.
                  <br /><br />
                  These songs are pieces of a lived life, carried by melody, shaped by time, and left open so each listener may find their own reflection inside them.
                  <br /><br />
                  Welcome. I'm Frederic G. Fleron Grignard.
                  <br />
                  <span
                    className="block mt-4 text-[clamp(8px,3.2vw,12px)] md:text-base tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.3em] opacity-90 text-[#7a8b93]"
                    style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
                  >
                    Musician · Backpacker · Songweaver
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Songs */}
      <section ref={sections.songs} className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-3xl md:text-4xl">Preview tracks</h2>
        <div className="flex items-center justify-between gap-4 text-sm md:text-base text-black/70">
          <p>
            35-45 second previews. Full tracks are shared privately upon purchase.
          </p>

         <button
          type="button"
          onClick={() => setLegalOpen(true)}
          className="ml-2 inline-flex h-6 w-6 translate-y-[2px] items-center justify-center rounded-full border border-black/15 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          aria-label="Legal terms"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-black/70">
            <Scale size={10} strokeWidth={1.5} className="text-black/70" />
          </span>
        </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {tracks.map((t) => (
            <article key={t.id} className="rounded-3xl border border-black/10 bg-white/55 p-5 md:p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl">{t.title}</h3>
                  {t.mood && (
                    <p className="mt-1 text-sm opacity-70">
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
                    el.volume = 0.6;
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
                >
                  Inquire about this song
                </button>

                <button
                  onClick={() => {
                    setActiveTrack(t);
                    setLyricsOpen(true);
                  }}
                  className="rounded-full border border-black/15 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 transition"
                >
                  Lyrics
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Album + Contact */}
      <div className="mx-auto max-w-6xl px-6 py-10 pb-20">
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch">

          {/* Album */}
          <section ref={sections.album} className="h-full">
            <div className="h-full rounded-3xl border border-black/10 bg-black/5 p-6 md:p-10 shadow-sm">
              <h2 className="text-2xl md:text-3xl">Full 6-song album</h2>
              <p className="mt-4 text-black/80 max-w-md">
                This debut collection brings together six original songs written and recorded independently. Created as part of an ongoing artistic practice, the album explores voice, atmosphere, and personal narrative through minimal production.
              </p>
              <p className="mt-3 opacity-80"
              >
                Want the full set of six songs? Send a request using the contact form and you will receive a secure PayPal link by email. After payment, the full album will be delivered personally as a private download.
              </p>

              <button
                onClick={() => {
                  setContactPreset({
                    subject: "Album purchase request",
                    message:
                      "Hi Frederic,\n\nI would love to purchase the full 6-song album. Please let me know the details.\n\nThank you,",
                  });
                  scrollTo(sections.contact);
                }}
                className="mt-6 rounded-full border border-black/15 bg-white/60 px-5 py-2 text-sm hover:bg-white/80 transition"
              >
                Request album purchase
              </button>
            </div>
          </section>

          {/* Contact */}
          <section ref={sections.contact} className="h-full">
            <div className="h-full rounded-3xl border border-black/10 bg-[#a5adaf] p-6 md:p-10 shadow-sm">
              <h2 className="text-2xl md:text-3xl">Contact</h2>
              <form
                action="https://formsubmit.co/5fbe1cd6ca420026a59128ebbea6c656"
                method="POST"
                onSubmit={handleMusicianSubmit}
                className="mt-6 grid grid-cols-1 gap-3"
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-xl border border-black/15 bg-white/70 px-3 py-2 text-sm text-neutral-900
                            focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-black/30 transition"
                />

                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Your email"
                  className="rounded-xl border border-black/15 bg-white/70 px-3 py-2 text-sm text-neutral-900
                            focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-black/30 transition"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (optional)"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="rounded-xl border border-black/15 bg-white/70 px-3 py-2 text-sm text-neutral-900
                            focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-black/30 transition"
                />

                <textarea
                  name="message"
                  required
                  placeholder="Message"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="rounded-xl border border-black/15 bg-white/70 px-3 py-2 text-sm text-neutral-900 h-28 resize-y
                            focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-black/30 transition"
                />

                {/* hidden config */}
                <input type="hidden" name="_subject" value="New message from MUSICIAN page" />
                <input type="hidden" name="_captcha" value="false" />            
                <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

               <button
                type="submit"
                disabled={sending}
                className="justify-self-start inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-5 py-2 text-sm hover:bg-white/80 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Mail className="h-4 w-4" />
                {sending ? "Sending..." : "Send"}
              </button>
              <div className="mt-4 flex items-start gap-2 text-xs text-black/60">
                <div className="flex h-4 w-4 items-center justify-center">
                  <CircleCheckBig size={14} strokeWidth={1.5} />
                </div>
                <p>
                  After you submit your request, you will receive a secure PayPal link by email.
                </p>
              </div>
              </form>
            </div>
          </section>
        </div>
      </div>

      <footer className="relative text-[#e3d9cd] bg-neutral-900 border-t border-black/10 backdrop-blur">

          <a
            href="#home"
            aria-label="Back to top"
            title="Back to top"
            className="
              absolute left-1/2 -translate-x-1/2 -top-6 z-20
              inline-flex items-center justify-center h-12 w-12 rounded-full
              bg-[#e3d9cd] text-neutral-900 border border-neutral-900
              hover:bg-[#efe5d8] transition-colors
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

      <div className="mx-auto max-w-6xl px-6 py-20">
  <div className="grid gap-8 md:grid-cols-3 md:items-center">

    {/* Left: extra touch */}
    <div className="flex items-center justify-center md:justify-start gap-3 text-xs opacity-80">
      <Music4 className="h-4 w-4 shrink-0 opacity-80" />
      <div className="italic leading-snug">
        More songs will come<br />
        When they are ready
      </div>
    </div>

    {/* Center: copyright */}
    <div className="text-center text-xs opacity-90">
      <div>© {new Date().getFullYear()} Frederic G. Fleron Grignard</div>
      <div>All rights reserved</div>
    </div>

    {/* Right: Legal */}
    <div className="flex justify-center md:justify-end">
      <button
        type="button"
        onClick={() => setLegalOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-[#e3d9cd] px-5 py-2 text-xs hover:bg-[#262626] transition"
      >
        <Scale className="h-4 w-4 opacity-80" />
        Legal / Terms of use
      </button>
    </div>

  </div>
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/60 backdrop-blur-md" />
            <div
              className="relative w-full max-w-2xl rounded-3xl bg-[#fbfaf7] ring-1 ring-black/10 shadow-[0_35px_110px_-40px_rgba(0,0,0,0.65)] p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
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
                className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-black/10 
                bg-white/70 hover:bg-black/5 transition"
                onClick={() => {
                  setLyricsOpen(false);
                  setActiveTrack(null);
                }}
              >
                <X className="h-4 w-4 opacity-70" />
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-black/10 max-h-[60vh] overflow-auto pr-2">
              <div className="md:columns-2 md:gap-12 [column-fill:balance] text-[15px] md:text-[16px] text-black/80">
                {(activeTrack?.lyrics ?? "Lyrics coming soon.")
                  .replace(/^[ \t]+/gm, "")
                  .split("\n")
                  .map((line, idx) => {
                    const t = line.trim();

                    const isHeading =
                    /^Verse\s+\d+$/i.test(t) ||
                    /^Pre-chorus$/i.test(t) ||
                    /^Post-chorus$/i.test(t) ||
                    /^Bridge$/i.test(t) ||
                    /^Chorus$/i.test(t) ||
                    /^Final chorus$/i.test(t);

                    // blank line spacer
                    if (t.length === 0) {
                      return <div key={idx} className="h-4 break-inside-avoid" />;
                    }

                    return isHeading ? (
                      <div
                        key={idx}
                        className="mt-4 mb-2 text-xs uppercase tracking-widest font-semibold opacity-60 break-inside-avoid"
                      >
                        {t}
                      </div>
                    ) : (
                      <div
                        key={idx}
                        className="text-sm md:text-[15px] leading-relaxed opacity-90 break-inside-avoid"
                      >
                        {t}
                      </div>
                    );
                  })}
              </div>
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
                onClick={() => setLegalOpen(false)}
                className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-black/10 bg-white/70 hover:bg-black/5 transition"
                aria-label="Close"
              >
                <X className="h-4 w-4 opacity-70" />
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

      {howItWorksOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setHowItWorksOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHowItWorksOpen(false)}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-black/15 text-black/70 hover:bg-black/5"
              aria-label="Close"
            >
              <X size={14} strokeWidth={1.5} />
            </button>

            <h2 className="mb-3 text-base font-medium">How it works</h2>

            <div className="space-y-3 text-sm text-black/80">

              <p>
                You can request either a single song or the full album using the contact form.
              </p>

              <p>
                After your request, you will receive a secure PayPal link by email with the details.
              </p>

              <p>
                Once payment is confirmed, the selected tracks will be delivered privately as a download.
              </p>

              <p className="text-xs text-black/60">
                Preview clips on this page are shortened versions.
              </p>

            </div>

          </div>
        </div>
      )}

     
      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="fixed z-[100] bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4"
        >
          <div className="flex items-start gap-3 rounded-xl border border-black/15 bg-white/90 text-neutral-900 shadow-lg backdrop-blur px-4 py-3">
            {toast.type === "success" ? (
              <CheckCircle2 size={18} aria-hidden className="shrink-0" />
            ) : (
              <AlertCircle size={18} aria-hidden className="shrink-0" />
            )}

            <div className="min-w-0 flex-1">
              <div className="font-medium">
                {toast.type === "success" ? "Message sent" : "Something went wrong"}
              </div>
              <div className="opacity-80 break-words">
                {toast.text}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-2 underline text-sm shrink-0"
              aria-label="Close notification"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
