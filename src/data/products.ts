import steelCoils from "@/assets/steel-coils.jpg";
import steelSheets from "@/assets/steel-sheets.jpg";
import galvanizedSheets from "@/assets/galvanized-sheets.jpg";
import msPlates from "@/assets/ms-plates.jpg";
import ppgiColorCoated from "@/assets/ppgi-color-coated.jpg";
import stainlessSteelSheets from "@/assets/stainless-steel-sheets.jpg";
import steelPipes from "@/assets/steel-pipes.jpg";
import structuralSteel from "@/assets/structural-steel.jpg";
import roofingSheets from "@/assets/roofing-sheets.jpg";
import solarMounting from "@/assets/solar-mounting.jpg";

export interface Product {
  name: string;
  description: string;
  image: string;
}

export interface ProductCategory {
  id: string;
  label: string;
  title: string;
  intro?: string;
  products: Product[];
  applications?: string[];
  commitment?: string;
}

/**
 * CATEGORY A — STEEL SHEETS, COILS & PLATES
 */
export const CATEGORY_A: ProductCategory = {
  id: "sheets-coils-plates",
  label: "Steel Sheets, Coils & Plates",
  title: "Category A: Steel Sheets, Coils & Plates",
  products: [
    {
      name: "Hot Rolled Coils (HRC)",
      description:
        "Hot Rolled Coils are widely used in structural fabrication, industrial manufacturing, engineering and various steel processing applications.",
      image: steelCoils,
    },
    {
      name: "Cold Rolled Sheets (CR)",
      description:
        "Cold Rolled Sheets provide a smooth surface finish and are used in manufacturing, fabrication and applications requiring specific dimensional properties.",
      image: steelSheets,
    },
    {
      name: "Hot Rolled Sheets (HR)",
      description:
        "Hot Rolled Sheets are commonly used in construction, industrial production, structural fabrication and engineering applications.",
      image: steelSheets,
    },
    {
      name: "Galvanized Iron Sheets (GI)",
      description:
        "GI sheets are zinc-coated steel materials designed to provide corrosion protection and are widely used in roofing, fabrication and industrial applications.",
      image: galvanizedSheets,
    },
    {
      name: "MS Plates",
      description:
        "Mild Steel Plates are used in structural fabrication, machinery manufacturing, industrial equipment and construction projects.",
      image: msPlates,
    },
    {
      name: "PPGI – Pre-Painted Galvanized Iron",
      description:
        "Pre-painted galvanized steel sheets are suitable for roofing, cladding and other commercial applications.",
      image: ppgiColorCoated,
    },
    {
      name: "PPGL – Pre-Painted Galvalume",
      description:
        "PPGL sheets provide a pre-painted finish over a galvalume-coated steel base.",
      image: ppgiColorCoated,
    },
    {
      name: "GI Z-275 & AZ-150",
      description:
        "We also deal in specialized coated steel materials, including Z-275 galvanized and AZ-150 aluminum-zinc coated sheets.",
      image: galvanizedSheets,
    },
    {
      name: "Steel Coils",
      description:
        "Steel coils are available for various manufacturing, processing and fabrication requirements.",
      image: steelCoils,
    },
    {
      name: "Imported Steel Materials",
      description:
        "We deal in imported steel sheets and coils according to customer specifications and market availability.",
      image: steelCoils,
    },
  ],
};

/**
 * CATEGORY B — STAINLESS STEEL & SPECIAL GRADES
 */
export const CATEGORY_B: ProductCategory = {
  id: "stainless-steel",
  label: "Stainless Steel & Special Grades",
  title: "Category B: Stainless Steel & Special Grades",
  intro:
    "MIB deals in stainless steel materials and specialized grades suitable for different industrial, commercial and fabrication applications.",
  products: [
    {
      name: "Stainless Steel Grade 201",
      description:
        "Grade 201 is an austenitic stainless-steel grade used in general fabrication, decorative applications, equipment and selected commercial applications.",
      image: stainlessSteelSheets,
    },
    {
      name: "Stainless Steel Grade 204",
      description:
        "Grade 204 is a lower-nickel austenitic stainless-steel grade used in selected fabrication and industrial applications.",
      image: stainlessSteelSheets,
    },
    {
      name: "Stainless Steel Grade 304 – Food Grade",
      description:
        "Grade 304 is a widely used stainless steel grade known for its corrosion resistance, formability and suitability for many food-processing and food-contact applications.",
      image: stainlessSteelSheets,
    },
    {
      name: "Stainless Steel Grade 316 – Food & Industrial Grade",
      description:
        "Grade 316 offers enhanced corrosion resistance due to its molybdenum content. It is commonly used in food processing, chemical processing, marine and demanding industrial environments.",
      image: stainlessSteelSheets,
    },
  ],
  applications: [
    "Food processing equipment.",
    "Commercial kitchens.",
    "Food storage and preparation equipment.",
    "Industrial machinery.",
    "Chemical processing equipment.",
    "Fabrication and engineering.",
    "Commercial and architectural applications.",
    "Industrial manufacturing.",
  ],
  commitment:
    "We aim to provide stainless steel materials according to required grades, specifications and customer applications. Material grades and food-contact suitability should be confirmed through the relevant material certificates and specifications.",
};

/**
 * CATEGORY C — PIPES, STRUCTURAL STEEL, ROOFING & SOLAR MATERIALS
 */
export const CATEGORY_C: ProductCategory = {
  id: "pipes-structural-roofing",
  label: "Pipes, Structural, Roofing & Solar",
  title: "Category C: Pipes, Structural Steel, Roofing & Solar Materials",
  intro:
    "MIB deals in different steel materials for structural, industrial, roofing and fabrication requirements.",
  products: [
    {
      name: "MS Pipes – All Sizes",
      description:
        "Mild Steel Pipes are used in construction, engineering, fabrication, industrial structures and general manufacturing.",
      image: steelPipes,
    },
    {
      name: "Structural Steel",
      description:
        "Structural steel products are used in building frameworks, industrial structures, fabrication and engineering projects.",
      image: structuralSteel,
    },
    {
      name: "Corrugated Sheets – All Sizes",
      description:
        "Corrugated steel sheets are widely used for industrial roofing, warehouses, factory sheds and commercial structures.",
      image: roofingSheets,
    },
    {
      name: "Profile Sheets – All Sizes",
      description:
        "Profile sheets are suitable for residential, commercial and industrial roofing applications.",
      image: roofingSheets,
    },
    {
      name: "Solar Mounting Structure Materials",
      description:
        "We also deal in steel sections used in solar mounting structures.",
      image: solarMounting,
    },
  ],
  solarMaterials: {
    title: "Available Products",
    items: ["C-Channel", "L1 Sections", "L2 Sections", "L3 Sections"],
    applicationsTitle: "Applications",
    applications: [
      "Solar panel mounting structures.",
      "Industrial frameworks.",
      "Commercial warehouses.",
      "Factory sheds.",
      "Roofing structures.",
      "Engineering and fabrication projects.",
    ],
  },
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  CATEGORY_A,
  CATEGORY_B,
  CATEGORY_C,
];

export const PRODUCT_FILTERS = [
  { id: "all", label: "All Products" },
  ...PRODUCT_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
] as const;
