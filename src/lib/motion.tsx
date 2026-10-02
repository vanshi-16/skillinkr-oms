import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useMotionValueEvent,
  useScroll,
} from "motion/react"

/* ---------- easings & springs ---------- */
export const EASE = [0.22, 1, 0.36, 1] as const
export const SPRING_SNAPPY = { type: "spring", stiffness: 420, damping: 36 } as const
export const SPRING_SMOOTH = { type: "spring", stiffness: 120, damping: 30, mass: 0.4 } as const

/* ---------- variants ---------- */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}
export const stagger = (gap = 0.07, delay = 0.1) => ({
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

/* ---------- Reveal: single element fading up on in-view ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  variant,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  /** @deprecated variant prop kept for backward compat; Reveal always fades up */
  variant?: "fadeUp" | "fade"
}) {
  const reduce = useReducedMotion()
  const effectiveY = variant === "fade" ? 0 : y
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : effectiveY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.01 : 0.6, ease: EASE, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- StaggerList / StaggerItem: a group fading up in sequence ---------- */
export function StaggerList({
  children,
  className,
  gap = 0.07,
  delay = 0.1,
}: {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : gap,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0.01 : 0.6, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Counter: weighted count-up, Indian digit grouping ---------- */
const fmt = (n: number) => new Intl.NumberFormat("en-IN").format(n)

export function Counter({
  to,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 20 })
  const [txt, setTxt] = useState("0")

  useEffect(() => {
    if (!reduce && inView) animate(mv, to, { duration: 1.1, ease: EASE })
  }, [inView, mv, to, reduce])

  useEffect(() => {
    const unsub = spring.on("change", (v) => setTxt(fmt(Math.round(v))))
    return () => unsub()
  }, [spring])

  // all hooks above run unconditionally, so this early return is legal
  if (reduce) return <span className={className}>{prefix}{fmt(to)}{suffix}</span>

  return (
    <span ref={ref} className={`${className ?? ""} tabular-nums`}>
      {prefix}{txt}{suffix}
    </span>
  )
}

/* ---------- useScrolledPast: nav shrink, without re-rendering every frame ---------- */
export function useScrolledPast(px = 24) {
  const { scrollY } = useScroll()
  const [past, setPast] = useState(false)
  useMotionValueEvent(scrollY, "change", (v) => setPast(v > px))
  return past
}
