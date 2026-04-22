"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";

/* ───────────────────────── data ───────────────────────── */

const LINK_RESERVAR =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1V14vh2znVW_B_E6QVgwMT_IOpWjf9RP6Xy85QpX6xQVOT5i5Hc0HSOySln-Si1pkboYoi3qiY";

const services = [
  {
    id: 1,
    name: "Sesión de Claridad",
    subtitle: "Consulta Inicial Virtual",
    desc: "Todo gran viaje comienza con un primer paso. Esta sesión de 30 minutos es nuestra primera conexión. Un espacio para que me cuentes tu historia, tus inquietudes y lo que deseas transformar. Juntos exploraremos si mi acompañamiento resuena contigo y definiremos los posibles caminos a seguir, sin ningún compromiso.",
    price: "S/. 70",
    duration: "30 min",
    modality: "Presencial / Online",
  },
  {
    id: 2,
    name: "El Mapa de tu Energía",
    subtitle: "Evaluación y Armonización Energética",
    desc: "¿Sientes que algo está bloqueado pero no sabes qué es? Realizaremos un diagnóstico completo de tu campo energético (chakras, aura y canales sutiles). Identificaremos bloqueos, fugas y desequilibrios. Finalizaremos con una primera armonización para que experimentes un alivio inmediato.",
    price: "S/. 120",
    duration: "70 min",
    modality: "Presencial / Online",
  },
  {
    id: 3,
    name: "La Transformación Profunda",
    subtitle: "Sesiones de Sanación Personalizadas",
    desc: "El corazón de tu proceso. Diseñamos un plan de sanación totalmente personalizado. Integramos diversas herramientas holísticas (Reiki, cristales, danzaterapia, sonoterapia) enfocadas en tus objetivos. Cada sesión libera viejos patrones y activa tu máximo potencial.",
    price: "S/. 170",
    duration: "70 min",
    modality: "Presencial",
  },
  {
    id: 4,
    name: "El Poder del Ritual",
    subtitle: "Ceremonias Holísticas (Individuales y Grupales)",
    desc: "Las ceremonias son portales de transformación acelerada que nos conectan con lo sagrado. Rituales personalizados para cerrar ciclos, círculos de mujeres y hombres, ceremonias de Luna Nueva y Llena, solsticios y equinoccios.",
    price: "S/. 190 x persona",
    duration: "90 – 120 min",
    modality: "Presencial",
  },
  {
    id: 5,
    name: "La magia de la soledad",
    subtitle: "Retiros espirituales",
    desc: "Estar sola también es bonito",
    price: "S/. 150 x persona",
    duration: "90 – 120 min",
    modality: "Presencial",
  },
];

const process = [
  {
    roman: "I",
    title: "Escucha",
    body: "Nuestra primera conversación. Abrir el espacio para que tu historia sea recibida sin juicio.",
  },
  {
    roman: "II",
    title: "Diagnóstico",
    body: "Evaluación energética profunda para identificar bloqueos, fugas y desequilibrios sutiles.",
  },
  {
    roman: "III",
    title: "Sanación",
    body: "Un plan personalizado con las herramientas holísticas que tu proceso necesita.",
  },
  {
    roman: "IV",
    title: "Integración",
    body: "Rituales y prácticas para sostener los cambios en tu vida cotidiana.",
  },
];

const principles = [
  {
    jp: "生き甲斐",
    romaji: "Ikigai",
    es: "Propósito",
    body: "Cada proceso parte de reconectar con aquello que te da sentido y te despierta cada mañana.",
  },
  {
    jp: "侘寂",
    romaji: "Wabi-sabi",
    es: "Belleza imperfecta",
    body: "Honrar las grietas, los ciclos y lo incompleto como parte esencial del camino de sanación.",
  },
  {
    jp: "金継ぎ",
    romaji: "Kintsugi",
    es: "Reparar con oro",
    body: "Las heridas se integran, no se ocultan: cada cicatriz es un hilo dorado de tu historia.",
  },
  {
    jp: "間",
    romaji: "Ma",
    es: "Espacio sagrado",
    body: "El silencio y la pausa son terapéuticos. Todo tiene su ritmo y su respiración.",
  },
];

const testimonials = [
  {
    text: "Tania sostuvo un espacio donde por primera vez me sentí vista por completo. Salí de su sesión con una calma que no recordaba haber vivido antes.",
    name: "Lucía M.",
    city: "Lima",
    sessions: "8 sesiones",
  },
  {
    text: "La ceremonia de luna nueva fue un portal. Pude soltar algo que cargaba hace años. Su presencia es firme y amorosa a la vez.",
    name: "Andrea V.",
    city: "Cusco",
    sessions: "3 sesiones + ceremonia",
  },
  {
    text: "Llegué con cansancio crónico y el mapa energético me mostró exactamente dónde estaba fugando. Hoy duermo profundo por primera vez en mucho tiempo.",
    name: "Gabriela R.",
    city: "Arequipa",
    sessions: "5 sesiones",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
  "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=800&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
];

const navLinks = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#filosofia", label: "Filosofía" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#reservar", label: "Reservar" },
];

/* ───────────────────────── component ───────────────────────── */

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  /* ── scroll reveal + nav blur ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  /* ── parallax on hero ── */
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.setProperty("--hero-parallax", `${y * 0.35}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── custom cursor (desktop only) ── */
  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    document.body.classList.add("has-custom-cursor");

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: globalThis.MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      }
    };
    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (cursorRing.current) {
        cursorRing.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onOver = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, textarea, label");
      cursorRing.current?.classList.toggle("is-hover", !!interactive);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── toast ── */
  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3600);
  };

  /* ── ripple ── */
  const addRipple = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 700);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLFormElement).reset();
    showToast("Gracias. Te escribiré muy pronto.");
  };

  const goReservar = (e: MouseEvent<HTMLAnchorElement>) => {
    addRipple(e);
  };

  /* ───── render ───── */

  return (
    <>
      {/* custom cursor */}
      <div ref={cursorDot} className="cursor-dot" aria-hidden />
      <div ref={cursorRing} className="cursor-ring" aria-hidden />

      {/* 1 · NAV */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "nav-solid" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#top"
            aria-label="Sagrado Despertar — inicio"
            className="group flex items-center gap-2.5 leading-none"
          >
            <span className="font-serif text-2xl uppercase text-gold transition-colors group-hover:text-ink">
              Sagrado
            </span>
            <span
              aria-hidden
              className="h-px w-3 bg-gold/60 transition-all group-hover:w-5 group-hover:bg-ink"
            />
            <span className="font-serif text-2xl italic lowercase tracking-tight text-ink">
              Despertar
            </span>
          </a>
          <ul className="hidden items-center gap-8 text-md tracking-wide text-ink-soft md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={LINK_RESERVAR}
            target="_blank"
            rel="noopener noreferrer"
            onClick={addRipple}
            className="btn-ripple hidden rounded-full border border-gold px-5 py-2 text-sm tracking-wide text-ink transition-colors hover:bg-gold hover:text-sand md:inline-block"
          >
            Reservar
          </a>
          <button
            type="button"
            aria-label="Menú"
            className="md:hidden text-ink"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block h-[1px] w-6 bg-current mb-1.5" />
            <span className="block h-[1px] w-6 bg-current mb-1.5" />
            <span className="block h-[1px] w-4 bg-current" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden nav-solid border-t border-black/5">
            <ul className="flex flex-col gap-4 px-6 py-6 text-ink-soft">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={LINK_RESERVAR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-gold px-5 py-2 text-sm text-ink"
                >
                  Reservar Cita
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* 2 · HERO */}
      <section
        id="top"
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=2000&q=80)",
            transform: "translateY(var(--hero-parallax, 0))",
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sand/70 via-sand/40 to-sand" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="reveal mb-6 text-xs uppercase tracking-[0.4em] text-gold">
            Terapeuta Holística · Lima, Perú
          </p>
          <h1 className="reveal mb-6 font-serif text-5xl italic leading-[1.08] text-ink md:text-7xl">
            Encuentra tu centro <br /> y sana desde adentro.
          </h1>
          <p className="reveal mx-auto mb-10 max-w-xl text-lg text-ink-soft">
            Acompañamiento integral en danzaterapia, terapias bioenergéticas,
            ceremonias y Ayurveda para sostener tu viaje hacia el equilibrio
            interior.
          </p>
          <div className="reveal flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={LINK_RESERVAR}
              target="_blank"
              rel="noopener noreferrer"
              onClick={goReservar}
              className="btn-ripple rounded-full bg-ink px-8 py-4 text-sm uppercase tracking-[0.25em] text-sand transition-transform hover:scale-[1.02]"
            >
              Reservar una sesión
            </a>
            <a
              href="#servicios"
              onClick={addRipple}
              className="btn-ripple rounded-full border border-ink/40 px-8 py-4 text-sm uppercase tracking-[0.25em] text-ink transition-colors hover:border-gold hover:text-gold"
            >
              Explorar servicios
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-ink-soft/60">
          ↓ Desliza
        </div>
      </section>

      {/* 3 · SOBRE MÍ */}
      <section id="sobre-mi" className="mx-auto max-w-6xl px-6 py-32 md:px-10">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <div className="reveal relative aspect-[3/4] overflow-hidden rounded-[2px]">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80"
              alt="Tania Reyes Acha"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-full bg-sand/90 px-4 py-2 font-serif italic text-sm text-ink backdrop-blur">
              Tania · Lima
            </div>
          </div>

          <div className="reveal">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">
              Sobre mí
            </p>
            <h2 className="mb-8 font-serif text-4xl italic leading-tight text-ink md:text-5xl">
              Una práctica tejida entre lo ancestral y lo cotidiano.
            </h2>
            <p className="mb-5 text-ink-soft leading-relaxed">
              Soy <span className="font-medium text-ink">Tania Reyes Acha</span>,
              danzaterapeuta, guía de ceremonias y terapeuta ayurvédica y energética. Desde
              hace siete años sostengo espacios donde el cuerpo, la energía y el
              alma se encuentran de nuevo.
            </p>
            <p className="mb-10 text-ink-soft leading-relaxed">
              Mi trabajo parte de la escucha profunda. Cada sesión es un diseño
              único entre herbalismo espiritual, bioenergética y el ritmo del
              cuerpo — porque sanar es conectar con nuestra unidad.
            </p>

            <ul className="space-y-4 border-l-2 border-accent pl-6">
              <li>
                <p className="font-serif text-lg text-ink">
                  + 7 años de práctica
                </p>
                <p className="text-sm text-ink-soft">
                  Acompañando procesos personales y grupales.
                </p>
              </li>
              <li>
                <p className="font-serif text-lg text-ink">
                  + 100 sesiones realizadas
                </p>
                <p className="text-sm text-ink-soft">
                  En modalidad presencial y online.
                </p>
              </li>
              <li>
                <p className="font-serif text-lg text-ink">
                  Formación integral
                </p>
                <p className="text-sm text-ink-soft">
                  Danzaterapia · Ayurveda · Bioenergética · Herbalismo espiritual
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4 · SERVICIOS */}
      <section id="servicios" className="bg-dark text-sand">
        <div className="mx-auto max-w-6xl px-6 py-32 md:px-10">
          <div className="reveal mb-16 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">
              Servicios
            </p>
            <h2 className="font-serif text-4xl italic leading-tight md:text-5xl">
              Espacios diseñados para cada etapa de tu proceso.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <article
                key={s.id}
                className="service-card reveal flex flex-col rounded-[2px] border border-white/10 bg-dark-soft p-8"
              >
                <div className="mb-6 flex items-baseline justify-between border-b border-white/10 pb-6">
                  <span className="font-serif text-5xl italic text-gold">
                    0{i + 1}
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em] text-sand/60">
                    {s.modality}
                  </span>
                </div>
                <h3 className="mb-1 font-serif text-3xl">{s.name}</h3>
                <p className="mb-5 font-serif italic text-gold-soft">
                  {s.subtitle}
                </p>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-sand/75">
                  {s.desc}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="font-serif text-2xl text-sand">{s.price}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-sand/50">
                      {s.duration}
                    </p>
                  </div>
                  <a
                    href={LINK_RESERVAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={addRipple}
                    className="btn-ripple rounded-full border border-gold px-5 py-2 text-xs uppercase tracking-[0.25em] text-sand transition-colors hover:bg-gold hover:text-dark"
                  >
                    Reservar
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · PROCESO */}
      <section id="proceso" className="mx-auto max-w-6xl px-6 py-32 md:px-10">
        <div className="reveal mb-20 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">
            El proceso
          </p>
          <h2 className="font-serif text-4xl italic leading-tight md:text-5xl">
            Cuatro pasos para volver a ti.
          </h2>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-10 hidden h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent md:block"
          />
          <div className="grid gap-12 md:grid-cols-4 md:gap-6">
            {process.map((p) => (
              <div key={p.roman} className="reveal text-center">
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold bg-sand">
                  <span className="font-serif text-2xl italic text-gold">
                    {p.roman}
                  </span>
                </div>
                <h3 className="mb-3 font-serif text-2xl text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · FILOSOFÍA */}
      <section
        id="filosofia"
        className="bg-sand-deep"
      >
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-32 md:grid-cols-2 md:items-center md:px-10">
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[2px]">
            <img
              src="https://images.unsplash.com/photo-1528319725582-ddc096101511?w=1200&q=80"
              alt="Ritual con incienso"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="reveal">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">
              Filosofía
            </p>
            <h2 className="mb-12 font-serif text-4xl italic leading-tight text-ink md:text-5xl">
              Los principios que sostienen la práctica.
            </h2>
            <ol className="space-y-8">
              {principles.map((p, i) => (
                <li key={p.romaji} className="grid grid-cols-[auto_1fr] gap-6">
                  <span className="font-serif text-3xl italic text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="mb-1 flex items-baseline gap-3">
                      <span className="font-serif text-2xl text-ink">
                        {p.jp}
                      </span>
                      <span className="text-xs uppercase tracking-[0.25em] text-ink-soft">
                        {p.romaji} — {p.es}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7 · GALERÍA */}
      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <div className="reveal mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">
              Galería
            </p>
            <h2 className="max-w-xl font-serif text-4xl italic leading-tight text-ink md:text-5xl">
              Momentos del camino.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            Imágenes del espacio, rituales y elementos que acompañan las
            sesiones — piedras, flores, humo y movimiento.
          </p>
        </div>

        <div className="reveal gallery-grid">
          {gallery.map((src, i) => (
            <div
              key={src}
              className="group relative h-full w-full overflow-hidden rounded-[2px]"
            >
              <img
                src={src}
                alt={`Galería ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 8 · TESTIMONIOS */}
      <section id="testimonios" className="bg-dark text-sand">
        <div className="mx-auto max-w-6xl px-6 py-32 md:px-10">
          <div className="reveal mb-16 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">
              Testimonios
            </p>
            <h2 className="font-serif text-4xl italic md:text-5xl">
              Lo que dicen quienes han caminado conmigo.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="reveal flex flex-col rounded-[2px] border border-white/10 bg-dark-soft p-8"
              >
                <div className="mb-5 flex gap-1 text-gold">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} aria-hidden>
                      {s}
                    </span>
                  ))}
                </div>
                <blockquote className="mb-8 flex-1 font-serif text-xl italic leading-relaxed text-sand/90">
                  “{t.text}”
                </blockquote>
                <figcaption className="border-t border-white/10 pt-5">
                  <p className="font-serif text-lg text-sand">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-sand/50">
                    {t.city} · {t.sessions}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9 · RESERVAR */}
      <section id="reservar" className="mx-auto max-w-6xl px-6 py-32 md:px-10">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div className="reveal">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">
              Reservar
            </p>
            <h2 className="mb-6 font-serif text-4xl italic leading-tight text-ink md:text-5xl">
              Tu viaje hacia el equilibrio interior comienza aquí.
            </h2>
            <p className="mb-10 text-ink-soft leading-relaxed">
              Escríbeme y conversamos. Cada proceso es único y diseñado a tu
              ritmo — puedes agendar directamente en el calendario o dejarme un
              mensaje y te escribo yo.
            </p>
            <a
              href={LINK_RESERVAR}
              target="_blank"
              rel="noopener noreferrer"
              onClick={goReservar}
              className="btn-ripple mb-10 inline-block rounded-full bg-ink px-8 py-4 text-sm uppercase tracking-[0.25em] text-sand transition-transform hover:scale-[1.02]"
            >
              Reservar Cita
            </a>
            <div className="space-y-2 text-sm text-ink-soft">
              <p>
                <span className="uppercase tracking-[0.25em] text-gold">
                  Email ·{" "}
                </span>
                tanyreyesacha@gmail.com
              </p>
              <p>
                <span className="uppercase tracking-[0.25em] text-gold">
                  Teléfono ·{" "}
                </span>
                +51 933 686 215
              </p>
              <p>
                <span className="uppercase tracking-[0.25em] text-gold">
                  Lima ·{" "}
                </span>
                Perú
              </p>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="reveal space-y-5 rounded-[2px] border border-ink/10 bg-white/40 p-8 backdrop-blur"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs uppercase tracking-[0.25em] text-ink-soft"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full border-b border-ink/20 bg-transparent py-2 text-ink outline-none transition-colors focus:border-gold"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs uppercase tracking-[0.25em] text-ink-soft"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border-b border-ink/20 bg-transparent py-2 text-ink outline-none transition-colors focus:border-gold"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs uppercase tracking-[0.25em] text-ink-soft"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full resize-none border-b border-ink/20 bg-transparent py-2 text-ink outline-none transition-colors focus:border-gold"
              />
            </div>
            <button
              type="submit"
              onClick={addRipple}
              className="btn-ripple w-full rounded-full bg-gold px-6 py-3 text-sm uppercase tracking-[0.25em] text-sand transition-colors hover:bg-ink"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-sand/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
          <div>
            <p className="mb-3 font-serif text-xl text-sand">
              Tania <span className="text-gold">Reyes</span>
            </p>
            <p className="font-serif italic text-sand/60">
              Tu viaje hacia el equilibrio interior comienza aquí.
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
              Contacto
            </p>
            <ul className="space-y-2 text-sm">
              <li>tanyreyesacha@gmail.com</li>
              <li>+51 933 686 215</li>
              <li>Lima · Perú</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
              Navegar
            </p>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
              Agenda
            </p>
            <a
              href={LINK_RESERVAR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-gold px-5 py-2 text-sm transition-colors hover:bg-gold hover:text-dark"
            >
              Reservar Cita
            </a>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-6 py-6 text-center text-xs tracking-wide text-sand/50 md:px-10">
            © {new Date().getFullYear()} Tania Reyes Acha · Todos los derechos
            reservados.
          </p>
        </div>
      </footer>

      {/* TOAST */}
      <div
        aria-live="polite"
        className={`toast ${toast ? "is-visible" : ""}`}
        role="status"
      >
        {toast}
      </div>
    </>
  );
}
