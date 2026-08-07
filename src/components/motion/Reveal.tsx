"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import styles from "./Reveal.module.css";

type RevealVariant = "fade-up" | "clip" | "scale";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  variant?: RevealVariant;
  as?: ElementType;
  /** Once visible, stay visible (default true) */
  once?: boolean;
  style?: CSSProperties;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  as: Tag = "div",
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${styles[variant]} ${
        visible ? styles.visible : ""
      } ${className}`}
      style={{
        ...style,
        "--reveal-delay": `${delay}ms`,
      } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
