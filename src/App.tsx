import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";
import {
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Send,
  Users,
  X,
} from "lucide-react";

type EmployerFormData = {
  name: string;
  company: string;
  phone: string;
  service: string;
  message: string;
};

type CandidateFormData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  industry: string;
  experience: string;
  jobType: string;
  noticePeriod: string;
  summary: string;
  consent: boolean;
};

const employerInitialState: EmployerFormData = {
  name: "",
  company: "",
  phone: "",
  service: "",
  message: "",
};

const candidateInitialState: CandidateFormData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  industry: "",
  experience: "",
  jobType: "",
  noticePeriod: "",
  summary: "",
  consent: false,
};

const serviceOptions = [
  "Recruitment Services",
  "Campus Hiring",
  "Leadership Hiring",
  "Mid-Level Hiring",
  "Bulk Hiring",
  "Build Team From Scratch",
  "Contract Hiring",
  "FTE Hiring",
  "Intern Hiring",
  "HR Advisory Services",
  "Payroll Management",
  "Resume Writing",
];

const hiringSolutions = [
  ["Campus Hiring", "Fresh graduates, trainee roles and entry-level talent pipelines."],
  ["Leadership Hiring", "Senior and strategic roles where cultural fit and judgment matter."],
  ["Mid-Level Hiring", "Experienced professionals for functional and operational roles."],
  ["Bulk Hiring", "High-volume hiring with disciplined screening and coordination."],
  ["Build Team From Scratch", "Hiring support for new functions, branches, projects or expansion teams."],
  ["Contract Hiring", "Short-term and project-based workforce requirements."],
  ["FTE Hiring", "Full-time employee hiring for stable, long-term roles."],
  ["Intern Hiring", "Internship hiring support for growing teams and campus-linked requirements."],
];

const industries = ["IT", "Pharma", "ITeS", "Manufacturing", "Retail", "Hospitality"];

const navItems = [
  ["Services", "#services"],
  ["Hiring Types", "#hiring"],
  ["Industries", "#industries"],
  ["Process", "#process"],
];

function App() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
    setPath(window.location.pathname);

    if (href.includes("#")) {
      const hash = href.split("#")[1];
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isApplyPage = path === "/apply.html" || path === "/apply";

  return isApplyPage ? <ApplyPage onNavigate={navigate} /> : <HomePage onNavigate={navigate} />;
}

function Brand({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <button className="zc-brand" type="button" onClick={() => onNavigate("/")}>
      <span className="zc-brand-mark">Z</span>
      <span>Zen Consultants</span>
    </button>
  );
}

function HomePage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState<EmployerFormData>(employerInitialState);
  const [formStatus, setFormStatus] = useState("");

  const handleNav = (href: string) => {
    setIsMenuOpen(false);
    onNavigate(href);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const phoneClean = formData.phone.replace(/[^0-9]/g, "");

    if (!formData.name || !formData.company || !formData.phone || !formData.service) {
      setFormStatus("Please complete name, company, phone and service required.");
      return;
    }

    if (phoneClean.length < 10) {
      setFormStatus("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await fetch("https://sheetdb.io/api/v1/4cy25wq4abc58", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              name: formData.name,
              company: formData.company,
              phone: formData.phone,
              service: formData.service,
              message: formData.message,
              source: "Employer enquiry",
              date: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setFormStatus("Thank you. Your enquiry has been submitted.");
      setFormData(employerInitialState);
    } catch {
      setFormStatus("We could not submit the enquiry. Please email or WhatsApp us directly.");
    }
  };

  return (
    <div className="zc-site">
      <div className="zc-announcement">
        <div className="zc-container">
          <span>Recruitment | HR Advisory | Payroll Management | Workforce Solutions</span>
          <span>We bring people and help build culture.</span>
        </div>
      </div>

      <nav className="zc-nav" aria-label="Main navigation">
        <div className="zc-container">
          <Brand onNavigate={onNavigate} />
          <button
            className="zc-menu-toggle"
            type="button"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className={`zc-menu ${isMenuOpen ? "open" : ""}`}>
            {navItems.map(([label, href]) => (
              <button key={label} type="button" onClick={() => handleNav(href)}>
                {label}
              </button>
            ))}
            <button type="button" onClick={() => handleNav("/apply.html")}>
              Candidate Apply
            </button>
            <button className="zc-btn zc-btn-primary" type="button" onClick={() => handleNav("#contact")}>
              Hire Talent
            </button>
          </div>
        </div>
      </nav>

      <header className="zc-hero" id="home">
        <div className="zc-container zc-hero-grid">
          <div className="zc-hero-copy">
            <span className="zc-pill">Recruitment partner for growing teams</span>
            <h1>Focus on your core business. We help you build everything around it.</h1>
            <p className="zc-lead">
              Zen Consultants helps companies hire the right people, build teams from scratch,
              strengthen HR operations and manage payroll with a practical, confidential and
              industry-aware approach.
            </p>
            <div className="zc-actions">
              <button className="zc-btn zc-btn-primary" type="button" onClick={() => handleNav("#contact")}>
                Request hiring support
              </button>
              <button className="zc-btn zc-btn-secondary" type="button" onClick={() => handleNav("#services")}>
                View services
              </button>
            </div>
            <div className="zc-metrics" aria-label="Key strengths">
              <Metric value="6" label="Industries served" />
              <Metric value="9" label="Recruitment service lines" />
              <Metric value="100%" label="Focused service approach" />
            </div>
          </div>

          <div className="zc-talent-card" aria-label="Talent search preview">
            <div className="zc-search-panel">
              <small>Current mandate</small>
              <b>Build a high-performing team</b>
            </div>
            <RoleCard initials="CH" title="Campus Hiring" text="Fresh talent pipeline for growth roles" badge="Active" />
            <RoleCard initials="LH" title="Leadership Hiring" text="Senior talent for strategic roles" badge="Priority" />
            <RoleCard initials="BH" title="Bulk Hiring" text="Volume hiring with screening discipline" badge="Fast" />
            <RoleCard initials="PY" title="Payroll & HR Advisory" text="People operations after hiring" badge="Support" />
            <div className="zc-visual-note">
              A focused recruitment partner for companies that need reliable hiring, HR advisory
              and payroll support.
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="services" className="zc-section">
          <div className="zc-container">
            <SectionHead
              eyebrow="Core services"
              title="Recruitment, HR and payroll services that support the full employee lifecycle."
              text="Employer services are separated clearly so companies can quickly identify the support they need."
            />
            <div className="zc-grid-3">
              <ServiceBlock
                featured
                icon={<Search />}
                title="Recruitment Services"
                text="End-to-end hiring support from role understanding to candidate sourcing, screening, interview coordination and joining follow-up."
                items={["Campus hiring", "Leadership hiring", "Mid-level hiring", "Bulk hiring"]}
              />
              <ServiceBlock
                icon={<Users />}
                title="HR Advisory Services"
                text="Practical HR guidance for companies that want better people processes without creating unnecessary complexity."
                items={["HR process advisory", "Employee lifecycle support", "Documentation guidance", "Culture and team-building support"]}
              />
              <ServiceBlock
                icon={<BadgeIndianRupee />}
                title="Payroll Management"
                text="Structured payroll support to keep salary inputs, attendance, leave and monthly reporting organized."
                items={["Payroll input coordination", "Attendance and leave linkage", "Payslip support", "Monthly payroll reporting"]}
              />
            </div>
          </div>
        </section>

        <section id="hiring" className="zc-section">
          <div className="zc-container">
            <SectionHead
              eyebrow="Hiring solutions"
              title="Clear hiring categories for employers and candidates."
              text="This makes the website more searchable and easier to understand for companies looking for a specific hiring model."
            />
            <div className="zc-grid-4">
              {hiringSolutions.map(([title, text]) => (
                <div className="zc-mini-card" key={title}>
                  <b>{title}</b>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="zc-section">
          <div className="zc-container">
            <div className="zc-band zc-split">
              <div>
                <span className="zc-pill zc-pill-on-dark">Industry expertise</span>
                <h2>Industry-aware recruiters who help find the best talent.</h2>
                <p>
                  We have a team of industry experts who understand role expectations,
                  candidate fit and hiring urgency across major business sectors.
                </p>
              </div>
              <div className="zc-industry-cloud" aria-label="Industries served">
                {industries.map((industry) => (
                  <span className="zc-chip" key={industry}>
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="zc-section">
          <div className="zc-container">
            <SectionHead
              eyebrow="Our capabilities"
              title="Practical support across hiring, HR and payroll."
              text="Our experience is presented through the types of workforce challenges we help businesses solve."
            />
            <div className="zc-grid-3">
              <Capability icon={<Building2 />} title="New team setup" text="Help businesses think through role structure, hiring sequence and candidate pipeline when building teams from scratch." />
              <Capability icon={<ClipboardCheck />} title="Recruitment execution" text="Support sourcing, screening, interviews and joining follow-up across campus, mid-level, leadership and bulk hiring needs." />
              <Capability icon={<CheckCircle2 />} title="HR and payroll support" text="Organize people operations through HR advisory, payroll input discipline and employee lifecycle coordination." />
            </div>
          </div>
        </section>

        <section id="process" className="zc-section">
          <div className="zc-container">
            <SectionHead
              eyebrow="Our process"
              title="A mature hiring process builds confidence before the first call."
              text="Employers need to know that the consultancy has a repeatable method, not just a resume database."
            />
            <div className="zc-grid-2 zc-process">
              <Step title="Understand business and culture" text="We clarify the role, team structure, salary range, location, reporting line, must-have skills and cultural expectations." />
              <Step title="Map industry and talent pool" text="We identify relevant candidate sources based on industry, hiring type and urgency." />
              <Step title="Screen for real fit" text="We validate experience, communication, availability, compensation fit and seriousness before sharing profiles." />
              <Step title="Coordinate closure" text="We support interviews, feedback, offer coordination, documentation and joining follow-up." />
            </div>
          </div>
        </section>

        <section className="zc-section">
          <div className="zc-container">
            <div className="zc-cta zc-split">
              <div>
                <span className="zc-pill zc-pill-on-dark">For employers</span>
                <h2>Need people who can help your business grow?</h2>
                <p>
                  Share your role, industry, salary range and timeline. We will help you move
                  from requirement to shortlist with clarity and speed.
                </p>
              </div>
              <button className="zc-btn zc-btn-orange" type="button" onClick={() => handleNav("#contact")}>
                Start hiring conversation
              </button>
            </div>
          </div>
        </section>

        <section id="candidate-cta" className="zc-section">
          <div className="zc-container">
            <div className="zc-cta zc-split">
              <div>
                <span className="zc-pill zc-pill-on-dark">For candidates</span>
                <h2>Looking for your next opportunity?</h2>
                <p>
                  Submit your resume for current and upcoming roles across IT, Pharma, ITeS,
                  Manufacturing, Retail and Hospitality.
                </p>
              </div>
              <button className="zc-btn zc-btn-orange" type="button" onClick={() => handleNav("/apply.html")}>
                Submit Resume
              </button>
            </div>
          </div>
        </section>

        <ContactSection
          formData={formData}
          formStatus={formStatus}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}

function ApplyPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [formData, setFormData] = useState<CandidateFormData>(candidateInitialState);
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const updateField = (field: keyof CandidateFormData, value: string | boolean) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setResume(event.target.files?.[0] ?? null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const requiredFields: (keyof CandidateFormData)[] = [
      "fullName",
      "email",
      "phone",
      "location",
      "industry",
      "experience",
      "jobType",
      "noticePeriod",
    ];

    if (requiredFields.some((field) => !String(formData[field]).trim())) {
      setStatus("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      setStatus("Please enter a valid phone number.");
      return;
    }

    if (!resume) {
      setStatus("Please upload your resume.");
      return;
    }

    if (!/\.(pdf|doc|docx)$/i.test(resume.name)) {
      setStatus("Please upload resume in PDF, DOC or DOCX format only.");
      return;
    }

    if (resume.size > 5 * 1024 * 1024) {
      setStatus("Resume file size should be below 5 MB.");
      return;
    }

    if (!formData.consent) {
      setStatus("Please accept the consent before submitting.");
      return;
    }

    setStatus("Thank you. Your application is ready to be connected to your backend, email or storage workflow.");
    setFormData(candidateInitialState);
    setResume(null);
    (event.currentTarget as HTMLFormElement).reset();
  };

  return (
    <div className="zc-site">
      <nav className="zc-nav" aria-label="Main navigation">
        <div className="zc-container">
          <Brand onNavigate={onNavigate} />
          <div className="zc-apply-nav">
            <button type="button" onClick={() => onNavigate("/")}>
              Home
            </button>
            <button type="button" onClick={() => onNavigate("/#services")}>
              Services
            </button>
            <button className="zc-btn zc-btn-primary" type="button" onClick={() => onNavigate("/#contact")}>
              Hire Talent
            </button>
          </div>
        </div>
      </nav>

      <header className="zc-hero zc-apply-hero">
        <div className="zc-container">
          <span className="zc-pill">Candidate application</span>
          <h1>Submit your resume for current and upcoming opportunities.</h1>
          <p className="zc-lead">
            Apply once and share your details with Zen Consultants. Our team can review your
            profile for suitable openings across industries and hiring types.
          </p>
        </div>
      </header>

      <main>
        <section className="zc-section">
          <div className="zc-container zc-apply-layout">
            <aside className="zc-card">
              <h2>Who can apply?</h2>
              <p>Candidates from entry-level to leadership roles can submit their profile for review.</p>
              <div className="zc-info-list">
                <InfoItem icon="01" title="Industries" text="IT, Pharma, ITeS, Manufacturing, Retail, Hospitality and more." />
                <InfoItem icon="02" title="Hiring types" text="Full-time, contract, internship, mid-level and leadership opportunities." />
                <InfoItem icon="03" title="Resume format" text="Upload PDF, DOC or DOCX. Maximum file size: 5 MB." />
              </div>
              <div className="zc-note">
                Important: Submitting your resume does not guarantee placement or interview
                selection. Shortlisting depends on employer requirements and role fit.
              </div>
            </aside>

            <form className="zc-form zc-candidate-form" onSubmit={handleSubmit} noValidate>
              <div className="zc-form-grid">
                <CandidateField label="Full Name" id="fullName" value={formData.fullName} onChange={(value) => updateField("fullName", value)} placeholder="Your full name" />
                <CandidateField label="Email" id="email" type="email" value={formData.email} onChange={(value) => updateField("email", value)} placeholder="yourname@email.com" />
                <CandidateField label="Phone / WhatsApp" id="phone" value={formData.phone} onChange={(value) => updateField("phone", value)} placeholder="10-digit mobile number" />
                <CandidateField label="Current Location" id="location" value={formData.location} onChange={(value) => updateField("location", value)} placeholder="Example: Bhopal" />
                <SelectField label="Preferred Industry" id="industry" value={formData.industry} onChange={(value) => updateField("industry", value)} options={["IT", "Pharma", "ITeS", "Manufacturing", "Retail", "Hospitality", "Other"]} />
                <SelectField label="Experience Level" id="experience" value={formData.experience} onChange={(value) => updateField("experience", value)} options={["Fresher", "Internship", "0-2 Years", "2-5 Years", "5-10 Years", "10+ Years"]} />
                <SelectField label="Preferred Job Type" id="jobType" value={formData.jobType} onChange={(value) => updateField("jobType", value)} options={["Full-time", "Contract", "Internship", "Leadership Role", "Open to Any"]} />
                <SelectField label="Notice Period" id="noticePeriod" value={formData.noticePeriod} onChange={(value) => updateField("noticePeriod", value)} options={["Immediate", "15 Days", "30 Days", "45 Days", "60 Days", "90 Days"]} />
                <div className="zc-field zc-full">
                  <label htmlFor="resume">Upload Resume</label>
                  <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} required />
                  <span>Accepted formats: PDF, DOC, DOCX. Maximum file size: 5 MB.</span>
                </div>
                <div className="zc-field zc-full">
                  <label htmlFor="summary">Short Profile Summary</label>
                  <textarea id="summary" rows={4} placeholder="Example: 3 years experience in HR operations, looking for payroll or HR executive role in Bhopal" value={formData.summary} onChange={(event) => updateField("summary", event.target.value)} />
                </div>
                <div className="zc-consent zc-full">
                  <input id="consent" type="checkbox" checked={formData.consent} onChange={(event) => updateField("consent", event.target.checked)} />
                  <label htmlFor="consent">
                    I confirm that the information shared is accurate and I allow Zen Consultants to
                    contact me for relevant job opportunities.
                  </label>
                </div>
              </div>
              <button className="zc-btn zc-btn-primary" type="submit">
                Submit Application
              </button>
              <p className="zc-form-status" role="status">{status}</p>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}

function ContactSection({
  formData,
  formStatus,
  setFormData,
  handleSubmit,
}: {
  formData: EmployerFormData;
  formStatus: string;
  setFormData: (data: EmployerFormData) => void;
  handleSubmit: (event: FormEvent) => void;
}) {
  return (
    <section id="contact" className="zc-section">
      <div className="zc-container zc-contact-grid">
        <div>
          <span className="zc-pill">Contact Zen Consultants</span>
          <h2>Talk to us for recruitment, HR advisory or payroll support.</h2>
          <p className="zc-lead">
            Share what role you are hiring for, the industry, required timeline and any
            payroll or HR support you need.
          </p>
          <div className="zc-card zc-contact-card">
            <ContactLine icon={<Mail />} label="Email" value="zenconsultants2025@gmail.com" href="mailto:zenconsultants2025@gmail.com" />
            <ContactLine icon={<Phone />} label="Phone" value="+91 84315 02356" href="tel:+918431502356" />
            <ContactLine icon={<MessageCircle />} label="WhatsApp" value="Chat on WhatsApp" href="https://wa.me/918431502356" />
            <ContactLine icon={<MapPin />} label="Office" value="Unit 101, Oxford Towers, No. 139/88 Old Airport Road, Bangalore 560008" />
          </div>
        </div>

        <form className="zc-form" onSubmit={handleSubmit} noValidate>
          <FormField label="Name" id="name" value={formData.name} onChange={(value) => setFormData({ ...formData, name: value })} placeholder="Your name" />
          <FormField label="Company" id="company" value={formData.company} onChange={(value) => setFormData({ ...formData, company: value })} placeholder="Company name" />
          <FormField label="Phone / WhatsApp" id="phone" value={formData.phone} onChange={(value) => setFormData({ ...formData, phone: value })} placeholder="10-digit mobile number" />
          <div className="zc-field">
            <label htmlFor="service">Service required</label>
            <select id="service" value={formData.service} onChange={(event) => setFormData({ ...formData, service: event.target.value })} required>
              <option value="">Select one</option>
              {serviceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="zc-field">
            <label htmlFor="message">Requirement</label>
            <textarea id="message" rows={4} placeholder="Example: Need 10 sales executives in Bhopal within 30 days" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} />
          </div>
          <button className="zc-btn zc-btn-primary" type="submit">
            <Send size={18} />
            Submit enquiry
          </button>
          <p className="zc-form-status" role="status">{formStatus}</p>
        </form>
      </div>
    </section>
  );
}

function SiteFooter({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <footer className="zc-footer">
      <div className="zc-container zc-footer-grid">
        <div>
          <Brand onNavigate={onNavigate} />
          <p>We bring people and help build culture through recruitment, HR advisory and payroll management services.</p>
        </div>
        <FooterLinks title="Services" links={["Recruitment", "HR Advisory", "Payroll Management", "Resume Writing"]} target="#services" onNavigate={onNavigate} />
        <FooterLinks title="Hiring" links={["Campus Hiring", "Leadership Hiring", "Bulk Hiring", "Contract Hiring"]} target="#hiring" onNavigate={onNavigate} />
        <FooterLinks title="Industries" links={["IT", "Pharma", "Manufacturing", "Retail"]} target="#industries" onNavigate={onNavigate} />
      </div>
      <div className="zc-container zc-copyright">
        © {new Date().getFullYear()} Zen Consultants. All rights reserved.
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
  target,
  onNavigate,
}: {
  title: string;
  links: string[];
  target: string;
  onNavigate: (href: string) => void;
}) {
  return (
    <div className="zc-footer-links">
      <b>{title}</b>
      {links.map((link) => (
        <button type="button" key={link} onClick={() => onNavigate(`/${target}`)}>
          {link}
        </button>
      ))}
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="zc-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function RoleCard({ initials, title, text, badge }: { initials: string; title: string; text: string; badge: string }) {
  return (
    <div className="zc-role-card">
      <div className="zc-avatar">{initials}</div>
      <div>
        <b>{title}</b>
        <span>{text}</span>
      </div>
      <em>{badge}</em>
    </div>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="zc-section-head">
      <span className="zc-pill">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function ServiceBlock({
  featured = false,
  icon,
  title,
  text,
  items,
}: {
  featured?: boolean;
  icon: ReactNode;
  title: string;
  text: string;
  items: string[];
}) {
  return (
    <article className={`zc-card zc-service-card ${featured ? "featured" : ""}`}>
      <div className="zc-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function Capability({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="zc-card">
      <div className="zc-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Step({ title, text }: { title: string; text: string }) {
  return (
    <article className="zc-card zc-step">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function InfoItem({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="zc-info-item">
      <div>{icon}</div>
      <p>
        <b>{title}</b>
        <span>{text}</span>
      </p>
    </div>
  );
}

function ContactLine({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const content = href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      {value}
    </a>
  ) : (
    <span>{value}</span>
  );

  return (
    <div className="zc-contact-line">
      <div>{icon}</div>
      <p>
        <b>{label}</b>
        {content}
      </p>
    </div>
  );
}

function FormField({ label, id, value, onChange, placeholder }: { label: string; id: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <div className="zc-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required />
    </div>
  );
}

function CandidateField({ label, id, value, onChange, placeholder, type = "text" }: { label: string; id: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) {
  return (
    <div className="zc-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required />
    </div>
  );
}

function SelectField({ label, id, value, onChange, options }: { label: string; id: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div className="zc-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} required>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default App;
