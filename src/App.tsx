import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";
import { useMagnetic } from "./hooks/useMagnetic";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import GitHubActivity from "./components/GitHubActivity";
import Chess from "./components/Chess";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useLenis();
  useMagnetic();

  const [intro, setIntro] = useState(() => {
    try {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return !reduce && !sessionStorage.getItem("introSeen");
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("reduced-motion");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = intro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [intro]);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {
      /* ignore */
    }
    setIntro(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {intro && <Preloader key="preloader" onDone={finishIntro} />}
      </AnimatePresence>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero ready={!intro} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Chess />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
