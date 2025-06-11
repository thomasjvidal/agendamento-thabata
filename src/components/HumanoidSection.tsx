import React from "react";

const HumanoidSection = () => {
  return (
    <section className="w-full py-8 bg-white" id="about">
      <div className="section-container opacity-0 animate-on-scroll">
        {/* Header padronizado - mesmo alinhamento para todas as seções */}
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">01</span>
            <span>Sobre</span>
          </div>
        </div>
        
        {/* Título padronizado - tamanho maior e consistente */}
        <h2 className="text-6xl font-display font-bold mb-10 text-left">Sobre a Dra. Daniele</h2>
        
        {/* Conteúdo com fontes maiores e padronizadas */}
        <div className="max-w-4xl">
          <p className="text-2xl text-gray-700 leading-relaxed mb-8">
            Médica endocrinologista com formação pela USP e especialização em Endocrinologia pela Harvard Medical School. Com mais de uma década de experiência no tratamento de obesidade, diabetes, distúrbios da tireoide, menopausa e metabolismo.
          </p>
          
          <p className="text-2xl text-gray-700 leading-relaxed mb-10">
            Dedico-me ao atendimento humanizado e totalmente personalizado, utilizando as mais recentes evidências científicas para proporcionar os melhores resultados aos meus pacientes.
          </p>
          
          <div className="inline-flex items-center px-8 py-4 bg-gray-100 rounded-full text-lg text-gray-600 font-medium">
            <span>CRM: 5201291467 RJ</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HumanoidSection;
