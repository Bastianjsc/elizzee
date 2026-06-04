"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer?: string;
  answerList?: string[];
}

const FAQ_DATA: FAQ[] = [
  {
    id: 1,
    question: "¿Qué es un esmalte peel off?",
    answer: "Es un esmalte que puedes retirar como si fuera un sticker, sin necesidad de acetona ni removedores agresivos."
  },
  {
    id: 2,
    question: "¿Cuánto dura el esmalte en mis uñas?",
    answer: "Dependiendo del cuidado y la actividad diaria, puede durar entre 5 y 10 días."
  },
  {
    id: 3,
    question: "¿Cómo aplico correctamente el esmalte Elizzeè?",
    answerList: [
      "Prepara tus uñas (limpias y secas).",
      "Aplica una capa de esmalte y cura con lámpara.",
      "Aplica una segunda capa y vuelve a curar.",
      "¡Listo! Uñas con color y brillo."
    ]
  },
  {
    id: 4,
    question: "¿Dónde realizan envíos?",
    answer: "Hacemos envíos a todo Chile a través de Blue Express."
  },
  {
    id: 5,
    question: "¿Puedo retirar mi pedido en persona?",
    answer: "Sí, las entregas en persona son de lunes a viernes entre las 15:00 y 17:30."
  }
];

function FaqItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen} 
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none cursor-pointer group bg-transparent border-none"
      >
        <span className="text-base md:text-lg text-gray-800 font-serif group-hover:text-black transition-colors">
          {faq.question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
        )}
      </button>

      {isOpen && (
        <div className="pb-6 text-sm md:text-base text-gray-500 leading-relaxed font-serif animate-fade-in-down">
          {faq.answer && <p>{faq.answer}</p>}
          
          {faq.answerList && (
            <ul className="list-disc pl-5 space-y-2 mt-2">
              {faq.answerList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function PreguntasFrecuentes() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto bg-white">
      {/* Contenedor centralizado para evitar que las preguntas sean demasiado anchas en pantallas grandes */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-10 text-center">
          Preguntas frecuentes
        </h2>
        
        <div className="flex flex-col border-t border-gray-200">
          {FAQ_DATA.map((faq) => (
            <FaqItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}