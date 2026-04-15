import { Dispatch, FormEvent, SetStateAction } from "react";
import { ServiceHighlightsSection } from "@/src/components/ServiceHighlightsSection";
import { ServiceModulesSection } from "@/src/components/ServiceModulesSection";
import { ServicePageHero } from "@/src/components/ServicePageHero";
import { ServicePageContent } from "@/src/data/services";
import { ContactSection, SubmitStatus } from "@/src/sections/ContactSection";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ServicePageProps = {
  service: ServicePageContent;
  onBackHome: () => void;
  onContact: () => void;
  formData: ContactFormData;
  setFormData: Dispatch<SetStateAction<ContactFormData>>;
  handleSubmit: (e: FormEvent) => Promise<void>;
  submitStatus: SubmitStatus;
  errorMessage: string;
  isSubmitting: boolean;
};

export function ServicePage({
  service,
  onBackHome,
  onContact,
  formData,
  setFormData,
  handleSubmit,
  submitStatus,
  errorMessage,
  isSubmitting,
}: ServicePageProps) {
  return (
    <>
      <ServicePageHero
        service={service}
        onBackHome={onBackHome}
        onContact={onContact}
      />
      <ServiceModulesSection service={service} />
      <ServiceHighlightsSection service={service} />
      <ContactSection
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        submitStatus={submitStatus}
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
