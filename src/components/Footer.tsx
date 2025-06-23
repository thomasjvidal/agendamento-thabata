import React from "react";
import { motion } from "framer-motion";
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
            <div className="text-primary text-3xl font-bold mb-8">Th Makeup Clinic</div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-200">Endereço:</p>
                  <a href="https://www.google.com/maps/place/Pr%C3%A9dio+Barra+Business+-+R.+Abdo+Felipe,+85+-+Ano+Bom,+Barra+Mansa+-+RJ,+27323-000" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#d4af37] transition-colors block">
                    Barra Mansa/RJ, 27323-000<br/>
                    Ano Bom, R. Abdo Felipe, 85<br/>
                    Prédio Barra Business<br/>
                    Nº 101, sala 502
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-200">Telefone/WhatsApp:</p>
                  <a href="https://wa.me/5524999226925" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#d4af37] transition-colors">
                    (24) 99922-6925
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-200">Email:</p>
                  <a href="mailto:thabatabragamakeup@gmail.com" className="text-zinc-400 hover:text-[#d4af37] transition-colors">
                    thabatabragamakeup@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-200">Horário de funcionamento:</p>
                  <p className="text-zinc-400">Terça-feira a domingo: 09:00–22:00</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.1, rotate: -10 }}>
                <Button size="sm" variant="ghost" className="p-3 text-zinc-400 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 10 }}>
                <Button size="sm" variant="ghost" className="p-3 text-zinc-400 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </Button>
              </motion.div>
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
            Desenvolvido por{" "}
            <motion.span
              className="font-semibold"
              whileHover={{
                color: "#d4af37",
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              VJoseph
            </motion.span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
