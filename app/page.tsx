"use client";

import React, { useState } from 'react';
import { 
  ScanLine, Zap, CheckCircle2, 
  CreditCard, Sparkles, Lock, 
  Globe, Send, ShieldCheck, Mail, MapPin, 
  Plus, Minus, Info
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CookieConsent from '@/components/CookieConsent';
import StingGenerator from '@/components/StingGenerator';
import  LiveFeedMockup  from '@/components/LiveFeedMockup';
import Hero from '@/components/Hero';
import LiveHiveFeed from '@/components/LiveHiveFeed';

// --- TYPESCRIPT INTERFACES ---

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

interface SectionLabelProps {
  icon: React.ReactNode;
  label: string;
}

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

// --- BRAND COMPONENTS ---

const PremiumCard = ({ children, className = "", gold = false }: PremiumCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`relative group rounded-[48px] border transition-all duration-500 ${
      gold 
      ? "bg-gradient-to-br from-yellow-400/20 via-yellow-400/[0.03] to-transparent border-yellow-400/30 shadow-[0_20px_50px_rgba(250,204,21,0.1)]" 
      : "bg-neutral-900/40 border-white/5 backdrop-blur-3xl shadow-2xl"
    } ${className}`}
  >
    {gold && <div className="absolute -right-20 -top-20 w-80 h-80 bg-yellow-400/10 blur-[120px] rounded-full pointer-events-none" />}
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
);

const GoldText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-600">
    {children}
  </span>
);

const SectionLabel = ({ icon, label }: SectionLabelProps) => (
  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/20 border border-white/5 mb-8">
    <span className="text-yellow-400">{icon}</span>
    <span className="text-[10px] font-[1000] uppercase tracking-[0.3em] text-neutral-300">{label}</span>
  </div>
);

const ContactInfo = ({ icon, title, value }: ContactInfoProps) => (
  <div className="flex items-center gap-5 group">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-yellow-400 border border-white/5 group-hover:border-yellow-400/50 transition-all">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-widest text-neutral-600 mb-0.5">{title}</p>
      <p className="text-sm font-bold text-neutral-200">{value}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className={`border-b border-white/5 last:border-none transition-all duration-500 ${isOpen ? 'bg-white/[0.02]' : ''}`}>
    <button onClick={onClick} className="w-full py-8 px-8 flex items-center justify-between text-left group">
      <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-yellow-400' : 'text-white group-hover:text-yellow-200'}`}>
        {question}
      </span>
      <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
        {isOpen ? <Minus className="w-5 h-5 text-yellow-400" /> : <Plus className="w-5 h-5 text-neutral-600" />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <div className="px-8 pb-8 text-neutral-400 leading-relaxed font-medium italic">{answer}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- MAIN HOME PAGE ---

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const router = useRouter();

  // State pentru Hero/Waitlist
  const [email, setEmail] = useState('');
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);

  // State pentru Formularul de Contact
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const STEPS = [
    { id: "01", title: "Hive Setup", desc: "Creezi grupul și inviți colegii cu un simplu link." },
    { id: "02", title: "AI Extraction", desc: "Scanezi factura. Algoritmul înțelege totul instant." },
    { id: "03", title: "Smart Split", desc: "Sistemul împarte costurile. Fără dubii, fără stres." },
    { id: "04", title: "Instant Fill", desc: "Fiecare alimentează portofelul comun în secunde." },
    { id: "05", title: "Auto Settle", desc: "Plata se face singură. Tu doar primești confirmarea." },
  ];

  const FAQS = [
    { q: "Este sigur să îmi conectez datele?", a: "Absolut. BeeFair utilizează criptare bank-level pe 256 de biți și nu stochează niciodată datele tale bancare sensibile. Suntem conformi GDPR și lucrăm cu procesatori de plăți autorizați." },
    { q: "Ce se întâmplă dacă un coleg nu plătește?", a: "Sistemul trimite notificări automate 'gentle buzz'. Te avertizăm din timp dacă fondurile nu sunt colectate pentru a evita penalitățile furnizorului." },
    { q: "Există un comision de utilizare?", a: "BeeFair este transparent. Există un mic comision de administrare a stupului doar la plata facturilor, pentru a acoperi procesarea securizată." },
    { q: "Pot scana orice fel de bon?", a: "Da! De la utilități la bonuri de supermarket. AI-ul extrage datele și împarte suma conform regulilor stabilite de voi." }
  ];

  // LOGICĂ FORMULAR WAITLIST (HERO)
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingWaitlist(true);

    try {
      const response = await fetch("https://formspree.io/f/mreqbryb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        router.push('/thank-you');
      } else {
        alert("Ceva nu a mers. Mai încearcă o dată.");
        setIsSubmittingWaitlist(false);
      }
    } catch (error) {
      alert("Eroare de conexiune.");
      setIsSubmittingWaitlist(false);
    }
  };

  // LOGICĂ FORMULAR CONTACT (FOOTER SECTION)
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("https://formspree.io/f/mreqbryb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setContactStatus('success');
        (e.target as HTMLFormElement).reset(); 
      } else {
        setContactStatus('error');
      }
    } catch (error) {
      setContactStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-6 w-full z-[100] px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[32px] px-8 py-4 shadow-2xl">
          <Image src="/img/logo_desktop.png" alt="BeeFair" height={75} className="w-auto" priority style={{ maxHeight: '75px' }} />
          <div className="hidden md:flex items-center gap-10">
            <a href="#process" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-yellow-400 transition-all">Metoda</a>
            <a href="#faq" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-yellow-400 transition-all">FAQ</a>
            <a href="#contact" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-yellow-400 transition-all">Contact</a>
          </div>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-yellow-400 text-black px-6 py-2.5 rounded-2xl text-[10px] font-[1000] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(250,204,21,0.2)]">
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* --- HERO --- */}
      <Hero />
{/* --- STING GENERATOR SECTION --- */}
<section className="py-32 px-6 bg-black/30 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <SectionLabel icon={<Info className="w-3 h-3"/>} label="Interactive Lab" />
      <h2 className="text-5xl md:text-7xl font-[1000] tracking-tighter italic uppercase">
        Generate your <GoldText>First Sting.</GoldText>
      </h2>
      <p className="text-neutral-400 mt-4 italic text-lg">
        Creează o înțepătură și vezi cum explodează feed-ul în timp real.
      </p>
    </div>

    {/* Layout pe două coloane pentru Desktop */}
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      
      {/* COLOANA 1: Generatorul (Interacțiunea) */}
      <div className="z-10">
        <StingGenerator />
      </div>

      {/* COLOANA 2: Rezultatul (Vizualul 3D) */}
      <div className="relative">
        <div 
          className="transform lg:rotate-y-[-15deg] lg:rotate-x-[8deg] transition-all duration-700 hover:rotate-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glow spatele feed-ului */}
          <div className="absolute inset-0 bg-yellow-400 blur-[100px] opacity-10 rounded-full -z-10"></div>
          
          {/* Mockup-ul */}
          <div className="bg-neutral-950/50 border border-white/10 p-2 rounded-[3rem] shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
            <div className="rounded-[2.5rem] overflow-hidden bg-black h-[500px]">
                <LiveHiveFeed />
            </div>
          </div>

          {/* Badge plutitor */}
          <div className="absolute -top-6 -right-6 bg-yellow-400 text-black font-black text-[10px] px-4 py-2 rounded-full shadow-lg transform rotate-12 border-2 border-black animate-bounce-slow">
              LIVE Hive 🔴
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      
      
   

      {/* --- TRUST BAND --- */}
      <div className="py-10 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]"><Lock className="w-4 h-4"/> 256-Bit Encrypted</div>
           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]"><ShieldCheck className="w-4 h-4"/> Bank-Level Security</div>
           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]"><Globe className="w-4 h-4"/> EU GDPR Compliant</div>
        </div>
      </div>

      {/* --- BENTO GRID --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <PremiumCard gold className="md:col-span-8 p-12 min-h-[500px] flex flex-col justify-end">
            <ScanLine className="w-20 h-20 text-yellow-400 mb-12" />
            <h3 className="text-5xl font-black mb-6 leading-none italic uppercase">Snap & Scan</h3>
            <p className="text-neutral-400 text-lg max-w-md italic font-medium leading-relaxed">Faci o poză la contor sau factură, iar AI-ul nostru extrage datele instant.</p>
          </PremiumCard>
          <div className="md:col-span-4 grid gap-6">
            <PremiumCard className="p-10 flex flex-col justify-center text-center">
              <CreditCard className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2 italic">Fair Split</h4>
              <p className="text-neutral-500 text-sm font-bold">Calculăm automat cine cât datorează, fără Excel-uri sau calcule manuale.</p>
            </PremiumCard>
            <PremiumCard className="p-10 flex flex-col justify-center text-center bg-white text-black border-none shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <Zap className="w-12 h-12 mx-auto mb-6" />
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2 italic uppercase">The Sting</h4>
              <p className="text-neutral-800 text-sm font-bold italic">Trimite un &apos;Sting&apos; anonim colegilor care uită să plătească, direct din app.</p>
            </PremiumCard>
          </div>
        </div>
      </section>

      {/* --- LIQUID FLOW --- */}
      <section id="process" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-[1000] tracking-tighter italic mb-20">HOW WE <GoldText>BUZZ.</GoldText></h2>
          <div className="flex flex-col md:flex-row gap-4">
            {STEPS.map((step, idx) => (
              <motion.div 
                key={step.id}
                onMouseEnter={() => setActiveStep(idx)}
                className={`relative flex-1 p-12 rounded-[48px] border transition-all duration-700 cursor-pointer overflow-hidden ${
                  activeStep === idx ? "bg-yellow-400 border-yellow-400 text-black flex-[2.5] shadow-2xl" : "bg-neutral-900/30 border-white/5 text-neutral-600"
                }`}
              >
                <div className="flex flex-col h-full justify-between gap-12">
                  <span className="text-7xl font-[1000] tracking-tighter opacity-20 italic">{step.id}</span>
                  <div>
                    <h4 className={`text-2xl font-black mb-4 uppercase italic ${activeStep === idx ? 'text-black' : 'text-white'}`}>{step.title}</h4>
                    <p className={`text-sm font-bold ${activeStep === idx ? 'text-black/70' : 'text-neutral-600'}`}>{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel icon={<Info className="w-3 h-3"/>} label="Questions" />
            <h2 className="text-5xl md:text-7xl font-[1000] tracking-tighter italic">KNOWLEDGE <GoldText>HIVE.</GoldText></h2>
          </div>
          <PremiumCard className="overflow-hidden border-white/10">
            <div className="divide-y divide-white/5">
              {FAQS.map((faq, index) => (
                <FAQItem 
                  key={index}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </PremiumCard>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <PremiumCard className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-20 bg-gradient-to-br from-yellow-400/20 to-transparent">
                <SectionLabel icon={<Mail className="w-3 h-3"/>} label="Contact Us" />
                <h2 className="text-5xl md:text-7xl font-[1000] tracking-tighter mb-8 italic leading-none">LET&apos;S <br/>CONNECT.</h2>
                <div className="space-y-8 mt-12">
                  <ContactInfo icon={<MapPin className="w-4 h-4"/>} title="Location" value="Bacau, Romania" />
                  <ContactInfo icon={<Globe className="w-4 h-4"/>} title="Market" value="European Union" />
                </div>
              </div>
              <div className="p-12 md:p-20 bg-black/40 backdrop-blur-3xl border-l border-white/5">
                {contactStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in">
                    <CheckCircle2 className="w-20 h-20 text-green-400 mb-6" />
                    <h3 className="text-3xl font-black italic">BUZZ RECEIVED!</h3>
                    <p className="text-neutral-500 mt-4 text-sm font-bold uppercase tracking-widest">Te contactăm imediat.</p>
                    <button onClick={() => setContactStatus('idle')} className="mt-8 text-yellow-400 text-[10px] font-black uppercase tracking-widest underline">Trimite alt mesaj</button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-4 italic">Full Name</label>
                        <input name="name" type="text" required placeholder="Alex Popescu" className="w-full bg-white/5 border border-white/10 p-5 rounded-[24px] outline-none focus:border-yellow-400 font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-4 italic">Email</label>
                        <input name="email" type="email" required placeholder="alex@beefair.com" className="w-full bg-white/5 border border-white/10 p-5 rounded-[24px] outline-none focus:border-yellow-400 font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-4 italic">Message</label>
                        <textarea name="message" rows={3} required placeholder="Cum te putem ajuta?" className="w-full bg-white/5 border border-white/10 p-5 rounded-[24px] outline-none focus:border-yellow-400 font-bold resize-none" />
                    </div>
                    <button 
                      type="submit" 
                      disabled={contactStatus === 'submitting'}
                      className="w-full bg-white text-black font-black py-6 rounded-[24px] uppercase tracking-[0.4em] text-[10px] hover:bg-yellow-400 transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-50"
                    >
                      {contactStatus === 'submitting' ? 'Sending...' : 'Dispatch'} <Send className="w-4 h-4" />
                    </button>
                    {contactStatus === 'error' && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">Eroare de trimitere. Încearcă din nou.</p>}
                  </form>
                )}
              </div>
            </div>
          </PremiumCard>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 bg-[#010101]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-800">
          <Image src="/img/logo_desktop.png" alt="Logo" width={120} height={30} className="opacity-20 grayscale" />
          <div className="flex gap-12 text-neutral-600 italic">
             <a href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy</a>
             <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
             <a href="#" className="hover:text-yellow-400 transition-colors">Cookies</a>
          </div>
          <p className="italic">© {new Date().getFullYear()} BEEFAIR ROMANIA</p>
        </div>
      </footer>
      
      <CookieConsent />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,800;1,800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #030303; }
      `}</style>
    </div>
  );
}