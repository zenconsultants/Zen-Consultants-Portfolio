import { Card, CardContent } from "@/components/ui/card";
import { ServiceCard } from "@/src/components/ServiceCard";
import { servicePages } from "@/src/data/services";

type ServicesSectionProps = {
  mobile?: boolean;
  onOpenService: (slug: string) => void;
};

export function ServicesSection({
  mobile = false,
  onOpenService,
}: ServicesSectionProps) {
  const softwareDevelopment = servicePages[3];

  return (
    <section
      id="services"
      className={mobile ? "px-4 pb-8 bg-white" : "py-16 sm:py-24 px-4 sm:px-6 bg-white"}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 sm:gap-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light mb-4">
              Our Expertise
            </h2>
            <p className="opacity-70 max-w-md text-sm sm:text-base">
              Tailored recruitment, operational, and software delivery solutions designed
              to strengthen teams, streamline execution, and maximize business impact.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:gap-8 md:grid-cols-3">
          {servicePages.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={service.slug}
              index={index}
              service={service}
              onOpen={onOpenService}
            />
          ))}
        </div>

        <Card className="mt-8 sm:mt-10 border-none rounded-[2rem] bg-[#1a1a1a] text-[#f5f2ed] overflow-hidden">
          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-[0.25em] opacity-60 mb-3">
                  Software Development
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light mb-4">
                  Digital product and delivery support for modern teams
                </h3>
                <p className="opacity-75 leading-relaxed">
                  We support end-to-end software initiatives across website delivery,
                  mobile app development, and agile execution for growing businesses.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
                {softwareDevelopment.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm sm:text-base"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenService(softwareDevelopment.slug)}
              className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium hover:opacity-75 transition-opacity"
            >
              View Software Development Page
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
