import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Strategic Staffing",
    desc: "Sourcing and placing top-tier talent that aligns perfectly with your company culture and operational goals.",
  },
  {
    title: "PnL Management",
    desc: "Optimizing profit and loss structures to maximize margins, reduce overhead, and drive sustainable growth.",
  },
  {
    title: "Workforce Optimization",
    desc: "Aligning human capital with your financial objectives for peak organizational performance and ROI.",
  },
  {
    title: "Software Development",
    desc: "Delivering website-related solutions, Android and iOS mobile app development, plus project management, product management, and scrum management support for end-to-end execution.",
  },
];

export function ServicesSection({ mobile = false }: { mobile?: boolean }) {
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

        <div className="grid gap-5 sm:gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => (
            <Card
              key={service.title}
              className="bg-[#f5f2ed] border-none rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-500"
            >
              <CardContent className="p-6 sm:p-10">
                <div className="text-3xl sm:text-4xl font-serif font-light opacity-30 mb-4 sm:mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                <p className="opacity-70 leading-relaxed">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
