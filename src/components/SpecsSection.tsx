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
        <h2 className="text-6xl font-display font-bold mb-10 text-left">Serviços</h2>
        
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Pacote Diamante Noiva</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Pacote completo premium para noivas. Inclui teste de maquiagem, maquiagem no dia, penteado e acompanhamento no local do evento.</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Pacote Ouro Noiva</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Pacote especial para noivas com maquiagem profissional e penteado elegante. Teste de maquiagem incluído para garantir o look perfeito.</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Master VIP</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Masterclass avançada com módulos específicos para o mercado de noivas. Formação completa para profissionais que desejam se especializar.</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Beauty Expert Class</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Curso avançado para se tornar expert em maquiagem. Técnicas profissionais e treinamentos intensivos para aperfeiçoamento.</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">VIP Individual</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Atendimento personalizado e exclusivo. Orientações práticas para automaquiagem e aperfeiçoamento individual com técnica profissional.</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-gray-700 transition-colors duration-300">Penteados & Baby Liss</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Serviços completos de penteados soltos, presos e baby liss. Finalização perfeita para complementar sua maquiagem profissional.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
