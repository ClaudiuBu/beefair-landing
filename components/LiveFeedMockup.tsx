import React from 'react';
import { motion } from 'framer-motion';

const TRANSACTIONS = [
  {
    id: 1,
    user: "Andrei",
    rank: "QUEEN",
    action: "Settled the payment for Pizza Party 🍕",
    amount: "120",
    color: "text-green-400",
    time: "2m ago",
    comments: [
      { user: "Ioana", text: "Mulțumesc! Am trimis partea mea." },
      { user: "Radu", text: "Perfect, am primit confirmarea." }
    ]
  },
  {
    id: 2,
    user: "Vlad",
    rank: "DRONE",
    action: "Added a new expense for Factura Enel ⚡",
    amount: "340",
    color: "text-yellow-400",
    time: "1h ago",
    comments: []
  },
  {
    id: 3,
    user: "Maria",
    rank: "QUEEN",
    action: "Paid for Weekly Groceries 🛒",
    amount: "215",
    color: "text-green-400",
    time: "3h ago",
    comments: [{ user: "Andrei", text: "Băgăm și niște bere data viitoare?" }]
  }
];

export const HeroAppMockup = () => {
  return (
    <div className="relative mx-auto w-[300px] h-[600px] border-[8px] border-gray-800 rounded-[2.5rem] bg-black shadow-2xl overflow-hidden">
      {/* Notch-ul telefonului */}
      <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 w-32 mx-auto rounded-b-xl z-20"></div>

      {/* Header-ul aplicației (Fixat) */}
      <div className="pt-8 px-4 bg-black/80 backdrop-blur-md z-10 border-b border-white/10 pb-2">
        <div className="flex justify-between items-center mb-4">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">+</div>
          <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] text-white">Public feed ▾</div>
          <div className="text-yellow-400">♥</div>
        </div>
        
        {/* Sting Line (Stories) */}
        <div className="flex gap-3 overflow-hidden pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-yellow-400 flex-shrink-0 bg-gray-700" />
          ))}
        </div>
      </div>

      {/* Feed-ul care se derulează infinit */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: ["0%", "-50%"] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="p-4 space-y-4"
      >
        {[...TRANSACTIONS, ...TRANSACTIONS].map((item, idx) => (
          <div key={idx} className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-600" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-white text-xs font-bold">{item.user}</span>
                  <span className="bg-yellow-400/20 text-yellow-400 text-[8px] px-1 rounded font-bold">{item.rank}</span>
                </div>
                <span className="text-gray-500 text-[10px]">{item.time}</span>
              </div>
            </div>
            
            <p className="text-white text-[11px] mb-2 leading-tight">{item.action}</p>
            <div className={`text-xl font-black mb-3 ${item.color}`}>
              {item.amount} <span className="text-[10px] text-gray-500">RON</span>
            </div>

            {item.comments.length > 0 && (
              <div className="border-t border-white/5 pt-2 space-y-2">
                {item.comments.map((c, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="w-4 h-4 rounded-full bg-gray-500 mt-1" />
                    <p className="text-gray-400 text-[9px]"><span className="text-white font-bold">{c.user}</span> {c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Tab Bar-ul aplicației (Fixat jos) */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-black border-t border-white/10 flex justify-around items-center px-4">
        <div className="text-yellow-400 text-xs">🏠</div>
        <div className="text-gray-500 text-xs">👥</div>
        <div className="text-gray-500 text-xs">📥</div>
        <div className="text-gray-500 text-xs">👤</div>
      </div>
    </div>
  );
};
export default HeroAppMockup; // <--- Adaugă această linie la final