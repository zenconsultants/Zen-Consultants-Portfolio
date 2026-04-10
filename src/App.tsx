import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://sheetdb.io/api/v1/4cy25wq4abc58', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: [
            {
              name: formData.name,
              email: formData.email,
              message: formData.message,
              date: new Date().toISOString()
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Network response was not ok');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.message || 'There was an error sending your message. Please try again later.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-[#f5f2ed]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f2ed]/80 backdrop-blur-md border-b border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-2xl tracking-wide font-medium">Zen Consultants</div>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#services" className="hover:opacity-60 transition-opacity">Services</a>
            <a href="#portfolio" className="hover:opacity-60 transition-opacity">Portfolio</a>
            <Button variant="outline" className="rounded-full border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f2ed] uppercase tracking-widest text-xs px-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-40 pb-20 px-6 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs uppercase tracking-[0.2em] mb-6 font-semibold opacity-70">Recruitment & Financial Operations</div>
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] font-light mb-8">
              Building teams. <br />
              <span className="italic">Driving profit.</span>
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-md mb-10 font-light leading-relaxed">
              We empower businesses with elite manpower solutions and comprehensive PnL management to scale efficiently.
            </p>
            <Button className="rounded-full bg-[#1a1a1a] text-[#f5f2ed] hover:bg-[#1a1a1a]/80 px-8 py-6 text-sm uppercase tracking-widest" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              View Our Work <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] w-full rounded-t-full overflow-hidden"
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

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Our Expertise</h2>
              <p className="opacity-70 max-w-md">Tailored recruitment and financial solutions designed to elevate your workforce and maximize profitability.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Strategic Staffing", desc: "Sourcing and placing top-tier talent that aligns perfectly with your company culture and operational goals." },
              { title: "PnL Management", desc: "Optimizing profit and loss structures to maximize margins, reduce overhead, and drive sustainable growth." },
              { title: "Workforce Optimization", desc: "Aligning human capital with your financial objectives for peak organizational performance and ROI." }
            ].map((service, i) => (
              <Card key={i} className="bg-[#f5f2ed] border-none rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-500">
                <CardContent className="p-10">
                  <div className="text-4xl font-serif font-light opacity-30 mb-6">0{i + 1}</div>
                  <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                  <p className="opacity-70 leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-16 text-center">Selected Works</h2>
          
          <div className="space-y-24">
            {[
              {
                client: "Netlink Software",
                role: "Scale-up Recruitment & PnL Turnaround",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
                results: ["Placed 50+ key technical roles", "Improved profit margins by 22%", "Reduced time-to-hire by 40%"]
              },
              {
                client: "Global Retail Partners",
                role: "Executive Search & Financial Restructuring",
                image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070&auto=format&fit=crop",
                results: ["Sourced complete C-suite leadership", "Optimized operational PnL", "150% ROI in year one"]
              }
            ].map((project, i) => (
              <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl">
                  <img 
                    src={project.image} 
                    alt={project.client} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="text-xs uppercase tracking-[0.2em] font-semibold opacity-70">{project.role}</div>
                  <h3 className="font-serif text-4xl">{project.client}</h3>
                  <ul className="space-y-3 pt-4">
                    {project.results.map((result, j) => (
                      <li key={j} className="flex items-center gap-3 opacity-80">
                        <CheckCircle2 className="w-5 h-5 opacity-50" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#1a1a1a] text-[#f5f2ed]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl font-light mb-8">Let's build <br/><span className="italic text-gray-400">the future.</span></h2>
            <p className="opacity-70 max-w-md mb-12 text-lg font-light">
              Ready to transform your business? Reach out to schedule a preliminary consultation with our partners.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-50 mb-1">Email</div>
                  <a href="mailto:zenconsultants2025@gmail.com" className="text-lg hover:opacity-70 transition-opacity">zenconsultants2025@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-50 mb-1">Phone</div>
                  <a href="tel:8431502356" className="text-lg hover:opacity-70 transition-opacity">8431502356</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-50 mb-1 mt-1">Office</div>
                  <span className="text-lg leading-snug block max-w-[250px]">Unit 101, Oxford Towers, No. 139/88 Old Airport Road, Bangalore 560008</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-widest opacity-70">Full Name</Label>
                <Input 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Jane Doe" 
                  className="bg-transparent border-white/20 text-white placeholder:text-white/30 h-12 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-white px-0" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-widest opacity-70">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="jane@company.com" 
                  className="bg-transparent border-white/20 text-white placeholder:text-white/30 h-12 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-white px-0" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs uppercase tracking-widest opacity-70">How can we help?</Label>
                <Textarea 
                  id="message" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your project..." 
                  className="bg-transparent border-white/20 text-white placeholder:text-white/30 min-h-[120px] rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-white px-0 resize-none" 
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 text-green-200 text-sm rounded-lg">
                  Thank you for your inquiry. We will get back to you shortly.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-lg">
                  {errorMessage}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full rounded-full bg-white text-[#1a1a1a] hover:bg-white/90 h-14 text-sm uppercase tracking-widest mt-4 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#1a1a1a]/10 text-center text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} Zen Consultants. All rights reserved.</p>
      </footer>
    </div>
  );
}