'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react'; // Presupun că folosești lucide-react
import LiveHiveFeed from './LiveHiveFeed'; // Importăm componenta făcută anterior
import LiveFeedMockup from './LiveFeedMockup'; // Importăm componenta LiveFeedMockup

// O mică componentă helper pentru textul auriu
const GoldText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#F7E01C] drop-shadow-[0_0_15px_rgba(247,224,28,0.3)]">
    {children}
  </span>
);

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingWaitlist(true);
    // Logic here...
    setTimeout(() => setIsSubmittingWaitlist(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      
      {/* 1. BACKGROUND EFFECTS */}
      {/* Blob-ul galben a fost mutat un pic spre dreapta pentru balans */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F7E01C]/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neutral-900 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* === COLUMN 1: TEXT & FORM (Left Side) === */}
          <div className="lg:col-span-7 text-center lg:text-left z-10">
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#F7E01C]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-100">
                Smart Shared Living
              </span>
            </motion.div>

            {/* Headline Masiv */}
            {/* Am redus puțin fontul pe desktop la 9rem ca să încapă feed-ul, dar rămâne huge */}
            <h1 className="text-7xl lg:text-[9rem] xl:text-[10rem] font-[1000] tracking-tight leading-[0.85] mb-8 italic text-white">
              FAIR <br />
              <GoldText>LIVING.</GoldText>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-neutral-400 max-w-xl mx-auto lg:mx-0 mb-10 font-medium italic">
              Automatizăm tot ce ține de facturi la comun. <br className="hidden lg:block"/>
              Adio discuții penibile, bun venit <span className="text-white font-bold">BeeFair</span>.
            </p>
            
            {/* Formular Waitlist */}
            <div className="max-w-lg mx-auto lg:mx-0 p-2 bg-neutral-900/50 rounded-[32px] border border-white/10 backdrop-blur-xl shadow-2xl focus-within:border-[#F7E01C]/50 transition-all">
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email-ul tau..." 
                  className="flex-1 bg-transparent px-6 py-4 outline-none font-bold text-white placeholder:text-neutral-600 disabled:opacity-50 text-sm sm:text-base" 
                  disabled={isSubmittingWaitlist}
                />
                <button 
                  type="submit"
                  disabled={isSubmittingWaitlist}
                  className="bg-[#F7E01C] text-black font-black px-8 py-4 rounded-[24px] uppercase text-xs tracking-widest hover:bg-[#ffe600] transition-all disabled:opacity-70 whitespace-nowrap"
                >
                  {isSubmittingWaitlist ? 'Wait...' : 'Get Access'}
                </button>
              </form>
            </div>

            {/* Anti-Spam Note */}
            <p className="text-neutral-600 text-[10px] mt-6 font-bold uppercase tracking-widest pl-4">
              <ShieldCheck className="w-3 h-3 inline mr-2 text-[#F7E01C]" />
              Nu trimitem spam.
            </p>
          </div>

          {/* === COLUMN 2: LIVE FEED (Right Side) === */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            {/* Efectul de 3D Tilt */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="relative z-10 perspective-1000" // Adăugăm perspectivă
            >
            
      {/* Container cu perspectivă - ESENȚIAL pentru ca rotația să arate natural */}
<div className="relative flex items-center justify-center lg:justify-end w-full min-h-[700px]" style={{ perspective: '1200px' }}>
    
    {/* Aura de lumină subtilă în spate */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[700px] bg-[#F7E01C] opacity-[0.06] blur-[120px] rounded-full pointer-events-none"></div>

    {/* Telefonul cu înclinația ta preferată */}
    <div 
        className="relative z-10 transform lg:rotate-y-[-12deg] lg:rotate-x-[5deg] lg:translate-x-8 transition-all duration-700 ease-out hover:rotate-0 hover:translate-x-0"
        style={{ transformStyle: 'preserve-3d' }}
    >
        {/* Bordura fină tip sticlă */}
        <div className="relative rounded-[3.2rem] p-[1.5px] bg-gradient-to-b from-white/20 via-transparent to-transparent shadow-2xl">
            
            {/* Ecranul principal */}
            <div className="rounded-[3.1rem] bg-black overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                
                {/* Reflexie cinematică peste sticlă */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent z-40 pointer-events-none"></div>

                {/* Componenta ta de Feed (curată, fără alte margini) */}
                <div className="w-[310px] h-[620px]">
                    <LiveFeedMockup />
                </div>
            </div>

            {/* Notch-ul integrat în sticlă */}
            <div className="absolute top-0 inset-x-0 h-6 bg-black w-28 mx-auto rounded-b-2xl z-50 border-x border-b border-white/5"></div>
        </div>

        {/* Badge-ul LIVE - singurul element care sparge silueta */}
        <div className="absolute -top-6 -right-8 bg-yellow-400 text-black font-black text-[10px] px-4 py-2 rounded-full shadow-xl transform rotate-12 border-2 border-black animate-bounce-slow">
            LIVE HIVE 🔴
        </div>
    </div>
</div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}