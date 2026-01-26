"use client";

export default function FaqSection() {
    return (
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Întrebări Frecvente</h2>
          <p className="text-neutral-400">Tot ce trebuie să știi înainte să intri în stup.</p>
        </div>

        <div className="space-y-4">
          {[
            { q: "Este BeeFair gratuit?", a: "Da! Aplicația este 100% gratuită pentru studenți și tineri profesioniști în perioada de lansare. Pe viitor, vom introduce funcții premium opționale." },
            { q: "Trebuie să aibă toți colegii aplicația?", a: "Pentru o experiență completă, da. Dar poți începe singur: tu scanezi facturile și le trimiți lor doar notificarea de plată pe WhatsApp." },
            { q: "Datele mele bancare sunt sigure?", a: "Absolut. BeeFair nu stochează datele cardului tău. Folosim procesatori de plăți autorizați (ca Stripe/Google Pay) care au securitate de nivel bancar." },
            { q: "Funcționează cu orice tip de factură?", a: "Da. Algoritmul nostru AI este antrenat să citească facturi de curent, gaze, internet, întreținere și chiar bonuri de la supermarket." }
          ].map((faq, i) => (
            <div key={i} className="bg-neutral-900/40 border border-white/5 rounded-2xl p-6 hover:border-yellow-400/20 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    );
};