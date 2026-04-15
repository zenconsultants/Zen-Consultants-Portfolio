export type ServiceModule = {
  title: string;
  description: string;
};

export type ServicePageContent = {
  slug: string;
  title: string;
  shortDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  outcomes: string[];
  modules: ServiceModule[];
  highlights: string[];
};

export const servicePages: ServicePageContent[] = [
  {
    slug: "strategic-staffing",
    title: "Strategic Staffing",
    shortDescription:
      "Sourcing and placing top-tier talent that aligns perfectly with your company culture and operational goals.",
    heroLabel: "Strategic Staffing",
    heroTitle: "Build teams with precision, speed, and long-term fit.",
    heroDescription:
      "We help organizations identify, attract, and place talent that matches both delivery needs and leadership expectations, so hiring becomes a growth lever instead of a bottleneck.",
    outcomes: [
      "Faster hiring cycles",
      "Better role-to-team alignment",
      "Stronger retention and delivery readiness",
    ],
    modules: [
      {
        title: "Talent Mapping",
        description:
          "Define role priorities, target profiles, and market availability before the search begins.",
      },
      {
        title: "Candidate Evaluation",
        description:
          "Screen for capability, communication, and business fit to reduce mismatched hiring decisions.",
      },
      {
        title: "Hiring Coordination",
        description:
          "Support interview flow, stakeholder alignment, offer planning, and onboarding readiness.",
      },
    ],
    highlights: [
      "Leadership and specialist hiring support",
      "Culture-fit and capability screening",
      "Hiring plans aligned to business growth",
    ],
  },
  {
    slug: "pnl-management",
    title: "PnL Management",
    shortDescription:
      "Optimizing profit and loss structures to maximize margins, reduce overhead, and drive sustainable growth.",
    heroLabel: "PnL Management",
    heroTitle: "Improve margin visibility and act on the numbers that matter.",
    heroDescription:
      "We help businesses understand cost drivers, revenue performance, and unit-level economics so leadership teams can make sharper commercial and operational decisions.",
    outcomes: [
      "Clearer profitability tracking",
      "Healthier cost structures",
      "More confident forecasting",
    ],
    modules: [
      {
        title: "Financial Diagnostics",
        description:
          "Assess revenue streams, cost centers, and margin trends to uncover where performance is leaking.",
      },
      {
        title: "Cost Optimization",
        description:
          "Identify practical opportunities to reduce waste, control spend, and improve operating discipline.",
      },
      {
        title: "Performance Reporting",
        description:
          "Build simple reporting views that help teams monitor profitability and course-correct early.",
      },
    ],
    highlights: [
      "Margin improvement initiatives",
      "Business-unit profitability visibility",
      "Decision support for growth and cost tradeoffs",
    ],
  },
  {
    slug: "workforce-optimization",
    title: "Workforce Optimization",
    shortDescription:
      "Aligning human capital with your financial objectives for peak organizational performance and ROI.",
    heroLabel: "Workforce Optimization",
    heroTitle: "Align people, capacity, and execution around business goals.",
    heroDescription:
      "We work with teams to improve structure, allocation, and operating rhythm so your workforce can support growth without adding unnecessary complexity.",
    outcomes: [
      "Improved capacity planning",
      "Higher team productivity",
      "Better alignment between teams and outcomes",
    ],
    modules: [
      {
        title: "Org Design Review",
        description:
          "Evaluate current structures, responsibilities, and decision paths to reduce duplication and friction.",
      },
      {
        title: "Capacity Planning",
        description:
          "Match people allocation with demand forecasts, priorities, and delivery timelines.",
      },
      {
        title: "Operating Rhythm",
        description:
          "Introduce practical cadences and accountability structures that support execution across teams.",
      },
    ],
    highlights: [
      "Workforce planning for scale",
      "Role clarity and accountability design",
      "Execution-focused team alignment",
    ],
  },
  {
    slug: "software-development",
    title: "Software Development",
    shortDescription:
      "Delivering website-related solutions, Android and iOS mobile app development, plus project, product, and scrum management support.",
    heroLabel: "Software Development",
    heroTitle: "Design, build, and ship digital products with structured delivery support.",
    heroDescription:
      "We support software initiatives from web experiences to mobile products, while also strengthening planning, product direction, and agile execution across the delivery lifecycle.",
    outcomes: [
      "Modern customer-facing products",
      "Clearer product execution",
      "Delivery processes teams can sustain",
    ],
    modules: [
      {
        title: "Website Delivery",
        description:
          "Build and improve marketing sites, business websites, and web application experiences tailored to your goals.",
      },
      {
        title: "Mobile App Development",
        description:
          "Plan and deliver Android and iOS applications with a focus on usability, reliability, and release readiness.",
      },
      {
        title: "Delivery Management",
        description:
          "Support project management, product management, and scrum management to keep teams moving with clarity.",
      },
    ],
    highlights: [
      "Website-related tasks and web experiences",
      "Android and iOS app development support",
      "Project, product, and scrum management",
    ],
  },
];

export const servicesBySlug = Object.fromEntries(
  servicePages.map((service) => [service.slug, service]),
) as Record<string, ServicePageContent>;
