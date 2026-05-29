import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function useCountdown(target) {
  const [time, setTime] = useState({});
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function CountBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-6xl font-display displayyy font-bold"
        style={{ color: '#e91e8c' }}>
        {String(value ?? 0).padStart(2, '0')}
      </div>
      <div className="text-xs tracking-widest mt-1" style={{ color: '#888' }}>
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const time = useCountdown('2026-07-25T00:00:00');

  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #e91e8c18 0%, transparent 70%)' }}>

        <p className="text-xs tracking-[0.4em] mb-6 font-medium"
          style={{ color: '#e91e8c' }}>JULY 2026 · ACCRA, GHANA</p>

        <h1 className="font-display displayyy font-black leading-none mb-6"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', color: '#fafafa', letterSpacing: '0.15em' }}>
          GOD<span style={{ color: '#e91e8c', letterSpacing: '0.15em' }}>FEST</span>
        </h1>

        <p className="text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
          style={{ color: '#aaa' }}>
          A powerful gathering of faith, worship, and community.
          Come experience something extraordinary this July.
        </p>

        {/* Countdown */}
        <div className="flex gap-8 md:gap-12 mb-14">
          <CountBox value={time.d} label="DAYS" />
          <CountBox value={time.h} label="HOURS" />
          <CountBox value={time.m} label="MINS" />
          <CountBox value={time.s} label="SECS" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register"
            className="px-8 py-4 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: '#e91e8c', color: '#fafafa' }}>
            Register to Attend
          </Link>
          <Link to="/donate"
            className="px-8 py-4 rounded-full text-sm font-medium transition-all duration-200"
            style={{ border: '1px solid #e91e8c', color: '#e91e8c' }}>
            Support the Program
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-widest mb-4" style={{ color: '#e91e8c' }}>ABOUT</p>
          <h2 className="font-display displayyy text-4xl md:text-5xl font-bold mb-8"
            style={{ color: '#fafafa' }}>
            What is Godfest?
          </h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#aaa' }}>
            Godfest is an all rounded gospel music concert centered on preaching & sharing the word through music, dance and creative arts.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#aaa' }}>
            The main motive being to capture the attention of the youth especially, is what is driving us to bring it your way.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest mb-4 text-center" style={{ color: '#e91e8c' }}>WHAT TO EXPECT</p>
          <h2 className="font-display displayyy text-4xl font-bold text-center mb-14"
            style={{ color: '#fafafa' }}>Program Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '✦', title: 'MUSIC', desc: 'Powerful live worship performances that will lift your spirit.' },
              { icon: '◈', title: 'DANCE', desc: 'Inspiring choreography and creative movement through faith.' },
              { icon: '❋', title: 'ATMOSPHERE', desc: 'Connect with believers and build lasting friendships.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-8 rounded-2xl text-center"
                style={{ background: '#111', border: '1px solid #e91e8c22'}}>
                <div className="text-3xl mb-4" style={{ color: '#e91e8c' }}>{icon}</div>
                <h3 className="font-display displayyy text-xl font-bold mb-3" style={{ color: '#fafafa', letterSpacing: '6px'  }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#888' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #0d0d0d, #1a0010)' }}>
        <h2 className="font-display displayyy text-4xl md:text-5xl font-bold mb-6"
          style={{ color: '#fafafa' }}>
          Ready to be part of it?
        </h2>
        <p className="text-lg mb-10" style={{ color: '#aaa' }}>
          Secure your spot today — registration is free.
        </p>
        <Link to="/register"
          className="px-10 py-4 rounded-full text-sm font-medium"
          style={{ background: '#e91e8c', color: '#fafafa' }}>
          Register Now
        </Link>
      </section>
    </main>
  );
}