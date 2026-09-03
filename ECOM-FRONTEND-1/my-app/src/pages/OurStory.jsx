import React from 'react';
import { Link } from 'react-router-dom';
import GlobalNav from '../components/GlobalNav';

export default function OurStory() {
  const stats = [
    { label: 'Uptime Reliability', value: '99.98%' },
    { label: 'Average Checkout Latency', value: '< 180ms' },
    { label: 'Active Curated Items', value: '12,000+' },
    { label: 'Verified Deliveries', value: '50,000+' },
  ];

  const milestones = [
    {
      year: 'Phase 1',
      title: 'The Baseline Problem',
      desc: 'Frustrated by sluggish e-commerce architectures, bloated bundles, and unresponsive checkout workflows, we set out to build an online marketplace with raw performance as a first-class feature.',
    },
    {
      year: 'Phase 2',
      title: 'Decoupled Infrastructure',
      desc: 'Engineered an asynchronous, containerized backend pipeline to isolate catalog caching from transactional pipelines, guaranteeing frictionless checkouts during traffic surges.',
    },
    {
      year: 'Phase 3',
      title: 'Modern MoniMart',
      desc: 'Expanded into a reliable multi-category commerce platform serving thousands daily with real-time tracking, frictionless payments, and instant feedback loops.',
    },
  ];

  const values = [
    {
      title: 'Performance-First Architecture',
      desc: 'Speed is not a luxury; it is respect for the customer. Every endpoint, query, and micro-interaction is optimized to eliminate friction.',
      icon: (
        <svg className="size-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Uncompromised Reliability',
      desc: 'From order placement to physical fulfillment, our automated pipelines and delivery networks guarantee absolute accuracy and zero lost states.',
      icon: (
        <svg className="size-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Customer Transparency',
      desc: 'No obscured shipping costs, opaque pricing algorithms, or hidden fine print. Direct communication and upfront accountability at every turn.',
      icon: (
        <svg className="size-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-400 selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <GlobalNav/>
      <section className="relative overflow-hidden border-b border-gray-800/80 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
        
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-400">
            Engineered For Modern Commerce
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Built with intent. Delivered with <span className="text-blue-500">precision</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            MoniMart started with a singular conviction: digital shopping should be instant, transparent, and resilient. We stripped out the clutter and rebuilt commerce from the ground up.
          </p>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="border-b border-gray-800 bg-gray-900/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="border-l border-gray-800 pl-4 sm:pl-6">
                <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story Narrative */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">The Mission</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Eliminating the drag in everyday commerce.
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-400 text-sm sm:text-base">
              <p>
                Too many shopping portals are bogged down by sluggish page loads, redundant layers, and brittle payment workflows that drop transactions when demand spikes. 
              </p>
              <p>
                MoniMart was founded to serve as a fast, rock-solid alternative. Every layer of our stack—from the reactive catalog interface down to our event-driven message brokers—is engineered to ensure product discovery and order settlements happen with sub-second precision.
              </p>
              <p>
                We partner directly with verified suppliers to keep inventories accurate, prices equitable, and deliveries on schedule.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Explore the Catalog &rarr;
              </Link>
            </div>
          </div>

          {/* Code/Architecture Feature Box */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
              <span className="size-3 rounded-full bg-red-500/80" />
              <span className="size-3 rounded-full bg-yellow-500/80" />
              <span className="size-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-gray-500">monimart-core // manifest.v2</span>
            </div>
            <div className="mt-6 space-y-4 font-mono text-xs leading-relaxed text-gray-400">
              <p className="text-blue-400">// Core Philosophy</p>
              <p><span className="text-purple-400">const</span> <span className="text-yellow-300">platformPrinciples</span> = &#123;</p>
              <p className="pl-4">checkoutLatency: <span className="text-emerald-400">'instant'</span>,</p>
              <p className="pl-4">inventorySync: <span className="text-emerald-400">'real-time'</span>,</p>
              <p className="pl-4">customerTransparency: <span className="text-blue-400">true</span>,</p>
              <p className="pl-4">unnecessaryBloat: <span className="text-red-400">null</span></p>
              <p>&#125;;</p>
              <div className="rounded-lg bg-gray-950 p-4 border border-gray-800/80 text-gray-300">
                <p className="text-gray-400">"A reliable platform is one you never have to think twice about using."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="border-t border-gray-800/80 bg-gray-900/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">What Drives Us</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Guiding Pillars</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-gray-800 bg-gray-900/40 p-6 transition-colors hover:border-gray-700">
                <div className="flex size-12 items-center justify-center rounded-lg bg-gray-900 border border-gray-800">
                  {v.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Roadmap / Milestones */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">The Journey</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">How MoniMart Evolved</h2>
        </div>

        <div className="mt-12 space-y-8 border-l border-gray-800 pl-6 sm:pl-8 ml-4">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <span className="absolute -left-[31px] sm:-left-[39px] top-1 size-4 rounded-full border-2 border-blue-500 bg-gray-950" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">{m.year}</span>
              <h3 className="mt-1 text-lg font-semibold text-white">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}