import { motion } from "framer-motion";

/** Shared page hero banner for inner pages. */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-navy-deep pt-32 pb-16 sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(60% 80% at 75% 10%, color-mix(in oklab, var(--color-primary) 14%, transparent), transparent 70%), radial-gradient(40% 60% at 10% 90%, color-mix(in oklab, var(--color-silver) 8%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow ? (
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
