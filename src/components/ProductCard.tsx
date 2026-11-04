import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

/** Three-dimensional product card with metallic hover treatment. */
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading={index < 3 ? "eager" : "lazy"}
          width={1280}
          height={854}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <Link
          to="/contact"
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          Enquire Now
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Metallic sheen on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.06)_45%,transparent_60%)]" />
    </article>
  );
}
