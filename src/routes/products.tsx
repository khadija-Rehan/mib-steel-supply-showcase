import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ListChecks } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { CATEGORY_A, CATEGORY_B, CATEGORY_C, PRODUCT_FILTERS } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Steel Products Catalogue | M. Irfan Brothers (MIB)" },
      {
        name: "description",
        content:
          "Complete steel product catalogue: Hot Rolled Coils, Cold Rolled Sheets, Galvanized Iron Sheets, MS Plates, PPGI/PPGL, stainless steel grades 201, 204, 304 and 316, MS pipes, structural steel, roofing sheets and solar mounting materials.",
      },
      {
        property: "og:title",
        content: "Steel Products Catalogue | M. Irfan Brothers (MIB)",
      },
      {
        property: "og:description",
        content:
          "Steel sheets, coils, plates, stainless steel special grades, pipes, structural steel, roofing and solar mounting materials — under one roof.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [filter, setFilter] = useState<string>("all");

  const visibleCategories = [CATEGORY_A, CATEGORY_B, CATEGORY_C].filter(
    (c) => filter === "all" || c.id === filter,
  );

  return (
    <>
      <PageHero
        eyebrow="Product Catalogue"
        title="Complete Steel Product Catalogue"
        description="Explore our full range across three categories — steel sheets, coils & plates; stainless steel & special grades; pipes, structural steel, roofing & solar materials."
      />

      {/* Filters */}
      <div className="sticky top-16 z-30 glass-panel border-b">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {PRODUCT_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-primary",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6">
          {visibleCategories.map((category) => (
            <section key={category.id} id={category.id}>
              <Reveal>
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {category.title}
                </h2>
                {category.intro ? (
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                    {category.intro}
                  </p>
                ) : null}
              </Reveal>

              <motion.div
                layout
                className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {category.products.map((product, i) => (
                  <ProductCard key={product.name} product={product} index={i} />
                ))}
              </motion.div>

              {category.applications ? (
                <Reveal delay={0.1}>
                  <div className="mt-10 rounded-2xl border border-primary/25 bg-card p-7">
                    <div className="flex items-center gap-2.5">
                      <ListChecks className="h-5 w-5 text-primary" />
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        Stainless Steel Applications
                      </h3>
                    </div>
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {category.applications.map((app) => (
                        <div key={app} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <p className="text-sm text-muted-foreground">{app}</p>
                        </div>
                      ))}
                    </div>
                    {category.commitment ? (
                      <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          Our Product Commitment:{" "}
                        </span>
                        {category.commitment}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              ) : null}

              {category.solarMaterials ? (
                <Reveal delay={0.1}>
                  <div className="mt-10 grid gap-6 rounded-2xl border border-primary/25 bg-card p-7 lg:grid-cols-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {category.solarMaterials.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {category.solarMaterials.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {category.solarMaterials.applicationsTitle}
                      </h3>
                      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                        {category.solarMaterials.applications.map((app) => (
                          <div key={app} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <p className="text-sm text-muted-foreground">{app}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
