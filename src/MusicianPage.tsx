import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Home, Mail, Music2, Info, X, ChevronUp } from "lucide-react";
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
                src="/music/cover.jpg"
                alt="Album cover — It sounds like you"
                className="w-full max-w-[420px] rounded-2xl object-cover"
              />
            </div>
            <p
              className="mt-3 text-xs text-black/50 text-center md:text-right"
              style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
            >
              Original composition & artwork
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={sections.about} className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-black/10 bg-white/55 p-6 md:p-10 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">

      {/* Profile image */}
      <div className="flex justify-center md:justify-start">
        <img
          src="/music/about.png"
          alt="Frederic G. Fleron Grignard"
          className="w-64 md:w-80 h-auto rounded-2xl shadow-sm"
        />
      </div>

      {/* About text */}
      <div>
        <h2 className="text-2xl md:text-3xl">About</h2>
          <p className="mt-3 text-[15px] md:text-base opacity-85" style={{ lineHeight: "1.5" }}>
            Music is how my soul sounds when it speaks. It carries the footsteps of the places I have walked, the faces that stayed with me, and the feelings that asked to be heard. Each song arrives like a memory returning, dressed in melody, shaped into words, and offered as it came to me.
            <br /><br />
            These songs are pieces of a lived life, carried by melody, shaped by time, and left open so each listener may find their own reflection inside them.
            <br /><br />
            Welcome. I’m Frederic G. Fleron Grignard.
            <br /><br />
            <span className="opacity-70">
              Musician · Backpacker · Songweaver
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>

      {/* Songs */}
      <section ref={sections.songs} className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl md:text-3xl">Preview tracks</h2>
        <div className="flex items-center justify-between gap-4 text-sm md:text-base text-black/70">
          <p>
            35–40 second previews. Full tracks are shared privately upon purchase.
          </p>

          <button
            type="button"
            onClick={() => setLegalOpen(true)}
            className="shrink-0 inline-flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition"
            aria-label="More details"
          >
            <Info className="h-5 w-5 opacity-70 hover:opacity-100 transition" />
          </button>
        </div>

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

      <footer className="relative bg-black/5 border-t border-black/10 backdrop-blur">

          <a
            href="#home"
            aria-label="Back to top"
            title="Back to top"
            className="
              absolute left-1/2 -translate-x-1/2 -top-6 z-20
              inline-flex items-center justify-center h-12 w-12 rounded-full
              bg-neutral-900 text-white border border-black/20
              hover:bg-neutral-700 transition-colors
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/60 backdrop-blur-md" />
            <div
              className="relative w-full max-w-2xl rounded-3xl bg-[#fbfaf7] ring-1 ring-black/10 shadow-[0_35px_110px_-40px_rgba(0,0,0,0.65)] p-6 md:p-8"
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

    </main>
  );
}
