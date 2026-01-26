"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificăm dacă utilizatorul a ales deja o opțiune
    const consent = localStorage.getItem('beefair-cookie-consent');
    if (!consent) {
      // Dacă nu există decizie, arătăm banner-ul după 1.5 secunde
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('beefair-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('beefair-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[100]"
        >
          <div className="bg-neutral-900/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl relative">
            
            {/* Close Button mic sus */}
            <button 
              onClick={() => setIsVisible(false)} 
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-400/10 rounded-full flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-yellow-400" />
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-1">Cookies? 🍪</h4>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  Folosim cookie-uri pentru a face site-ul să funcționeze perfect. Continuând, ești de acord cu{' '}
                  <Link href="/privacy" className="text-yellow-400 hover:underline">
                    Politica noastră
                  </Link>.
                </p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={handleAccept}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={handleDecline}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors border border-white/10"
                  >
                    Refuz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}