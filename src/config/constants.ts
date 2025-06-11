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
  serviceId: "service_692e7gk", // Service ID do EmailJS
  templateId: "template_6oj3mug", // Template ID do EmailJS para PACIENTE
  templateIdDoctor: "template_qa53sxk", // Template ID do EmailJS para DRA. DANI
  publicKey: "Dl7WI_1OVS3msGpV5", // Public Key do EmailJS
  enabled: true // E-mails reais ativados!
};

// Informações de contato
export const CONTACTS = {
  whatsapp: "5524999887766", // Número com código do país
  email: "contatodradanieleferreira@gmail.com",
  instagram: "@dra.danieleferreira.endo",
  pixKey: "contatodradanieleferreira@pix.com" // Chave Pix
};

// Valores das consultas
export const CONSULTATION_PRICES = {
  primeira: 350.00,
  retorno: 300.00
};

// Informações da médica
export const DOCTOR_INFO = {
  name: "Dra. Daniele Ferreira",
  fullName: "Dra. Daniele Ferreira - Endocrinologista",
  crm: "CRM-RJ 5201291467",
  specialties: [
    "Endocrinologia",
    "Diabetes Mellitus", 
    "Obesidade e Emagrecimento",
    "Tireoide",
    "Menopausa e Reposição Hormonal",
    "Metabolismo"
  ],
  mainSpecialty: "Endocrinologia",
  location: "Rio de Janeiro - RJ",
  bio: "Médica endocrinologista com formação pela USP e especialização em Endocrinologia pela Harvard Medical School. Com mais de uma década de experiência no tratamento de obesidade, diabetes, distúrbios da tireoide, menopausa e metabolismo.",
  experience: "10+ anos",
  formation: "USP e Harvard Medical School"
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