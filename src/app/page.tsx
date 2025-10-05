"use client";
import Image from "next/image";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect, useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiPython,
  SiDjango,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiJquery,
} from "react-icons/si";

type AnimatedSectionProps = {
  children: React.ReactNode;
  variants: Variants;
  innerRef: React.RefObject<HTMLElement>;
  extraClass?: string;
};

export default function Home() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Refs untuk setiap section
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const skills = [
    { name: "React", icon: <SiReact size={40} color="#61DAFB" /> },
    { name: "Next.js", icon: <SiNextdotjs size={40} color="white" /> },
    { name: "TypeScript", icon: <SiTypescript size={40} color="#3178C6" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={40} color="#38BDF8" /> },
    { name: "Laravel", icon: <SiLaravel size={40} color="#FF2D20" /> },
    { name: "Python", icon: <SiPython size={40} color="#FFD43B" /> },
    { name: "Django", icon: <SiDjango size={40} color="#092E20" /> },
    { name: "PHP", icon: <SiPhp size={40} color="#777BB4" /> },
    { name: "MySQL", icon: <SiMysql size={40} color="#4479A1" /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={40} color="#336791" /> },
    { name: "Git", icon: <SiGit size={40} color="#F1502F" /> },
    { name: "jQuery", icon: <SiJquery size={40} color="#0769AD" /> },
  ];
  const sections = [
    { name: "home", ref: homeRef },
    { name: "about", ref: aboutRef },
    { name: "tech stack", ref: skillRef },
    { name: "contact", ref: contactRef },
  ];

  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const { name, ref } of sections) {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(name);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax effect
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed left-1/2 hidden md:block transform -translate-x-1/2 top-2 z-50 bg-[#000072] backdrop-blur-lg rounded-4xl">
        <div className="max-w-7xl flex justify-center items-center px-2 py-2">
          <ul className="flex gap-5 text-white font-semibold text-lg">
            {sections.map(({ name, ref }) => (
              <li key={name} className="rounded-full overflow-hidden">
                <button
                  onClick={() =>
                    scrollToSection(ref as React.RefObject<HTMLElement>)
                  }
                  className={`block px-6 py-3 hover:text-green-400 transition ${
                    activeSection === name ? "bg-[#F785C5] text-white" : ""
                  }`}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* Mobile Navbar */}
      <nav className="fixed left-0 right-0 flex sm:hidden top-2 z-50 px-4">
        <div className="w-full flex justify-between items-center bg-[#000072] backdrop-blur-lg rounded-2xl px-6 py-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-60 sm:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-64 h-full bg-[#000072] shadow-2xl p-6"
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="mt-10 flex flex-col gap-4 text-white font-semibold text-lg">
              {sections.map(({ name, ref }) => (
                <li key={name}>
                  <button
                    onClick={() => {
                      scrollToSection(ref as React.RefObject<HTMLElement>);
                      setSidebarOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-lg hover:text-green-400 transition ${
                      activeSection === name ? "bg-[#F785C5] text-white" : ""
                    }`}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}

      {/* Container */}
      <div
        ref={containerRef}
        className="bg-[#1B602F] text-white min-h-screen flex flex-col justify-center scroll-smooth"
      >
        {/* HOME */}
        <AnimatedSection
          variants={sectionVariants}
          innerRef={homeRef as React.RefObject<HTMLElement>}
        >
          <div className="w-full h-screen container grid grid-cols-1 md:grid-cols-2 gap-0 relative">
            {/* Gambar di Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="md:hidden flex justify-center items-center mt-10"
            >
              <div className="w-52 h-52 relative rounded-full overflow-hidden shadow-[0_0_25px_#F785C5] border-4 border-[#F785C5]/60">
                <Image
                  src="/mobile.png"
                  alt="Profile Picture"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </motion.div>

            {/* Left Text */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
              className="flex flex-col justify-center space-y-4 z-10 px-4 md:px-8 text-center md:text-left"
              style={{ y: textY, opacity }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                Hi, <br className="hidden md:block" /> I'm{" "}
                <span className="text-[#F785C5]">Ghanni Briantama</span>
              </h1>
              <p className="text-3xl sm:text-5xl text-white font-bold">
                <Typewriter
                  words={["Software Engineer", "Web Developer"]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </p>
              <p className="text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
                passionate about AI. I enjoy learning, building creative
                solutions, and keeping up with tech trends.
              </p>

              <button
                onClick={() =>
                  scrollToSection(contactRef as React.RefObject<HTMLElement>)
                }
                className="bg-[#F785C5] text-black px-6 py-3 rounded-md shadow-[4px_4px_0px_#000] font-medium flex items-center gap-2 w-fit mx-auto md:mx-0"
              >
                Hire Me →
              </button>
            </motion.div>

            {/* Right Gambar untuk Desktop */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
              className="absolute top-0 right-0 w-1/2 h-full hidden md:block"
              style={{ y: imageY, scale: imageScale }}
            >
              <div className="w-full h-full relative">
                <Image
                  src="/testing.png"
                  alt="Profile Picture"
                  fill
                  className="object-cover object-center"
                  style={{
                    clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                  priority
                />
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ABOUT */}
        <AnimatedSection
          variants={sectionVariants}
          innerRef={aboutRef as React.RefObject<HTMLElement>}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            {/* Title */}
            <h2 className="text-4xl font-extrabold mb-6 text-white">
              About Me
            </h2>

            {/* Card */}
            <div className="w-full h-full p-8 bg-[#154E27]/90 rounded-2xl shadow-lg border border-[#F785C5]/40 transition-transform hover:scale-[1.01] hover:shadow-[#F785C5]/20 duration-300">
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6">
                Hi, I’m{" "}
                <span className="text-[#F785C5] font-semibold">
                  Ghanni Briantama
                </span>
                . My programming journey started with a simple curiosity —{" "}
                <span className="italic text-gray-300">
                  “How does a website actually work?”
                </span>{" "}
                That question grew into a passion for coding and shaped my path
                as a{" "}
                <span className="font-medium text-white">
                  Software Engineer
                </span>
                .
              </p>

              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6">
                I’ve built{" "}
                <span className="font-medium text-[#F785C5]">
                  Project Management Tools, Web Monitoring Systems
                </span>
                , and various web applications using{" "}
                <span className="font-medium text-white">
                  Laravel, Next.js, Django, Python, JavaScript, and TypeScript
                </span>
                . I also interned at{" "}
                <span className="font-medium text-[#F785C5]">
                  PT Satnusa Persada
                </span>{" "}
                as a{" "}
                <span className="font-medium text-white">
                  Back-End Developer
                </span>
                , gaining hands-on experience in developing and maintaining
                server-side systems.
              </p>

              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                What excites me most is{" "}
                <span className="font-medium text-[#F785C5]">
                  exploring new technologies, experimenting with fresh ideas,
                </span>{" "}
                and crafting{" "}
                <span className="font-medium text-white">
                  creative solutions
                </span>{" "}
                to challenges. Currently, I’m seeking opportunities as a{" "}
                <span className="font-medium text-[#F785C5]">
                  freelance developer
                </span>{" "}
                to broaden my experience and collaborate on impactful projects.
                🚀
              </p>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* SKILL */}
        <AnimatedSection
          variants={sectionVariants}
          innerRef={skillRef as React.RefObject<HTMLElement>}
          extraClass="scroll-mt-20 md:scroll-mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="max-w-5xl mx-auto text-center px-4 mt-16 md:mt-32"
          >
            {/* Title */}
            <h2 className="text-4xl font-extrabold mb-3 text-white">
              Tech Stack
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Here are the technologies I’ve worked with and love to explore 🚀
            </p>

            {/* Skill Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group bg-[#154E27]/80 border border-[#F785C5]/20 hover:border-[#F785C5]/60 
      backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center justify-center gap-3 
      hover:scale-110 hover:shadow-[0_0_15px_#F785C5] transition-all duration-300 shadow-md"
                >
                  <div className="transition-transform group-hover:scale-125">
                    {skill.icon}
                  </div>
                  <span className="font-semibold text-white">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>

        {/* CONTACT */}
        <AnimatedSection
          variants={sectionVariants}
          innerRef={contactRef as React.RefObject<HTMLElement>}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center"
          >
            <p className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Let’s Connect!
            </p>
            <p className="text-xl text-gray-300">
              Got an idea, a project, or just want to say hi? Drop me a message
              — I’d love to hear from you.
            </p>
            <div className="flex items-center justify-center mt-4 gap-4">
              <a
                href="https://github.com/Sirainss52"
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 rounded-full bg-white/10 transition flex items-center justify-center 
             hover:bg-[#6e40c9] group hover:scale-110"
                aria-label="GitHub"
              >
                <svg
                  className="w-10 h-10 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/ghannibriantama"
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 rounded-full bg-white/10 transition flex items-center justify-center 
             hover:bg-[#0077B5] group hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-10 h-10 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
            <div className="mt-8">
              <button
                onClick={() =>
                  window.open("mailto:ghannibriantama123@gmail.com")
                }
                className="text-lg text-black bg-[#F785C5] px-6 py-3 rounded-md shadow-[4px_4px_0px_#000] font-medium cursor-pointer"
              >
                Drop a Message!
              </button>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </>
  );
}

function AnimatedSection({
  children,
  variants,
  innerRef,
  extraClass = "",
}: AnimatedSectionProps) {
  return (
    <motion.section
      ref={innerRef}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      variants={variants}
      className={`min-h-screen flex items-center justify-center px-4 ${extraClass}`}
    >
      {children}
    </motion.section>
  );
}
