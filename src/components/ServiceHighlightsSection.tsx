import { ServicePageContent } from "@/src/data/services";

type ServiceHighlightsSectionProps = {
  service: ServicePageContent;
};

export function ServiceHighlightsSection({
  service,
}: ServiceHighlightsSectionProps) {
  return (
    <section className="px-4 sm:px-6 py-14 sm:py-20 bg-[#1a1a1a] text-[#f5f2ed]">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] opacity-55 mb-3">
            Focus Areas
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
            What teams can expect from {service.title.toLowerCase()}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {service.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-5 text-sm sm:text-base leading-relaxed"
            >
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
