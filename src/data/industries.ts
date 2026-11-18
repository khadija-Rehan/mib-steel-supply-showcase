import structuralSteel from "@/assets/structural-steel.jpg";
import colorCoilProfile from "@/assets/color-coil-profile.jpg";
import foodProcessing from "@/assets/food-processing.jpg";
import fabrication from "@/assets/fabrication.jpg";
import solarMounting from "@/assets/solar-mounting.jpg";

export interface Industry {
  name: string;
  description: string;
  image: string;
}

export const INDUSTRIES_INTRO =
  "MIB aims to provide steel and stainless-steel material solutions to customers operating in different industrial and commercial sectors.";

export const INDUSTRIES: Industry[] = [
  {
    name: "Construction Industry",
    description:
      "Steel sheets, MS plates, galvanized products, pipes and structural steel for construction projects.",
    image: structuralSteel,
  },
  {
    name: "Color Coils & Profiles",
    description:
      "Color-coated steel coils, trapezoidal profiles, corrugated roofing and cladding materials for industrial and commercial structures.",
    image: colorCoilProfile,
  },
  {
    name: "Food Processing Industry",
    description:
      "Stainless steel grades 304 and 316 for suitable food-processing equipment, commercial kitchens and food-contact applications, subject to required material specifications.",
    image: foodProcessing,
  },
  {
    name: "Industrial & Fabrication Sector",
    description:
      "Steel materials for workshops, factories, engineering businesses and fabrication units.",
    image: fabrication,
  },
  {
    name: "Solar Energy Sector",
    description:
      "Steel channels and related structural sections for solar mounting systems.",
    image: solarMounting,
  },
];
