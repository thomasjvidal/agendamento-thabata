import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
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
    <section id="newsletter" className="bg-white py-12">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">07</span>
            <span>Newsletter</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-4 text-left">Receba dicas de beleza</h2>
        <p className="text-xl text-gray-700 mb-10 text-left">
          Seja a primeira a receber dicas sobre maquiagem, tendências e tutoriais exclusivos
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow">
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Seu e-mail" 
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pulse-500 text-gray-700" 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="text-white font-medium py-4 px-10 rounded-full transition-all duration-300 md:ml-4 hover:scale-105 hover:shadow-2xl" 
            style={{
              background: 'linear-gradient(135deg, #8b6f47 0%, #7a5f3d 50%, #654f32 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 15px rgba(139, 111, 71, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            {isSubmitting ? "Enviando..." : "Inscrever-se"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
