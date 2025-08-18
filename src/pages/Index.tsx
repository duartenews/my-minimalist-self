import React, { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear().toString();
    }

    // Demo waitlist handler (replace with real POST later)
    const form = document.getElementById('waitlist') as HTMLFormElement;
    const toast = document.getElementById('toast');

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      const emailInput = document.getElementById('email') as HTMLInputElement;
      const email = emailInput ? emailInput.value.trim() : '';
      if (!email) {
        alert('Please enter a valid email.');
        return;
      }
      // TODO: Swap this fetch for your real endpoint.
      // await fetch('/api/waitlist', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email, city: (document.getElementById('city') as HTMLSelectElement).value }) });

      // Show toast
      if (toast) {
          toast.classList.remove('hidden');
          setTimeout(() => toast.classList.add('hidden'), 3500);
      }

      // Reset form
      if (form) {
        form.reset();
      }
    };

    if (form) {
      form.addEventListener('submit', handleSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleSubmit);
      }
    };
  }, []);

  return (
    <div className="bg-white text-black antialiased font-sans selection:bg-primary/20 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-black/10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container-tight flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            {/* Logo (minimal wordmark) */}
            <svg className="w-6 h-6 text-black group-hover:opacity-80 transition" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 9h10M7 12h6M7 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="font-semibold tracking-tight">Quiet Control</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#how" className="hover:opacity-80">How it works</a>
            <a href="#what" className="hover:opacity-80">What you get</a>
            <a href="#faq" className="hover:opacity-80">FAQ</a>
          </nav>
          <a href="#waitlist" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black/90">
            Join waitlist
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container-tight py-20 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Get your life under control in <span className="text-primary">21 days</span> — without sacrificing your career.
              </h1>
              <p className="text-2xl text-neutral-700 mt-4">
                built for ambitious women.
              </p>
              <p className="mt-5 text-lg text-neutral-700 max-w-xl">
                Quiet Control gives you a <span className="font-semibold text-black">minimum-effective routine</span> across body, food, home, appearance, finances, and career — and an intelligent agenda that fits your week. You validate; we propose.
              </p>

              {/* Waitlist form */}
              <form id="waitlist" className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center" noValidate>
                <label className="sr-only" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com"
                       className="w-full sm:max-w-sm rounded-xl border border-black/20 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary"
                />
                <label className="sr-only" htmlFor="city">City</label>
                <select id="city" name="city"
                        className="w-full sm:w-40 rounded-xl border border-black/20 px-3 py-3 bg-white focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary">
                  <option value="">City</option>
                  <option>New York City</option>
                  <option>Boston</option>
                  <option>Washington, D.C.</option>
                  <option>New Jersey Area</option>
                  <option>Other</option>
                </select>
                <button type="submit"
                  className="inline-flex justify-center items-center gap-2 rounded-xl bg-black text-white px-5 py-3 font-semibold shadow-soft hover:bg-black/90 focus:outline-none focus:ring-4 focus:ring-primary/30">
                  Join the waitlist
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </form>
              <p className="mt-3 text-sm text-neutral-600 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  Founding 500 price lock
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  New cohorts every Monday
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/></svg>
                  No spam
                </span>
              </p>
            </div>

            {/* App mockup (inline SVG, black/white with primary accent) */}
            <div className="relative">
              <div className="mx-auto max-w-md">
                <svg className="w-full" viewBox="0 0 340 700" fill="none" role="img" aria-labelledby="mock-title mock-desc">
                  <title id="mock-title">Quiet Control — App Screens</title>
                  <desc id="mock-desc">Minimal mockups showing Today view, Onboarding, and Weekly suggestions in black & white with a primary accent.</desc>

                  {/* Phone body */}
                  <rect x="10" y="10" width="320" height="680" rx="36" fill="#000"/>
                  <rect x="18" y="60" width="304" height="600" rx="24" fill="#fff" stroke="#000" strokeOpacity=".1"/>
                  <rect x="140" y="26" width="60" height="6" rx="3" fill="#111"/>

                  {/* Screen 1: TODAY */}
                  <g transform="translate(28,76)">
                    <rect x="0" y="0" width="136" height="268" rx="16" fill="#fff" stroke="#000" strokeOpacity=".15"/>
                    <text x="16" y="28" fontFamily="Inter" fontSize="12" fill="#000" fontWeight="700">Today</text>
                    {/* blocks */}
                    <g transform="translate(16,48)">
                      <rect width="104" height="44" rx="10" fill="#fff" stroke="#000" strokeOpacity=".2"/>
                      <circle cx="92" cy="22" r="6" fill="#95A4B7"/>
                      <text x="12" y="28" fontSize="12" fontFamily="Inter" fill="#000" fontWeight="600">Body • 10m</text>
                    </g>
                    <g transform="translate(16,102)">
                      <rect width="104" height="44" rx="10" fill="#fff" stroke="#000" strokeOpacity=".2"/>
                      <circle cx="92" cy="22" r="6" fill="#95A4B7"/>
                      <text x="12" y="28" fontSize="12" fontFamily="Inter" fill="#000" fontWeight="600">Home • 7m</text>
                    </g>
                    <g transform="translate(16,156)">
                      <rect width="104" height="44" rx="10" fill="#fff" stroke="#000" strokeOpacity=".2"/>
                      <circle cx="92" cy="22" r="6" fill="#95A4B7"/>
                      <text x="12" y="28" fontSize="12" fontFamily="Inter" fill="#000" fontWeight="600">Hair • 5m</text>
                    </g>
                    <g transform="translate(16,210)">
                      <rect width="104" height="44" rx="10" fill="#fff" stroke="#000" strokeOpacity=".2"/>
                      <circle cx="92" cy="22" r="6" fill="#95A4B7"/>
                      <text x="12" y="28" fontSize="12" fontFamily="Inter" fill="#000" fontWeight="600">Finance • 8m</text>
                    </g>
                  </g>

                  {/* Screen 2: Onboarding */}
                  <g transform="translate(176,76)">
                    <rect x="0" y="0" width="136" height="140" rx="16" fill="#fff" stroke="#000" strokeOpacity=".15"/>
                    <text x="16" y="28" fontFamily="Inter" fontSize="12" fill="#000" fontWeight="700">Onboarding • 2 min</text>
                    <text x="16" y="54" fontFamily="Inter" fontSize="11" fill="#111">Top priority?</text>
                    <rect x="16" y="64" width="104" height="20" rx="6" fill="#fff" stroke="#000" strokeOpacity=".15"/>
                    <text x="20" y="78" fontFamily="Inter" fontSize="10" fill="#7a7a7a">e.g., Body, Food, Home…</text>
                    <rect x="16" y="96" width="48" height="24" rx="6" fill="#000"/>
                    <text x="40" y="112" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#fff" fontWeight="600">Next</text>
                  </g>

                  {/* Screen 3: Weekly Plan */}
                  <g transform="translate(176,224)">
                    <rect x="0" y="0" width="136" height="120" rx="16" fill="#fff" stroke="#000" strokeOpacity=".15"/>
                    <text x="16" y="28" fontFamily="Inter" fontSize="12" fill="#000" fontWeight="700">Weekly suggestions</text>
                    <g transform="translate(16,46)">
                      <rect width="104" height="18" rx="6" fill="#fff" stroke="#000" strokeOpacity=".15" />
                      <circle cx="9" cy="9" r="5" fill="#95A4B7"/>
                      <text x="20" y="12" fontFamily="Inter" fontSize="10" fill="#000">Accept all</text>
                    </g>
                    <g transform="translate(16,70)">
                      <rect width="104" height="32" rx="8" fill="#fff" stroke="#000" strokeOpacity=".15"/>
                      <text x="12" y="22" fontSize="10" fontFamily="Inter" fill="#000">Meal prep • 15m</text>
                    </g>
                  </g>

                  {/* Footer bar */}
                  <rect x="18" y="628" width="304" height="32" rx="10" fill="#000"/>
                  <text x="170" y="649" textAnchor="middle" fontFamily="Inter" fontSize="11" fill="#fff">Cohorts start Monday • 2-min setup</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto px-4 sm:px-6 lg:px-8 container-tight py-16 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-neutral-700">Made for women with big goals: minimum decisions, maximum clarity, micro-wins that compound.</p>
        </div>

        <div className="mt-10 grid grid-auto-fit gap-6">
          {/* Step */}
          <div className="border border-black/10 rounded-2xl p-6 hover:shadow-soft transition">
            <div className="flex items-start gap-4">
              {/* icon */}
              <svg className="w-10 h-10 text-black" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 8v12l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <h3 className="font-semibold text-lg">2-minute onboarding</h3>
                <p className="mt-1 text-neutral-700">A 5-question intake identifies priorities, time budget, and deadlines. Your plan is ready today.</p>
              </div>
            </div>
          </div>
          {/* Step */}
          <div className="border border-black/10 rounded-2xl p-6 hover:shadow-soft transition">
            <div className="flex items-start gap-4">
              <svg className="w-10 h-10 text-black" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <rect x="4" y="8" width="40" height="32" rx="6" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 20h24M12 28h16M12 36h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <h3 className="font-semibold text-lg">Intelligent agenda</h3>
                <p className="mt-1 text-neutral-700">We propose the minimum-effective micro-tasks by area and cadence (Daily / Weekly / Bi-weekly / Monthly). You accept or edit.</p>
              </div>
            </div>
          </div>
          {/* Step */}
          <div className="border border-black/10 rounded-2xl p-6 hover:shadow-soft transition">
            <div className="flex items-start gap-4">
              <svg className="w-10 h-10 text-black" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path d="M10 22a14 14 0 1028 0A14 14 0 0010 22z" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 15v7l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <h3 className="font-semibold text-lg">Daily check-up (optional)</h3>
                <p className="mt-1 text-neutral-700">2–3 quick questions recalibrate your week around energy and focus — without the mental load.</p>
              </div>
            </div>
          </div>
          {/* Step */}
          <div className="border border-black/10 rounded-2xl p-6 hover:shadow-soft transition">
            <div className="flex items-start gap-4">
              <svg className="w-10 h-10 text-black" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path d="M24 6l3.5 7 7.5 1-5.5 5.3 1.3 7.7L24 23l-6.3 4 1.3-7.7L13.5 14l7.5-1L24 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              <div>
                <h3 className="font-semibold text-lg">AI assist — plug-in, not lock-in</h3>
                <p className="mt-1 text-neutral-700">Optional AI via OpenRouter for deeper prompts and planning. If AI is down, your manual flow still works perfectly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section id="what" className="mx-auto px-4 sm:px-6 lg:px-8 container-tight py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What you’ll get</h2>
            <ul className="mt-6 space-y-3 text-neutral-800">
              <li className="flex gap-3"><span className="text-primary">•</span> A “Today” view with 3–6 focused blocks — not 25 noisy tasks.</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Minimum routines across Body, Food, Home, Appearance, Finances, Career.</li>
              <li className="flex gap-3"><span className="text-primary">•</span> One-tap “Accept all for the week”.</li>
              <li className="flex gap-3"><span className="text-primary">•</span> Streaks and weekly goals to reinforce micro-wins.</li>
              <li className="flex gap-3"><span className="text-primary">•</span> EN + PT-BR at launch. Offline basics to mark done.</li>
            </ul>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl border border-black/10 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Founding 500</h3>
                  <span className="text-xs uppercase tracking-wide text-primary border border-primary px-2 py-1 rounded-full">Limited</span>
                </div>
                <p className="mt-2 text-neutral-700 text-sm">Lifetime price lock + early access + bonus packs for women’s routines.</p>
              </div>
              <div className="rounded-2xl border border-black/10 p-5">
                <h3 className="font-semibold">Cohorts every Monday</h3>
                <p className="mt-2 text-neutral-700 text-sm">Rolling admission to keep support and onboarding clean.</p>
              </div>
              <div className="rounded-2xl border border-black/10 p-5">
                <h3 className="font-semibold">Risk-free start</h3>
                <p className="mt-2 text-neutral-700 text-sm">Onboarding ≤ 2 minutes or your first month is free (when subscriptions open).</p>
              </div>
            </div>
          </div>

          {/* Instructional SVG (black/white + primary accent) */}
          <div className="lg:pl-8">
            <svg className="w-full rounded-2xl border border-black/10" viewBox="0 0 920 520" fill="none" role="img" aria-labelledby="illus-title illus-desc">
              <title id="illus-title">Quiet Control Instructions</title>
              <desc id="illus-desc">Choose focus, set time, accept weekly plan.</desc>

              <rect x="1" y="1" width="918" height="518" rx="16" fill="#ffffff"/>
              <rect x="1" y="1" width="918" height="518" rx="16" stroke="black" strokeOpacity=".1"/>

              {/* Step 1 */}
              <g transform="translate(40,40)">
                <rect width="260" height="440" rx="12" fill="#fff" stroke="black" strokeOpacity=".15"/>
                <text x="20" y="36" fontFamily="Inter" fontSize="18" fill="#000" fontWeight="700">1. Choose focus</text>
                <rect x="20" y="60" width="220" height="40" rx="10" fill="#fff" stroke="black" strokeOpacity=".15"/>
                <circle cx="222" cy="80" r="6" fill="#95A4B7"/>
                <text x="34" y="86" fontFamily="Inter" fontSize="14" fill="#000" fontWeight="600">Body</text>
                <rect x="20" y="110" width="220" height="40" rx="10" fill="#fff" stroke="black" strokeOpacity=".15"/>
                <circle cx="222" cy="130" r="6" fill="#95A4B7"/>
                <text x="34" y="136" fontFamily="Inter" fontSize="14" fill="#000" fontWeight="600">Home</text>
                <rect x="20" y="160" width="220" height="40" rx="10" fill="#fff" stroke="black" strokeOpacity=".15"/>
                <circle cx="222" cy="180" r="6" fill="#95A4B7"/>
                <text x="34" y="186" fontFamily="Inter" fontSize="14" fill="#000" fontWeight="600">Hair</text>
                <text x="20" y="220" fontFamily="Inter" fontSize="12" fill="#333">Pick your priority in seconds.</text>
              </g>

              {/* Step 2 */}
              <g transform="translate(330,40)">
                <rect width="260" height="440" rx="12" fill="#fff" stroke="black" strokeOpacity=".15"/>
                <text x="20" y="36" fontFamily="Inter" fontSize="18" fill="#000" fontWeight="700">2. Set time</text>
                <text x="20" y="68" fontFamily="Inter" fontSize="12" fill="#333">How many minutes per day?</text>
                <rect x="20" y="84" width="120" height="40" rx="10" fill="#fff" stroke="black" strokeOpacity=".15"/>
                <text x="34" y="110" fontFamily="Inter" fontSize="14" fill="#000">10 min</text>
                <text x="20" y="146" fontFamily="Inter" fontSize="12" fill="#333">Unavailable days?</text>
                <rect x="20" y="162" width="220" height="40" rx="10" fill="#fff" stroke="black" strokeOpacity=".15"/>
                <text x="34" y="188" fontFamily="Inter" fontSize="14" fill="#000">Tue, Thu evenings</text>
                <text x="20" y="228" fontFamily="Inter" fontSize="12" fill="#333">Goal timeline?</text>
                <rect x="20" y="244" width="120" height="40" rx="10" fill="#fff" stroke="black" strokeOpacity=".15"/>
                <text x="34" y="270" fontFamily="Inter" fontSize="14" fill="#000">21 days</text>
              </g>

              {/* Step 3 */}
              <g transform="translate(620,40)">
                <rect width="260" height="440" rx="12" fill="#fff" stroke="black" strokeOpacity=".15"/>
                <text x="20" y="36" fontFamily="Inter" fontSize="18" fill="#000" fontWeight="700">3. Accept your week</text>
                <g transform="translate(20,70)">
                  <rect width="220" height="24" rx="8" fill="#fff" stroke="black" strokeOpacity=".15"/>
                  <circle cx="12" cy="12" r="6" fill="#95A4B7"/>
                  <text x="30" y="16" fontFamily="Inter" fontSize="12" fill="#000">Accept all</text>
                </g>
                <g transform="translate(20,110)">
                  <rect width="220" height="40" rx="10" fill="#fff" stroke="black" strokeOpacity=".15"/>
                  <text x="16" y="28" fontFamily="Inter" fontSize="12" fill="#000">Hydrate • 2L • Daily</text>
                </g>
                <g transform="translate(20,160)">
                  <rect width="220" height="40" rx="10" fill="#fff" stroke="black" strokeOpacity=".15"/>
                  <text x="16" y="28" fontFamily="Inter" fontSize="12" fill="#000">Home reset • 7m • Weekly</text>
                </g>
                <g transform="translate(20,210)">
                  <rect width="220" height="40" rx="10" fill="#fff" stroke="black" strokeOpacity=".15"/>
                  <text x="16" y="28" fontFamily="Inter" fontSize="12" fill="#000">Hair mask • 7m • Weekly</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Value props / For women */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 container-tight py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-black/10 rounded-2xl p-6">
            <h3 className="font-semibold">Micro-wins, not burnout</h3>
            <p className="mt-2 text-neutral-700 text-sm">5–15 minute tasks that keep her life balanced while she climbs.</p>
          </div>
          <div className="border border-black/10 rounded-2xl p-6">
            <h3 className="font-semibold">Decision-light by design</h3>
            <p className="mt-2 text-neutral-700 text-sm">We propose the routine. She just validates. Less friction, more consistency.</p>
          </div>
          <div className="border border-black/10 rounded-2xl p-6">
            <h3 className="font-semibold">Founding 500 perks</h3>
            <p className="mt-2 text-neutral-700 text-sm">Lifetime price lock + ready-made packs for Body, Home, Hair, Skin, Food, Finance, Career.</p>
          </div>
        </div>
      </section>

      {/* Social proof placeholder */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 container-tight py-12">
        <div className="rounded-2xl border border-black/10 p-6 text-center">
          <p className="text-neutral-700">Designed for ambitious women in <span className="font-medium text-black">NYC, Boston, D.C., and NJ</span> who want clarity without the mental load.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto px-4 sm:px-6 lg:px-8 container-tight py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">FAQ</h2>
        <div className="mt-8 space-y-6">
          <details className="group border border-black/10 rounded-xl p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium">Is this just another to-do app?</span>
              <svg className="w-5 h-5 text-black group-open:rotate-180 transition" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/></svg>
            </summary>
            <p className="mt-3 text-neutral-700">No. Quiet Control proposes a minimum-effective routine across life areas and slots it into her week. She validates — no building from scratch.</p>
          </details>

          <details className="group border border-black/10 rounded-xl p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium">Do I need to use AI?</span>
              <svg className="w-5 h-5 text-black group-open:rotate-180 transition" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/></svg>
            </summary>
            <p className="mt-3 text-neutral-700">No. AI is optional via OpenRouter. If it’s unavailable, the manual experience still works perfectly.</p>
          </details>

          <details className="group border border-black/10 rounded-xl p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium">What’s the “Founding 500”?</span>
              <svg className="w-5 h-5 text-black group-open:rotate-180 transition" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/></svg>
            </summary>
            <p className="mt-3 text-neutral-700">The first 500 members get a lifetime price lock and bonus routine packs. Limited on purpose.</p>
          </details>

          <details className="group border border-black/10 rounded-xl p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium">When do cohorts start?</span>
              <svg className="w-5 h-5 text-black group-open:rotate-180 transition" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/></svg>
            </summary>
            <p className="mt-3 text-neutral-700">Every Monday. Join the waitlist and we’ll email your start date.</p>
          </details>
        </div>
      </section>

      {/* Sticky CTA (mobile) */}
      <div className="fixed bottom-4 inset-x-4 md:hidden z-40">
        <a href="#waitlist" className="block text-center rounded-xl bg-black text-white py-3 font-semibold shadow-soft">Join the waitlist</a>
      </div>

      {/* Footer */}
      <footer className="mx-auto px-4 sm:px-6 lg:px-8 container-tight py-12 border-t border-black/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
          <p>© <span id="year"></span> Quiet Control. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <div id="toast" className="hidden fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="rounded-xl bg-black text-white px-4 py-3 shadow-soft flex items-center gap-3 border border-primary/40">
          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <span>You’re on the waitlist. We’ll email your cohort date.</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
