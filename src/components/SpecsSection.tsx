import React from "react";

const SpecsSection = () => {
  return (
    <section className="w-full py-8 bg-white" id="services">
      <div className="section-container opacity-0 animate-on-scroll">
        {/* Header padronizado - mesmo alinhamento para todas as seções */}
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">02</span>
            <span>Serviços</span>
          </div>
        </div>
        
        {/* Título padronizado */}
        <h2 className="text-6xl font-display font-bold mb-10 text-left">Especialidades</h2>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg" style={{
                background: 'linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 20%, #8b7355 40%, #a8956b 60%, #c4b084 80%, #f5f5f5 100%)',
                boxShadow: '0 4px 15px rgba(44, 44, 44, 0.3), inset 0 1px 0 rgba(245,245,245,0.3)'
              }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Tratamento de Obesidade</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Plano personalizado de emagrecimento saudável com acompanhamento médico especializado e suporte nutricional.</p>
            </div>
          </div>
          
          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg" style={{
                background: 'linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 20%, #8b7355 40%, #a8956b 60%, #c4b084 80%, #f5f5f5 100%)',
                boxShadow: '0 4px 15px rgba(44, 44, 44, 0.3), inset 0 1px 0 rgba(245,245,245,0.3)'
              }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Controle de Diabetes</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Monitoramento glicêmico avançado e suporte nutricional para controle eficaz e prevenção de complicações.</p>
            </div>
          </div>
          
          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg" style={{
                background: 'linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 20%, #8b7355 40%, #a8956b 60%, #c4b084 80%, #f5f5f5 100%)',
                boxShadow: '0 4px 15px rgba(44, 44, 44, 0.3), inset 0 1px 0 rgba(245,245,245,0.3)'
              }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Distúrbios da Tireoide</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Diagnóstico preciso e tratamento especializado de hipo e hipertireoidismo com acompanhamento contínuo.</p>
            </div>
          </div>
          
          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg" style={{
                background: 'linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 20%, #8b7355 40%, #a8956b 60%, #c4b084 80%, #f5f5f5 100%)',
                boxShadow: '0 4px 15px rgba(44, 44, 44, 0.3), inset 0 1px 0 rgba(245,245,245,0.3)'
              }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Menopausa & Saúde Hormonal</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Manejo especializado de sintomas e reposição hormonal para bem-estar e qualidade de vida feminina.</p>
            </div>
          </div>
          
          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg" style={{
                background: 'linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 20%, #8b7355 40%, #a8956b 60%, #c4b084 80%, #f5f5f5 100%)',
                boxShadow: '0 4px 15px rgba(44, 44, 44, 0.3), inset 0 1px 0 rgba(245,245,245,0.3)'
              }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Check-up Metabólico</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Painel completo de exames hormonais e metabólicos para prevenção e diagnóstico precoce de alterações.</p>
            </div>
          </div>
          
          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg" style={{
                background: 'linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 20%, #8b7355 40%, #a8956b 60%, #c4b084 80%, #f5f5f5 100%)',
                boxShadow: '0 4px 15px rgba(44, 44, 44, 0.3), inset 0 1px 0 rgba(245,245,245,0.3)'
              }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Consulta de Retorno</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Reavaliação detalhada e ajustes personalizados de tratamento para resultados otimizados e sustentáveis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
