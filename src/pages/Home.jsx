import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu, X, ArrowRight, ChevronLeft, ChevronRight,
  House, Info, Mail,
  Droplets, Trash2, Construction, Lightbulb, Waves, Building2,
  LifeBuoy, MapPin
} from "lucide-react";

import { LogoMark } from "@/components/shared/Logo";
import { HeroIllustration, AbstractIndiaIllustration } from "@/components/home/illustrations";
import { INK, INK_SOFT, PAPER, BORDER, SAFFRON, DARK, CATEGORY_COLORS } from "@/lib/civicTheme";


const MARQUEE_SLIDES = [
  { url: "/landing/p1.png", caption: "Many Reports. One Underlying Issue." },
  { url: "/landing/p2.png", caption: "Your Local Problem Matters." },
  { url: "/landing/p3.png", caption: "From Complaint to Civic Action." },
  { url: "/landing/p4.png", caption: "Understand Problems. Prioritize Action." }
];


const CATEGORIES = [
  { label: "Water Supply", icon: Droplets },
  { label: "Waste Management", icon: Trash2 },
  { label: "Roads & Potholes", icon: Construction },
  { label: "Streetlights", icon: Lightbulb },
  { label: "Drainage", icon: Waves },
  { label: "Public Infrastructure", icon: Building2 }
];


// NAVBAR
const NAV_LINKS = [
  ["#home", "Home", House],
  ["#about", "About Us", Info],
  ["#contact", "Contact Us", Mail]
];


export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [slide, setSlide] = useState(0);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % MARQUEE_SLIDES.length),
      5000
    );

    return () => clearInterval(t);
  }, []);


  return (
    <div
      className="jc-body min-h-screen"
      style={{ background: PAPER, color: INK }}
    >

      {/* Navbar */}
      <header
        className="sticky top-0 z-40 transition-shadow duration-200"
        style={{
          background: "rgba(248,250,252,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${BORDER}`,
          boxShadow: scrolled
            ? "0 4px 16px rgba(15,23,42,0.06)"
            : "none"
        }}
      >

        <div className="max-w-6xl mx-auto px-4 md:px-6 h-[68px] flex items-center gap-6">

          <div className="flex items-center gap-2.5 flex-shrink-0">

            <LogoMark size={36} />

            <div>
              <div
                className="jc-heading font-bold text-[15px] leading-none"
                style={{ color: INK }}
              >
                Jansamadhan
              </div>

              <div
                className="text-[10.5px] mt-0.5"
                style={{ color: INK_SOFT }}
              >
                Civic Problem Intelligence
              </div>
            </div>

          </div>


          {/* Desktop Navbar */}
          <nav className="hidden md:flex items-center gap-1 mx-auto text-[14px]">

            {NAV_LINKS.map(([href, label, Icon]) => (
              <a
                key={href}
                href={href}
                className="px-3.5 py-2 rounded-md font-medium transition-colors hover:bg-black/[0.04] inline-flex items-center gap-1.5"
                style={{ color: INK_SOFT }}
              >
                <Icon size={16} strokeWidth={2} />
                {label}
              </a>
            ))}

          </nav>


          <div className="hidden md:flex items-center gap-3 flex-shrink-0">

            <Link
              to="/login"
              className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-opacity hover:opacity-90 inline-flex items-center gap-1.5"
              style={{ background: SAFFRON }}
            >
              Login / Sign Up
            </Link>

          </div>


          {/* Mobile Menu */}
          <div className="md:hidden ml-auto flex items-center gap-2">

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center"
              style={{ color: INK }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>


        {/* Mobile Navigation */}
        {mobileOpen && (
          <div
            className="md:hidden px-4 pb-4 flex flex-col gap-1"
            style={{ borderTop: `1px solid ${BORDER}` }}
          >

            {NAV_LINKS.map(([href, label, Icon]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium inline-flex items-center gap-2"
                style={{ color: INK_SOFT }}
              >
                <Icon size={17} strokeWidth={2} />
                {label}
              </a>
            ))}

            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center text-sm font-semibold px-4 py-2.5 rounded-lg text-white"
              style={{ background: SAFFRON }}
            >
              Login / Sign Up
            </Link>

          </div>
        )}

      </header>


      {/* Hero */}
      <section
        id="home"
        className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >

        <div>

          <h1
            className="jc-heading font-extrabold leading-[1.08] mb-5"
            style={{
              fontSize: "clamp(2.1rem, 4.4vw, 3.4rem)",
              color: INK
            }}
          >
            Your Complaint.
            <br />
            A Bigger Civic Picture.
          </h1>

          <p
            className="text-base md:text-lg max-w-md mb-8"
            style={{ color: INK_SOFT }}
          >
            Report a local problem and help authorities understand the larger
            civic issues affecting your community.
          </p>

          <div className="flex flex-wrap gap-3">

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ background: SAFFRON }}
            >
              Report a Problem
              <ArrowRight size={15} />
            </Link>

            <a
              href="#about"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-lg transition-colors hover:bg-black/[0.04]"
              style={{
                border: `1.5px solid ${BORDER}`,
                color: INK
              }}
            >
              About Us
            </a>

          </div>

        </div>


        <div className="max-w-md mx-auto lg:max-w-none">
          <HeroIllustration />
        </div>

      </section>


      {/* Marquee — large sliding image section */}
      <section className="relative h-[300px] md:h-[420px] overflow-hidden">

        {MARQUEE_SLIDES.map((s, i) => (
          <div
            key={s.url}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: i === slide ? 1 : 0,
              background: "#0F172A"
            }}
          >

            <img
              src={s.url}
              alt={s.caption}
              className="absolute inset-0 w-full h-full object-contain"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.05) 45%, rgba(15,23,42,0.15) 100%)"
              }}
            />

          </div>
        ))}


        <div className="relative h-full max-w-6xl mx-auto px-4 md:px-6 flex flex-col justify-end pb-8 md:pb-10">

          <div className="flex items-end justify-between gap-4">

            <h2 className="jc-heading font-bold text-white text-xl md:text-3xl max-w-lg leading-tight">
              {MARQUEE_SLIDES[slide].caption}
            </h2>

            <span className="jc-heading hidden sm:block text-white/50 font-bold text-sm flex-shrink-0">
              0{slide + 1} / 0{MARQUEE_SLIDES.length}
            </span>

          </div>

        </div>


        <button
          onClick={() =>
            setSlide(
              (s) =>
                (s - 1 + MARQUEE_SLIDES.length) %
                MARQUEE_SLIDES.length
            )
          }
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
          style={{ color: INK }}
        >
          <ChevronLeft size={19} />
        </button>


        <button
          onClick={() =>
            setSlide(
              (s) =>
                (s + 1) % MARQUEE_SLIDES.length
            )
          }
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
          style={{ color: INK }}
        >
          <ChevronRight size={19} />
        </button>


        <div className="absolute bottom-4 left-4 md:left-6 flex gap-1.5">

          {MARQUEE_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-1 rounded-full transition-all"
              style={{
                width: i === slide ? 26 : 10,
                background:
                  i === slide
                    ? SAFFRON
                    : "rgba(255,255,255,0.5)"
              }}
            />
          ))}

        </div>

      </section>


      {/* A Complaint Is Not the Whole Problem */}
      <section
        className="py-20 md:py-28"
        style={{ background: "#F1F5F9" }}
      >

        <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>

            <h2
              className="jc-heading font-extrabold text-2xl md:text-4xl leading-tight mb-5"
              style={{ color: INK }}
            >
              One complaint is a signal.
              <br />
              Multiple complaints reveal the problem.
            </h2>

            <p
              className="text-sm md:text-base mb-6"
              style={{ color: INK_SOFT }}
            >
              <strong style={{ color: INK }}>18 citizens</strong> reported
              low water supply in Arera Colony. Instead of displaying 18
              unrelated complaints, Jansamadhan recognizes them as a potential{" "}
              <strong style={{ color: INK }}>Water Supply Issue</strong>.
            </p>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: SAFFRON }}
            >
              See how issues are prioritized
              <ArrowRight size={14} />
            </Link>

          </div>


          <div
            className="bg-white rounded-2xl p-6 md:p-8"
            style={{ border: `1px solid ${BORDER}` }}
          >

            <div className="flex flex-col gap-2 mb-2">

              {[
                "Water is coming very slowly.",
                "Low water pressure in our area.",
                "No supply since yesterday.",
                "sector 4 me pani ka pressure kam hai"
              ].map((c, i) => (

                <div
                  key={c}
                  className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs"
                  style={{
                    background: "#F8FAFC",
                    border: `1px solid ${BORDER}`,
                    color: INK_SOFT
                  }}
                >

                  <span
                    className="jc-heading font-bold flex-shrink-0"
                    style={{ color: SAFFRON }}
                  >
                    0{i + 1}
                  </span>

                  {c}

                </div>

              ))}

            </div>


            <div className="flex justify-center py-2">

              <div
                className="w-px h-6"
                style={{ background: BORDER }}
              />

            </div>


            <div
              className="rounded-xl p-5 text-center"
              style={{ background: SAFFRON }}
            >

              <div className="jc-heading font-bold text-white text-lg">
                Water Supply Issue — Arera Colony
              </div>

              <div className="text-white/80 text-xs mt-1">
                18 reports · 13 unique citizens · Increasing trend
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Civic categories */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-28">

        <p
          className="text-[11px] font-bold uppercase tracking-widest mb-3"
          style={{
            color: SAFFRON,
            letterSpacing: "0.08em"
          }}
        >
          Civic Categories
        </p>

        <h2
          className="jc-heading font-extrabold text-2xl md:text-4xl mb-12 max-w-xl"
          style={{ color: INK }}
        >
          Problems that affect everyday life.
        </h2>


        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

          {CATEGORIES.map((c) => {

            const meta = CATEGORY_COLORS[c.label];

            return (
              <div
                key={c.label}
                className="rounded-xl p-5 flex flex-col items-center text-center gap-3 bg-white transition-transform hover:-translate-y-0.5"
                style={{ border: `1px solid ${BORDER}` }}
              >

                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    background: meta.soft,
                    color: meta.color
                  }}
                >
                  <c.icon size={19} />
                </div>

                <span
                  className="text-xs font-medium"
                  style={{ color: INK_SOFT }}
                >
                  {c.label}
                </span>

              </div>
            );

          })}

        </div>

      </section>


      {/* India context section */}
      <section
        id="about"
        className="max-w-5xl mx-auto px-4 md:px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >

        <div className="max-w-xs mx-auto lg:mx-0 order-2 lg:order-1">
          <AbstractIndiaIllustration />
        </div>


        <div className="order-1 lg:order-2">

          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-3"
            style={{
              color: SAFFRON,
              letterSpacing: "0.08em"
            }}
          >
            About Us
          </p>


          <h2
            className="jc-heading font-extrabold text-2xl md:text-4xl leading-tight mb-5"
            style={{ color: INK }}
          >
            Built for the problems people see every day.
          </h2>


          <p
            className="text-sm md:text-base mb-4"
            style={{ color: INK_SOFT }}
          >
            We're a small team who noticed the same civic complaints getting
            lost in the noise reported many times, by many people, but never
            seen as one problem worth prioritizing.
          </p>


          <p
            className="text-sm md:text-base"
            style={{ color: INK_SOFT }}
          >
            Jansamadhan is our attempt to fix that: turning scattered reports
            on roads, water, waste and streetlights into a clearer picture
            authorities can act on starting with a Sector 4, Bhopal.
          </p>

        </div>

      </section>


      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 pb-24 text-center">

        <h2
          className="jc-heading font-extrabold text-2xl md:text-4xl mb-4"
          style={{ color: INK }}
        >
          See a problem in your neighbourhood?
        </h2>


        <p
          className="text-sm md:text-base mb-8"
          style={{ color: INK_SOFT }}
        >
          Your report could help reveal a bigger civic issue.
        </p>


        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-lg text-white transition-opacity hover:opacity-90"
          style={{ background: SAFFRON }}
        >
          Report a Problem
          <ArrowRight size={15} />
        </Link>

      </section>


      {/* Footer */}
      <footer
        id="contact"
        className="relative overflow-hidden"
        style={{ background: DARK }}
      >

        <svg
          className="absolute bottom-0 right-0 opacity-[0.06]"
          width="220"
          height="220"
          viewBox="0 0 220 220"
        >

          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 38}
                cy={20 + row * 38}
                r="3"
                fill="#fff"
              />
            ))
          )}

        </svg>


        <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-16 pb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

  {/* JanSamadhan */}
  <div>
    <div className="flex items-center gap-2 mb-2">
      <LogoMark size={28} />

      <div className="jc-heading font-bold text-white text-lg">
        JanSamadhan
      </div>
    </div>

    <div
      className="text-xs mb-4"
      style={{ color: "rgba(255,255,255,0.45)" }}
    >
      Civic Problem Intelligence Platform
    </div>

    <p
      className="text-sm max-w-xs"
      style={{ color: "rgba(255,255,255,0.55)" }}
    >
      Turning citizen reports into a clearer picture of the civic
      problems affecting communities.
    </p>
  </div>


  {/* Quick Links */}
  <div>
    <div className="text-white text-sm font-semibold mb-3.5">
      Quick Links
    </div>

    <div className="flex flex-col gap-2.5">

      <a
        href="/"
        className="text-sm transition-colors hover:text-white"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Home
      </a>

      <a
        href="/citizen"
        className="text-sm transition-colors hover:text-white"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Dashboard
      </a>

      <a
        href="/citizen/report"
        className="text-sm transition-colors hover:text-white"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Report Issue
      </a>

      {/*
      <a
        href="/citizen/issues"
        className="text-sm transition-colors hover:text-white"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Issue Feed
      </a>
      */}

    </div>
  </div>


  {/* GitHub */}
  <div>
    <div className="text-white text-sm font-semibold mb-3.5">
      GitHub
    </div>

    <p
      className="text-sm mb-3"
      style={{ color: "rgba(255,255,255,0.5)" }}
    >
      View our project and source code:
    </p>

    <a
      href="https://github.com/Devya29/JanSamadhan"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm transition-colors hover:text-white"
      style={{ color: "rgba(255,255,255,0.5)" }}
    >
      GitHub Repository ↗
    </a>
  </div>

</div>


{/* Made By */}
<div
  className="border-t pt-10 pb-8"
  style={{ borderColor: "rgba(255,255,255,0.1)" }}
>
  <div className="text-center">

    <div className="text-white text-sm font-semibold mb-4">
      Made by
    </div>

    <div className="flex flex-wrap justify-center gap-x-7 gap-y-3">

      <span
        className="text-sm"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Shikha Singh
      </span>

      <span
        className="text-sm"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Aditi Srivastava
      </span>

      <span
        className="text-sm"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Devya Saigal
      </span>

      <span
        className="text-sm"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Karishma
      </span>

      <span
        className="text-sm"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Vaishnavi Ashok Ubarhande
      </span>

    </div>

  </div>
</div>

          {/* Contact Information */}

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs mb-8"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >

            <span className="flex items-center gap-1.5">
              <Mail size={12} />
              support@jansamadhan.example
            </span>


            <span className="flex items-center gap-1.5">
              <LifeBuoy size={12} />
              Helpline: 1800-XXX-XXXX (demo)
            </span>


            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              Sector 4, Bhopal
            </span>

          </div>


          <div
            className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }}
          >

            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              © 2026 Jansamadhan
            </span>


            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Built to make civic problems more visible.
            </span>

          </div>

        </div>

      </footer>

    </div>
  );
}