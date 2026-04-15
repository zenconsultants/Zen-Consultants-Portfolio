import { Card, CardContent } from "@/components/ui/card";
import { ServicePageContent } from "@/src/data/services";

type ServiceModulesSectionProps = {
  service: ServicePageContent;
};

export function ServiceModulesSection({ service }: ServiceModulesSectionProps) {
  return (
    <section className="px-4 sm:px-6 py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 sm:mb-14">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/45 mb-3">
              Separate Modules
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light">
              How this service is structured
            </h2>
          </div>
          <p className="max-w-xl text-sm sm:text-base opacity-70 leading-relaxed">
            Each page is organized into clear delivery modules so visitors can quickly
            understand the scope, structure, and value of the engagement.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-8 md:grid-cols-3">
          {service.modules.map((module, index) => (
            <Card
              key={module.title}
              className="border-none rounded-3xl bg-[#f5f2ed] overflow-hidden"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="text-3xl font-serif font-light opacity-30 mb-4">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-medium mb-3">{module.title}</h3>
                <p className="opacity-70 leading-relaxed">{module.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
