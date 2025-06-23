import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import * as z from "zod"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, ArrowLeft, Copy, Check, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EMAILJS_CONFIG, GOOGLE_CALENDAR_WEBAPP_URL, AVAILABLE_TIMES } from '@/config/constants';

const brazilPhoneRegex = /^\(\d{2}\)\s?9\d{4}-\d{4}$/;

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
  phone: z.string().refine(value => brazilPhoneRegex.test(value), {
    message: "Por favor, insira um número de WhatsApp válido no formato (99) 99999-9999.",
  }),
  specialty: z.string({ required_error: "Por favor, selecione um tipo de serviço." }),
  appointmentType: z.string().optional().default("primeira"),
  date: z.string({ required_error: "Por favor, selecione uma data." }),
  time: z.string({ required_error: "Por favor, selecione um horário." }),
})

// Lista de países com códigos e bandeiras
const countries = [
  { code: '55', name: 'Brasil', flag: '🇧🇷' },
  { code: '1', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: '351', name: 'Portugal', flag: '🇵🇹' },
  { code: '34', name: 'Espanha', flag: '🇪🇸' },
  { code: '33', name: 'França', flag: '🇫🇷' },
  { code: '49', name: 'Alemanha', flag: '🇩🇪' },
  { code: '39', name: 'Itália', flag: '🇮🇹' },
  { code: '44', name: 'Reino Unido', flag: '🇬🇧' },
  { code: '54', name: 'Argentina', flag: '🇦🇷' }
];

// Função para aplicar máscara de telefone brasileiro
function formatPhoneMask(value: string) {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 0) return '';
  if (numbers.length <= 2) return `(${numbers}`;
  if (numbers.length <= 7) return `(${numbers.slice(0,2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0,2)}) ${numbers.slice(2,7)}-${numbers.slice(7,11)}`;
}

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  appointmentType: string;
  specialty: string;
  date: string;
  time: string;
  countryCode: string;
}

const services = [
  { value: "pacote-diamante", label: "Pacote Diamante Noiva (R$ 2.000,00)" },
  { value: "pacote-ouro", label: "Pacote Ouro Noiva (R$ 1.500,00)" },
  { value: "master-vip", label: "Master VIP (R$ 3.000,00)" },
  { value: "beauty-expert", label: "Beauty Expert Class (R$ 1.200,00)" },
  { value: "vip-individual", label: "VIP Individual (R$ 800,00)" },
  { value: "maquiagem", label: "Maquiagem Profissional (R$ 250,00)" },
  { value: "penteado-solto", label: "Penteado Solto (R$ 180,00)" },
  { value: "penteado-preso", label: "Penteado Preso (R$ 200,00)" },
  { value: "baby-liss", label: "Baby Liss (R$ 100,00)" },
];

const AppointmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pixCopied, setPixCopied] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTimes] = useState<string[]>(AVAILABLE_TIMES);
  
  const [formData, setFormData] = useState<AppointmentData>({
    name: "",
    email: "",
    phone: "",
    appointmentType: "primeira",
    specialty: "",
    date: "",
      time: "",
    countryCode: "55"
  });

  const handleInputChange = (field: keyof AppointmentData, value: string) => {
    if (field === 'phone') {
      value = formatPhoneMask(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getConsultationValue = () => {
    const serviceValues: { [key: string]: string } = {
      'pacote-diamante': 'R$ 2.000,00',
      'pacote-ouro': 'R$ 1.500,00',
      'master-vip': 'R$ 3.000,00',
      'beauty-expert': 'R$ 1.200,00',
      'vip-individual': 'R$ 800,00',
      'maquiagem': 'R$ 250,00',
      'penteado-solto': 'R$ 180,00',
      'penteado-preso': 'R$ 200,00',
      'baby-liss': 'R$ 100,00'
    };
    return serviceValues[formData.specialty] || 'R$ 250,00';
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.specialty || !formData.date || !formData.time) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(3);
  };

  const copyPixKey = async () => {
          try {
        await navigator.clipboard.writeText("thabatabraga@thbeautymakeup.com");
      setPixCopied(true);
      toast({
        title: "Chave Pix copiada!",
        description: "A chave foi copiada para sua área de transferência."
      });
      setTimeout(() => setPixCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a chave Pix.",
        variant: "destructive"
      });
    }
  };

  const confirmPayment = async () => {
    setIsSubmitting(true);
    try {
      const especialidadeCap =
        formData.specialty.charAt(0).toUpperCase() + formData.specialty.slice(1);
      const dataFmt = format(new Date(formData.date), "dd/MM/yyyy", { locale: ptBR });
      const horaFmt = formData.time.slice(0, 2) + "h";
      const payload = {
        patient_name: formData.name,
        appointment_type: formData.appointmentType === 'primeira' ? 'Primeiro Atendimento' : 'Atendimento de Retorno',
        consultation_type: formData.specialty,
        appointment_date: formData.date,
        appointment_time: formData.time,
        appointment_value: getConsultationValue().replace('R$ ', '').replace(',', '.'),
        email: formData.email,
        phone: formData.phone,
        consultation_type_cap: especialidadeCap,
        appointment_date_fmt: dataFmt,
        appointment_time_fmt: horaFmt
      };
      let meetLink = 'https://meet.google.com/new';
      try {
        const response = await fetch(GOOGLE_CALENDAR_WEBAPP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.meetLink) {
            meetLink = result.meetLink;
          }
        }
      } catch {}
      // Enviar e-mail para paciente
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          to_name: payload.patient_name,
          to_email: payload.email,
          patient_name: payload.patient_name,
          appointment_type: payload.appointment_type,
          consultation_type_cap: payload.consultation_type_cap,
          appointment_date_fmt: payload.appointment_date_fmt,
          appointment_time_fmt: payload.appointment_time_fmt,
          appointment_value: getConsultationValue(),
          meet_link: meetLink,
          doctor_name: "Thábata Braga"
        },
        EMAILJS_CONFIG.publicKey
      );
      // Enviar e-mail para Thábata
      await emailjs.send(
          EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
          {
          to_name: "Thábata Braga",
          to_email: "thabatabraga@thbeautymakeup.com",
          patient_name: payload.patient_name,
          appointment_type: payload.appointment_type,
            consultation_type_cap: payload.consultation_type_cap,
          appointment_date_fmt: payload.appointment_date_fmt,
          appointment_time_fmt: payload.appointment_time_fmt,
          appointment_value: getConsultationValue(),
          meet_link: meetLink,
          doctor_name: "Thábata Braga"
          },
          EMAILJS_CONFIG.publicKey
        );
      setIsConfirmed(true);
      toast({
        title: "Agendamento Confirmado!",
        description: "E-mail de confirmação enviado e evento criado no calendário."
      });
    } catch (error) {
      toast({
        title: "Erro no agendamento",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderização das etapas
  if (isConfirmed) {
    return (
      <section className="py-12 bg-white" id="schedule">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#22c55e' }}>Agendamento Confirmado!</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Resumo do Agendamento</h3>
              <div className="space-y-2 text-left">
                <p><strong>Nome:</strong> {formData.name}</p>
                <p><strong>E-mail:</strong> {formData.email}</p>
                <p><strong>WhatsApp:</strong> {formData.phone}</p>
                <p><strong>Tipo:</strong> {formData.appointmentType === 'primeira' ? 'Primeiro Atendimento' : 'Atendimento de Retorno'}</p>
                <p><strong>Serviço:</strong> {services.find(s => s.value === formData.specialty)?.label}</p>
                <p><strong>Data:</strong> {formData.date}</p>
                <p><strong>Horário:</strong> {formData.time}</p>
                <p><strong>Valor:</strong> {getConsultationValue()}</p>
              </div>
            </div>
            <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#dcfce7', borderColor: '#22c55e', border: '1px solid' }}>
              <p className="font-medium" style={{ color: '#15803d' }}>📧 E-mail de Confirmação Enviado</p>
              <p className="text-sm mt-1" style={{ color: '#15803d' }}>📅 Evento criado no Google Calendar</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Próximos Passos</h4>
                              <p className="text-blue-700 text-sm">
                  Você receberá instruções detalhadas por e-mail. A Thábata também foi notificada sobre seu agendamento. 
                  Para serviços de maquiagem, chegue com o rosto limpo e hidratado.
                </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white" id="schedule">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Agendar Atendimento</h2>
            <p className="text-lg text-gray-600">Preencha seus dados e escolha o melhor horário</p>
          </div>
          <div className="flex justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-pulse-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && <div className={`w-16 h-0.5 ${
                  currentStep > step ? 'bg-pulse-500' : 'bg-gray-200'
                }`}></div>}
              </div>
            ))}
          </div>
          {currentStep === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Nome completo</label>
                <Input
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  className="input-golden text-base h-12"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">E-mail</label>
                <Input
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className="input-golden text-base h-12"
                  required
                />
              </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">WhatsApp</label>
                    <div className="flex gap-2 items-stretch">
                  <Select value={formData.countryCode} onValueChange={v => handleInputChange('countryCode', v)}>
                    <SelectTrigger className="w-32 h-12 border-0">
                          <SelectValue>
                        {countries.find(c => c.code === formData.countryCode) ? (
                              <div className="flex items-center gap-2">
                            <span>{countries.find(c => c.code === formData.countryCode)?.flag}</span>
                            <span>+{formData.countryCode}</span>
                              </div>
                            ) : (
                              <span>País</span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <div className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>+{country.code}</span>
                                <span className="text-sm text-gray-500">{country.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        className="input-golden flex-1 h-12 text-base"
                        placeholder="(99) 99999-9999"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                        maxLength={15}
                        required
                      />
                    </div>
                  </div>
                <Button type="submit" className="button-primary w-full">
                  Próximo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
          )}
          {currentStep === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-4">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Tipo de serviço</label>
                <Select value={formData.specialty} onValueChange={v => handleInputChange('specialty', v)}>
                  <SelectTrigger className="select-golden text-base h-12">
                    <SelectValue placeholder="Selecione o serviço" className="text-base" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service.value} value={service.value}>{service.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Data</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={e => handleInputChange('date', e.target.value)}
                  className="input-golden"
                  required
                />
              </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Horário Preferido</label>
                  <div className="grid grid-cols-3 gap-3">
                  {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                      onClick={() => handleInputChange('time', time)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        formData.time === time
                            ? 'bg-pulse-500 text-white shadow-lg'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
                  </Button>
                  <Button type="submit" className="button-primary flex-1">
                    Próximo <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </form>
          )}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Pagamento via Pix</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Valor do serviço:</p>
                  <p className="text-xl font-bold text-gray-900">{getConsultationValue()}</p>
                </div>
                <p className="text-sm text-gray-600 mb-4">Chave Pix:</p>
                <div className="flex items-center gap-2 p-3 bg-white rounded border">
                  <span className="flex-1 font-mono text-sm">thabatabraga@thbeautymakeup.com</span>
                  <Button size="sm" variant="outline" onClick={copyPixKey}>
                    {pixCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
                </Button>
                <Button 
                  onClick={confirmPayment} 
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Já realizei o pagamento"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
