// Configurações do sistema de agendamento
export const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX"; // Substitua pela URL real do Zapier/Make

// URL do Google Apps Script Web App para Google Calendar
export const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzG4YsJ3aXNAPWvTQ6j6jRr17fzlEWZZpxYZb6mtQXUoNv1L0Syk-suZwYrEoHgXoAQ1Q/exec";

// Alias para compatibilidade (mesmo valor)
export const GOOGLE_CALENDAR_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzG4YsJ3aXNAPWvTQ6j6jRr17fzlEWZZpxYZb6mtQXUoNv1L0Syk-suZwYrEoHgXoAQ1Q/exec";

// Configuração de desenvolvimento
export const DEV_MODE = import.meta.env.DEV || false;

// Configurações do EmailJS (para envio de e-mails)
export const EMAILJS_CONFIG = {
  serviceId: "service_lkf3m5r",           // Service ID do EmailJS
  templateId: "template_ihcpx91",         // NotificaçãoCliente
  templateIdDoctor: "template_1bupdgm",   // NotificaçãoThábata
  publicKey: "V07ljinFEn_6UMKUA",         // Public Key (atenção: o 'l' é minúsculo!)
  enabled: true
};

// Configuração de contato
export const CONTACT_INFO = {
  email: "thabatabraga@thbeautymakeup.com",
  instagram: "@thabatabraga.makeup",
  pixKey: "thabatabraga@thbeautymakeup.com", // Chave Pix
  whatsapp: "5524999226925"
};

// Valores dos serviços
export const SERVICE_PRICES = {
  'pacote-diamante': 2000.00,
  'pacote-ouro': 1500.00,
  'master-vip': 3000.00,
  'beauty-expert': 1200.00,
  'vip-individual': 800.00,
  'maquiagem': 250.00,
  'penteado-solto': 180.00,
  'penteado-preso': 200.00,
  'baby-liss': 100.00
};

// Valores dos atendimentos básicos
export const CONSULTATION_PRICES = {
  primeira: 250,
  retorno: 200
};

// Informações da profissional
export const PROFESSIONAL_INFO = {
  name: "Thábata Braga",
  fullName: "Thábata Braga - Th Beauty Makeup Clinic",
  specialty: "Maquiagem Profissional",
  specialties: [
    "Pacote Diamante Noiva (R$ 2.000,00)",
    "Pacote Ouro Noiva (R$ 1.500,00)", 
    "Master VIP (R$ 3.000,00)",
    "Beauty Expert Class (R$ 1.200,00)",
    "VIP Individual (R$ 800,00)",
    "Maquiagem (R$ 250,00)",
    "Penteado Solto (R$ 180,00)",
    "Penteado Preso (R$ 200,00)",
    "Baby Liss (R$ 100,00)"
  ],
  mainSpecialty: "Maquiagem para Noivas",
  location: "Barra Mansa - RJ",
  bio: "Thábata Braga é maquiadora profissional e fundadora da Th Beauty Makeup Clinic, localizada em Barra Mansa – RJ. Reconhecida por realçar a beleza de cada cliente com sofisticação e versatilidade, ela se destaca em técnicas refinadas que valorizam tanto cerimônias elegantes quanto produções mais modernas.",
  experience: "Profissional especializada",
  formation: "Th Beauty Makeup Clinic"
};

// Horários disponíveis
export const AVAILABLE_TIMES = [
  "08:00",
  "09:00", 
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00"
];

// Paleta de cores premium
export const COLORS = {
  primary: {
    gold: "#DAA520",        // Dourada ouro
    darkGold: "#B8860B",    // Ouro escuro
    lightGold: "#F4E4BC",   // Ouro claro
  },
  secondary: {
    wine: "#722F37",        // Vinho escuro
    darkWine: "#5D252A",    // Vinho mais escuro
    lightWine: "#8B4A52",   // Vinho claro
  },
  neutral: {
    black: "#1A1A1A",       // Preto
    white: "#FEFEFE",       // Branco gelo
    lightGray: "#F8F8F8",   // Cinza muito claro
    mediumGray: "#E5E5E5",  // Cinza médio
  }
}; 