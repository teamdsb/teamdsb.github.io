import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Archive,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Compass,
  MapPin,
  Sparkle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Chronicle', icon: Sparkle, active: true },
  { label: 'Moments', icon: Camera },
  { label: 'Archive', icon: Archive },
];

const moments = [
  {
    title: 'Mountain Opening',
    meta: '2023.07.21',
    image: '/assets/team-dsb-journey.jpg',
  },
  {
    title: 'Room Archive',
    meta: 'Found objects',
    image: '/assets/team-dsb-room.jpg',
  },
  {
    title: 'Four People',
    meta: 'So far',
    image: '/assets/team-dsb-journey.jpg',
  },
  {
    title: 'The Wall',
    meta: 'Small proof',
    image: '/assets/team-dsb-room.jpg',
  },
];

function Sidebar() {
  return (
    <aside className="sidebar paper-panel" aria-label="Team DSB navigation">
      <div className="brand-lockup">
        <img className="brand-logo" src="/assets/team-dsb-logo.jpg" alt="Team DSB logo" />
        <h1>
          Team
          <span>DSB</span>
        </h1>
        <p>
          our stories,
          <br />
          our deeds.
        </p>
        <span className="scribble-star" aria-hidden="true">
          ☆
        </span>
      </div>

      <nav className="side-nav" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a className={item.active ? 'active' : ''} href={`#${item.label.toLowerCase()}`} key={item.label}>
              <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="since">
        <span>Since</span>
        <strong>2023</strong>
      </div>
      <span className="brass-pin" aria-hidden="true" />
    </aside>
  );
}

function Topbar() {
  return (
    <header className="topbar" aria-label="Top navigation">
      <nav aria-label="Chronicle sections">
        <a href="#chronicle" className="selected">
          Chronicle
        </a>
        <a href="#moments">Moments</a>
        <a href="#archive">Archive</a>
      </nav>
      <a className="story-link" href="#story">
        <span>Our Story</span>
        <ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </header>
  );
}

function TimelineStrip() {
  return (
    <div className="timeline-strip" aria-label="Team DSB timeline">
      <div className="journey-label">
        <em>Our Journey</em>
        <span>So Far</span>
      </div>
      <div className="timeline-line">
        <span className="node active" style={{ left: '12%' }}>
          <span>2023</span>
        </span>
        <span className="node" style={{ left: '46%' }}>
          <span>2024</span>
        </span>
        <span className="node" style={{ left: '72%' }}>
          <span>2025</span>
        </span>
        <span className="now" style={{ left: '92%' }}>
          <span>Now</span>
        </span>
        <ArrowRight className="line-arrow" size={20} strokeWidth={1.5} aria-hidden="true" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-stage" id="chronicle" aria-labelledby="page-title">
      <Topbar />

      <div className="hero-grid">
        <article className="hero-card">
          <img src="/assets/team-dsb-journey.jpg" alt="Team DSB standing together on a mountain path" />
          <div className="hero-copy">
            <h2 id="page-title">Team DSB</h2>
            <p>
              A RECORD OF OUR STORIES
              <br />
              AND EVERY DEED WE'VE MADE.
            </p>
          </div>
        </article>

        <aside className="side-gallery" aria-label="Team DSB archive wall">
          <span className="tape tape-top" aria-hidden="true" />
          <span className="tape tape-bottom" aria-hidden="true" />
          <img src="/assets/team-dsb-room.jpg" alt="Team DSB room shelf with hats, shirt, books, and plants" />
        </aside>
      </div>

      <TimelineStrip />

      <article className="date-card" id="story" aria-label="First day note">
        <div>
          <time dateTime="2023-07-21">2023.07.21</time>
          <p>
            <MapPin size={19} strokeWidth={1.8} aria-hidden="true" />
            <span>The day we started our journey together.</span>
          </p>
        </div>
        <figure>
          <img src="/assets/team-dsb-journey.jpg" alt="Team DSB first journey snapshot" />
        </figure>
      </article>
    </section>
  );
}

function LatestMoments() {
  return (
    <section className="latest" id="moments" aria-labelledby="latest-title">
      <div className="latest-heading">
        <div>
          <h2 id="latest-title">Latest Moments</h2>
          <p>Snapshots of our days, big or small.</p>
        </div>
        <a href="#archive" className="view-all">
          <span>View all Moments</span>
          <ArrowRight size={23} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </div>

      <div className="moment-grid">
        {moments.map((moment, index) => (
          <article className="moment-card" key={`${moment.title}-${index}`}>
            <img src={moment.image} alt={`${moment.title} moment`} />
            <div>
              <h3>{moment.title}</h3>
              <p>{moment.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

      intro
        .from('.paper-panel', { x: -36, opacity: 0, duration: 0.75 })
        .from('.topbar', { y: -24, opacity: 0, duration: 0.62 }, '-=0.42')
        .from('.hero-card', { y: 38, rotate: -0.8, opacity: 0, duration: 0.82 }, '-=0.35')
        .from('.side-gallery', { x: 42, rotate: 1.2, opacity: 0, duration: 0.78 }, '-=0.58')
        .from('.hero-copy h2, .hero-copy p', { y: 30, opacity: 0, stagger: 0.12, duration: 0.58 }, '-=0.36')
        .from('.timeline-strip', { y: 22, opacity: 0, duration: 0.54 }, '-=0.22')
        .from('.date-card', { y: 28, rotate: 1.5, opacity: 0, duration: 0.62 }, '-=0.34');

      gsap.to('.date-card', {
        y: -7,
        rotate: -0.7,
        duration: 3.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.tape', {
        rotate: 2.2,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.25,
      });

      gsap.from('.moment-card', {
        scrollTrigger: {
          trigger: '.latest',
          start: 'top 82%',
        },
        y: 34,
        opacity: 0,
        duration: 0.64,
        ease: 'power2.out',
        stagger: 0.08,
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main className="app" ref={rootRef}>
      <Sidebar />
      <div className="content-shell">
        <Hero />
        <LatestMoments />
      </div>
      <div className="ambient-leaf leaf-one" aria-hidden="true" />
      <div className="ambient-leaf leaf-two" aria-hidden="true" />
    </main>
  );
}
