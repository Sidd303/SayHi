'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
  }
}

export default function Page() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const featureCardsRef = useRef<HTMLDivElement | null>(null)
  const stepsRef = useRef<HTMLDivElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loadGSAP = () => {
      if (window.gsap) {
        initAnimations()
        return
      }

      const script1 = document.createElement('script')
      script1.src =
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
      script1.async = true

      const script2 = document.createElement('script')
      script2.src =
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
      script2.async = true

      script2.onload = initAnimations

      document.body.appendChild(script1)
      document.body.appendChild(script2)
    }

    const initAnimations = () => {
      const gsap = window.gsap
      const ScrollTrigger = window.ScrollTrigger

      if (!gsap || !ScrollTrigger) return

      gsap.registerPlugin(ScrollTrigger)

      /* ---------------- HERO ---------------- */
      if (heroRef.current) {
        const hero = heroRef.current

        gsap.from(hero.querySelector('.live-badge'), {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        })

        gsap.from(hero.querySelector('h1'), {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
        })

        gsap.from(hero.querySelector('p'), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
        })

        gsap.from(hero.querySelectorAll('button'), {
          y: 30,
          opacity: 0,
          stagger: 0.2,
          duration: 0.6,
          delay: 0.7,
        })
      }

      /* ---------------- FEATURES ---------------- */
      if (featureCardsRef.current) {
        const cards =
          featureCardsRef.current.querySelectorAll('.feature-card')

        gsap.from(cards, {
          scrollTrigger: {
            trigger: featureCardsRef.current,
            start: 'top 80%',
          },
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotateX: 45,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })

        cards.forEach((card, i) => {
          gsap.to(card, {
            y: -15,
            repeat: -1,
            yoyo: true,
            duration: 2 + i * 0.2,
            ease: 'sine.inOut',
          })
        })
      }

      /* ---------------- STEPS ---------------- */
      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll('.step-item')

        steps.forEach((step, i) => {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
            },
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotation: i % 2 === 0 ? -10 : 10,
            duration: 0.8,
            ease: 'power2.out',
          })

          const num = step.querySelector('.step-number')
          if (num) {
            gsap.to(num, {
              scale: 1.2,
              repeat: -1,
              yoyo: true,
              duration: 1,
              ease: 'sine.inOut',
            })
          }
        })
      }

      /* ---------------- CTA ---------------- */
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
          },
          scale: 0.8,
          opacity: 0,
          rotateY: 180,
          duration: 1,
          ease: 'power3.out',
        })

        const icon = ctaRef.current.querySelector('button svg')
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            duration: 3,
            repeat: -1,
            ease: 'linear',
          })
        }
      }

      /* ---------------- TITLES ---------------- */
      document.querySelectorAll('.section-title').forEach(title => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          },
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        })

        const words = title.querySelectorAll('.word')
        gsap.from(words, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          rotateX: -90,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
        })
      })

      /* ---------------- PARTICLES ---------------- */
      document.querySelectorAll('.particle').forEach((p, i) => {
        gsap.to(p, {
          y: -100 * (i + 1),
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1 + i,
          },
        })
      })
    }

    loadGSAP()

    return () => {
      window.ScrollTrigger?.getAll().forEach((t: any) => t.kill())
    }
  }, [])



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-blue-900/30 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold">Say</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Hi</span>
        </div>
        <a href="#" className="text-gray-400 hover:text-white transition">GitHub</a>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="px-6 py-20 text-center relative">
        <div className="live-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400">Live now - Connect with strangers worldwide</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Meet, talk and<br />
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">connect</span>
        </h1>

        <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed text-lg">
          Anonymous real-time text and video chat with random strangers. No accounts. No profiles. Just human connection.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-medium hover:scale-105 transition-transform shadow-lg shadow-pink-500/50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Start Video Chat
          </button>
          <button className="flex items-center gap-2 px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-lg font-medium hover:scale-105 hover:bg-slate-800 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Text Chat Only
          </button>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="particle absolute top-20 left-10 w-2 h-2 bg-pink-500 rounded-full opacity-60"></div>
          <div className="particle absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full opacity-60"></div>
          <div className="particle absolute bottom-20 left-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
          <div className="particle absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-500 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-6 py-20">
        <div className="section-title text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="word inline-block">Why</span>{' '}
            <span className="word inline-block">choose</span>{' '}
            <span className="word inline-block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">SayHi</span>
            <span className="word inline-block">?</span>
          </h2>
        </div>
        <p className="text-gray-400 text-center mb-12">
          Built for genuine connections without the noise of social media
        </p>

        <div ref={featureCardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Feature Cards */}
          <div className="feature-card p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur hover:border-pink-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">100% Anonymous</h3>
            <p className="text-gray-400 text-sm">
              No accounts, no profiles, no identity. Your privacy is our priority.
            </p>
          </div>

          <div className="feature-card p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur hover:border-blue-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Global Community</h3>
            <p className="text-gray-400 text-sm">
              Connect with strangers from every corner of the world, 24/7.
            </p>
          </div>

          <div className="feature-card p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur hover:border-purple-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">
              Direct peer-to-peer connections mean zero server delay in communication.
            </p>
          </div>

          <div className="feature-card p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur hover:border-green-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Text</h3>
            <p className="text-gray-400 text-sm">
              Instant messaging through WebRTC DataChannel. Fast and secure.
            </p>
          </div>

          <div className="feature-card p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur hover:border-orange-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">HD Video Chat</h3>
            <p className="text-gray-400 text-sm">
              Crystal clear peer-to-peer video streaming with minimal latency.
            </p>
          </div>

          <div className="feature-card p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur hover:border-cyan-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Random Matching</h3>
            <p className="text-gray-400 text-sm">
              Skip anytime and instantly connect with someone new from anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20">
        <div className="section-title text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="word inline-block">How</span>{' '}
            <span className="word inline-block">It</span>{' '}
            <span className="word inline-block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Works</span>
          </h2>
        </div>
        <p className="text-gray-400 text-center mb-12">
          Start chatting in seconds, no sign-up required
        </p>

        <div ref={stepsRef} className="max-w-2xl mx-auto bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 backdrop-blur">
          <div className="space-y-8">
            <div className="step-item flex gap-4">
              <div className="step-number flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-pink-500/50">1</div>
              <div>
                <h3 className="font-bold mb-1 text-lg">Open SayHi</h3>
                <p className="text-gray-400 text-sm">Just visit the website, no downloads, no sign-ups needed.</p>
              </div>
            </div>

            <div className="step-item flex gap-4">
              <div className="step-number flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-pink-500/50">2</div>
              <div>
                <h3 className="font-bold mb-1 text-lg">Choose your mode</h3>
                <p className="text-gray-400 text-sm">Select text-only chat or enable your camera for video chat.</p>
              </div>
            </div>

            <div className="step-item flex gap-4">
              <div className="step-number flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-pink-500/50">3</div>
              <div>
                <h3 className="font-bold mb-1 text-lg">Get matched</h3>
                <p className="text-gray-400 text-sm">Our server instantly pairs you with another waiting user.</p>
              </div>
            </div>

            <div className="step-item flex gap-4">
              <div className="step-number flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-pink-500/50">4</div>
              <div>
                <h3 className="font-bold mb-1 text-lg">Start talking</h3>
                <p className="text-gray-400 text-sm">Messages and video flow directly between you, private and fast.</p>
              </div>
            </div>

            <div className="step-item flex gap-4">
              <div className="step-number flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-pink-500/50">5</div>
              <div>
                <h3 className="font-bold mb-1 text-lg">Skip or stay</h3>
                <p className="text-gray-400 text-sm">Not feeling the vibe? Hit skip and meet someone new instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div ref={ctaRef} className="max-w-2xl mx-auto bg-gradient-to-br from-slate-800/50 to-purple-900/30 border border-purple-500/30 rounded-3xl p-12 text-center backdrop-blur shadow-2xl shadow-purple-500/20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">connect</span>?
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
            Sometimes the best conversations are with strangers. No pressure. No identity. Just human connection.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-medium hover:scale-105 transition-transform shadow-lg shadow-pink-500/50">
            Start chatting now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-gray-500 text-sm border-t border-slate-800">
        © 2025 SayHi. Connect anonymously.
      </footer>
    </div>
  );
}