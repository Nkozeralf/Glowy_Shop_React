import { useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import { faqItems } from '../data/faq'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-6 bg-[#f9f9f9] dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-3xl mx-auto flex flex-col gap-16">

        <SectionTitle
          title="Preguntas frecuentes"
          subtitle="Todo lo que necesitas saber antes de comprar."
        />

        <div className="flex flex-col gap-2">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className={`rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-glowy-black dark:bg-white/10' : 'bg-white dark:bg-white/5 hover:bg-[#f0f0f0] dark:hover:bg-white/8'}`}>
                <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className={`font-semibold text-sm md:text-base transition-colors duration-300 ${isOpen ? 'text-glowy-white' : 'text-glowy-black dark:text-glowy-white'}`}>
                    {item.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-glowy-pink rotate-45' : 'bg-glowy-gray/20 dark:bg-white/10'}`}>
                    <svg className={`w-3.5 h-3.5 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-glowy-black dark:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-white/60 text-sm md:text-base leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}