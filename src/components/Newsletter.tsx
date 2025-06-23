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
    <div className="w-full max-w-xl mx-auto">
      <span className="block text-zinc-300 text-sm font-medium mb-2 text-center">Receba novidades e dicas de beleza:</span>
      <form onSubmit={handleSubmit} className="input-group justify-center">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          className="input bg-white text-zinc-800 border-[#bfa046] focus:border-[#8b6f47] placeholder:text-zinc-400"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="button--submit bg-gradient-to-r from-[#bfa046] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#654f32]"
        >
          {isSubmitting ? "Enviando..." : "Inscrever-se"}
        </button>
      </form>
      <style jsx>{`
        .input-group {
          display: flex;
          align-items: center;
        }
        .input {
          min-height: 50px;
          max-width: 260px;
          padding: 0 1rem;
          color: #222;
          font-size: 16px;
          border: 1.5px solid #bfa046;
          border-radius: 6px 0 0 6px;
          background-color: #fff;
          transition: border 0.2s;
        }
        .button--submit {
          min-height: 50px;
          padding: .5em 1.5em;
          border: none;
          border-radius: 0 6px 6px 0;
          background-color: #bfa046;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s, filter 0.2s;
        }
        .button--submit:hover {
          filter: brightness(0.95);
        }
        .input:focus, .input:focus-visible {
          border-color: #8b6f47;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Newsletter;
