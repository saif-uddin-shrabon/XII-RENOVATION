/**
 * Service landing pages — one record per commercial keyword cluster.
 * Copy rules: no licence / "HDB approved" claims, no invented prices, stats, or projects.
 * To add real photos for a service, append entries to its `photos` array.
 */

import type { ProjectMedia } from "@/data/projects";

export type ServiceSlug =
  | "kitchen-renovation"
  | "hdb-renovation"
  | "carpentry"
  | "tiling"
  | "hacking-demolition"
  | "electrical";

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceHighlight {
  /** Anchor id, e.g. "cabinets" → /kitchen-renovation#cabinets (used as Google Ads final URLs) */
  id: string;
  title: string;
  description: string;
  points: string[];
  /** Real project photo only; omit rather than use an unrelated image */
  image?: ProjectMedia;
  /** WhatsApp prefill for this block's button */
  whatsApp: string;
}

export interface Service {
  slug: ServiceSlug;
  /** Short label for nav, footer, breadcrumbs, and the enquiry form */
  navLabel: string;
  cardSummary: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  keywords: string[];
  intro: string[];
  scopeHeading: string;
  scope: ServiceItem[];
  process: ServiceItem[];
  whyUs: ServiceItem[];
  faqs: ServiceFaq[];
  /** Visual "what we can do" blocks with anchors; omit for lean pages */
  highlights?: ServiceHighlight[];
  /** Pricing section H2, written around the "… cost / price singapore" search term */
  pricingHeading?: string;
  /** What changes the price — shown with the shared budget points instead of invented prices */
  priceFactors: string[];
  /** Ids from `googleReviews` in data/reviews.ts relevant to this service */
  reviewIds: string[];
  /** Date this page's content last changed (YYYY-MM-DD). Update it by hand when you edit the page; used as sitemap lastmod. */
  contentUpdated: string;
  /** Top-of-page background image; falls back to the first photo */
  heroImage?: ProjectMedia;
  /** Real completed-work photos only. Empty renders a "photos coming soon" slot. */
  photos: ProjectMedia[];
  /** Ids from `videos` in data/projects.ts */
  videoIds: string[];
  relatedSlugs: ServiceSlug[];
}

const consultStep: ServiceItem = {
  title: "Free site visit & measurement",
  description:
    "We come to your HDB flat, condo, or landed home at no cost, measure up, and talk through how you use the space, your budget, and your timeline.",
};

const quoteStep: ServiceItem = {
  title: "Free itemised quotation",
  description:
    "You receive a free line-by-line quotation so you can see exactly what is included before anything is confirmed. No vague lump sums, no design fee.",
};

const handoverStep: ServiceItem = {
  title: "Inspection & handover",
  description:
    "We walk through the finished work with you, fix any snags, and clean up the site. Your workmanship warranty starts here, and we stay reachable on WhatsApp.",
};

const freeQuoteFaq: ServiceFaq = {
  question: "Is the site visit and quotation free?",
  answer:
    "Yes. The site visit, measurement, and itemised quotation are free, and there is no obligation to go ahead. You can also send photos on WhatsApp first for a quick idea of the scope.",
};

const noDesignFeeFaq: ServiceFaq = {
  question: "Are you an interior designer? Do you charge a design fee?",
  answer:
    "No. XIII Renovation & Design is a renovation contractor. We help you plan the layout, materials, and carpentry as part of the job, and there is no separate design fee — you pay for the work itself.",
};

const paymentFaq: ServiceFaq = {
  question: "Do I need to pay everything upfront?",
  answer:
    "No. Payment is progressive: you pay in stages as the work moves forward, so you are not paying far ahead of what has been done.",
};

export const services: Service[] = [
  {
    slug: "kitchen-renovation",
    navLabel: "Kitchen Renovation",
    cardSummary:
      "Full kitchen renovation and custom kitchen cabinets for HDB flats, condos, and landed homes — layout, carpentry, countertops, and fitting.",
    eyebrow: "Kitchen Renovation & Kitchen Cabinets",
    h1: "Kitchen Renovation & Kitchen Cabinets in Singapore",
    metaTitle: "Kitchen Renovation Singapore | Custom Cabinets, Free Quote",
    metaDescription:
      "Kitchen renovation in Singapore: custom kitchen cabinets, countertops, tiling and fitting for HDB and condo homes. Free site visit, no design fee.",
    primaryKeyword: "kitchen renovation singapore",
    keywords: [
      "kitchen renovation singapore",
      "kitchen renovation contractor singapore",
      "kitchen cabinet singapore",
      "kitchen cabinet contractor",
      "hdb kitchen renovation",
      "kitchen renovation cost singapore",
      "kitchen renovation contractor",
      "kitchen cabinet sg",
      "kitchen carpentry singapore",
      "custom made kitchen cabinets singapore",
      "aluminium kitchen cabinet singapore",
      "kitchen cabinet replacement singapore",
      "kitchen cabinet door replacement",
      "kitchen cabinet per foot run singapore",
    ],
    intro: [
      "The kitchen is the hardest-working room in a Singapore home, and the one where poor planning shows fastest. XIII Renovation & Design handles kitchen renovation from hacking out the old units to the final cabinet hinge — so you deal with one contractor, not five.",
      "We build custom kitchen cabinets to your measurements — in laminate, aluminium, or other finishes — rather than forcing off-the-shelf modules into your space. That means better use of awkward corners, integrated laundry or utility storage where you need it, and cabinets sized around your actual appliances.",
      "Whether it is an HDB kitchen in a resale flat, a condo galley, or a landed home with an island, we plan the layout, carpentry, wet works, and fitting together so the schedule holds and the finish is right.",
    ],
    scopeHeading: "What our kitchen renovation covers",
    scope: [
      {
        title: "Custom kitchen cabinets",
        description:
          "Top and bottom cabinets, tall units, and pull-outs built to measure, in laminate, aluminium, or other finishes chosen with you.",
      },
      {
        title: "Cabinet door & laminate replacement",
        description:
          "If your cabinet carcasses are still sound, we can replace only the doors or re-laminate the fronts for a new look at a lower cost.",
      },
      {
        title: "Kitchen layout planning",
        description:
          "Galley, L-shape, U-shape, or island layouts planned around your cooking habits, appliances, and HDB or condo constraints.",
      },
      {
        title: "Countertops & backsplash",
        description:
          "Countertop and backsplash supply and installation, cut and fitted around your sink, hob, and cabinet line.",
      },
      {
        title: "Hacking & wet works",
        description:
          "Removal of old cabinets and tiles, floor and wall tiling, and preparation so new cabinets sit level and true.",
      },
      {
        title: "Utility & laundry integration",
        description:
          "Washing machine, dryer, and service-yard storage integrated into the kitchen joinery where space allows.",
      },
      {
        title: "Appliance & fixture fitting",
        description:
          "Hob, hood, oven, and sink fitting coordinated with the carpentry so everything lines up on installation day.",
      },
    ],
    process: [
      consultStep,
      {
        title: "Layout & cabinet design",
        description:
          "We propose a kitchen layout and cabinet plan, confirm materials and finishes, and lock in appliance sizes before production.",
      },
      quoteStep,
      {
        title: "Hacking, wet works & installation",
        description:
          "Old units come out, tiling and services are prepared, then cabinets, countertops, and appliances are installed in sequence.",
      },
      handoverStep,
    ],
    whyUs: [
      {
        title: "Carpentry and renovation under one roof",
        description:
          "The team that plans your kitchen also manages the hacking, tiling, and fitting, so nothing falls between contractors.",
      },
      {
        title: "Built around your appliances",
        description:
          "Cabinets are sized to the appliances you actually own or plan to buy, not a generic module grid.",
      },
      {
        title: "Clear, itemised quotations",
        description:
          "Every cabinet run, countertop, and wet-works item is listed so you can compare like for like.",
      },
    ],
    faqs: [
      {
        question: "How much does a kitchen renovation cost in Singapore?",
        answer:
          "It depends mainly on the kitchen size, how many cabinet runs you need, your countertop material, and whether hacking, re-tiling, or plumbing changes are involved. After a site visit we give you an itemised quotation so you can see where the budget goes and adjust materials if needed.",
      },
      {
        question: "Can you renovate an HDB kitchen?",
        answer:
          "Yes. We renovate kitchens in HDB BTO and resale flats as well as condos and landed homes. Some works in HDB flats have rules on what can be hacked and when noisy works can happen, and we plan the schedule around those rules.",
      },
      {
        question: "Do you only build kitchen cabinets, or the whole kitchen?",
        answer:
          "Both. You can engage us for custom kitchen cabinets only, or for a full kitchen renovation including hacking, tiling, countertops, and appliance fitting.",
      },
      {
        question: "How long does a kitchen renovation take?",
        answer:
          "Timelines depend on the scope and whether hacking and wet works are needed. Carpentry is made to measure, so we confirm a schedule with you after the site visit and design are finalised.",
      },
      {
        question: "Can you include the washing machine and utility area?",
        answer:
          "Yes. Many Singapore kitchens share space with the laundry or service yard, and we often integrate washing machines and utility storage into the kitchen cabinets.",
      },
      {
        question: "How are kitchen cabinets priced?",
        answer:
          "Kitchen cabinets are usually quoted per foot run, with the finish, internal fittings, and countertop priced as separate lines. Your free itemised quotation shows each cabinet run so you can adjust materials to fit your budget.",
      },
      {
        question: "Do you make aluminium kitchen cabinets?",
        answer:
          "Yes. We build kitchen cabinets in aluminium as well as laminate and other finishes. Aluminium is often chosen for wet areas and service yards. We compare the options and their cost with you during the site visit.",
      },
      {
        question: "Can you replace only the kitchen cabinet doors?",
        answer:
          "Yes. If the cabinet carcasses are still in good condition, replacing the doors or re-laminating the fronts gives the kitchen a new look for less than a full rebuild. We check the carcasses on site and tell you honestly which option makes sense.",
      },
      freeQuoteFaq,
      noDesignFeeFaq,
    ],
    photos: [
      {
        src: "/image/kitchen-utility-mustard.jpg",
        alt: "Custom mustard kitchen cabinets with integrated washing machine — completed Singapore project",
        width: 1080,
        height: 1080,
      },
      {
        src: "/image/xiii-kitchen-taupe-galley-render.jpg",
        alt: "3D design render of a taupe galley kitchen with island, built-in oven, and LED plinth lighting",
        width: 819,
        height: 1024,
      },
      {
        src: "/image/xiii-kitchen-wood-white-l-shape.jpg",
        alt: "L-shaped HDB kitchen with woodgrain base cabinets, white gloss wall cabinets, and solid-surface countertop",
        width: 819,
        height: 1024,
      },
      {
        src: "/image/xiii-kitchen-yellow-tall-units-render.jpg",
        alt: "3D design render of a yellow kitchen with tall appliance units, built-in oven, and floral feature tiles",
        width: 819,
        height: 1024,
      },
      {
        src: "/image/xiii-kitchen-wood-fridge-tall-unit.jpg",
        alt: "HDB kitchen with woodgrain fridge tall unit, open appliance niche, and white gloss wall cabinets",
        width: 819,
        height: 1024,
      },
    ],
    highlights: [
      {
        id: "cabinets",
        title: "Custom kitchen cabinets",
        description:
          "Top and bottom cabinets, tall units, and pull-outs built to your measurements and your appliances. Choose laminate, aluminium, or another finish.",
        points: [
          "Made to measure, not fixed catalogue modules",
          "Laminate or aluminium kitchen cabinets",
          "Door or laminate replacement if the carcass is sound",
          "Each cabinet run priced separately",
        ],
        image: {
          src: "/image/xiii-kitchen-wood-white-l-shape.jpg",
          alt: "L-shaped HDB kitchen with woodgrain base cabinets, white gloss wall cabinets, and solid-surface countertop",
          width: 819,
          height: 1024,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for custom kitchen cabinets.",
      },
      {
        id: "hdb-kitchen",
        title: "HDB, BTO & resale kitchens",
        description:
          "Layouts planned around HDB kitchen sizes and rules — from fresh BTO units to resale kitchens that need hacking and re-tiling first.",
        points: [
          "BTO: cabinets, countertop, and appliance fitting",
          "Resale: hacking and wet works, then cabinets",
          "Noisy works scheduled within HDB hours",
        ],
        image: {
          src: "/image/xiii-kitchen-wood-fridge-tall-unit.jpg",
          alt: "HDB kitchen with woodgrain fridge tall unit, open appliance niche, and white gloss wall cabinets",
          width: 819,
          height: 1024,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for my HDB kitchen renovation.",
      },
      {
        id: "utility",
        title: "Laundry & utility integration",
        description:
          "Washing machine, dryer, and service-yard storage built into the kitchen joinery, so the kitchen and laundry work as one space.",
        points: [
          "Cabinets sized around your machines",
          "Service-yard and utility storage",
          "Planned together with plumbing points",
        ],
        image: {
          src: "/image/kitchen-utility-mustard.jpg",
          alt: "Custom mustard kitchen cabinets with integrated washing machine — completed Singapore project",
          width: 1080,
          height: 1080,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for kitchen and laundry cabinets.",
      },
    ],
    pricingHeading: "Kitchen renovation cost in Singapore",
    priceFactors: [
      "Kitchen size and number of cabinet runs (priced per foot run)",
      "Cabinet material: laminate, aluminium, or other finishes",
      "Internal fittings: drawers, pull-outs, tall units",
      "Full new cabinets, or door and laminate replacement only",
      "Countertop material",
      "Whether old cabinets and tiles need hacking first",
      "Plumbing or electrical point changes",
    ],
    reviewIds: ["santhi-kitchen", "lekshmi-kitchen", "muthukumar-full-home"],
    contentUpdated: "2026-11-18",
    videoIds: ["kitchen-laundry", "red-kitchen"],
    relatedSlugs: ["carpentry", "tiling", "hdb-renovation"],
  },
  {
    slug: "hdb-renovation",
    navLabel: "HDB & Full Home Renovation",
    cardSummary:
      "Whole-home renovation for HDB BTO and resale flats, condos, and landed homes — one contractor managing every trade from hacking to handover.",
    eyebrow: "HDB & Full Home Renovation",
    h1: "HDB Renovation Contractor & Full Home Renovation in Singapore",
    metaTitle: "HDB Renovation Contractor Singapore | Full Home Renovation",
    metaDescription:
      "HDB renovation contractor for BTO and resale flats, toilets, and full home renovation for condos and landed homes. No design fee, free site visit.",
    primaryKeyword: "hdb renovation contractor",
    keywords: [
      "hdb renovation contractor",
      "hdb renovation contractor singapore",
      "hdb renovation singapore",
      "hdb contractor",
      "4 room bto renovation",
      "5 room hdb renovation",
      "resale flat renovation",
      "hdb renovation singapore",
      "4 room hdb renovation",
      "old hdb 4 room renovation",
      "5 room bto renovation",
      "4 room hdb toilet renovation",
      "hdb renovation package singapore",
    ],
    intro: [
      "A full home renovation involves many trades — hacking, masonry, tiling, carpentry, electrical, plumbing, painting — and the risk is in the gaps between them. XIII Renovation & Design manages the whole job as your single renovation contractor, so one team is accountable for the schedule and the finish.",
      "We renovate HDB BTO flats, resale flats, condominiums, and landed homes across Singapore from our base in Sengkang. For BTO owners that usually means flooring, carpentry, and lighting on a fresh unit; for resale flats it often starts with hacking out old finishes and fixing what is behind them.",
      "Before work starts, we walk you through which works need HDB or MCST approval, how noisy-work hours affect the schedule, and what the itemised quotation covers.",
    ],
    scopeHeading: "What a full home renovation includes",
    scope: [
      {
        title: "BTO renovation",
        description:
          "Flooring, carpentry, lighting, and finishing for new 3-room, 4-room, and 5-room BTO flats.",
      },
      {
        title: "Resale flat renovation",
        description:
          "Hacking out old finishes, replacing tiles and pipes where needed, and rebuilding the flat around how you live.",
      },
      {
        title: "Condo & landed renovation",
        description:
          "Full or partial renovation with MCST requirements for condos and larger-scope works for landed homes.",
      },
      {
        title: "Hacking, masonry & tiling",
        description:
          "Wall and floor hacking, new partitions, screeding, waterproofing, and floor and wall tiling.",
      },
      {
        title: "Toilet & bathroom renovation",
        description:
          "Hacking, waterproofing, re-tiling, and new vanity and fittings for HDB toilets and bathrooms.",
      },
      {
        title: "Carpentry & built-ins",
        description:
          "Kitchen cabinets, wardrobes, TV feature walls, and storage made to measure for each room.",
      },
      {
        title: "Electrical, lighting & painting",
        description:
          "Lighting points, power sockets, false ceilings with cove lighting, and full painting to finish.",
      },
    ],
    process: [
      consultStep,
      {
        title: "Layout & scope planning",
        description:
          "We agree the room-by-room scope, materials, and any layout changes, and flag works that need HDB or MCST approval.",
      },
      quoteStep,
      {
        title: "Scheduled works by trade",
        description:
          "Hacking, wet works, electrical, carpentry, and finishing are sequenced so each trade arrives when the last has finished.",
      },
      handoverStep,
    ],
    whyUs: [
      {
        title: "One accountable contractor",
        description:
          "You deal with one team for every trade, instead of chasing separate tilers, carpenters, and electricians.",
      },
      {
        title: "Planned around HDB rules",
        description:
          "We schedule hacking and noisy works around HDB permitted hours and check what can and cannot be hacked before quoting.",
      },
      {
        title: "Real work you can see",
        description:
          "The projects on this site are our own completed Singapore homes, not stock photos.",
      },
    ],
    faqs: [
      {
        question: "Do you renovate both BTO and resale HDB flats?",
        answer:
          "Yes. BTO renovations usually focus on flooring, carpentry, and lighting, while resale flats often need hacking, re-tiling, and replacing old services first. We scope each one separately after a site visit.",
      },
      {
        question: "How much does a 4-room or 5-room HDB renovation cost?",
        answer:
          "Cost depends on whether the flat is new or resale, how much hacking and re-tiling is needed, the amount of carpentry, and your material choices. We give you an itemised quotation after visiting the flat so you can see each cost and decide where to spend.",
      },
      {
        question: "Do HDB renovation works need a permit?",
        answer:
          "Some do. HDB requires approval for certain works such as hacking walls or changing floor finishes, and there are rules on which walls can be removed and when noisy works may be carried out. We tell you up front which parts of your scope are affected and plan the schedule around them.",
      },
      {
        question: "Can I renovate only part of my home?",
        answer:
          "Yes. Many clients renovate in stages — for example the kitchen and bathrooms first, then carpentry. We quote each scope clearly so you can phase the work.",
      },
      {
        question: "What hours can renovation work happen in an HDB flat?",
        answer:
          "HDB sets permitted hours for renovation, with stricter hours for noisy works like hacking and drilling, and no work on Sundays and public holidays. We plan the timeline around these rules so neighbours are respected and the job stays on track.",
      },
      {
        question: "Do you renovate HDB toilets and bathrooms?",
        answer:
          "Yes. A toilet renovation usually means hacking out the old tiles, waterproofing, re-tiling with the correct falls to the floor trap, and fitting a new vanity and fittings. We can do it on its own or as part of a full 3-room, 4-room, or 5-room HDB renovation.",
      },
      freeQuoteFaq,
      noDesignFeeFaq,
      paymentFaq,
    ],
    photos: [
      {
        src: "/image/xiii-21-08-26.png",
        alt: "Renovated living room with custom chevron media wall — completed Singapore condominium",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-30-07-26.png",
        alt: "Full home renovation living room overview with media console — Singapore condominium",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-28-08-26.png",
        alt: "Renovated bedroom with built-in study desk — completed Singapore project",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/bathroom-vanity.jpg",
        alt: "Renovated bathroom vanity and finishes — completed Singapore project",
        width: 1080,
        height: 1080,
      },
    ],
    highlights: [
      {
        id: "bto",
        title: "BTO renovation",
        description:
          "For new 3-room, 4-room, and 5-room BTO flats: flooring, carpentry, lighting, and finishing planned as one schedule, ready for move-in.",
        points: [
          "Flooring, carpentry, and lighting together",
          "Built-ins sized to your BTO layout",
          "One team and one itemised quotation",
        ],
        image: {
          src: "/image/xiii-28-08-26.png",
          alt: "Renovated bedroom with built-in study desk — completed Singapore project",
          width: 1080,
          height: 1350,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for my BTO renovation.",
      },
      {
        id: "resale",
        title: "Resale flat renovation",
        description:
          "Older flats usually start with hacking out old finishes and checking what is behind them, then rebuilding the home around how you live.",
        points: [
          "Hacking, re-tiling, and replacing old services",
          "Layout changes checked against HDB rules",
          "Kitchen, toilets, and carpentry in one job",
        ],
        image: {
          src: "/image/xiii-hacking-bedroom-wall-opening.jpg",
          alt: "HDB bedroom wall hacked to create a wide opening, with floor tiles removed and debris cleared",
          width: 819,
          height: 1024,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for my resale flat renovation.",
      },
      {
        id: "toilet",
        title: "HDB toilet & bathroom renovation",
        description:
          "A full toilet renovation in one job: hacking out old tiles, waterproofing, re-tiling with proper falls to the floor trap, then the vanity and fittings.",
        points: [
          "Hacking and re-tiling of walls and floor",
          "Waterproofing before new tiles go on",
          "Vanity, fittings, and finishing",
        ],
        image: {
          src: "/image/bathroom-vanity.jpg",
          alt: "Renovated bathroom vanity and finishes — completed Singapore project",
          width: 1080,
          height: 1080,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for my HDB toilet renovation.",
      },
      {
        id: "condo-landed",
        title: "Condo & landed homes",
        description:
          "Full or partial renovation for condominiums, planned around MCST requirements, and larger-scope works for landed homes.",
        points: [
          "MCST requirements checked before works",
          "Full or room-by-room renovation",
          "Carpentry, tiling, and electrical coordinated",
        ],
        image: {
          src: "/image/xiii-21-08-26.png",
          alt: "Renovated living room with custom chevron media wall — completed Singapore condominium",
          width: 1080,
          height: 1350,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for my condo / landed home renovation.",
      },
    ],
    pricingHeading: "HDB renovation cost in Singapore",
    priceFactors: [
      "New BTO or resale flat (resale usually needs more hacking and re-tiling)",
      "Flat size: 3-room, 4-room, 5-room, or larger",
      "How much carpentry you need",
      "Toilet renovation: number of toilets, re-tiling, and waterproofing",
      "Flooring and tiling area",
      "Electrical, lighting, and false-ceiling works",
      "Your material and finish choices",
    ],
    reviewIds: ["muthukumar-full-home", "murali-bathrooms-wardrobes", "mahen-carpentry-toilet"],
    contentUpdated: "2026-11-18",
    videoIds: ["dark-bathroom", "bright-study"],
    relatedSlugs: ["kitchen-renovation", "hacking-demolition", "carpentry"],
  },
  {
    slug: "carpentry",
    navLabel: "Carpentry & Built-ins",
    cardSummary:
      "Custom carpentry and built-in furniture — wardrobes, kitchen cabinets, TV feature walls, study desks, and storage made to measure.",
    eyebrow: "Carpentry & Custom Built-in Furniture",
    h1: "Custom Carpentry & Built-in Furniture in Singapore",
    metaTitle: "Carpentry Singapore | Built-in Wardrobes, Free Quote",
    metaDescription:
      "Carpentry contractor in Singapore for built-in wardrobes, feature walls, custom shoe cabinets and study desks. Free site visit, no design fee.",
    primaryKeyword: "carpentry singapore",
    keywords: [
      "carpentry singapore",
      "carpentry sg",
      "direct carpentry singapore",
      "carpentry contractor singapore",
      "carpentry services singapore",
      "custom carpentry singapore",
      "built in wardrobe singapore",
      "custom wardrobe singapore",
      "custom cabinet singapore",
      "carpenter singapore",
      "custom shoe cabinet singapore",
      "carpentry price singapore",
      "carpentry quotation",
    ],
    intro: [
      "Good carpentry is what makes a Singapore home feel finished. If you are looking for a carpenter in Singapore who will measure, build, and install the whole piece, XIII Renovation & Design designs and builds custom built-in furniture to the exact dimensions of your space — so wardrobes reach the ceiling, cabinets fit the alcove, and nothing looks like it was bought to roughly fit.",
      "Our carpentry work ranges from full-height built-in wardrobes and kitchen cabinets to TV feature walls with integrated LED lighting, study desks with shelving, and display cabinets. Every piece is measured on site and planned around how you will actually use it.",
      "You deal directly with the team that measures, plans, and installs your carpentry — there is no interior designer in between and no design fee. Because we also handle renovation works, carpentry is coordinated with electrical points, lighting, and flooring, so there are no surprises when the cabinets arrive.",
    ],
    scopeHeading: "Carpentry and built-ins we make",
    scope: [
      {
        title: "Built-in wardrobes",
        description:
          "Full-height swing or sliding wardrobes with internal layouts planned around your clothes, drawers, and accessories.",
      },
      {
        title: "Kitchen cabinets",
        description:
          "Top and bottom kitchen cabinets, tall units, and utility storage built to measure.",
      },
      {
        title: "TV & feature walls",
        description:
          "Feature walls with panelling, floating shelves, concealed wiring, and integrated LED lighting.",
      },
      {
        title: "Study desks & shelving",
        description:
          "Built-in study desks, wall shelving, and bedroom study corners that make use of every centimetre.",
      },
      {
        title: "Display & storage cabinets",
        description:
          "Lit display cabinets, shoe cabinets, consoles, and full-height storage for living and dining areas.",
      },
      {
        title: "Bed frames & headboards",
        description:
          "Headboard joinery, platform beds, and bedside storage with optional accent lighting.",
      },
    ],
    process: [
      consultStep,
      {
        title: "Design & material selection",
        description:
          "We confirm dimensions, internal layouts, door types, and finishes, and coordinate lighting or power points needed inside the carpentry.",
      },
      quoteStep,
      {
        title: "Fabrication & installation",
        description:
          "Carpentry is made to measure, then installed and adjusted on site so doors, drawers, and edges line up cleanly.",
      },
      handoverStep,
    ],
    whyUs: [
      {
        title: "Deal directly with the builders",
        description:
          "You talk to the team that measures and installs your carpentry, with no interior designer in between and no design fee.",
      },
      {
        title: "Made to measure",
        description:
          "Every piece is built to your space, not adapted from standard catalogue sizes.",
      },
      {
        title: "Lighting built in",
        description:
          "LED strips, cove lighting, and concealed wiring are planned with the carpentry, as seen in our feature wall projects.",
      },
      {
        title: "Coordinated with your renovation",
        description:
          "Carpentry, electrical points, and flooring are scheduled together so installation is clean.",
      },
    ],
    faqs: [
      {
        question: "How much does custom carpentry cost in Singapore?",
        answer:
          "Carpentry is usually priced by the size of each piece, the internal fittings, and the finish you choose. After measuring up we give you an itemised quotation for each item so you can prioritise.",
      },
      {
        question: "Can you build a built-in wardrobe only?",
        answer:
          "Yes. You can engage us for a single built-in wardrobe or cabinet, or for carpentry across the whole home as part of a full renovation.",
      },
      {
        question: "Do you add lighting to carpentry?",
        answer:
          "Yes. Feature walls, display cabinets, and headboards often include integrated LED lighting. We plan the wiring and power points before fabrication.",
      },
      {
        question: "How long does carpentry take?",
        answer:
          "Custom carpentry is fabricated after the design and measurements are confirmed, then installed on site. We give you a schedule once the scope is agreed.",
      },
      {
        question: "Do you do carpentry for HDB flats and condos?",
        answer:
          "Yes. We build carpentry for HDB BTO and resale flats, condominiums, and landed homes across Singapore.",
      },
      {
        question: "How is built-in wardrobe pricing calculated?",
        answer:
          "Built-in wardrobes and cabinets are usually quoted per foot run, with internal fittings, door type, and finish affecting the rate. Your free itemised quotation lists each piece separately so you can compare and adjust.",
      },
      {
        question: "Do I deal directly with the carpentry team?",
        answer:
          "Yes. You work directly with XIII, the team that measures, plans, and installs your carpentry — there is no interior designer in between and no design fee.",
      },
      freeQuoteFaq,
    ],
    heroImage: {
      src: "/image/xiii-carpentry-feature-wall-hero.jpg",
      alt: "Full-height wood-veneer TV feature wall with built-in console and fireplace niche",
      width: 1024,
      height: 576,
    },
    photos: [
      {
        src: "/image/xiii-12-08-26.png",
        alt: "Herringbone TV feature wall with floating shelves and LED lighting — custom carpentry, Singapore",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-14-08-26.png",
        alt: "Custom study desk with asymmetrical wall shelving — built-in carpentry",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-06-07-26.png",
        alt: "Lit display cabinet joinery with LED shelving — custom carpentry",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-10-08-26.png",
        alt: "Bedroom headboard joinery with accent lighting and built-in shelving",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-19-08-26.png",
        alt: "Japandi console cabinet with open shelving — built-in furniture",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-17-08-26.png",
        alt: "Floating desk with wood-backed cubbies — custom carpentry detail",
        width: 1080,
        height: 1350,
      },
    ],
    highlights: [
      {
        id: "wardrobes",
        title: "Built-in wardrobes & bedroom carpentry",
        description:
          "Full-height swing or sliding wardrobes, headboards, and bedside storage, with internal layouts planned around what you actually store.",
        points: [
          "Floor-to-ceiling, made to measure",
          "Drawers, hanging, and shelving planned with you",
          "Priced per foot run in your quotation",
        ],
        image: {
          src: "/image/xiii-10-08-26.png",
          alt: "Bedroom headboard joinery with accent lighting and built-in shelving",
          width: 1080,
          height: 1350,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for built-in wardrobes.",
      },
      {
        id: "feature-walls",
        title: "TV feature walls & consoles",
        description:
          "Feature walls with panelling, floating shelves, concealed wiring, and integrated LED lighting — the piece most visitors notice first.",
        points: [
          "Panelling, shelving, and TV console",
          "Concealed wiring and LED lighting",
          "Planned with your power points",
        ],
        image: {
          src: "/image/xiii-12-08-26.png",
          alt: "Herringbone TV feature wall with floating shelves and LED lighting — custom carpentry, Singapore",
          width: 1080,
          height: 1350,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for a TV feature wall.",
      },
      {
        id: "study-storage",
        title: "Study desks, custom shoe cabinets & storage",
        description:
          "Built-in study desks, wall shelving, shoe cabinets, display cabinets, and full-height storage that use every centimetre of an HDB or condo room.",
        points: [
          "Study corners and work-from-home desks",
          "Custom shoe and display cabinets",
          "Lit shelving where it helps",
        ],
        image: {
          src: "/image/xiii-14-08-26.png",
          alt: "Custom study desk with asymmetrical wall shelving — built-in carpentry",
          width: 1080,
          height: 1350,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for study / storage carpentry.",
      },
    ],
    pricingHeading: "Carpentry price in Singapore: how we quote",
    priceFactors: [
      "Size of each piece (wardrobes and cabinets are priced per foot run)",
      "Internal fittings: drawers, pull-outs, hanging rails",
      "Door type: swing, sliding, or open shelving",
      "Finish: laminate, veneer, or other surfaces",
      "Integrated LED lighting and power points",
    ],
    reviewIds: ["mahen-carpentry-toilet", "murali-bathrooms-wardrobes", "melvin-feature-wall"],
    contentUpdated: "2026-11-18",
    videoIds: ["console-mirror", "floating-counter"],
    relatedSlugs: ["kitchen-renovation", "hdb-renovation", "electrical"],
  },
  {
    slug: "tiling",
    navLabel: "Floor & Wall Tiling",
    cardSummary:
      "Floor and wall tiling for kitchens, bathrooms, and living areas — new tiling, tile replacement, hollow tile repair, and regrouting.",
    eyebrow: "Floor & Wall Tiling Services",
    h1: "Floor & Wall Tiling Contractor in Singapore",
    metaTitle: "Tiling Contractor Singapore | Floor & Wall Tiler, Free Quote",
    metaDescription:
      "Tiling contractor in Singapore for floor and wall tiles, toilet re-tiling, hollow tile repair and regrouting. Free site visit and itemised quote.",
    primaryKeyword: "tiling contractor singapore",
    keywords: [
      "tiling contractor singapore",
      "tiler singapore",
      "tiling work singapore",
      "floor tiles contractor singapore",
      "toilet tiling singapore",
      "tile replacement",
      "regrouting singapore",
    ],
    intro: [
      "Tiling is one of the most visible parts of a renovation and one of the hardest to fix once it is done badly. Uneven tiles, poor falls in the bathroom, and hollow spots show up quickly. XIII Renovation & Design carries out floor and wall tiling with careful surface preparation so the finish stays flat and sound.",
      "We tile kitchens, bathrooms, living areas, and balconies in HDB flats, condos, and landed homes. That includes new tiling as part of a renovation, replacing cracked or hollow tiles, overlaying existing floors where suitable, and regrouting tired joints.",
      "Our clients have trusted us with their flooring — one of our Google reviews is from a homeowner who had their flooring done with us and described the workmanship and detailing as outstanding.",
    ],
    scopeHeading: "Tiling services we provide",
    scope: [
      {
        title: "Floor tiling",
        description:
          "New floor tiles for living rooms, bedrooms, kitchens, and balconies, laid level with consistent joints.",
      },
      {
        title: "Bathroom & toilet tiling",
        description:
          "Wall and floor tiling for bathrooms with proper falls to the floor trap and waterproofing preparation.",
      },
      {
        title: "Kitchen wall tiling",
        description:
          "Backsplash and kitchen wall tiling coordinated with cabinet and countertop installation.",
      },
      {
        title: "Tile replacement & hollow tiles",
        description:
          "Replacing cracked, chipped, or hollow-sounding tiles and making good the surrounding area.",
      },
      {
        title: "Regrouting",
        description:
          "Removing old, stained, or cracked grout and regrouting for a cleaner, better-sealed finish.",
      },
      {
        title: "Floor overlay",
        description:
          "Laying new tiles over existing floors where the surface is sound, avoiding full hacking where possible.",
      },
    ],
    process: [
      consultStep,
      {
        title: "Tile & layout selection",
        description:
          "We help you confirm tile sizes, layout direction, and grout colour, and check the existing surface for hollowness or damage.",
      },
      quoteStep,
      {
        title: "Preparation & tiling",
        description:
          "Old tiles are removed where needed, surfaces are prepared and levelled, then tiles are laid and grouted.",
      },
      handoverStep,
    ],
    whyUs: [
      {
        title: "Preparation first",
        description:
          "Most tiling problems come from poor surface preparation. We check and prepare the base before laying a single tile.",
      },
      {
        title: "Part of a bigger renovation",
        description:
          "Tiling is coordinated with hacking, plumbing, and carpentry so levels and edges line up.",
      },
      {
        title: "Real customer feedback",
        description:
          "Our flooring work has a five-star Google review from a Singapore homeowner.",
      },
    ],
    faqs: [
      {
        question: "How much does tiling cost in Singapore?",
        answer:
          "Tiling cost depends on the area, the tile size and type, whether old tiles need to be hacked first, and how much surface preparation is needed. We quote after seeing the space so the price reflects the actual condition of your floor or walls.",
      },
      {
        question: "Can you fix hollow tiles without redoing the whole floor?",
        answer:
          "Often, yes. If the hollow area is localised we can remove and relay the affected tiles. If hollowness is widespread, we will explain the options before you decide.",
      },
      {
        question: "Do you do bathroom and toilet tiling?",
        answer:
          "Yes. Bathroom tiling includes wall and floor tiles with the correct falls towards the floor trap, prepared with waterproofing in mind.",
      },
      {
        question: "Can new tiles be laid over existing tiles?",
        answer:
          "Sometimes. An overlay can work when the existing floor is sound and level. We check for hollow or damaged tiles first and tell you whether overlay or hacking is the better option.",
      },
      {
        question: "Do you offer regrouting only?",
        answer:
          "Yes. If your tiles are fine but the grout is stained, cracked, or mouldy, regrouting can refresh the area without replacing tiles.",
      },
      freeQuoteFaq,
    ],
    heroImage: {
      src: "/image/xiii-tiling-kitchen-wall-stripped-hero.jpg",
      alt: "Kitchen wall with old tiles partly removed and the screed exposed, ready for new wall and floor tiling",
      width: 1024,
      height: 576,
    },
    photos: [
      {
        src: "/image/xiii-tiling-prep-hacked-wall-rebar.jpg",
        alt: "Tiled wall hacked back to the rebar with floor protection laid, preparing the area for new tiling",
        width: 768,
        height: 1024,
      },
      {
        src: "/image/xiii-tiling-prep-hacked-partition-debris.jpg",
        alt: "Partition wall hacked in an HDB flat with debris bagged and floor protection down before tiling works",
        width: 768,
        height: 1024,
      },
      {
        src: "/image/xiii-tiling-prep-kitchen-hacked-floor-protected.jpg",
        alt: "Kitchen strip-out in progress with walls opened and floor protection in place ahead of re-tiling",
        width: 768,
        height: 1024,
      },
    ],
    highlights: [
      {
        id: "floor-wall-tiling",
        title: "Floor & wall tiling",
        description:
          "New floor and wall tiles for living areas, bedrooms, kitchens, and balconies, laid level on a properly prepared base.",
        points: [
          "Surface checked and levelled first",
          "Consistent joints and clean edges",
          "Overlay where the old floor is sound",
        ],
        image: {
          src: "/image/xiii-tiling-kitchen-wall-stripped-hero.jpg",
          alt: "Kitchen wall with old tiles partly removed and the screed exposed, ready for new wall and floor tiling",
          width: 1024,
          height: 576,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for floor / wall tiling.",
      },
      {
        id: "toilet-tiling",
        title: "Toilet & bathroom re-tiling",
        description:
          "Wall and floor tiling for bathrooms with the correct falls to the floor trap, prepared with waterproofing in mind.",
        points: [
          "Correct falls so water drains away",
          "Hack-and-retile or overlay, explained",
          "Floor traps protected during works",
        ],
        image: {
          src: "/image/xiii-hacking-bathroom-floor-stripped.jpg",
          alt: "Bathroom floor stripped of old tiles down to the screed, with floor traps protected for the next trade",
          width: 819,
          height: 1024,
        },
        whatsApp: "Hello XIII — I'd like a free quotation for toilet re-tiling.",
      },
      {
        id: "tile-repair",
        title: "Hollow tiles, cracked tiles & regrouting",
        description:
          "Localised repairs when the rest of the floor is fine: lifting and relaying hollow or cracked tiles, and regrouting stained joints.",
        points: [
          "Hollow and popping tiles relaid",
          "Cracked or chipped tiles replaced",
          "Regrouting without replacing tiles",
        ],
        whatsApp: "Hello XIII — I'd like a free quotation for tile repair / regrouting.",
      },
    ],
    pricingHeading: "Tiling cost in Singapore",
    priceFactors: [
      "Area to be tiled",
      "Tile size and type",
      "Whether old tiles must be hacked first or can be overlaid",
      "Surface condition: levelling, hollow spots, waterproofing preparation",
      "Patterns, cuts, and edge trims",
    ],
    reviewIds: ["mahen-carpentry-toilet", "puspa-flooring", "murali-bathrooms-wardrobes"],
    contentUpdated: "2026-11-18",
    videoIds: [],
    relatedSlugs: ["hacking-demolition", "kitchen-renovation", "hdb-renovation"],
  },
  {
    slug: "hacking-demolition",
    navLabel: "Hacking & Demolition",
    cardSummary:
      "Wall hacking, floor and tile hacking, and removal of old carpentry — carried out carefully and planned around HDB and MCST rules.",
    eyebrow: "Hacking & Demolition Services",
    h1: "Hacking & Demolition Contractor in Singapore",
    metaTitle: "Hacking Contractor Singapore | Wall & Floor Hacking",
    metaDescription:
      "Hacking contractor in Singapore for wall, floor and tile hacking and carpentry removal in HDB flats, condos and landed homes. Planned around HDB rules.",
    primaryKeyword: "hacking contractor singapore",
    keywords: [
      "hacking contractor singapore",
      "wall hacking singapore",
      "wall hacking contractor singapore",
      "hdb hacking contractor",
      "floor hacking singapore",
      "hacking floor tiles cost singapore",
    ],
    intro: [
      "Hacking is the first step of most renovations and the one with the least room for error. Hacking the wrong wall, damaging pipes, or leaving debris behind creates problems for every trade that follows. XIII Renovation & Design plans hacking and demolition as part of the whole renovation, not as an isolated job.",
      "We carry out wall hacking to open up layouts, floor and wall tile hacking before re-tiling, and removal of old kitchen cabinets, wardrobes, and built-ins. Debris is cleared and the site is left ready for the next stage of work.",
      "In HDB flats, only certain walls can be hacked and noisy works are restricted to set hours. We check what is allowed for your flat before quoting and schedule the work to match.",
    ],
    scopeHeading: "Hacking and demolition works",
    scope: [
      {
        title: "Wall hacking",
        description:
          "Removal of non-structural walls and partitions to open up kitchens, living areas, and bedrooms.",
      },
      {
        title: "Floor tile hacking",
        description:
          "Hacking of old floor tiles and screed before new tiling or flooring is laid.",
      },
      {
        title: "Wall tile hacking",
        description:
          "Removal of kitchen and bathroom wall tiles in preparation for re-tiling.",
      },
      {
        title: "Carpentry removal",
        description:
          "Dismantling and disposal of old kitchen cabinets, wardrobes, and built-in furniture.",
      },
      {
        title: "Debris disposal",
        description:
          "Bagging and removal of hacking debris so the site is clear for the next trade.",
      },
      {
        title: "Making good",
        description:
          "Patching and preparing surfaces after hacking so they are ready for tiling, plastering, or painting.",
      },
    ],
    process: [
      consultStep,
      {
        title: "Check what can be hacked",
        description:
          "We confirm which walls and finishes can be removed and which works need HDB or MCST approval before scheduling.",
      },
      quoteStep,
      {
        title: "Protection & hacking",
        description:
          "Floors, lift areas, and fixtures are protected, then hacking is carried out within permitted noisy-work hours.",
      },
      {
        title: "Clear-out & handover to next stage",
        description:
          "Debris is removed and surfaces are made good, ready for tiling, carpentry, or the rest of the renovation.",
      },
    ],
    whyUs: [
      {
        title: "Planned around the rules",
        description:
          "We check HDB and MCST requirements before hacking starts, so the job is not stopped halfway.",
      },
      {
        title: "Part of the full renovation",
        description:
          "Hacking is sequenced with the tiling, carpentry, and electrical work that follows.",
      },
      {
        title: "Clean, protected site",
        description:
          "Protection and debris removal are part of the scope, not an afterthought.",
      },
    ],
    faqs: [
      {
        question: "How much does wall hacking cost in Singapore?",
        answer:
          "Wall hacking cost depends on the wall size and material, access, the amount of debris, and the making good needed afterwards. We quote after checking the wall on site.",
      },
      {
        question: "Can I hack any wall in my HDB flat?",
        answer:
          "No. Structural walls cannot be hacked, and HDB rules govern which walls and finishes can be removed. We check your flat's layout and requirements before confirming what is possible.",
      },
      {
        question: "When can hacking be done in an HDB flat?",
        answer:
          "Noisy works such as hacking are restricted to set weekday hours under HDB rules, and are not allowed on Sundays and public holidays. We schedule the work within these hours.",
      },
      {
        question: "Do you hack floor tiles before re-tiling?",
        answer:
          "Yes, when needed. If the existing floor is sound, overlaying new tiles may be possible instead, which avoids hacking. We will advise which option suits your floor.",
      },
      {
        question: "Do you remove the debris?",
        answer:
          "Yes. Debris removal and disposal are included in our hacking scope so the site is clear for the next stage of work.",
      },
      freeQuoteFaq,
    ],
    heroImage: {
      src: "/image/xiii-hacking-wall-opening-hero.jpg",
      alt: "HDB flat after hacking, with a partition wall removed to open up the rooms and the floor stripped bare",
      width: 1024,
      height: 576,
    },
    photos: [
      {
        src: "/image/xiii-hacking-bathroom-floor-trench.jpg",
        alt: "Bathroom floor tiles hacked open along the drainage line, with existing pipes and wall tiles left intact",
        width: 819,
        height: 1024,
      },
      {
        src: "/image/xiii-hacking-bathroom-floor-stripped.jpg",
        alt: "Bathroom floor stripped of old tiles down to the screed, with floor traps protected for the next trade",
        width: 819,
        height: 1024,
      },
      {
        src: "/image/xiii-hacking-bedroom-wall-opening.jpg",
        alt: "HDB bedroom wall hacked to create a wide opening, with floor tiles removed and debris cleared",
        width: 819,
        height: 1024,
      },
      {
        src: "/image/xiii-hacking-floor-tiles-removed.jpg",
        alt: "Room floor after old tiles and skirting were hacked off, cleared and ready for new flooring",
        width: 819,
        height: 1024,
      },
    ],
    pricingHeading: "Hacking cost in Singapore",
    priceFactors: [
      "Wall size and material",
      "Floor or wall tile area to hack",
      "Access and amount of debris",
      "Making good needed afterwards",
    ],
    reviewIds: ["muthukumar-full-home"],
    contentUpdated: "2026-11-18",
    videoIds: [],
    relatedSlugs: ["tiling", "hdb-renovation", "kitchen-renovation"],
  },
  {
    slug: "electrical",
    navLabel: "Electrical Services",
    cardSummary:
      "Electrical works for renovations — lighting points, power sockets, DB box and circuit breaker replacement, and LED lighting for carpentry.",
    eyebrow: "Electrical Services & Installation",
    h1: "Electrical Services & Installation for Singapore Homes",
    metaTitle: "Electrical Services Singapore | Lighting, Sockets & DB Box",
    metaDescription:
      "Electrical services for Singapore homes — lighting points, power sockets, DB box and circuit breaker replacement, and LED lighting as part of your renovation.",
    primaryKeyword: "electrical services singapore",
    keywords: [
      "electrical services singapore",
      "db box replacement",
      "circuit breaker replacement",
      "socket replacement",
      "lighting installation singapore",
    ],
    intro: [
      "Electrical work shapes how a renovated home actually works day to day — where the sockets are, how rooms are lit, and whether the DB box can handle new appliances. XIII Renovation & Design plans electrical works together with your carpentry and layout so points end up exactly where you need them.",
      "Our electrical scope covers new and relocated lighting points, power sockets, cove and LED lighting built into carpentry, and replacement of old DB boxes and circuit breakers as part of a renovation.",
    ],
    scopeHeading: "Electrical works we coordinate",
    scope: [
      {
        title: "Lighting points & fittings",
        description:
          "New and relocated lighting points, downlights, and pendant fittings planned with your layout.",
      },
      {
        title: "Power sockets",
        description:
          "Adding, relocating, or replacing power sockets for kitchens, study areas, and bedrooms.",
      },
      {
        title: "DB box & circuit breakers",
        description:
          "Replacing old distribution boards and circuit breakers when renovating or adding new loads.",
      },
      {
        title: "Cove & LED lighting",
        description:
          "False-ceiling cove lighting and LED strips integrated into feature walls and cabinets.",
      },
    ],
    process: [
      consultStep,
      {
        title: "Electrical layout",
        description:
          "We map lighting and power points against your furniture and carpentry plan before any wiring starts.",
      },
      quoteStep,
      {
        title: "Wiring & installation",
        description:
          "Points, fittings, and DB works are installed in sequence with the rest of the renovation.",
      },
      handoverStep,
    ],
    whyUs: [
      {
        title: "Planned with your carpentry",
        description:
          "Sockets and lighting are positioned around the built-ins, so nothing ends up hidden behind a cabinet.",
      },
      {
        title: "Lighting as part of the design",
        description:
          "Cove lighting and LED details are designed in, as in our feature wall and display cabinet projects.",
      },
      {
        title: "One renovation schedule",
        description:
          "Electrical works are sequenced with hacking, ceilings, and carpentry to avoid rework.",
      },
    ],
    faqs: [
      {
        question: "Can you add or move power sockets during a renovation?",
        answer:
          "Yes. Adding and relocating sockets is one of the most common electrical requests, and it is best done before carpentry and painting so the wiring is concealed.",
      },
      {
        question: "Do I need to replace my DB box?",
        answer:
          "Older DB boxes may need replacing if you are adding significant new loads or the existing board is outdated. We look at your current board and planned appliances before recommending a replacement.",
      },
      {
        question: "Does electrical work in Singapore need a licensed electrician?",
        answer:
          "Many electrical installation works in Singapore must be carried out or certified by an EMA Licensed Electrical Worker. Tell us your scope and we will confirm what applies to your job before quoting.",
      },
      {
        question: "Can you install LED lighting in carpentry?",
        answer:
          "Yes. We plan LED strips and cove lighting together with feature walls, display cabinets, and headboards so wiring is concealed and switches are where you expect them.",
      },
      freeQuoteFaq,
    ],
    heroImage: {
      src: "/image/xiii-electrical-ceiling-wiring-hero.jpg",
      alt: "Electrician running ceiling wiring for new lighting points during an HDB renovation",
      width: 1024,
      height: 576,
    },
    photos: [
      {
        src: "/image/xiii-electrical-ceiling-wiring.jpg",
        alt: "Electrician wiring new ceiling lighting points before the false ceiling is closed",
        width: 819,
        height: 1024,
      },
      {
        src: "/image/xiii-electrical-kitchen-points-carcass.jpg",
        alt: "Kitchen power and lighting points run through new cabinet carcasses during installation",
        width: 819,
        height: 1024,
      },
      {
        src: "/image/xiii-electrical-kitchen-points.jpg",
        alt: "Wiring left ready for under-cabinet lighting and appliance points in a renovated kitchen",
        width: 819,
        height: 1024,
      },
      {
        src: "/image/xiii-electrical-room-lighting-points.jpg",
        alt: "Ceiling lighting points and socket wiring in place during an HDB room renovation",
        width: 819,
        height: 1024,
      },
    ],
    priceFactors: [
      "Number of new or relocated points",
      "How the wiring is run and concealed",
      "DB box or circuit breaker changes",
      "Lighting type: downlights, cove, or LED strips",
    ],
    reviewIds: ["muthukumar-full-home"],
    contentUpdated: "2026-11-18",
    videoIds: [],
    relatedSlugs: ["carpentry", "hdb-renovation", "kitchen-renovation"],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));
}

export function servicePath(slug: ServiceSlug): string {
  return `/${slug}`;
}
