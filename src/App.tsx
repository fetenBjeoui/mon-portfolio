import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Award,
  BadgeCheck,
  Briefcase,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Database,
  Download,
  FileText,
  Film,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Ship,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import {
  education,
  experience,
  filters,
  languages,
  marquee,
  milestones,
  nav,
  pillars,
  profile,
  projects,
  skills,
  stats,
  topics,
  type Domain,
  type Filter,
  type ProjectItem,
} from "./data";
import { copyText, downloadCv, downloadVCard } from "./lib/downloads";
import { cn } from "./utils/cn";

const projectTones = {
  web: "from-rose via-rose-deep to-ink",
  movies: "from-ink via-[#3a1630] to-rose-deep",
  erp: "from-rose-deep via-ink to-night",
} as const;

function ProjectArt({ kind, size = 56 }: { kind: keyof typeof projectTones; size?: number }) {
  const Icon = projectIcons[kind];
  return (
    <span className={cn("absolute inset-0 flex items-center justify-center bg-gradient-to-br", projectTones[kind])} aria-hidden="true">
      <span className="absolute -left-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
      <span className="absolute -bottom-16 right-6 h-56 w-56 rounded-full border border-white/10" />
      <span className="absolute right-16 top-10 h-2 w-2 rotate-45 bg-rose-soft/70" />
      <span className="absolute bottom-14 left-14 h-1.5 w-1.5 rotate-45 bg-white/50" />
      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition duration-500 group-hover:scale-110">
        <Icon size={size} strokeWidth={1.4} />
      </span>
    </span>
  );
}

const experienceIcons = { ship: Ship, code: Code2, file: FileText };
const skillIcons = { briefcase: Briefcase, ship: Ship, code: Code2, wrench: Wrench };
const projectIcons = { web: Globe, movies: Film, erp: Database };

type Toast = { id: number; message: string };

function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<number | null>(null);
  const notify = (message: string) => {
    if (timer.current) window.clearTimeout(timer.current);
    setToast({ id: Date.now(), message });
    timer.current = window.setTimeout(() => setToast(null), 2600);
  };
  return { toast, notify };
}

function useReveal() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    const watch = (node: Element) => {
      const targets = node.classList.contains("reveal")
        ? [node]
        : Array.from(node.querySelectorAll(".reveal"));
      targets.forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        observer.observe(el);
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) el.classList.add("in");
      });
    };

    watch(document.body);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) watch(node);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    const fallback = window.setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    }, 1800);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setSeen(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, seen };
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

function Mark() {
  return (
    <span className="inline-flex items-center gap-2 text-rose" aria-hidden="true">
      <span className="h-px w-8 bg-rose/50" />
      <span className="h-1.5 w-1.5 rotate-45 bg-rose" />
      <span className="h-px w-8 bg-rose/50" />
    </span>
  );
}

function Heading({
  kicker,
  title,
  emphasis,
  text,
}: {
  kicker: string;
  title: string;
  emphasis?: string;
  text?: string;
}) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-rose-deep">{kicker}</p>
      <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
        {title} {emphasis && <em className="italic text-rose">{emphasis}</em>}
      </h2>
      {text && <p className="mt-4 text-base leading-relaxed text-ink/70">{text}</p>}
      <div className="mt-5 flex justify-center">
        <Mark />
      </div>
    </div>
  );
}

function FilterBar({ value, onChange }: { value: Filter; onChange: (next: Filter) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrer par domaine">
      {filters.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              active ? "bg-ink text-ivory" : "bg-white text-ink/70 ring-1 ring-ink/10 hover:text-rose-deep",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setWidth(max > 0 ? (root.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="no-print fixed inset-x-0 top-0 z-[60] h-1 bg-transparent" aria-hidden="true">
      <div className="h-full bg-gradient-to-r from-rose to-rose-deep" style={{ width: `${width}%` }} />
    </div>
  );
}

function Navbar({
  active,
  open,
  setOpen,
  onCv,
}: {
  active: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onCv: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition duration-300",
        scrolled || open ? "bg-paper/90 shadow-[0_1px_0_rgba(27,19,36,0.06)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8" aria-label="Principale">
        <a href="#accueil" className="font-display text-2xl text-ink">
          Feten<span className="text-rose">.</span>
        </a>
        <ul className="hidden items-center gap-5 text-sm font-medium text-ink/75 xl:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href.slice(1) ? "page" : undefined}
                className={cn(
                  "transition hover:text-rose-deep",
                  active === item.href.slice(1) && "text-rose-deep",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCv}
            className="hidden rounded-full bg-rose px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(194,51,93,0.9)] transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Voir le CV
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="fade-in border-t border-ink/5 bg-paper px-6 py-4 xl:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-2 py-3 font-display text-2xl text-ink hover:text-rose"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onCv();
                }}
                className="block rounded-xl px-2 py-3 text-left font-display text-2xl text-rose"
              >
                Voir le CV
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero({ onCv, onCopy }: { onCv: () => void; onCopy: (value: string, label: string) => void }) {
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <section id="accueil" className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
      <div className="blob pointer-events-none absolute -right-24 top-10 h-[460px] w-[460px] rounded-full bg-rose/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
      <p className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[11px] font-semibold tracking-[0.42em] text-ink/35 xl:block">
        ARIANA · TUNISIE
      </p>
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <span className="rise inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-rose-deep ring-1 ring-rose/15">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-60 motion-reduce:animate-none" />
              <span className="relative h-2 w-2 rounded-full bg-rose" />
            </span>
            {profile.availability}
          </span>
          <h1
            className="rise mt-6 font-display text-[clamp(3.4rem,8vw,6.5rem)] font-medium leading-[0.9] tracking-tight text-ink"
            style={{ animationDelay: "0.08s" }}
          >
            {profile.firstName}
            <br />
            <span className="italic text-rose">{profile.lastName}</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg font-medium leading-snug text-ink" style={{ animationDelay: "0.16s" }}>
            {profile.role}
          </p>
          <p className="rise mt-4 max-w-xl text-base leading-relaxed text-ink/70" style={{ animationDelay: "0.22s" }}>
            {profile.tagline}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.28s" }}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-18px_rgba(194,51,93,0.95)] transition hover:-translate-y-0.5"
            >
              Me contacter <Send size={16} />
            </a>
            <button
              type="button"
              onClick={onCv}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:text-rose-deep"
            >
              <Download size={16} /> Consulter le CV
            </button>
          </div>
          <div className="rise mt-7 flex items-center gap-3" style={{ animationDelay: "0.34s" }}>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition hover:border-rose hover:text-rose-deep"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Envoyer un e-mail"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition hover:border-rose hover:text-rose-deep"
            >
              <Mail size={18} />
            </a>
            <a
              href={profile.phoneHref}
              aria-label="Appeler"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition hover:border-rose hover:text-rose-deep"
            >
              <Phone size={18} />
            </a>
            <button
              type="button"
              onClick={() => onCopy(profile.email, "E-mail copié")}
              className="hidden text-sm font-medium text-ink/60 underline-offset-4 hover:text-rose-deep hover:underline sm:inline"
            >
              {profile.email}
            </button>
          </div>
          <dl className="rise mt-10 grid max-w-lg grid-cols-3 gap-3" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/70 px-3 py-3 ring-1 ring-ink/5">
                <dt className="font-display text-3xl text-ink">
                  <CountValue value={stat.value} />
                  {stat.suffix}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-ink/60">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[380px] px-2">
          <div className="absolute -left-1 top-8 hidden h-[88%] w-full arch border border-rose/35 sm:block" />
          <div className="absolute -right-1 bottom-6 hidden h-[88%] w-full arch border border-gold/60 sm:block" />
          <figure className="relative arch overflow-hidden bg-blush shadow-[0_30px_70px_-36px_rgba(194,51,93,0.65)]">
            {photoOk ? (
              <img
                src="/photo.jpg"
                alt="Feten Bejaoui"
                onError={() => setPhotoOk(false)}
                className="aspect-[3/4] w-full object-cover object-top"
              />
            ) : (
              <div className="relative flex aspect-[3/4] w-full flex-col items-center justify-center bg-gradient-to-b from-rose-soft via-blush to-ivory">
                <div className="pointer-events-none absolute inset-6 arch border border-rose/25" />
                <span className="font-display text-[7rem] leading-none text-ink">
                  F<span className="italic text-rose">B</span>
                </span>
                <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-ink/50">
                  Feten Bejaoui
                </span>
                <span className="mt-1 text-xs text-ink/45">Ariana · Tunisie</span>
              </div>
            )}
          </figure>
          <div className="float-y absolute left-0 top-8 hidden items-center gap-3 rounded-2xl bg-paper px-3.5 py-3 shadow-xl ring-1 ring-ink/5 sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose text-white">
              <Briefcase size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">7+ ans</span>
              <span className="block text-xs text-ink/55">Labidi Viandes</span>
            </span>
          </div>
          <div className="float-y-delayed absolute -right-1 bottom-28 hidden items-center gap-3 rounded-2xl bg-paper px-3.5 py-3 shadow-xl ring-1 ring-ink/5 sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-ivory">
              <Code2 size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">ReactJS</span>
              <span className="block text-xs text-ink/55">Site de l'entreprise</span>
            </span>
          </div>
        </div>
      </Container>
      <a
        href="#apropos"
        className="no-print absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-rose-deep sm:inline-flex"
        aria-label="Aller à la section à propos"
      >
        <ChevronDown className="animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}

function CountValue({ value }: { value: number }) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 850);
      setN(Math.round((1 - (1 - p) ** 3) * value));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, value]);
  return <span ref={ref}>{n}</span>;
}

function Marquee() {
  const loop = [...marquee, ...marquee];
  return (
    <div className="marquee no-print overflow-hidden border-y border-white/10 bg-ink py-4 text-ivory" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-8 pr-8">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.28em]">
            <span className={index % 3 === 1 ? "text-rose-soft" : ""}>{item}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-rose" />
          </span>
        ))}
      </div>
    </div>
  );
}

function About({ onCopy }: { onCopy: (value: string, label: string) => void }) {
  const cards = [
    { icon: Mail, label: "E-mail", value: profile.email, copy: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Téléphone", value: profile.phone, copy: profile.phone, href: profile.phoneHref },
    { icon: MapPin, label: "Localisation", value: profile.location, hint: profile.coordinates },
    { icon: LinkedInIcon, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, external: true },
  ];
  return (
    <section id="apropos" className="bg-paper py-24">
      <Container>
        <Heading
          kicker="01 — À propos"
          title="Une pratique"
          emphasis="polyvalente"
          text="Entre les dossiers, les flux d'importation et les interfaces, le même fil : la précision."
        />
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="reveal">
            <p className="text-lg leading-relaxed text-ink/75">{profile.about}</p>
            <blockquote className="mt-8 border-l-2 border-rose pl-5">
              <p className="font-display text-2xl italic leading-snug text-ink">« {profile.tagline} »</p>
              <footer className="mt-3 text-sm text-ink/50">En quelques mots — présentation</footer>
            </blockquote>
            <a href="#parcours" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-deep">
              Voir le fil du parcours <ArrowRight size={16} />
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="flex items-center gap-4 rounded-2xl bg-ivory p-4 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:ring-rose/30"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-rose-deep shadow-sm">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">{card.label}</span>
                    {card.href ? (
                      <a
                        href={card.href}
                        target={card.external ? "_blank" : undefined}
                        rel={card.external ? "noreferrer noopener" : undefined}
                        className="block truncate text-sm font-semibold text-ink hover:text-rose-deep"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <span className="block truncate text-sm font-semibold text-ink">{card.value}</span>
                    )}
                    {card.hint && <span className="block text-xs text-ink/45">{card.hint}</span>}
                  </span>
                  {card.copy && (
                    <button
                      type="button"
                      aria-label={`Copier ${card.label}`}
                      onClick={() => onCopy(card.copy, `${card.label} copié`)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/40 hover:bg-white hover:text-rose-deep"
                    >
                      <Copy size={15} />
                    </button>
                  )}
                </div>
              );
            })}
            <div className="reveal rounded-2xl bg-ink p-5 text-ivory sm:col-span-2 lg:col-span-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-soft">En ce moment</p>
              <p className="mt-2 font-display text-2xl">Import & site web</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{profile.now}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Pillars({ filter, onChoose }: { filter: Filter; onChoose: (domain: Domain) => void }) {
  return (
    <section className="py-20">
      <Container>
        <Heading
          kicker="Domaines"
          title="Ce que je"
          emphasis="fais avancer"
          text="Choisissez un domaine pour éclairer les missions et les projets correspondants."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const active = filter === pillar.domain;
            return (
              <button
                key={pillar.domain}
                type="button"
                onClick={() => onChoose(pillar.domain)}
                className={cn(
                  "reveal group rounded-3xl bg-paper p-6 text-left ring-1 transition hover:-translate-y-1",
                  active ? "ring-rose shadow-[0_18px_40px_-28px_rgba(194,51,93,0.8)]" : "ring-ink/8 hover:ring-rose/40",
                )}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="font-display text-sm text-rose">{pillar.index}</span>
                <h3 className="mt-4 font-display text-2xl text-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{pillar.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rose-deep">
                  {active ? "Filtre actif" : "Filtrer le parcours"} <ArrowRight size={15} />
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Journey() {
  const scroller = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const update = () => {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setProgress(max <= 0 ? 1 : node.scrollLeft / max);
  };
  const scrollBy = (dir: number) => scroller.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <section id="parcours" className="bg-paper py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-rose-deep">02 — Fil du parcours</p>
            <h2 className="mt-3 font-display text-4xl text-ink">
              Les étapes de mon <em className="italic text-rose">parcours</em>
            </h2>
          </div>
          <div className="no-print flex gap-2">
            <button type="button" aria-label="Défiler vers la gauche" onClick={() => scrollBy(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink ring-1 ring-ink/10 hover:text-rose-deep">
              <ArrowLeft size={18} />
            </button>
            <button type="button" aria-label="Défiler vers la droite" onClick={() => scrollBy(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-ivory hover:bg-rose">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div
          ref={scroller}
          onScroll={update}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollBy(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollBy(-1);
            }
          }}
          className="scroller mt-8 flex snap-x gap-4 overflow-x-auto pb-4 focus-visible:outline-offset-8"
          aria-label="Frise chronologique, défilable horizontalement"
        >
          {milestones.map((item, index) => (
            <article key={item.year} className="min-w-[240px] flex-1 snap-start rounded-3xl bg-ivory p-5 ring-1 ring-ink/5">
              <p className="font-display text-4xl text-rose">{item.year}</p>
              <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{item.place}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink/35">0{index + 1}</p>
            </article>
          ))}
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-blush" aria-hidden="true">
          <div className="h-full rounded-full bg-rose transition-all" style={{ width: `${Math.max(progress * 100, 12)}%` }} />
        </div>
      </Container>
    </section>
  );
}

function Experience({ filter, onChange }: { filter: Filter; onChange: (next: Filter) => void }) {
  return (
    <section id="experience" className="relative overflow-hidden py-24">
      <span className="pointer-events-none absolute -right-6 top-16 hidden font-display text-[11rem] leading-none text-ink/[0.035] lg:block">
        2019
      </span>
      <Container className="relative">
        <Heading
          kicker="03 — Parcours"
          title="Expériences"
          emphasis="professionnelles"
          text="Sept années de polyvalence, entre gestion, import et développement web."
        />
        <div className="mt-8">
          <FilterBar value={filter} onChange={onChange} />
        </div>
        <p className="sr-only" aria-live="polite">
          {filter === "all" ? "Tous les domaines sont affichés." : `Filtre actif : ${filters.find((item) => item.id === filter)?.label}.`}
        </p>
        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-rose via-rose/40 to-transparent" />
          <div className="space-y-8">
            {experience.map((job) => {
              const Icon = experienceIcons[job.icon];
              const dim = filter !== "all" && job.domain !== filter;
              return (
                <article key={job.id} className={cn("reveal relative pl-14 transition duration-300", dim && "opacity-35")}>
                  <span className="absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-paper text-rose ring-2 ring-rose">
                    <Icon size={15} />
                  </span>
                  <div className="rounded-3xl bg-paper p-6 ring-1 ring-ink/8 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-32px_rgba(27,19,36,0.45)]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold text-rose-deep">{job.period}</span>
                      {job.current && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-ivory">
                          <BadgeCheck size={13} /> En cours
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-2xl text-ink">{job.title}</h3>
                    <p className="text-sm font-medium text-ink/55">{job.company}</p>
                    <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink/75">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {job.note && <p className="mt-4 text-xs leading-relaxed text-ink/45">{job.note}</p>}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-ivory px-3 py-1 text-xs font-medium text-ink/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Skills() {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <section id="competences" className="bg-paper py-24">
      <Container>
        <Heading
          kicker="04 — Savoir-faire"
          title="Compétences"
          emphasis="croisées"
          text="Un profil hybride, entre la tenue des dossiers et les technologies web."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {skills.map((group, index) => {
            const Icon = skillIcons[group.icon];
            return (
              <article
                key={group.title}
                className="reveal rounded-3xl bg-ivory p-6 ring-1 ring-ink/5"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose text-white shadow-[0_12px_24px_-14px_rgba(194,51,93,0.9)]">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full bg-white px-3 py-1.5 text-sm text-ink/80 ring-1 ring-ink/5">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <div ref={ref} className="reveal mt-4 rounded-3xl bg-ink p-6 text-ivory sm:p-8">
          <h3 className="flex items-center gap-2 font-display text-2xl">
            <Languages size={20} className="text-rose-soft" /> Langues
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {languages.map((lang) => (
              <div key={lang.name}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-rose-soft">{lang.level}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-soft to-rose transition-all duration-1000"
                    style={{ width: seen ? lang.width : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/45">Niveaux indicatifs, non issus d'un test certifié.</p>
        </div>
      </Container>
    </section>
  );
}

function Projects({
  filter,
  onOpen,
}: {
  filter: Filter;
  onOpen: (project: ProjectItem) => void;
}) {
  const visible = projects.filter((project) => filter === "all" || project.domain === filter);
  const [featured, ...rest] = visible;
  return (
    <section id="projets" className="py-24">
      <Container>
        <Heading kicker="05 — Réalisations" title="Projets" emphasis="concrets" text="Du site vitrine à l'application, jusqu'au PFE." />
        {visible.length === 0 ? (
          <p className="mx-auto mt-12 max-w-xl text-center text-ink/65">
            Aucun projet dans ce filtre. Les missions correspondantes sont détaillées dans l'expérience.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featured && <ProjectCard project={featured} onOpen={onOpen} featured />}
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={onOpen} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
  featured = false,
}: {
  project: ProjectItem;
  onOpen: (project: ProjectItem) => void;
  featured?: boolean;
}) {
  const Icon = projectIcons[project.image];
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className={cn(
        "reveal group overflow-hidden rounded-3xl bg-paper text-left ring-1 ring-ink/8 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(194,51,93,0.45)]",
        featured && "lg:col-span-2 lg:grid lg:grid-cols-2",
      )}
    >
      <span className={cn("relative block overflow-hidden", featured ? "min-h-64" : "h-52")}>
        <ProjectArt kind={project.image} size={featured ? 60 : 48} />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          <Icon size={14} /> {project.period}
        </span>
      </span>
      <span className="block p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">{project.place}</span>
        <span className="mt-2 block font-display text-2xl text-ink group-hover:text-rose-deep">{project.title}</span>
        <span className="mt-3 block text-sm leading-relaxed text-ink/65">{project.description}</span>
        <span className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-rose-deep">
              {tech}
            </span>
          ))}
        </span>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          Lire le détail <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </span>
      </span>
    </button>
  );
}

function Education() {
  return (
    <section id="formation" className="bg-paper py-24">
      <Container>
        <Heading kicker="06 — Études" title="Diplômes &" emphasis="formations" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {education.map((item, index) => {
            const Icon = item.icon === "award" ? Award : GraduationCap;
            return (
              <article
                key={item.title}
                className="reveal rounded-3xl bg-ivory p-6 ring-1 ring-ink/5"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose text-white">
                  <Icon size={20} />
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-rose-deep">{item.period}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-ink/60">{item.school}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Contact({ notify }: { notify: (message: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", topic: topics[0], message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [draft, setDraft] = useState("");

  const validate = () => {
    const next: Partial<typeof form> = {};
    if (form.name.trim().length < 2) next.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Indiquez un e-mail valide.";
    if (form.message.trim().length < 12) next.message = "Quelques mots de plus, pour que je puisse répondre.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    const body = `${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`;
    const subject = `Portfolio — ${form.topic} — ${form.name.trim()}`;
    setDraft(`À : ${profile.email}\nObjet : ${subject}\n\n${body}`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    notify("Votre messagerie va s'ouvrir.");
  };

  const cards = [
    { icon: Mail, label: "E-mail", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Téléphone", value: profile.phone, href: profile.phoneHref },
    { icon: MapPin, label: "Ariana", value: profile.location },
    { icon: LinkedInIcon, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, external: true },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-night py-24 text-ivory">
      <div className="pointer-events-none absolute -left-10 top-0 h-80 w-80 rounded-full bg-rose/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-rose/10 blur-3xl" />
      <Container className="relative">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-rose-soft">07 — Contact</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Écrivons-<em className="italic text-rose-soft">nous</em>
          </h2>
          <p className="mt-4 text-white/70">Une opportunité, un dossier d'import ou un projet web — écrivez-moi.</p>
          <div className="mt-5 flex justify-center">
            <Mark />
          </div>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="reveal space-y-3">
            {cards.map((card) => {
              const Icon = card.icon;
              const inner = (
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-rose/40 hover:bg-white/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose text-white">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.16em] text-white/40">{card.label}</span>
                    <span className="block truncate text-sm font-semibold">{card.value}</span>
                  </span>
                </div>
              );
              return card.href ? (
                <a key={card.label} href={card.href} target={card.external ? "_blank" : undefined} rel={card.external ? "noreferrer noopener" : undefined}>
                  {inner}
                </a>
              ) : (
                <div key={card.label}>{inner}</div>
              );
            })}
            <button
              type="button"
              onClick={() => {
                downloadVCard();
                notify("Contact enregistré.");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/80 hover:border-rose-soft hover:text-white"
            >
              <Download size={15} /> Enregistrer le contact
            </button>
          </div>

          {draft ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose text-white">
                <Check size={18} />
              </span>
              <h3 className="mt-4 font-display text-2xl">Message préparé</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Votre application de messagerie devrait s'ouvrir. Si rien ne se passe, copiez le texte ci-dessous.
              </p>
              <pre className="mt-4 max-h-52 overflow-auto whitespace-pre-wrap rounded-2xl bg-black/30 p-4 text-xs leading-relaxed text-white/80">
                {draft}
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={async () => notify((await copyText(draft)) ? "Message copié" : "Copie impossible")}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink"
                >
                  <Copy size={15} /> Copier
                </button>
                <button
                  type="button"
                  onClick={() => setDraft("")}
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-white/70 hover:text-white"
                >
                  Écrire un autre message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="reveal space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 [color-scheme:dark]" noValidate>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Nom</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Votre nom"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-rose"
                />
                {errors.name && <span className="mt-1 block text-xs text-rose-soft">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-white/50">E-mail</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="vous@email.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-rose"
                />
                {errors.email && <span className="mt-1 block text-xs text-rose-soft">{errors.email}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Sujet</span>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={(event) => setForm({ ...form, topic: event.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-night px-4 py-3 text-sm text-white outline-none focus:border-rose"
                >
                  {topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                  Message <span className="tracking-normal text-white/35">{form.message.length}/800</span>
                </span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  maxLength={800}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Votre message…"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-rose"
                />
                {errors.message && <span className="mt-1 block text-xs text-rose-soft">{errors.message}</span>}
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Envoyer le message <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

function Footer({ onCv }: { onCv: () => void }) {
  return (
    <footer className="border-t border-white/10 bg-night py-8 text-white/60">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm">© {new Date().getFullYear()} Feten Bejaoui — Ariana, Tunisie.</p>
        <div className="flex items-center gap-4">
          <button type="button" onClick={onCv} className="text-sm hover:text-rose-soft">
            CV
          </button>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="hover:text-rose-soft">
            <LinkedInIcon size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="E-mail" className="hover:text-rose-soft">
            <Mail size={18} />
          </a>
        </div>
      </Container>
    </footer>
  );
}

function CvDialog({ onClose, notify }: { onClose: () => void; notify: (message: string) => void }) {
  return (
    <div className="fade-in no-print fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="cv-title" onClick={onClose}>
      <div className="paper-shadow max-h-[94vh] w-full max-w-3xl overflow-auto rounded-t-3xl bg-paper sm:rounded-3xl" onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-ink/5 bg-paper/95 px-5 py-3 backdrop-blur">
          <p className="text-sm font-semibold text-ink">Curriculum vitae</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                downloadCv();
                notify("CV téléchargé.");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-rose px-4 py-2 text-sm font-semibold text-white"
            >
              <Download size={15} /> PDF
            </button>
            <button type="button" onClick={onClose} aria-label="Fermer le CV" autoFocus className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-ink">
              <X size={16} />
            </button>
          </div>
        </div>
        <article className="px-6 py-8 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">Curriculum vitae</p>
          <h2 id="cv-title" className="mt-2 font-display text-4xl text-ink">
            {profile.name}
          </h2>
          <p className="mt-2 max-w-xl text-sm font-medium text-ink/70">{profile.role}</p>
          <p className="mt-3 text-sm text-ink/55">
            {profile.location} · {profile.phone} · {profile.email}
          </p>
          <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-rose-deep">Profil</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">{profile.about}</p>
          <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-rose-deep">Expérience</h3>
          <div className="mt-3 space-y-5">
            {experience.map((job) => (
              <div key={job.id}>
                <p className="text-sm font-semibold text-ink">
                  {job.title} <span className="font-normal text-ink/50">· {job.period}</span>
                </p>
                <p className="text-xs text-ink/50">{job.company}</p>
                <ul className="mt-2 space-y-1 text-sm text-ink/75">
                  {job.points.map((point) => (
                    <li key={point}>– {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-rose-deep">Projets</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            {projects.map((project) => (
              <li key={project.id}>
                <span className="font-semibold text-ink">{project.title}</span> · {project.period} — {project.description}
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-rose-deep">Formation</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            {education.map((item) => (
              <li key={item.title}>
                <span className="font-semibold text-ink">{item.title}</span> · {item.period} — {item.school}
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-rose-deep">Compétences & langues</h3>
          <ul className="mt-3 space-y-1 text-sm text-ink/75">
            {skills.map((group) => (
              <li key={group.title}>
                <span className="font-semibold text-ink">{group.title} :</span> {group.items.join(", ")}
              </li>
            ))}
            <li>
              <span className="font-semibold text-ink">Langues :</span>{" "}
              {languages.map((lang) => `${lang.name} (${lang.level.toLowerCase()})`).join(" · ")} — niveaux indicatifs
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const Icon = projectIcons[project.image];
  return (
    <div className="fade-in no-print fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={onClose}>
      <div className="paper-shadow max-h-[94vh] w-full max-w-2xl overflow-auto rounded-t-3xl bg-paper sm:rounded-3xl" onClick={(event) => event.stopPropagation()}>
        <div className="group relative h-56 overflow-hidden sm:h-64">
          <ProjectArt kind={project.image} size={60} />
          <button type="button" onClick={onClose} aria-label="Fermer le projet" autoFocus className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink">
            <X size={16} />
          </button>
          <p className="absolute bottom-4 left-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
            <Icon size={16} /> {project.period}
          </p>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">{project.place}</p>
          <h2 id="project-title" className="mt-2 font-display text-3xl text-ink">
            {project.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{project.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-ink/75">
            {project.points.map((point) => (
              <li key={point} className="flex gap-2">
                <Sparkles size={14} className="mt-0.5 shrink-0 text-rose" /> {point}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-rose-deep">
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink/45">Projet de parcours — pas de lien public indiqué sur le CV.</p>
        </div>
      </div>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href="#accueil"
      aria-label="Haut de page"
      className="no-print fixed bottom-5 right-5 z-[70] inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose text-white shadow-lg transition hover:-translate-y-1"
    >
      <ArrowUp size={18} />
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState("accueil");
  const { toast, notify } = useToast();
  useReveal();

  useEffect(() => {
    const ids = nav.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const locked = menuOpen || cvOpen || project !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cvOpen, project]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setCvOpen(false);
      setProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const chooseDomain = (domain: Domain) => {
    const next = filter === domain ? "all" : domain;
    setFilter(next);
    if (next !== "all") document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
  };

  const onCopy = async (value: string, label: string) => {
    notify((await copyText(value)) ? label : "Copie impossible sur ce navigateur");
  };

  return (
    <div className="min-h-screen bg-ivory font-sans text-ink">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Aller au contenu
      </a>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Navbar active={active} open={menuOpen} setOpen={setMenuOpen} onCv={() => setCvOpen(true)} />
      <main id="contenu">
        <Hero onCv={() => setCvOpen(true)} onCopy={onCopy} />
        <Marquee />
        <About onCopy={onCopy} />
        <Pillars filter={filter} onChoose={chooseDomain} />
        <Journey />
        <Experience filter={filter} onChange={setFilter} />
        <Skills />
        <Projects filter={filter} onOpen={setProject} />
        <Education />
        <Contact notify={notify} />
      </main>
      <Footer onCv={() => setCvOpen(true)} />
      <BackToTop />
      {cvOpen && <CvDialog onClose={() => setCvOpen(false)} notify={notify} />}
      {project && <ProjectDialog project={project} onClose={() => setProject(null)} />}
      {toast && (
        <div role="status" className="no-print fade-in fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-ivory shadow-xl">
          {toast.message}
        </div>
      )}
    </div>
  );
}
