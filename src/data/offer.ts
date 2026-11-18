/**
 * Customer promises confirmed by the owner (17 Nov 2026).
 * Only add a promise here once the owner has confirmed XIII actually offers it.
 * Not confirmed — do not add: warranty length, fixed prices / packages, 3D drawings as standard,
 * HDB DRC listing, any licence or registration.
 */

export interface CustomerPromise {
  /** Short chip label, used in heroes and the promise strip */
  label: string;
  title: string;
  description: string;
}

export const PROMISES: CustomerPromise[] = [
  {
    label: "Free site visit & quote",
    title: "Free site visit & itemised quote",
    description:
      "We visit, measure, and send a line-by-line quotation at no cost, so you can compare before you commit.",
  },
  {
    label: "No design fee",
    title: "No design fee",
    description:
      "We are a renovation contractor, not an interior design firm. You pay for the work, not a separate designer fee.",
  },
  {
    label: "Pay by stages",
    title: "Progressive payment",
    description:
      "You pay in stages as the work progresses, not the full amount upfront.",
  },
  {
    label: "Workmanship warranty",
    title: "Workmanship warranty",
    description:
      "We stand behind what we build, with a workmanship warranty after handover and support on WhatsApp.",
  },
];

/** Budget reassurance shown in every service page's pricing section */
export const BUDGET_POINTS = [
  {
    title: "You only pay for the work",
    description:
      "No design fee and no designer mark-up layer. The quotation is for materials and workmanship.",
  },
  {
    title: "Every item priced separately",
    description:
      "Each cabinet run, tile area, or hacking item is listed, so you can see where the money goes and compare like for like.",
  },
  {
    title: "Materials chosen to fit your budget",
    description:
      "We suggest options at different price points and show you what changes when you swap a finish or material.",
  },
  {
    title: "Pay as the work progresses",
    description:
      "Progressive payments tied to work stages, so you are never paying far ahead of what has been done.",
  },
];
