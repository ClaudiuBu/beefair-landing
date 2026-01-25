"use client";

import React, { useState } from 'react';
import { 
  ScanLine, Zap, Users, ChevronRight, CheckCircle2, 
  ShieldCheck, Info, MousePointer2 
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: "01", title: "Group Creation", desc: "Creează un grup pentru apartamentul tău și invită-ți colegii în câteva secunde." },
  { id: "02", title: "Bill Input", desc: "Scanează factura cu AI. BeeFair extrage automat data, furnizorul și suma totală." },
  { id: "03", title: "Item Selection", desc: "Alege cine a consumat ce. Ideal pentru cumpărături comune sau facturi complexe." },
  { id: "04", title: "Funding Wallet", desc: "Fiecare își încarcă partea în portofelul digital folosind Apple/Google Pay." },
  { id: "05", title: "Auto Payment", desc: "Factura se plătește singură cu cardul virtual BeeFair. Fără întârzieri." },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    // Formspree se ocupa de submit daca nu pui preventDefault, 
    // dar daca vrei sa arati mesajul de succes fara refresh, folosim un mic trick
    // Pentru moment, lasam formularul sa faca POST direct catre Formspree
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
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
          {!submitted ? (
            <form action="https://formspree.io/f/mreqbryb" method="POST" className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                name="email"
                placeholder="Adresa ta de email..." 
                className="flex-1 bg-neutral-900 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder:text-neutral-600"
                required
              />
              <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 group">
                Intră în Stup
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Te-am trecut pe listă! 🐝</span>
            </div>
          )}
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

            {/* --- CARD-UL MIC AURIU (RESTAURAT) --- */}
            <div className="md:col-span-2">
              <div className="bg-yellow-400/5 border border-yellow-400/10 p-8 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-400/10 blur-2xl group-hover:bg-yellow-400/20 transition-all"></div>
                <div className="flex gap-4 mb-4 items-center">
                  <Info className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-yellow-400/60">What Makes Us Different</span>
                </div>
                <p className="text-neutral-300 italic text-sm leading-relaxed relative z-10">
                  "BeeFair elimină discuțiile inconfortabile. Grupul strânge banii în avans, iar plata se face dintr-un singur loc. Simplu, corect, automat."
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

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 text-center px-6 text-neutral-600 text-sm">
        <p>&copy; {new Date().getFullYear()} BeeFair România. Smart living for busy bees 🐝</p>
      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}