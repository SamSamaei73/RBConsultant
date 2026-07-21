import { useState, useEffect, useCallback } from "react";
import Logo from "../Images/RB-Consultant-Logo-F-white-transparent.png";
import about_img from "../Images/f3187fdc-670a-4c49-9480-218fd75c29b3.jpeg";
import libfLogo from "../Images/LIBF.png";
import Contact from "./Main/Contact";
import ACCAlogo from "../Images/ACCA.png";
import IFAlogo from "../Images/IFA-Logo.png";

const BRAND = "#3b847d";

const SLIDES = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
];

const LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  // { label: "Team", id: "team" }, // Team section disabled for now — see TEAM/team section below
  { label: "Partners", id: "partners" },
  { label: "Contact", id: "contact" },
];

const SERVICES = [
  {
    icon: "bars",
    title: "Bookkeeping & Cloud Accounting",
    num: "01",
    text: "Accurate day-to-day bookkeeping using Xero, QuickBooks or Sage, keeping your records HMRC-compliant and giving you a clear, real-time view of your finances.",
  },
  {
    icon: "target",
    title: "Self Assessment & Landlord Tax Returns",
    num: "02",
    text: "Stress-free Self Assessment and landlord tax returns prepared and filed on time, helping sole traders and property owners stay compliant and pay only what they owe.",
  },
  {
    icon: "shield",
    title: "VAT & Corporation Tax",
    num: "03",
    text: "End-to-end VAT registration, VAT returns and Corporation Tax filing, handled accurately and submitted on time to keep your limited company fully compliant.",
  },
  {
    icon: "users",
    title: "Payroll & PAYE",
    num: "04",
    text: "Reliable monthly payroll and PAYE administration for businesses of any size, including payslips, deductions and pension contributions handled correctly every time.",
  },
  {
    icon: "trend",
    title: "Tax Planning & Cash Flow",
    num: "05",
    text: "Proactive tax planning and cash flow forecasting designed to legally reduce your tax burden and keep your business financially healthy year-round.",
  },
  {
    icon: "briefcase",
    title: "Company Formation & Start-Up Support",
    num: "06",
    text: "Complete company formation, HMRC registration and Companies House filings, giving new businesses a fast, compliant start with ongoing support as you grow.",
  },
];

const TEAM = [
  {
    name: "Marcus Rodriguez",
    role: "Chief Technology Officer",
    bio: "Passionate about building scalable solutions and leading innovative development teams to create exceptional user experiences.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Head of Product Design",
    bio: "Creative visionary who transforms complex problems into intuitive design solutions that users love and businesses thrive with.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "David Kumar",
    role: "VP of Marketing",
    bio: "Growth strategist with expertise in digital marketing campaigns that drive user acquisition and brand recognition worldwide.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Emma Thompson",
    role: "Customer Success Lead",
    bio: "Dedicated to ensuring every customer achieves their goals through personalized support and strategic guidance.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Alex Johnson",
    role: "Senior Full-Stack Developer",
    bio: "Code architect who builds robust applications using cutting-edge technologies to deliver seamless digital experiences.",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Lisa Park",
    role: "UX Research Manager",
    bio: "User advocate who conducts deep research to understand customer needs and drive data-informed design decisions.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Ryan Mitchell",
    role: "DevOps Engineer",
    bio: "Infrastructure specialist focused on automation, scalability, and maintaining high-performance systems that never sleep.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Jessica Williams",
    role: "Data Analytics Lead",
    bio: "Numbers storyteller who transforms complex data into actionable insights that drive strategic business decisions.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=320&q=80",
  },
];

// Replace `logo: null` with an imported image (e.g. `logo: partnerLogo1`, same way `Logo` is imported above)
// and drop the file into src/Images. Name shows underneath each logo.
const PARTNERS = [
  { name: "LIBF", logo: libfLogo },
  { name: "ACCA", logo: ACCAlogo },
  { name: "IFA", logo: IFAlogo },
  // { name: "Company Four", logo: null },
  // { name: "Company Five", logo: null },
];

/* ---------- small icon helper ---------- */
function ServiceIcon({ type }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const paths = {
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    bars: (
      <>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </>
    ),
    trend: (
      <>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    briefcase: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  };
  return <svg {...common}>{paths[type] || paths.users}</svg>;
}

export default function StriveLanding() {
  const [index, setIndex] = useState(0); // hero slide
  const [scrolled, setScrolled] = useState(false); // solid header
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("home");
  const [svcStart, setSvcStart] = useState(0); // service carousel
  const [menuOpen, setMenuOpen] = useState(false);

  const go = useCallback((delta) => {
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);
  }, []);

  /* autoplay */
  useEffect(() => {
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [go, index]);

  /* scroll spy + header + back-to-top */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      let cur = "home";
      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4)
          cur = id;
      });
      setScrolled(y > 40);
      setShowTop(y > 320);
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id) => (e) => {
    e.preventDefault();
    if (id === "home") return window.scrollTo({ top: 0, behavior: "smooth" });
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const svcMove = (delta) =>
    setSvcStart((s) => (s + delta + SERVICES.length) % SERVICES.length);

  const visibleServices = [0, 1, 2].map(
    (k) => SERVICES[(svcStart + k) % SERVICES.length],
  );

  return (
    <div className="font-['Inter'] text-neutral-900">
      {/* ============ HEADER ============ */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div
          className="absolute inset-0 border-b border-white/10 transition-opacity duration-300"
          style={{
            background: "#4a4a4a",
            boxShadow: "0 4px 24px rgba(0,0,0,.18)",
            opacity: scrolled ? 1 : 0,
          }}
        />
        <div className="relative w-full max-w-[1240px] mx-auto grid grid-cols-3 items-center px-6 py-4">
          {/* Col 1: Logo — always left */}
          <a
            href="#home"
            onClick={scrollToId("home")}
            className="z-10 justify-self-start"
          >
            <img src={Logo} alt="RB Consultant Logo" className="h-14 w-auto" />
          </a>

          {/* Col 2: Desktop nav — always center (invisible on mobile to hold grid space) */}
          <ul className="flex items-center justify-center gap-8 text-[15px] font-semibold text-white/90 invisible lg:visible">
            {LINKS.map((l) => (
              <li key={l.id} className="relative flex items-center gap-1">
                <a
                  href={`#${l.id}`}
                  onClick={scrollToId(l.id)}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </a>
                {active === l.id && (
                  <span
                    className="absolute -bottom-2 left-0 h-[3px] w-10 rounded-full"
                    style={{ background: BRAND }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Col 3: Hamburger on mobile, empty on desktop */}
          <div className="justify-self-end z-10">
            <button
              className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile/tablet dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"}`}
          style={{ background: "#4a4a4a" }}
        >
          <ul className="max-w-[1240px] mx-auto px-6 py-2 flex flex-col">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    scrollToId(l.id)(e);
                    setMenuOpen(false);
                  }}
                  className={`block py-3.5 text-[15px] font-semibold border-b border-white/10 last:border-0 transition-colors hover:text-white ${active === l.id ? "text-white" : "text-white/70"}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section
        id="home"
        className="relative w-full h-screen min-h-[680px] overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-black">
          {SLIDES.map((src, n) => (
            <div
              key={n}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-[900ms] ease-in-out"
              style={{
                backgroundImage: `url("${src}")`,
                opacity: n === index ? 1 : 0,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 z-10 bg-black/55" />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <div>
            <h1 className="text-white font-extrabold leading-[1.05] text-2xl sm:text-6xl lg:text-7xl">
              {" "}
              Accounting &amp; Mortgage Advicer
            </h1>
            <div
              className="mx-auto mt-7 h-[3px] w-16 rounded-full"
              style={{ background: BRAND }}
            />
            <p className="mx-auto mt-7 max-w-[720px] text-[17px] sm:text-lg leading-relaxed text-white/85">
              A qualified accountant and mortgage advisor with 9 years' UK
              experience, helping self-employed individuals and small businesses
              manage finances, plan taxes, and make confident mortgage
              decisions.
            </p>
          </div>
        </div>
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {SLIDES.map((_, n) => (
            <button
              key={n}
              onClick={() => setIndex(n)}
              aria-label="Go to slide"
              className="h-2.5 rounded-full transition-all duration-300"
              style={{
                width: n === index ? 28 : 10,
                background: n === index ? "#fff" : "rgba(255,255,255,.45)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="bg-white py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <SectionHead title="About" />
          <div className="mt-14 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div className="relative">
              <img
                src={about_img}
                alt="Team"
                className="w-full aspect-[4/5] object-cover rounded-2xl shadow-xl"
              />
              {/* <div
                className="absolute -top-4 right-6 lg:right-10 text-white rounded-xl px-7 py-4 text-center shadow-lg"
                style={{ background: BRAND }}
              >
                <div className="text-[11px] font-bold tracking-[0.15em] mt-1 uppercase">
                  CLIENTS
                </div>
              </div> */}
              <div className="absolute -bottom-6 -left-3 lg:-left-6 bg-white rounded-xl px-8 py-5 text-center shadow-2xl">
                <div
                  className="text-4xl font-extrabold leading-none"
                  style={{ color: BRAND }}
                >
                  9
                </div>
                <div className="text-[11px] font-bold tracking-[0.15em] text-neutral-800 mt-2 leading-tight">
                  YEARS OF
                  <br />
                  EXPERIENCE
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-extrabold leading-[1.1] text-center lg:text-left">
                Qualified Accountant &amp; Mortgage Advisor
              </h3>
              <p className="mt-6 text-neutral-500 leading-relaxed text-lg">
                We are a qualified accountant and mortgage advisor with 9 years'
                experience in the UK. I'm a member of ACCA, IFA and LIBF, and I
                help individuals and businesses make confident financial
                decisions with accurate, practical support.
              </p>
              <p className="mt-5 text-neutral-500 leading-relaxed text-lg">
                Our focus is on self-employed clients and micro-entity companies,
                providing clear accounting guidance and reliable advice designed
                to support day-to-day operations and long-term growth. Whether
                you need bookkeeping support, year-end accounts preparation, tax
                planning, or mortgage guidance, I aim to deliver a service
                that's efficient, responsive, and tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="bg-white pb-20 lg:pb-28 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <SectionHead title="Services" />
          <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span
                className="inline-block rounded-md text-xs font-extrabold tracking-[0.14em] px-4 py-2.5"
                style={{ background: "rgba(238,124,0,.1)", color: BRAND }}
              >
                ACCOUNTING SERVICES
              </span>
              <h3 className="mt-6 text-4xl lg:text-5xl font-extrabold leading-[1.08] text-center lg:text-left">
                Reliable, Affordable Accounting Built Around Your Business
              </h3>
              <p className="mt-6 text-neutral-500 leading-relaxed text-lg">
                Helping individuals, sole traders, landlords and limited
                companies stay compliant and in control of their finances with
                fixed monthly fees, friendly service, and quick response times.
              </p>
              <a
                href="#contact"
                onClick={scrollToId("contact")}
                className="mt-8 inline-flex items-center gap-2.5 rounded-md px-7 py-4 text-white font-bold transition-colors"
                style={{ background: BRAND }}
              >
                Request a Consultation
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
            <div className="relative">
              <div
                className="absolute -top-8 -right-6 w-52 h-52 rounded-full"
                style={{ background: "rgba(238,124,0,.1)" }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-28 h-28 rounded-lg"
                style={{ background: "rgba(238,124,0,.1)" }}
              />
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1100&q=80"
                alt="Consultant"
                className="relative z-10 w-full aspect-[4/3] object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {visibleServices.map((s) => (
              <div
                key={s.num}
                className="h-full flex flex-col bg-white rounded-xl p-8"
                style={{ boxShadow: "0 12px 44px rgba(0,0,0,.07)" }}
              >
                <div
                  className="w-16 h-16 rounded-full grid place-items-center"
                  style={{ background: BRAND }}
                >
                  <ServiceIcon type={s.icon} />
                </div>
                <h4 className="mt-6 text-xl font-bold">{s.title}</h4>
                <p className="mt-3 text-neutral-500 leading-relaxed">
                  {s.text}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <span
                    className="h-[2px] w-10"
                    style={{ background: BRAND }}
                  />
                  <span className="font-extrabold" style={{ color: BRAND }}>
                    {s.num}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-end gap-3">
            <button
              onClick={() => svcMove(-1)}
              aria-label="Previous services"
              className="grid place-items-center w-12 h-12 rounded-full text-white transition-colors"
              style={{ background: BRAND }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => svcMove(1)}
              aria-label="Next services"
              className="grid place-items-center w-12 h-12 rounded-full text-white transition-colors"
              style={{ background: BRAND }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ============ TEAM (disabled for now, may reuse later) ============
      <section id="team" className="py-20 lg:py-28 scroll-mt-20" style={{ background: "#f4f0ea" }}>
        <div className="max-w-[1240px] mx-auto px-6">
          <SectionHead title="Team" />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-8 text-center" style={{ boxShadow: "0 16px 50px rgba(0,0,0,.06)" }}>
                <div className="mx-auto w-32 h-32 rounded-full p-1.5" style={{ border: "1px solid rgba(238,124,0,.4)" }}>
                  <div className="w-full h-full rounded-full bg-cover bg-center bg-neutral-200" style={{ backgroundImage: `url("${m.avatar}")` }} />
                </div>
                <h4 className="mt-6 text-xl font-bold">{m.name}</h4>
                <p className="mt-1.5 text-xs font-extrabold tracking-[0.12em] uppercase" style={{ color: BRAND }}>{m.role}</p>
                <p className="mt-4 text-neutral-500 leading-relaxed text-sm">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      ============ END TEAM ============ */}

      {/* ============ PARTNERS ============ */}
      <section
        id="partners"
        className="bg-white pt-4 pb-20 lg:pt-6 lg:pb-28 scroll-mt-20 overflow-hidden"
      >
        <div className="max-w-[1240px] mx-auto px-6">
          <SectionHead title="Partners" />
        </div>
        <div className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-16 animate-marquee hover:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 shrink-0 w-56"
              >
                <div className="h-28 w-56 grid place-items-center">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-28 max-w-full object-contain"
                    />
                  ) : (
                    <div className="h-28 w-56 rounded-lg bg-neutral-100 grid place-items-center text-neutral-400 text-xs font-bold uppercase tracking-wide">
                      Logo
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold text-neutral-600 text-center">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section
        id="contact"
        className="py-20 lg:py-28 scroll-mt-20"
        style={{ background: "#f4f0ea" }}
      >
        <div className="max-w-[1240px] mx-auto px-6">
          <SectionHead title="Contact" />
          <div className="mt-14 grid lg:grid-cols-2 gap-8 items-stretch">
            <div
              className="rounded-2xl text-white p-10 flex flex-col"
              style={{ background: BRAND }}
            >
              <h3 className="text-3xl font-extrabold text-center lg:text-left">
                Contact Information
              </h3>
              <p className="mt-3 text-white/85 leading-relaxed">
                Have a question about accounting, tax, VAT, or payroll? Get in
                touch, and we'll respond within one business day.
              </p>
              <div className="mt-9 space-y-7">
                <ContactRow
                  label="Location"
                  value="Liberty House 81-83 Victoria Road Surbiton Surrey, KT6 4NS"
                  icon="pin"
                  href="https://maps.google.com/?q=8721+Broadway+Avenue+New+York+NY+10023"
                />
                <ContactRow
                  label="Email"
                  value="info@RBConsultant.co.uk"
                  icon="mail"
                  href="mailto:info@RBConsultant.co.uk"
                />
                <ContactRow
                  label="Call"
                  value="+44 (0) 745 015 3643"
                  icon="phone"
                  href="tel:+447450153643"
                />
                <ContactRow
                  label="Open Hours"
                  value="Monday–Friday: 9AM – 6PM"
                  icon="clock"
                />
              </div>
              <div className="mt-10 pt-8 border-t border-white/20">
                <p className="text-white/70 text-sm font-semibold mb-4 tracking-wide">
                  Connect With Us
                </p>
                <div className="flex gap-3">
                  {/* <SocialIcon
                    href="https://instagram.com/"
                    type="instagram"
                    label="Instagram"
                  /> */}
                  <SocialIcon
                    href="https://www.linkedin.com/company/rbconsultantuk"
                    type="linkedin"
                    label="LinkedIn"
                  />
                  <SocialIcon
                    href="https://wa.me/447450153643"
                    type="whatsapp"
                    label="WhatsApp"
                  />
                  {/* <SocialIcon
                    href="https://t.me/"
                    type="telegram"
                    label="Telegram"
                  /> */}
                  <SocialIcon
                    href="info@RBConsultant.co.uk"
                    type="email"
                    label="Email"
                  />
                </div>
              </div>
            </div>
            <Contact />
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer
        className="text-neutral-400 text-center md:text-left"
        style={{ background: "#141414" }}
      >
        <div className="max-w-[1240px] mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="mx-auto md:mx-0">
            <a href="#home" onClick={scrollToId("home")}>
              <img
                src={Logo}
                alt="RB Consultant Logo"
                className="h-12 w-auto"
              />
            </a>
            <p className="mt-4 leading-relaxed text-sm">
              Present your business with confidence a clean, flexible platform
              to connect with clients and strengthen your brand.
            </p>
          </div>
          <FooterCol
            title="Quick Links"
            items={LINKS.map((l) => ({ label: l.label, href: `#${l.id}` }))}
          />
          <FooterCol
            title="Services"
            items={SERVICES.slice(0, 4).map((s) => ({
              label: s.title,
              href: "#services",
            }))}
          />
          <div>
            <h5 className="text-white font-bold text-lg">Get in Touch</h5>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                Liberty House 81-83 Victoria Road Surbiton Surrey, KT6 4NS
              </li>
              <li>info@RBConsultant.co.uk</li>
              <li>+44 (0) 745 015 3643</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-[1240px] mx-auto px-6 py-6 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:justify-between">
            <p>
              © {new Date().getFullYear()} RB Consultant. All Rights Reserved.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a href="#" className="transition-colors hover:text-[#ee7c00]">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-[#ee7c00]">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid place-items-center w-11 h-11 rounded-full text-white shadow-lg transition-colors"
          style={{ background: BRAND }}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ---------- little presentational helpers ---------- */
function SectionHead({ title }) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:text-left">
        <h2 className="text-2xl font-extrabold tracking-wide uppercase">
          {title}
        </h2>
        <span
          className="h-[3px] w-20 rounded-full"
          style={{ background: BRAND }}
        />
      </div>
    </>
  );
}

function Feature({ title, text }) {
  return (
    <div className="flex gap-4">
      <div
        className="shrink-0 w-12 h-12 rounded-full grid place-items-center"
        style={{ background: "rgba(238,124,0,.1)", color: BRAND }}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <div>
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="mt-1 text-neutral-500">{text}</p>
      </div>
    </div>
  );
}

function ContactRow({ label, value, icon, href }) {
  const icons = {
    pin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  };
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-12 h-12 rounded-full bg-white/15 grid place-items-center">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icons[icon]}
        </svg>
      </div>
      <div>
        <div className="font-bold">{label}</div>
        {href ? (
          <a
            href={href}
            className="text-white/85 hover:text-white transition-colors"
          >
            {value}
          </a>
        ) : (
          <div className="text-white/85">{value}</div>
        )}
      </div>
    </div>
  );
}

function SocialIcon({ href, type, label }) {
  const paths = {
    instagram: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    whatsapp: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ),
    telegram: (
      <>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </>
    ),
    email: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),
  };
  return (
    <a
      href={href}
      aria-label={label}
      target={type !== "email" ? "_blank" : undefined}
      rel="noreferrer"
      className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 grid place-items-center transition-colors"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[type]}
      </svg>
    </a>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h5 className="text-white font-bold text-lg">{title}</h5>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map((it, i) => (
          <li key={i}>
            <a
              href={it.href}
              className="transition-colors hover:text-[#ee7c00]"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
