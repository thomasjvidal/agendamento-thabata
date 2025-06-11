import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const portfolioItems = [
    { id: 1, category: 'noiva', title: 'Noiva Clássica', image: '/background-section1.png' },
    { id: 2, category: 'automaquiagem', title: 'Auto Maquiagem', image: '/background-section2.png' },
    { id: 3, category: 'formatura', title: 'Formatura', image: '/background-section3.png' },
    { id: 4, category: 'noiva', title: 'Noiva Romântica', image: '/background-section1.png' },
    { id: 5, category: 'curso', title: 'Aluna do Curso', image: '/background-section2.png' },
    { id: 6, category: 'formatura', title: 'Maquiagem Festa', image: '/background-section3.png' },
    { id: 7, category: 'noiva', title: 'Noiva Moderna', image: '/background-section1.png' },
    { id: 8, category: 'automaquiagem', title: 'Tutorial Prático', image: '/background-section2.png' },
  ];

  const filteredItems = filter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'noiva', name: 'Noivas' },
    { id: 'automaquiagem', name: 'Auto Maquiagem' },
    { id: 'formatura', name: 'Formaturas' },
    { id: 'curso', name: 'Cursos' }
  ];

  const scrollToAgendamento = () => {
    const element = document.getElementById('schedule');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16" id="portfolio">
      <div className="section-container opacity-0 animate-on-scroll">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
            <span>Portfólio</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-6xl font-display font-bold mb-4">Nossos Trabalhos</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Veja alguns dos nossos trabalhos mais marcantes e as transformações incríveis que realizamos.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "ghost"}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 transition-all duration-300 ${
                filter === category.id
                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="relative overflow-hidden aspect-square">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-200 capitalize">{item.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Gostou do que viu? Faça parte dos nossos próximos trabalhos!
          </p>
          <Button 
            onClick={scrollToAgendamento}
            className="px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg" 
            style={{
              background: 'linear-gradient(135deg, #b8941f 0%, #9c7a19 50%, #7a5f14 100%)',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '600',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 6px 20px rgba(184, 148, 31, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            AGENDAR MEU ATENDIMENTO
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 