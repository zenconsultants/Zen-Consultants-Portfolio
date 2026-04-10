import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type AboutSectionProps = {
  mobile?: boolean;
  onViewWork?: () => void;
};

export function AboutSection({
  mobile = false,
  onViewWork,
}: AboutSectionProps) {
  return (
    <section
      id="about"
      className={
        mobile
          ? "px-4 pb-8"
          : "pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 min-h-[90vh] flex flex-col justify-center"
      }
    >
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-4 sm:mb-6 font-semibold opacity-70">
            Recruitment & Financial Operations
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl leading-[0.95] md:leading-[0.9] font-light mb-6 sm:mb-8 max-w-[10ch]">
            Building teams. <br />
            <span className="italic">Driving profit.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-80 max-w-md mb-8 sm:mb-10 font-light leading-relaxed">
            We empower businesses with elite manpower solutions and comprehensive
            PnL management to scale efficiently.
          </p>
          {!mobile && onViewWork && (
            <Button
              className="w-full sm:w-auto rounded-full bg-[#1a1a1a] text-[#f5f2ed] hover:bg-[#1a1a1a]/80 px-6 sm:px-8 py-5 sm:py-6 text-xs sm:text-sm uppercase tracking-widest"
              onClick={onViewWork}
            >
              View Our Work <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`relative w-full overflow-hidden ${
            mobile
              ? "h-[320px] rounded-[2rem]"
              : "h-[360px] sm:h-[460px] md:h-[600px] rounded-[2rem] sm:rounded-t-full"
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
            alt="Corporate team meeting"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        </motion.div>
      </div>
    </section>
  );
}
