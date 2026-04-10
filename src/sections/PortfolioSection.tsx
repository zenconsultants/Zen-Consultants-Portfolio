import { CheckCircle2 } from "lucide-react";

const projects = [
  {
    client: "Acme Software",
    role: "Scale-up Recruitment & PnL Turnaround",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    results: [
      "Placed 50+ key technical roles",
      "Improved profit margins by 22%",
      "Reduced time-to-hire by 40%",
    ],
  },
  {
    client: "Global Retail Partners",
    role: "Executive Search & Financial Restructuring",
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070&auto=format&fit=crop",
    results: [
      "Sourced complete C-suite leadership",
      "Optimized operational PnL",
      "150% ROI in year one",
    ],
  },
];

export function PortfolioSection({ mobile = false }: { mobile?: boolean }) {
  return (
    <section
      id="portfolio"
      className={mobile ? "px-4 pb-8" : "py-16 sm:py-24 px-4 sm:px-6"}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light mb-12 sm:mb-16 text-center">
          Selected Works
        </h2>

        <div className="space-y-14 sm:space-y-24">
          {projects.map((project, i) => (
            <div
              key={project.client}
              className={`flex flex-col ${
                i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
              } gap-8 sm:gap-12 items-center`}
            >
              <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.client}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold opacity-70">
                  {project.role}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl">{project.client}</h3>
                <ul className="space-y-3 pt-2 sm:pt-4">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-start gap-3 opacity-80">
                      <CheckCircle2 className="w-5 h-5 opacity-50 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base leading-relaxed">
                        {result}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
