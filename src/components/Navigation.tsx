import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import styles from "./Navigation.module.css";

const NAV_ITEMS = [
  { id: "couple", label: "Couple" },
  { id: "countdown", label: "Countdown" },
  { id: "events", label: "Events" },
  { id: "dress-code", label: "Dress Code" },
  { id: "gallery", label: "Gallery" },
  { id: "venue", label: "Venue" },
];

export function Navigation() {
  const [active, setActive] = useState<string>(NAV_ITEMS[0].id);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));

    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className={styles.nav} aria-label="Section navigation">
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={active === item.id ? styles.activeLink : styles.link}
                onClick={() => scrollTo(item.id)}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {showBackToTop && (
        <button
          type="button"
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
