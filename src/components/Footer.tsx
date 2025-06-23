import React from "react";
import { MapPin, Phone, Clock, Instagram, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Newsletter from "@/components/Newsletter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* Contact Information */}
          <div>
            <div className="text-primary text-3xl font-bold mb-8">Th Beauty Makeup Clinic</div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-200">Endereço:</p>
                  <p className="text-zinc-400">Barra Mansa - RJ</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-200">Telefone/WhatsApp:</p>
                  <p className="text-zinc-400">Disponível via agendamento</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-200">Email:</p>
                  <p className="text-zinc-400">thabatabraga@thbeautymakeup.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-200">Horário de atendimento:</p>
                  <p className="text-zinc-400">Seg–Sex: 09h–18h</p>
                  <p className="text-zinc-400">Sáb: 09h–16h</p>
                  <p className="text-zinc-400">Dom: Sob consulta</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="sm" variant="ghost" className="p-3 text-zinc-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="p-3 text-zinc-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Google Maps + Newsletter */}
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14754.123456789!2d-44.1729389!3d-22.5448264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9e8c7a9a6a6a6a6a%3A0x6a6a6a6a6a6a6a6a!2sBarra%20Mansa%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1699999999999!5m2!1spt-BR!2sbr"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Th Beauty Makeup Clinic"
            ></iframe>
            <div className="mt-8">
              <Newsletter />
            </div>
          </div>
        </div>

        {/* Rodapé inferior igual Dani */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-zinc-400 text-sm">
            © 2024 Th Beauty Makeup Clinic - Thábata Braga. Todos os direitos reservados.
          </p>
          <p className="text-zinc-500 text-xs mt-2">
            Desenvolvido por <span className="font-semibold">VJoseph</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
