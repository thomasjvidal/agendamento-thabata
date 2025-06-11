import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Por favor, insira seu e-mail.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Obrigada por se inscrever!",
        description: "Você receberá nossas novidades em breve."
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center gap-4 bg-white/90 rounded-xl shadow px-4 py-3 max-w-xl mx-auto">
      <span className="text-gray-700 text-base font-medium whitespace-nowrap">Receba novidades e dicas de beleza:</span>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Seu e-mail"
        className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pulse-500 text-gray-700 bg-white min-w-0"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-white font-medium px-6 py-2 rounded-full transition-all duration-300 bg-gradient-to-r from-[#8b6f47] to-[#654f32] hover:scale-105 shadow-md"
      >
        {isSubmitting ? "Enviando..." : "Inscrever-se"}
      </button>
    </form>
  );
};

export default Newsletter;
