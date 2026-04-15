import { Button } from "@/components/ui/button";
import { ServicePageContent } from "@/src/data/services";

type ServicePageHeroProps = {
  service: ServicePageContent;
  onBackHome: () => void;
  onContact: () => void;
};

export function ServicePageHero({
  service,
  onBackHome,
  onContact,
}: ServicePageHeroProps) {
  return (
    <section className="px-4 sm:px-6 pt-28 sm:pt-36 pb-10 sm:pb-16 bg-[#f5f2ed]">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div>
          <button
            type="button"
            onClick={onBackHome}
            className="text-xs uppercase tracking-[0.25em] opacity-55 hover:opacity-100 transition-opacity"
          >
            Back to Home
          </button>
          <div className="mt-6 text-[11px] uppercase tracking-[0.25em] text-[#1a1a1a]/55">
            {service.heroLabel}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-[0.95] mt-3">
            {service.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg opacity-75 leading-relaxed">
            {service.heroDescription}
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-6 sm:p-8 border border-[#1a1a1a]/10 shadow-sm">
          <div className="text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/45 mb-4">
            Outcomes
          </div>
          <div className="space-y-3">
            {service.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="rounded-2xl bg-[#f5f2ed] px-4 py-4 text-sm sm:text-base"
              >
                {outcome}
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="mt-6 rounded-full border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f2ed] uppercase tracking-widest text-xs px-6"
            onClick={onContact}
          >
            Talk To Us
          </Button>
        </div>
      </div>
    </section>
  );
}
