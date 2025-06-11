import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedServices = () => {
  const featuredServices = [
    {
      id: 'pacote-diamante',
      name: 'Pacote Diamante Noiva',
      description: 'Pacote completo premium para noivas. Inclui teste de maquiagem, maquiagem no dia, penteado e acompanhamento.',
      price: 'R$ 2.000,00',
      image: '/background-section1.png'
    },
    {
      id: 'master-vip',
      name: 'Master VIP',
      description: 'Masterclass avançada com módulos específicos para o mercado de noivas. Formação completa.',
      price: 'R$ 3.000,00',
      image: '/background-section2.png'
    },
    {
      id: 'vip-individual',
      name: 'VIP Individual',
      description: 'Atendimento personalizado e exclusivo. Orientações práticas para automaquiagem profissional.',
      price: 'R$ 800,00',
      image: '/background-section3.png'
    },
    {
      id: 'pacote-ouro',
      name: 'Pacote Ouro Noiva',
      description: 'Pacote especial para noivas com maquiagem profissional e penteado elegante.',
      price: 'R$ 1.500,00',
      image: '/background-section1.png'
    }
  ];

  const scrollToAgendamento = () => {
    const element = document.getElementById('schedule');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gray-50" id="featured-services">
      <div className="section-container opacity-0 animate-on-scroll">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">03</span>
            <span>Destaques</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-6xl font-display font-bold text-left">Serviços em Destaque</h2>
          <div className="hidden md:flex gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredServices.map((service) => (
            <Card key={service.id} className="group bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <div 
                    className="w-full h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm font-semibold">
                    {service.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                  
                  <Button
                    onClick={scrollToAgendamento}
                    className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg" 
                    style={{
                      background: 'linear-gradient(135deg, #b8941f 0%, #9c7a19 50%, #7a5f14 100%)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: '600',
                      padding: '12px 24px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 4px 15px rgba(184, 148, 31, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                  >
                    AGENDAR
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={scrollToAgendamento}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-8 py-3 text-lg"
          >
            VER TODOS OS SERVIÇOS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices; 