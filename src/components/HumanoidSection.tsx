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
        <h2 className="text-6xl font-display font-bold mb-10 text-left">Sobre Thábata Braga</h2>
        
        {/* Conteúdo com fontes maiores e padronizadas */}
        <div className="max-w-4xl">
          <p className="text-2xl text-gray-700 leading-relaxed mb-8">
            Thábata Braga é maquiadora profissional e fundadora da **Th Beauty Makeup Clinic**, localizada em Barra Mansa – RJ. Reconhecida por realçar a beleza de cada cliente com sofisticação e versatilidade, ela se destaca em técnicas refinadas que valorizam tanto cerimônias elegantes quanto produções mais modernas.
          </p>
          
          <p className="text-2xl text-gray-700 leading-relaxed mb-10">
            Thábata valoriza empoderamento e expressão pessoal através da maquiagem, unindo estética e confiança. Especializada em pele iluminada com acabamento impecável, olhos com cores sofisticadas e looks que se adaptam a diferentes tipos de pele e formatos de rosto.
          </p>
          
          <div className="inline-flex items-center px-8 py-4 bg-gray-100 rounded-full text-lg text-gray-600 font-medium">
            <span>Th Beauty Makeup Clinic • Barra Mansa - RJ</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HumanoidSection;
