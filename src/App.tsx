import { useEffect } from "react";
import { useLenis } from "./hooks/useLenis";
import { useMagnetic } from "./hooks/useMagnetic";
import Cursor from "./components/Cursor";
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("reduced-motion");
    }
  }, []);

  return (
    <>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
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
