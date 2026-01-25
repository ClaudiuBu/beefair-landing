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
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
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

           <div id="join" className="max-w-md mx-auto relative">
          {!submitted ? (
            <form 
              action="https://formspree.io/f/mreqbryb" 
              method="POST" 
              className="flex flex-col sm:flex-row gap-3"
            >
              <input 
                type="email" 
                name="email"  // <--- FOARTE IMPORTANT: Formspree are nevoie de acest 'name'
                placeholder="Adresa ta de email..." 
                className="flex-1 bg-neutral-900 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder:text-neutral-600"
                required
              />
              <button 
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                Intră în Stup
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center justify-center gap-2 animate-in fade-in zoom-in">
              <CheckCircle2 className="w-5 h-5" />
              <span>Te-am trecut pe listă! Îți dăm un semn la lansare. 🐝</span>
            </div>
          )}
          <p className="text-neutral-600 text-xs mt-3">
            <ShieldCheck className="w-3 h-3 inline mr-1" />
            Nu trimitem spam. Doar update-uri importante.
          </p>
        </div>
      </section>

      {/* --- HOW IT WORKS (ANIMATED) --- */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-bold">How it Works</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative mb-24 px-4">
            <div className="flex justify-between relative z-10">
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className="group flex flex-col items-center relative"
                  style={{ width: '18%' }}
                >
                  <motion.span 
                    animate={{ color: index === activeStep ? "#facc15" : "#404040" }}
                    className="text-4xl md:text-5xl font-black mb-6 transition-colors"
                  >
                    {step.id}
                  </motion.span>
                  
                  {/* Dot */}
                  <div className="relative flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: index === activeStep ? 1.2 : 1,
                        backgroundColor: index <= activeStep ? "#facc15" : "#171717"
                      }}
                      className={`w-4 h-4 rounded-full border-2 border-neutral-800 z-20 transition-all shadow-xl`}
                    />
                    {index === activeStep && (
                      <motion.div 
                        layoutId="glow"
                        className="absolute w-8 h-8 bg-yellow-400/30 rounded-full blur-md"
                      />
                    )}
                  </div>
                  
                  <span className={`mt-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center transition-opacity duration-300 ${index === activeStep ? 'opacity-100 text-white' : 'opacity-40 text-neutral-500'}`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Progress Bar Background */}
            <div className="absolute top-[72px] md:top-[88px] left-0 w-full h-[3px] bg-white/5 rounded-full" />
            
            {/* Animated Gradient Progress Bar */}
            <motion.div 
              className="absolute top-[72px] md:top-[88px] left-0 h-[3px] bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.4)] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
          </div>

          {/* Content Card */}
          <div className="grid md:grid-cols-5 gap-8 items-stretch">
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-neutral-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-sm flex gap-6 h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                    <MousePointer2 className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{STEPS[activeStep].title}</h3>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                      {STEPS[activeStep].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:col-span-2">
              <div className="bg-yellow-400/5 border border-yellow-400/10 p-8 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-400/10 blur-2xl group-hover:bg-yellow-400/20 transition-all" />
                <div className="flex gap-4 mb-4">
                  <Info className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-yellow-400/60">What Makes Us Different</span>
                </div>
                <p className="text-neutral-300 italic text-sm leading-relaxed">
                  "BeeFair elimină discuțiile inconfortabile. Grupul strânge banii în avans, iar plata se face dintr-un singur loc. Simplu, corect, automat."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-20 bg-neutral-900/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-neutral-900 border border-white/5 hover:border-yellow-400/30 transition-all group">
              <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-yellow-400">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Snap & Scan</h3>
              <p className="text-neutral-400 leading-relaxed">Faci o poză la contor sau factură, iar AI-ul nostru extrage datele instant.</p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-900 border border-white/5 hover:border-yellow-400/30 transition-all group">
              <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-yellow-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fair Split</h3>
              <p className="text-neutral-400 leading-relaxed">Calculăm automat cine cât datorează, fără Excel-uri sau calcule manuale.</p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-900 border border-white/5 hover:border-yellow-400/30 transition-all group">
              <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-yellow-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">The Sting</h3>
              <p className="text-neutral-400 leading-relaxed">Trimite un "Sting" anonim colegilor care uită să plătească, direct din app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 border-t border-white/10 text-center text-neutral-500 text-sm">
        <p>&copy; {new Date().getFullYear()} BeeFair România. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
}