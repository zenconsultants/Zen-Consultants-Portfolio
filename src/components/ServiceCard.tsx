import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ServicePageContent } from "@/src/data/services";

type ServiceCardProps = {
  index: number;
  service: ServicePageContent;
  onOpen: (slug: string) => void;
};

export function ServiceCard({ index, service, onOpen }: ServiceCardProps) {
  return (
    <Card className="bg-[#f5f2ed] border-none rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-500">
      <CardContent className="p-6 sm:p-10">
        <div className="text-3xl sm:text-4xl font-serif font-light opacity-30 mb-4 sm:mb-6">
          0{index + 1}
        </div>
        <h3 className="text-xl font-medium mb-4">{service.title}</h3>
        <p className="opacity-70 leading-relaxed mb-6">{service.shortDescription}</p>
        <button
          type="button"
          onClick={() => onOpen(service.slug)}
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium hover:opacity-60 transition-opacity"
        >
          View Page
          <ArrowRight className="w-4 h-4" />
        </button>
      </CardContent>
    </Card>
  );
}
