import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { 
  Globe, 
  ShieldCheck, 
  BadgePercent, 
  FileText, 
  Truck, 
  MapPin, 
  Mail, 
  Phone,
  ArrowRight,
  Activity,
  CheckCircle2,
  Syringe,
  Pill,
  HeartPulse,
  Stethoscope,
  X,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logoUrl from "@assets/almurtaza_logo_final.png";
import logoFullUrl from "@assets/almurtaza_logo_full_nobg.png";
import imgViafil from "@assets/images_(14)_1777724209167.jpeg";
import imgAzicip from "@assets/images_(15)_1777724209240.jpeg";
import imgCardiac from "@assets/Cardiac-Drug_1777724209266.jpg";
import imgPregabalin from "@assets/nerviash-300-pregabalin-300mg-capsules_1777724209287.jpg";
import imgSyrup from "@assets/cufril-d-syrup-100-ml-in-1-bottle-824_1777724209308.jpg";
import imgSurgical from "@assets/6-18-pcs-minor-surgery-set-surgical-instruments-kit-stainless_1777724209327.jpeg";
import imgInjection from "@assets/potcl-1-5gm-injection-500x500_1777724209346.jpg";
import imgEquipment from "@assets/hospital-equipments_1777724209365.jpg";
import imgPharmaFactory from "@assets/file_000000000d9c71f88950097743427863_1778611553344.png";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

function CountUp({ to, suffix = "", duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (inView) {
      count.set(0);
      const controls = animate(count, to, { duration, ease: "easeOut" });
      return controls.stop;
    }
    return undefined;
  }, [inView, to, duration, count]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

export default function Home() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    country: "",
    message: "",
  });
  const [activeModal, setActiveModal] = useState<null | { name: string; images: string[]; desc: string }>(null);
  const [modalImgIndex, setModalImgIndex] = useState(0);


  const openModal = (category: { name: string; images: string[]; desc: string }) => {
    setActiveModal(category);
    setModalImgIndex(0);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "1234abcd-56ef-78gh",

          subject: `New Pharma Inquiry from ${formData.name} — ${formData.company}`,
          from_name: "AL MURTAZA PHARMA Website",
          ...formData,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Inquiry Sent Successfully",
          description: "Our export team will contact you within 24 hours.",
        });
        setFormData({ name: "", company: "", email: "", country: "", message: "" });
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      toast({
        title: "Failed to Send Inquiry",
        description: "Please try again or reach us directly at almurtazapharma@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello, I'm interested in your pharmaceutical export services. Could you please share more details?");
    window.open(`https://wa.me/918169789848?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/40 shadow-sm transition-all">
        <div className="w-full px-2 md:px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="flex-shrink-0">
            <img
              src={logoUrl}
              alt="AL MURTAZA INTERNATIONAL PHARMA"
              style={{ width: "230px", height: "auto", marginLeft: "-30px" }}
            />
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About Us</a>
            <a href="#products" className="hover:text-primary transition-colors">Products</a>
            <a href="#markets" className="hover:text-primary transition-colors">Global Markets</a>
          </div>
          {/* Desktop button */}
          <Button onClick={handleWhatsApp} className="hidden md:flex bg-accent hover:bg-accent/90 text-white rounded-full px-6 ml-12">
            Contact Export Team
          </Button>
          {/* Mobile WhatsApp icon button */}
          <button
            onClick={handleWhatsApp}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0d6b5c, #0a8a6a)", border: "1px solid rgba(10,138,106,0.5)", boxShadow: "0 2px 12px rgba(10,138,106,0.3)" }}
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-globe.png" 
            alt="Global Pharmaceutical Export" 
            className="w-full h-full object-cover opacity-90 mix-blend-multiply dark:mix-blend-lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 border border-accent/20">
                <Globe className="w-4 h-4" />
                Premium Global Pharmaceutical Exporter
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 font-serif text-primary">
                Bridging India's Pharma Excellence to the <span className="text-accent italic">World.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl font-light">
                Reliable pharmaceutical export partner supplying premium quality medicines and healthcare products to international buyers across the Gulf, USA, UK, and Africa.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={handleWhatsApp} className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 h-14 text-base shadow-lg shadow-accent/20">
                  WhatsApp Inquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-primary/20 hover:bg-primary/5" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Export Categories
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-primary/10"
              >
                <div className="flex flex-col gap-3">
                  {[
                    "Partnered with WHO-GMP certified manufacturers",
                    "Sourced from USFDA/EU-GMP compliant facilities",
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-accent/15">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-sm font-semibold text-primary leading-snug">{line}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Strip */}
      <section className="relative z-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2040 40%, #0a1628 100%)" }}>
        {/* Green shimmer line top */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #0d9b7a 30%, #5dd4b0 50%, #0d9b7a 70%, transparent 100%)" }} />

        <div className="py-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 px-6"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] font-semibold mb-1" style={{ color: "#0d9b7a" }}>Compliance & Regulatory</p>
            <h3 className="text-lg font-bold text-white tracking-wide">Government Certified & Officially Registered</h3>
          </motion.div>

          {/* Infinite Scrolling Marquee */}
          <div className="relative overflow-hidden">
            {/* Left fade mask */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10" style={{ background: "linear-gradient(90deg, #0a1628 0%, transparent 100%)" }} />
            {/* Right fade mask */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10" style={{ background: "linear-gradient(270deg, #0a1628 0%, transparent 100%)" }} />

            {/* Scrolling track — duplicated for seamless CSS loop */}
            <div className="cert-marquee-track flex gap-5" style={{ width: "max-content" }}>
              {[...Array(2)].map((_, setIdx) =>
                [
                  { code: "IEC",   label: "Import Export Code",      body: "Directorate General of Foreign Trade, Govt. of India",      icon: "🌐" },
                  { code: "WDL",   label: "Wholesale Drug Licence",   body: "Central Drugs Standard Control Organisation (CDSCO)",       icon: "💊" },
                  { code: "FSSAI", label: "Food Safety Certified",    body: "Food Safety & Standards Authority of India",                icon: "🛡️" },
                  { code: "GST",   label: "GST Registered",           body: "Goods & Services Tax — Government of India",               icon: "📋" },
                  { code: "MSME",  label: "MSME Certified",           body: "Ministry of Micro, Small & Medium Enterprises, Govt. of India", icon: "🏭" },
                  { code: "CDSCO", label: "CDSCO Approved",           body: "Central Drugs Standard Control Organisation — India",      icon: "🏛️" },
                ].map((cert, i) => (
                  <div
                    key={`${setIdx}-${i}`}
                    className="relative flex-shrink-0 rounded-2xl p-5 flex flex-col items-center text-center cursor-default group"
                    style={{
                      width: "220px",
                      background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                      border: "1px solid rgba(13,155,122,0.25)",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(13,155,122,0.15)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(13,155,122,0.6)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(13,155,122,0.3)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(13,155,122,0.25)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(13,155,122,0.15)";
                    }}
                  >
                    {/* Glow dot */}
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full" style={{ background: "#0d9b7a", boxShadow: "0 0 6px #0d9b7a" }} />

                    {/* Icon circle */}
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 mt-1" style={{ background: "linear-gradient(135deg, rgba(13,155,122,0.18) 0%, rgba(13,155,122,0.06) 100%)", border: "1px solid rgba(13,155,122,0.3)" }}>
                      {cert.icon}
                    </div>

                    {/* Code badge */}
                    <div className="text-xs font-black tracking-[0.2em] px-3 py-1 rounded-full mb-2" style={{ background: "linear-gradient(90deg, #0d6b5c, #0d9b7a, #0d6b5c)", color: "#ffffff" }}>
                      {cert.code}
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1 leading-snug">{cert.label}</h4>
                    <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{cert.body}</p>

                    {/* Verified tick */}
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(13,155,122,0.2)", border: "1px solid rgba(13,155,122,0.4)" }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3 5.5L6.5 2" stroke="#0d9b7a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "#0d9b7a" }}>Verified</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Green shimmer line bottom */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #0d9b7a 30%, #5dd4b0 50%, #0d9b7a 70%, transparent 100%)" }} />
      </section>

      {/* Trust Pillars */}
      <section className="py-12 border-y border-border/50 bg-card relative z-20">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-border/50"
          >
            {[
              { icon: ShieldCheck, title: "Trusted Sourcing", subtitle: "Indian Network" },
              { icon: BadgePercent, title: "Competitive", subtitle: "Export Pricing" },
              { icon: FileText, title: "Documentation", subtitle: "International Support" },
              { icon: Truck, title: "Fast Coordination", subtitle: "Shipment Tracking" },
              { icon: Globe, title: "Global Focus", subtitle: "Gulf & Africa" }
            ].map((pillar, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col items-center justify-center px-4 first:pl-0 last:pr-0 border-none">
                <pillar.icon className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-bold text-primary text-sm uppercase tracking-wider">{pillar.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{pillar.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About / Quality */}
      <section id="about" className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted relative">
                <img src={imgPharmaFactory} alt="Quality Pharmaceutical Manufacturing Facility" className="object-cover w-full h-full" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-card p-8 rounded-3xl shadow-xl border border-border/50 max-w-xs">
                <div className="text-5xl font-serif font-bold text-accent mb-2">30+</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Countries Served Worldwide</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">Corporate Overview</h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Professional Pharmaceutical Exporters from India
              </h3>
              <p className="text-lg text-muted-foreground mb-5 leading-relaxed font-light">
                AL MURTAZA INTERNATIONAL PHARMA is a Mumbai-based pharmaceutical export house dedicated to delivering India's finest medicines and healthcare products to the world. Backed by a robust sourcing network of trusted Indian manufacturers, we serve hospitals, distributors, pharmacies, and government buyers across the Gulf, the United States, the United Kingdom, and Africa.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-light">
                We pride ourselves on being more than just a supplier — we are a long-term partner. Every shipment is handled with end-to-end care: rigorous quality checks, complete export documentation, transparent pricing, and responsive communication from inquiry to delivery. Our clients choose us for one reason: dependable service, every single time.
              </p>
              
              <div className="space-y-6">
                {[
                  "Trusted nationwide network of vetted Indian manufacturers",
                  "Complete export documentation and regulatory support",
                  "Competitive pricing with transparent, all-inclusive quotations",
                  "Fast, reliable shipment coordination to 30+ countries"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-accent/10 p-1 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-primary font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-16 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="container mx-auto relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center"
          >
            {[
              { to: 30, suffix: "+", label: "Countries Served" },
              { to: 8, suffix: "", label: "Product Categories" },
              { to: 24, suffix: "h", label: "Inquiry Response" },
              { to: 100, suffix: "%", label: "Documentation Support" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center justify-center px-2 md:border-r last:border-r-0 border-primary-foreground/10"
              >
                <div className="text-5xl lg:text-6xl font-serif font-bold text-accent mb-2">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm font-medium uppercase tracking-widest text-primary-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 px-6 bg-card border-y border-border/50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">Export Portfolio</h2>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">Comprehensive Product Categories</h3>
            <p className="text-lg text-muted-foreground font-light">
              We source and export a wide range of WHO-GMP, EU-GMP, and USFDA-approved pharmaceutical products, medical devices, and healthcare supplies tailored to international market requirements.
            </p>
          </div>

          {(() => {
            const categories = [
              { name: 'OTC Medicines', icon: Pill, desc: 'Over-the-counter tablets and general medications sourced from top Indian manufacturers.', images: [imgViafil] },
              { name: 'Antibiotics', icon: Activity, desc: 'Broad-spectrum antibiotics including Azithromycin, Amoxicillin, and more — WHO-GMP certified.', images: [imgAzicip] },
              { name: 'Cardiac Medicines', icon: HeartPulse, desc: 'Cardiac and cholesterol management drugs including Atorvastatin and related molecules.', images: [imgCardiac] },
              { name: 'General Pharma', icon: ShieldCheck, desc: 'Wide range of prescription generics covering neurology, pain management, and more.', images: [imgPregabalin] },
              { name: 'Tablets & Capsules', icon: Pill, desc: 'Full-range solid dosage forms — tablets, capsules, coated films for all therapeutic areas.', images: [imgAzicip, imgPregabalin] },
              { name: 'Syrups & Injections', icon: Syringe, desc: 'Liquid formulations, syrups, and IV/IM injectable preparations for clinical use.', images: [imgSyrup, imgInjection] },
              { name: 'Surgical Products', icon: Stethoscope, desc: 'Sterile surgical kits, instruments, and procedure sets meeting international standards.', images: [imgSurgical] },
              { name: 'Healthcare Supplies', icon: Activity, desc: 'Hospital equipment, diagnostic devices, and medical supplies for global healthcare facilities.', images: [imgEquipment] },
            ];
            return (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {categories.map((category) => (
                  <motion.div
                    key={category.name}
                    variants={itemVariants}
                    className="group p-8 rounded-2xl bg-background border border-border/60 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 relative overflow-hidden flex flex-col"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <category.icon className="w-10 h-10 text-muted-foreground group-hover:text-accent transition-colors mb-6" />
                    <h4 className="text-xl font-bold text-primary mb-2">{category.name}</h4>
                    <p className="text-sm text-muted-foreground flex-1">{category.desc}</p>
                    <button
                      onClick={() => openModal(category)}
                      className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 border"
                      style={{
                        background: "linear-gradient(135deg, #0a1628 0%, #0d2040 100%)",
                        borderColor: "rgba(13,155,122,0.4)",
                        color: "#0d9b7a",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(13,155,122,0.9)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(13,155,122,0.2)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(13,155,122,0.4)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      View Products
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            );
          })()}

          {/* Request More Products CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 flex flex-col items-center text-center"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-muted-foreground mb-5">
              Don't see what you're looking for?
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open(
                `https://wa.me/918169789848?text=${encodeURIComponent(
                  "Hello AL MURTAZA INTERNATIONAL PHARMA,\n\nI am interested in sourcing pharmaceutical products not listed in your standard categories.\n\nCould you please share your complete product portfolio or advise on availability?\n\nLooking forward to your response."
                )}`,
                "_blank"
              )}
              className="relative group overflow-hidden rounded-2xl px-10 py-5 flex items-center gap-4 font-bold text-base tracking-wide transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #0d6b5c 0%, #0a5c8a 60%, #083d6b 100%)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 8px 32px rgba(13,107,92,0.35), 0 2px 8px rgba(10,92,138,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                color: "#ffffff",
              }}
            >
              {/* Shimmer sweep on hover */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
                }}
              />

              {/* WhatsApp icon */}
              <span className="relative flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </span>

              <span className="relative flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold opacity-70 leading-none mb-0.5">WhatsApp Direct</span>
                <span className="text-base font-bold leading-none text-white">Request More Products</span>
              </span>

              {/* Arrow */}
              <ArrowRight className="relative w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            <p className="mt-4 text-[11px] text-muted-foreground font-light">
              Our export team responds within <span className="font-semibold text-accent">2–4 hours</span> during business hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* Export Markets */}
      <section id="markets" className="py-24 px-6 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <img src="/shipping-logistics.png" alt="Logistics" className="w-full h-full object-cover mix-blend-luminosity" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Globe className="w-12 h-12 text-accent mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Global Export Markets</h2>
            <p className="text-lg text-primary-foreground/70 font-light">
              Supplying high-quality pharmaceutical products to regulated and emerging markets across continents with dedicated regulatory support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div>
              <h4 className="text-xl font-bold text-accent mb-6 flex items-center gap-2 border-b border-primary-foreground/10 pb-4">
                <MapPin className="w-5 h-5" /> Gulf Countries
              </h4>
              <ul className="space-y-3">
                {['Saudi Arabia', 'UAE', 'Oman', 'Qatar', 'Kuwait', 'Bahrain', 'Yemen', 'Iraq', 'Jordan', 'Lebanon'].map(country => (
                  <li key={country} className="flex items-center gap-3 text-primary-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/50" /> {country}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2 border-b border-primary-foreground/10 pb-4">
                <MapPin className="w-5 h-5" /> African Markets
              </h4>
              <ul className="space-y-3 grid grid-cols-2 gap-x-4">
                {['Kenya', 'Nigeria', 'Tanzania', 'South Africa', 'Uganda', 'Ghana', 'Ethiopia', 'Rwanda'].map(country => (
                  <li key={country} className="flex items-center gap-3 text-primary-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary/50" /> {country}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-primary-foreground/10 pb-4">
                <MapPin className="w-5 h-5" /> Western Markets
              </h4>
              <ul className="space-y-3">
                {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Spain', 'Italy', 'New Zealand'].map(country => (
                  <li key={country} className="flex items-center gap-3 text-primary-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" /> {country}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 bg-primary p-12 text-primary-foreground flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif font-bold mb-4">Get In Touch</h3>
                  <p className="text-primary-foreground/70 mb-12 font-light leading-relaxed">
                    Looking for a reliable pharmaceutical supplier from India? Contact us today for product inquiries, quotations, and export discussions.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <div className="text-sm text-primary-foreground/50 uppercase tracking-wider mb-1">Email Us</div>
                        <a href="mailto:almurtazapharma@gmail.com" className="text-lg font-medium hover:text-accent transition-colors">almurtazapharma@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <div className="text-sm text-primary-foreground/50 uppercase tracking-wider mb-1">Call / WhatsApp</div>
                        <a href="https://wa.me/918169789848" target="_blank" rel="noreferrer" className="text-lg font-medium hover:text-accent transition-colors">+91 81697 89848</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <div className="text-sm text-primary-foreground/50 uppercase tracking-wider mb-1">Headquarters</div>
                        <div className="text-lg font-medium">Mumbai, India</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 p-12 lg:p-16">
                <h4 className="text-2xl font-bold text-primary mb-8">Send an Inquiry</h4>
                <form onSubmit={handleSubmit} className="space-y-6" name="contact" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary">Full Name</label>
                      <Input required name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="h-12 bg-background border-border/60 focus-visible:ring-accent" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary">Company Name</label>
                      <Input required name="company" value={formData.company} onChange={handleChange} placeholder="Pharma Distributors LLC" className="h-12 bg-background border-border/60 focus-visible:ring-accent" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary">Email Address</label>
                    <Input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="h-12 bg-background border-border/60 focus-visible:ring-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary">Target Market / Country</label>
                    <Input required name="country" value={formData.country} onChange={handleChange} placeholder="e.g. UAE, Kenya" className="h-12 bg-background border-border/60 focus-visible:ring-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary">Product Requirements</label>
                    <Textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Please list specific molecules, categories, or general inquiry details..." className="min-h-[120px] resize-none bg-background border-border/60 focus-visible:ring-accent p-4" />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full h-14 text-base font-bold text-white rounded-xl mt-4 overflow-hidden transition-all duration-300 ${isSubmitting ? "pharma-scan-bg cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        {/* Medical cross with sonar rings */}
                        <span className="relative flex items-center justify-center w-7 h-7 flex-shrink-0">
                          <span className="absolute inset-0 rounded-full border border-white/50" style={{ animation: "pharma-ping 1.5s ease-out infinite" }} />
                          <span className="absolute inset-0 rounded-full border border-white/30" style={{ animation: "pharma-ping-delay 1.5s ease-out infinite" }} />
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="white" style={{ animation: "pharma-cross-pulse 1.5s ease-in-out infinite" }}>
                            <rect x="5" y="0" width="4" height="14" rx="1.5"/>
                            <rect x="0" y="5" width="14" height="4" rx="1.5"/>
                          </svg>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="font-semibold tracking-wide">Sending Inquiry</span>
                          <span className="flex gap-0.5 items-center mt-0.5">
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <span key={i} className="block w-1.5 h-1.5 rounded-full bg-white" style={{ animation: `pharma-dot-flow 1.2s ease-in-out ${delay}s infinite` }} />
                            ))}
                          </span>
                        </span>
                      </span>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-primary pt-16 pb-8 px-6 border-t border-primary-foreground/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="mb-6" style={{ display: "inline-block", backgroundColor: "#ffffff", borderRadius: "10px", padding: "14px 20px" }}>
                <img
                  src={`${import.meta.env.BASE_URL}logo-footer.png`}
                  alt="AL MURTAZA INTERNATIONAL PHARMA — Trusted Pharmaceutical Exports"
                  style={{ width: "200px", height: "auto", display: "block" }}
                />
              </div>
              <p className="text-primary-foreground/60 max-w-sm mb-6 font-light">
                Premium Global Pharmaceutical Exporter bridging India's manufacturing excellence with international healthcare needs.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h5>
              <ul className="space-y-3 text-primary-foreground/60 font-light">
                <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#products" className="hover:text-accent transition-colors">Product Categories</a></li>
                <li><a href="#markets" className="hover:text-accent transition-colors">Global Markets</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Legal</h5>
              <ul className="space-y-3 text-primary-foreground/60 font-light">
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Compliance & Certifications</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-primary-foreground/10 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-primary-foreground/50 text-sm font-light">
            <p>© 2026 AL MURTAZA INTERNATIONAL PHARMA. All Rights Reserved.</p>
            <p>Designed for Global Trade.</p>
          </div>
        </div>
      </footer>

      {/* Product Image Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(5, 10, 20, 0.88)", backdropFilter: "blur(12px)" }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #0d1f3c 0%, #091528 60%, #070f1e 100%)",
                border: "1px solid rgba(13,155,122,0.3)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(13,155,122,0.1), inset 0 1px 0 rgba(13,155,122,0.15)",
              }}
            >
              {/* Green shimmer top bar */}
              <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #0d9b7a 30%, #5dd4b0 50%, #0d9b7a 70%, transparent 100%)" }} />

              {/* Header */}
              <div className="flex items-center justify-between px-7 py-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] font-semibold mb-0.5" style={{ color: "#0d9b7a" }}>Export Category</p>
                  <h3 className="text-xl font-bold text-white">{activeModal.name}</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(13,155,122,0.15)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Image area */}
              <div className="relative mx-6 mb-2 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(13,155,122,0.15)" }}>
                <div className="aspect-[4/3] flex items-center justify-center p-6">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={modalImgIndex}
                      src={activeModal.images[modalImgIndex]}
                      alt={activeModal.name}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.22 }}
                      className="max-h-72 w-auto max-w-full object-contain drop-shadow-2xl rounded-xl"
                    />
                  </AnimatePresence>
                </div>

                {/* Multi-image nav arrows */}
                {activeModal.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setModalImgIndex(i => (i - 1 + activeModal.images.length) % activeModal.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                      style={{ background: "rgba(10,22,40,0.85)", border: "1px solid rgba(13,155,122,0.4)" }}
                    >
                      <ChevronLeft className="w-4 h-4" style={{ color: "#0d9b7a" }} />
                    </button>
                    <button
                      onClick={() => setModalImgIndex(i => (i + 1) % activeModal.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                      style={{ background: "rgba(10,22,40,0.85)", border: "1px solid rgba(13,155,122,0.4)" }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: "#0d9b7a" }} />
                    </button>
                    {/* Dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {activeModal.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setModalImgIndex(idx)}
                          className="w-1.5 h-1.5 rounded-full transition-all"
                          style={{ background: idx === modalImgIndex ? "#0d9b7a" : "rgba(13,155,122,0.3)", transform: idx === modalImgIndex ? "scale(1.4)" : "scale(1)" }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Description + CTA */}
              <div className="px-7 py-6">
                <p className="text-sm font-light mb-5" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.75" }}>{activeModal.desc}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { closeModal(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="flex-1 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300"
                    style={{ background: "linear-gradient(90deg, #0d6b5c, #0d9b7a, #0d6b5c)", color: "#ffffff", boxShadow: "0 4px 20px rgba(13,155,122,0.35)" }}
                  >
                    Request This Category
                  </button>
                  <button
                    onClick={() => { closeModal(); window.open(`https://wa.me/918169789848?text=${encodeURIComponent(`Hello, I'm interested in your ${activeModal.name} export products. Please share details.`)}`, "_blank"); }}
                    className="px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border"
                    style={{ border: "1px solid rgba(13,155,122,0.4)", color: "#0d9b7a", background: "transparent" }}
                  >
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Green shimmer bottom bar */}
              <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #0d9b7a 30%, #5dd4b0 50%, #0d9b7a 70%, transparent 100%)" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
