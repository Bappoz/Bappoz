import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FerrisCrab from "./FerrisCrab";

const greetings = [
  "Olá",
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "こんにちは",
  "Hallo",
  "Привет",
];

const ease = [0.76, 0, 0.24, 1] as const;

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const step = 430;
    const id = setInterval(() => {
      setI((prev) => {
        if (prev >= greetings.length - 1) {
          clearInterval(id);
          setTimeout(onDone, 520);
          return prev;
        }
        return prev + 1;
      });
    }, step);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="preloader__stage">
        <div className="pixel-bubble">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={i}
              className="pixel-bubble__text"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ duration: 0.22, ease }}
            >
              {greetings[i]}
            </motion.span>
          </AnimatePresence>
          <span className="pixel-bubble__tail" aria-hidden="true" />
        </div>

        <motion.div
          initial={{ y: 6 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <FerrisCrab size={150} />
        </motion.div>

        <div className="preloader__dots" aria-hidden="true">
          {greetings.map((_, d) => (
            <span key={d} className={`preloader__dot ${d <= i ? "is-on" : ""}`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
