import React from "react";

const RobotShowcaseSection = () => {
  return (
    <section className="w-full py-8 bg-gray-50" id="tratamento">
      <div className="section-container opacity-0 animate-on-scroll">
        {/* Header padronizado - mesmo alinhamento para todas as seções */}
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">03</span>
            <span>Tratamento</span>
          </div>
        </div>
        
        {/* Título padronizado */}
        <h2 className="text-6xl font-display font-bold mb-10 text-left">Abordagem Personalizada</h2>
        
        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-2xl text-gray-700 leading-relaxed mb-8">
              Cada paciente é único e merece um tratamento exclusivo. Utilizo as mais modernas técnicas em endocrinologia, combinadas com um olhar humanizado para cada caso.
            </p>
            
            <p className="text-2xl text-gray-700 leading-relaxed mb-10">
              Minha abordagem integra medicina baseada em evidências com cuidado personalizado, garantindo resultados eficazes e duradouros.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-pulse-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Diagnóstico Preciso</h4>
                <p className="text-gray-600 text-lg">Avaliação completa com exames específicos para identificar a causa raiz dos problemas hormonais.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-pulse-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-3">Cuidado Humanizado</h4>
                <p className="text-gray-600 text-lg">Acompanhamento contínuo com atenção às necessidades individuais de cada paciente.</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <img 
                src="/thabata-photo.jpg" 
                alt="Thábata Braga - Maquiadora Profissional" 
                className="w-full h-96 object-cover rounded-xl mb-6"
              />
              <div className="text-center">
                <h3 className="text-3xl font-semibold text-gray-900 mb-3">Thábata Braga</h3>
                <p className="text-xl text-gray-600 mb-4">Maquiadora Profissional</p>
                <p className="text-lg text-gray-500">Especialista em maquiagem para noivas e eventos especiais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RobotShowcaseSection;
