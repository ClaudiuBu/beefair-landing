"use client";

import React, { useState } from 'react';
import { 
  ScanLine, Zap, Users, ChevronRight, CheckCircle2, 
  Info, MousePointer2, ShieldCheck, 
  Mail, MessageSquare, Send, MapPin 
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'; // IMPORT IMPORTANT PENTRU REDIRECT

const STEPS = [
  { id: "01", title: "Group Creation", desc: "Creează un grup pentru apartamentul tău și invită-ți colegii în câteva secunde." },
  { id: "02", title: "Bill Input", desc: "Scanează factura cu AI. BeeFair extrage automat data, furnizorul și suma totală." },
  { id: "03", title: "Item Selection", desc: "Alege cine a consumat ce. Ideal pentru cumpărături comune sau facturi complexe." },
  { id: "04", title: "Funding Wallet", desc: "Fiecare își încarcă partea în portofelul digital folosind Apple/Google Pay." },
  { id: "05", title: "Auto Payment", desc: "Factura se plătește singură cu cardul virtual BeeFair. Fără întârzieri." },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Stare pentru loading
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter(); // Initializam routerul
  // State pentru formularul de CONTACT (Nou)
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // PUNE LINK-UL TAU DE FORMSPREE AICI (Poate fi acelasi sau unul nou)
      const response = await fetch("https://formspree.io/f/mreqbryb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setContactStatus('success');
        (e.target as HTMLFormElement).reset(); // Goleste formularul
      } else {
        setContactStatus('error');
      }
    } catch (error) {
      setContactStatus('error');
    }
  };

  // --- FUNCTIA CARE FACE MAGIA (Submit fara refresh) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Oprim comportamentul standard HTML
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mreqbryb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        // Daca Formspree a primit mailul, noi facem redirectarea
        router.push('/thank-you');
      } else {
        alert("Ceva nu a mers. Mai încearcă o dată.");
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Eroare de conexiune.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
             {/* Asigura-te ca ai imaginea logo.png sau logo_desktop.png in folderul public */}
            <Image 
              src="/img/logo_desktop.png" 
              alt="BeeFair Logo"
              width={140}
              height={40}
              priority
              className="w-auto object-contain"
            />
          </div>
          <a href="#join" className="hidden md:block text-sm font-medium text-neutral-400 hover:text-yellow-400 transition-colors">
            Contact
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6 border border-yellow-400/20">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          Coming Soon
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
          Gata cu certurile pe <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            bani în apartament.
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-light text-neutral-300 mb-8 tracking-wide">
          Smart living for <span className="text-yellow-400 font-normal italic">busy bees</span>
        </h2>

        <div id="join" className="max-w-md mx-auto relative mb-12">
             {/* FORMULARUL JAVASCRIPT FINAL */}
             <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresa ta de email..." 
                className="flex-1 bg-neutral-900 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder:text-neutral-600 disabled:opacity-50"
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                disabled={isSubmitting} // Butonul e inactiv cat timp se trimite
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Se trimite...' : 'Intră în Stup'}
                {!isSubmitting && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
            
            <p className="text-neutral-600 text-xs mt-3">
                <ShieldCheck className="w-3 h-3 inline mr-1" />
                Nu trimitem spam. Doar update-uri importante.
            </p>
        </div>

        {/* --- MOCKUP APLICATIE (Nou) --- */}
        <div className="mt-20 relative w-full max-w-5xl mx-auto">
            {/* Efect de aură (Glow) în spatele telefonului */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-yellow-400/10 blur-[80px] -z-10 rounded-full"></div>
            
            <Image 
                src="/img/app-mockup.png" // Asigură-te că numele fișierului e corect în folderul public
                alt="BeeFair App Interface"
                width={1200}
                height={800}
                priority
                className="rounded-3xl border border-white/10 shadow-2xl mx-auto w-full h-auto"
            />
        </div>

      </section>

      {/* --- HOW IT WORKS (CARD-IN-CARD DESIGN) --- */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-neutral-900/20 border border-white/5 rounded-[40px] p-8 md:p-16 backdrop-blur-sm relative overflow-hidden">
          
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold">How it Works</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {/* Timeline */}
          <div className="relative mb-24 overflow-x-auto no-scrollbar pt-4">
            <div className="flex justify-between min-w-[600px] md:min-w-full relative z-10 px-4">
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center group relative"
                  style={{ width: '18%' }}
                >
                  <motion.span 
                    animate={{ color: index === activeStep ? "#facc15" : "#404040" }}
                    className="text-4xl md:text-5xl font-black mb-6 transition-colors"
                  >
                    {step.id}
                  </motion.span>
                  <div className="relative flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: index === activeStep ? 1.2 : 1,
                        backgroundColor: index <= activeStep ? "#facc15" : "#171717"
                      }}
                      className="w-4 h-4 rounded-full border-2 border-neutral-900 z-20"
                    />
                    {index === activeStep && (
                      <motion.div layoutId="glow" className="absolute w-8 h-8 bg-yellow-400/20 blur-md rounded-full" />
                    )}
                  </div>
                  <span className={`mt-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${index === activeStep ? 'text-white' : 'text-neutral-600'}`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
            {/* Progress Lines */}
            <div className="absolute top-[75px] md:top-[90px] left-0 w-full h-[1px] bg-white/5 -z-0" />
            <motion.div 
              className="absolute top-[75px] md:top-[90px] left-0 h-[1px] bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.4)] -z-0"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-black/40 border border-white/5 p-8 rounded-3xl h-full flex flex-col justify-center"
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-yellow-400/10">
                    <MousePointer2 className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 md:hidden text-yellow-400">{STEPS[activeStep].title}</h3>
                  <p className="text-lg text-neutral-300 leading-relaxed font-medium italic">
                    {STEPS[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* --- CARD-UL MIC AURIU --- */}
            <div className="md:col-span-2">
              <div className="bg-yellow-400/5 border border-yellow-400/10 p-8 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-400/10 blur-2xl group-hover:bg-yellow-400/20 transition-all"></div>
                <div className="flex gap-4 mb-4 items-center">
                  <Info className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-yellow-400/60">What Makes Us Different</span>
                </div>
                <p className="text-neutral-300 italic text-sm leading-relaxed relative z-10">
                  &quot;BeeFair elimină discuțiile inconfortabile. Grupul strânge banii în avans, iar plata se face dintr-un singur loc. Simplu, corect, automat.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: ScanLine, title: "Snap & Scan", text: "Faci o poză la contor sau factură, iar AI-ul nostru extrage datele instant." },
            { icon: Users, title: "Fair Split", text: "Calculăm automat cine cât datorează, fără Excel-uri sau calcule manuale." },
            { icon: Zap, title: "The Sting", text: "Trimite un 'Sting' anonim colegilor care uită să plătească, direct din app." }
          ].map((f, i) => (
            <div key={i} className="p-10 rounded-3xl bg-neutral-900/40 border border-white/5 hover:border-yellow-400/20 transition-all group">
              <f.icon className="w-10 h-10 text-yellow-400 mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-neutral-500 leading-relaxed text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
      {/* --- GET IN TOUCH SECTION --- */}
      <section id="contact" className="py-24 px-6 bg-neutral-900/50 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            
            {/* Coloana Stânga: Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6 border border-yellow-400/20">
                <MessageSquare className="w-3 h-3" />
                Support & Info
              </div>
              
              <h2 className="text-4xl font-bold mb-6">Let's start a conversation.</h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-10">
                Ai întrebări despre cum funcționează BeeFair? Vrei să devenim parteneri sau doar să ne saluți? Suntem aici pentru tine.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-yellow-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  {/* <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Email</p>
                    <a href="mailto:hello@beefair.ro" className="hover:text-yellow-400 transition-colors font-medium">hello@beefair.ro</a>
                  </div> */}
                </div>

                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-yellow-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Locație</p>
                    <p className="font-medium">Bacau, România</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coloana Dreapta: Formular */}
            <div className="bg-neutral-950 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
               {/* Glow effect discret */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-[50px] rounded-full -z-10"></div>

              {contactStatus === 'success' ? (
                <div className="h-[300px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/20">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Mesaj trimis!</h3>
                  <p className="text-neutral-400">Îți vom răspunde cât de repede putem.</p>
                  <button onClick={() => setContactStatus('idle')} className="mt-6 text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                    Trimite alt mesaj
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Numele tău</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Ex: Alex Popescu"
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder:text-neutral-700 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email_contact" className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="alex@email.com"
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder:text-neutral-700 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Mesaj</label>
                    <textarea 
                      name="message"
                      required
                      rows={4}
                      placeholder="Salut! Aș vrea să știu dacă..."
                      className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder:text-neutral-700 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={contactStatus === 'submitting'}
                    className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {contactStatus === 'submitting' ? 'Se trimite...' : 'Trimite Mesajul'}
                    {!contactStatus.includes('submitting') && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                  
                  {contactStatus === 'error' && (
                    <p className="text-red-400 text-sm text-center mt-2">A apărut o eroare. Încearcă din nou.</p>
                  )}
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 text-center px-6 text-neutral-600 text-sm">
        <p>&copy; {new Date().getFullYear()} BeeFair România. Smart living for busy bees 🐝</p>

        <a href="/privacy" className="hover:text-neutral-400 underline decoration-neutral-800 underline-offset-4 transition-colors">
          Politica de Confidențialitate
        </a>

      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}