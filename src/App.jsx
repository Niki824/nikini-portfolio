import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaExternalLinkAlt, FaBars, FaTimes,
} from "react-icons/fa";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from "recharts";

/* ── DATA ─────────────────────────────────────────────────────────────── */

const ROLES = [
  "AI Developer",
  "Machine Learning Engineer",
  "Cybersecurity Builder",
  "NLP Researcher",
  "Full-Stack Developer",
];

const PROJECTS = [
  {
    title: "AI-CyberScope",
    desc: "Machine learning based phishing website detection system with real-time cybersecurity risk scoring and threat intelligence.",
    tech: ["Python", "Streamlit", "Scikit-learn", "Cybersecurity"],
    image: "/projects/cyberscope.jpeg",
    github: "https://github.com/Niki824",
    demo: null,
    accent: "#a855f7",
  },
  {
    title: "Smart Garbage Monitor",
    desc: "IoT-based real-time garbage monitoring using Arduino Nano, ESP8266, ultrasonic sensors, servo motor and Firebase cloud sync.",
    tech: ["Arduino", "ESP8266", "Firebase", "IoT"],
    image: "/projects/garbage-robot.jpeg",
    github: "https://github.com/Niki824",
    demo: null,
    accent: "#10b981",
  },
  {
    title: "Social Media Risk Analyzer",
    desc: "AI-based addiction risk prediction from user behaviour data using ensemble ML models with SHAP explainability.",
    tech: ["Python", "Flask", "Scikit-learn", "SHAP"],
    image: "/projects/social-risk.jpeg",
    github: "https://github.com/Niki824",
    demo: null,
    accent: "#3b82f6",
  },
  {
    title: "Tourism Recommender",
    desc: "Sri Lanka tourism recommendation engine that suggests destinations based on budget, travel type and preferred activities.",
    tech: ["Python", "HTML", "CSS", "JavaScript"],
    image: "/projects/tourism.jpeg",
    github: "https://github.com/Niki824",
    demo: null,
    accent: "#f97316",
  },
];

const SKILLS_RADAR = [
  { subject: "Machine Learning", score: 88 },
  { subject: "Python", score: 92 },
  { subject: "Cybersecurity", score: 80 },
  { subject: "NLP", score: 75 },
  { subject: "Web Dev", score: 78 },
  { subject: "IoT", score: 72 },
  { subject: "Data Science", score: 83 },
];

const SKILLS_TAGS = [
  { name: "Python", level: "Expert" },
  { name: "Machine Learning", level: "Advanced" },
  { name: "NLP", level: "Advanced" },
  { name: "Cybersecurity", level: "Advanced" },
  { name: "React", level: "Intermediate" },
  { name: "JavaScript", level: "Intermediate" },
  { name: "Streamlit", level: "Advanced" },
  { name: "Flask", level: "Intermediate" },
  { name: "Firebase", level: "Intermediate" },
  { name: "Scikit-learn", level: "Advanced" },
  { name: "IoT", level: "Intermediate" },
  { name: "Arduino", level: "Intermediate" },
  { name: "SQL", level: "Intermediate" },
  { name: "GitHub", level: "Advanced" },
];

const TIMELINE = [
  {
    year: "2024 – 2027",
    title: "BSc (Hons) Computer Science with AI",
    org: "Coventry University · NIBM (KIC)",
    desc: "Specialising in AI, Machine Learning, NLP and Cybersecurity. Building real-world intelligent systems.",
    icon: "🎓",
    color: "#a855f7",
  },
  {
    year: "2024",
    title: "AI-CyberScope Project",
    org: "Academic Project",
    desc: "Built a phishing detection system using ML models achieving high accuracy on real website datasets.",
    icon: "🛡️",
    color: "#3b82f6",
  },
  {
    year: "2024",
    title: "IoT Smart Monitoring System",
    org: "Academic Project",
    desc: "Designed and deployed a full IoT pipeline using Arduino, ESP8266 and Firebase for real-time data.",
    icon: "♻️",
    color: "#10b981",
  },
];

const LEVEL_COLOR = {
  Expert: { bg: "bg-violet-500/20", text: "text-violet-300", border: "border-violet-500/30" },
  Advanced: { bg: "bg-blue-500/20", text: "text-blue-300", border: "border-blue-500/30" },
  Intermediate: { bg: "bg-slate-500/20", text: "text-slate-300", border: "border-slate-500/30" },
};

const NAV_LINKS = ["about", "skills", "projects", "timeline", "contact"];

/* ── PARTICLE CANVAS ──────────────────────────────────────────────────── */

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const COUNT = 80;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = dist < 120 ? 1 - dist / 120 : 0;
        const alpha = p.alpha + glow * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168,85,247,${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}

/* ── TYPEWRITER ───────────────────────────────────────────────────────── */

function Typewriter({ words }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const speed = deleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
      {text}
      <span className="animate-pulse text-violet-400">|</span>
    </span>
  );
}

/* ── SCROLL ACTIVE NAV ────────────────────────────────────────────────── */

function useActiveSection(sections) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [sections]);

  return active;
}

/* ── MAIN APP ─────────────────────────────────────────────────────────── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_LINKS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#04030f] text-white overflow-x-hidden">

      {/* Particle bg */}
      <ParticleCanvas />

      {/* Ambient glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-violet-700/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-fuchsia-700/8 rounded-full blur-[160px]" />
        <div className="absolute top-[50%] left-[-10%] w-[400px] h-[400px] bg-blue-700/8 rounded-full blur-[130px]" />
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/60 backdrop-blur-2xl border-b border-white/8 py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tight"
          >
            <span className="text-white">Nikini</span>
            <span className="text-violet-400">.</span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`px-4 py-2 rounded-lg text-sm capitalize transition-all duration-200 ${
                  active === link
                    ? "text-violet-300 bg-violet-500/15"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link}
              </button>
            ))}
            <a
              href="/cv.pdf"
              download
              className="ml-3 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition text-sm font-medium flex items-center gap-2"
            >
              <FaDownload size={11} /> CV
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-2xl border-t border-white/8 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(link)}
                    className="text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 capitalize transition"
                  >
                    {link}
                  </button>
                ))}
                <a
                  href="/cv.pdf"
                  download
                  className="mt-2 px-4 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 transition text-center font-medium flex items-center justify-center gap-2"
                >
                  <FaDownload size={12} /> Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/8 text-violet-300 text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Open to internships & AI collaboration
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight leading-none">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Nikini
            </span>
          </h1>

          <div className="text-2xl md:text-4xl font-semibold mb-6 h-14 flex items-center justify-center">
            <Typewriter words={ROLES} />
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-8">
            CS undergraduate specialising in Artificial Intelligence, Machine
            Learning, NLP and Cybersecurity — building systems that actually
            solve real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition font-semibold shadow-xl shadow-violet-600/30 text-white"
            >
              View Projects
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="/cv.pdf"
              download
              className="px-8 py-4 rounded-2xl border border-violet-500/40 hover:bg-violet-500/10 transition font-semibold flex items-center gap-2 justify-center text-white"
            >
              <FaDownload size={14} /> Download CV
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">About me</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Building the future<br />
              <span className="text-gray-500">with AI.</span>
            </h2>
            <p className="text-gray-400 leading-8 mb-6">
              I'm a dedicated Computer Science undergraduate specialising in
              Artificial Intelligence. I enjoy building practical AI
              applications, cybersecurity tools and intelligent systems that
              solve real-world problems.
            </p>
            <p className="text-gray-500 leading-8">
              Based in Sri Lanka · Studying at NIBM (KIC) / Coventry University ·
              Passionate about turning research into working products.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: "🤖", label: "Machine Learning", sub: "Applied ML & deep learning" },
              { icon: "🔐", label: "Cybersecurity", sub: "Threat detection & analysis" },
              { icon: "💬", label: "NLP & AI", sub: "Language & intelligent systems" },
              { icon: "🔌", label: "IoT Systems", sub: "Embedded & cloud connected" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-gray-500 text-xs leading-5">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Skills</p>
            <h2 className="text-4xl md:text-5xl font-black">My tech stack</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Radar chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-72 md:h-96"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={SKILLS_RADAR}>
                  <PolarGrid stroke="rgba(168,85,247,0.15)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <Radar
                    name="Nikini"
                    dataKey="score"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Skill tags */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              {SKILLS_TAGS.map((skill, i) => {
                const c = LEVEL_COLOR[skill.level];
                return (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.08 }}
                    className={`px-4 py-2 rounded-full border text-sm font-medium cursor-default ${c.bg} ${c.text} ${c.border}`}
                  >
                    {skill.name}
                    <span className="ml-2 text-xs opacity-60">{skill.level}</span>
                  </motion.span>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Work</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Featured projects</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              AI, cybersecurity and intelligent software — built from scratch.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white/3 border border-white/8 rounded-3xl p-8 overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}15, transparent 70%)` }}
                />

                {/* Image */}
                <div className="h-44 rounded-2xl mb-6 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-7">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-xl transition-all"
                  >
                    <FaGithub size={13} /> GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/30 px-4 py-2 rounded-xl transition-all"
                    >
                      <FaExternalLinkAlt size={11} /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" className="py-28 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Journey</p>
            <h2 className="text-4xl md:text-5xl font-black">Education & milestones</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-fuchsia-500/30 to-transparent -translate-x-1/2" />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-violet-500 bg-[#04030f] z-10" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-xs text-violet-400 font-semibold tracking-wider uppercase">{item.year}</span>
                    </div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-violet-300/70 text-sm mb-3">{item.org}</p>
                    <p className="text-gray-500 text-sm leading-6">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Contact</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Let's build something<br />
              <span className="text-gray-500">extraordinary.</span>
            </h2>
            <p className="text-gray-400 mb-12 leading-8">
              Open to internships, AI project collaborations and research
              opportunities. Feel free to reach out.
            </p>

            <a
              href="mailto:nikinivihangaedirisinghe@gmail.com"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 font-semibold text-lg transition-all shadow-2xl shadow-violet-600/30 mb-14"
            >
              <FaEnvelope /> Say Hello
            </a>

            <div className="flex justify-center gap-5">
              {[
                { icon: <FaGithub size={20} />, href: "https://github.com/Niki824", label: "GitHub" },
                { icon: <FaLinkedin size={20} />, href: "https://www.linkedin.com/in/nikini-edirisinghe-307491359", label: "LinkedIn" },
                { icon: <FaEnvelope size={20} />, href: "mailto:nikinivihangaedirisinghe@gmail.com", label: "Email" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={s.label}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 flex items-center justify-center text-gray-400 hover:text-violet-300 transition-all"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 text-center border-t border-white/6">
        <p className="text-gray-600 text-sm">
          © 2026 Nikini Edirisinghe · Built with React & Framer Motion
        </p>
      </footer>

    </div>
  );
}