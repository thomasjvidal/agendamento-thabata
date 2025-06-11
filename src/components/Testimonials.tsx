import React, { useRef } from "react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  backgroundImage?: string;
  avatarImage?: string;
}

const testimonials: TestimonialProps[] = [{
  content: "Dra. Daniele me ajudou a perder 15kg de forma saudável. Seu acompanhamento é excepcional e o tratamento totalmente personalizado.",
  author: "Maria Silva",
  role: "Paciente - Tratamento de Obesidade",
  gradient: "from-slate-800 via-blue-900 to-gray-800",
  backgroundImage: "/background-section1.png",
  avatarImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format"
}, {
  content: "Finalmente consegui controlar meu diabetes. A Dra. Daniele é muito atenciosa e explica tudo de forma clara e objetiva.",
  author: "João Santos",
  role: "Paciente - Controle de Diabetes",
  gradient: "from-amber-700 via-orange-600 to-yellow-700",
  backgroundImage: "/background-section2.png",
  avatarImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
}, {
  content: "O tratamento para tireoide foi um sucesso. Hoje me sinto muito melhor e com mais energia. Recomendo demais!",
  author: "Ana Costa",
  role: "Paciente - Distúrbios da Tireoide",
  gradient: "from-orange-700 via-amber-600 to-yellow-600",
  backgroundImage: "/background-section3.png",
  avatarImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
}, {
  content: "Excelente profissional! Me ajudou muito na menopausa. Atendimento humanizado e baseado em evidências científicas.",
  author: "Carmen Rodriguez",
  role: "Paciente - Menopausa",
  gradient: "from-blue-900 via-slate-800 to-gray-900",
  backgroundImage: "/background-section1.png",
  avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
}];

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = "/background-section1.png",
  avatarImage
}: TestimonialProps) => {
  return <div className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden" style={{
    backgroundImage: `url('${backgroundImage}')`
  }}>
      {avatarImage ? (
        <div className="absolute top-4 right-4 w-20 h-20 z-10">
          <img 
            src={avatarImage} 
            alt={`Foto de ${author}`}
            className="w-full h-full rounded-full object-cover border-3 border-white shadow-lg"
          />
        </div>
      ) : (
        <div className="absolute top-0 right-0 w-24 h-24 bg-white z-10"></div>
      )}
      
      <div className="relative z-0">
        <p className="text-xl mb-8 font-medium leading-relaxed pr-20">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>;
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return <section className="py-8 bg-white relative" id="testimonials" ref={sectionRef}>
      <div className="section-container opacity-0 animate-on-scroll">
        {/* Header padronizado - mesmo alinhamento para todas as seções */}
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
            <span>Depoimentos</span>
          </div>
        </div>
        
        {/* Título padronizado */}
        <h2 className="text-6xl font-display font-bold mb-10 text-left">O que dizem meus pacientes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => <TestimonialCard key={index} content={testimonial.content} author={testimonial.author} role={testimonial.role} gradient={testimonial.gradient} backgroundImage={testimonial.backgroundImage} avatarImage={testimonial.avatarImage} />)}
        </div>
      </div>
    </section>;
};

export default Testimonials;
