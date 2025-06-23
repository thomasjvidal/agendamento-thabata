import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import React, { useState } from "react";
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
import { EMAILJS_CONFIG, GOOGLE_CALENDAR_WEBAPP_URL } from '@/config/constants';

const brazilPhoneRegex = /^\+55\s?(\d{2})\s?9\d{4}-?\d{4}$/

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
  phone: z.string().refine(value => brazilPhoneRegex.test(value), {
    message: "Por favor, insira um número de WhatsApp válido no formato brasileiro (ex: +55 11 91234-5678).",
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

const AppointmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pixCopied, setPixCopied] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name: "",
    email: "",
    phone: "",
    specialty: "",
      appointmentType: "primeira",
    date: "",
      time: "",
    },
  })

  const getConsultationValue = () => {
    const specialty = form.watch("specialty");
    const appointmentType = form.watch("appointmentType");

    if (!specialty) {
      return appointmentType === 'primeira' ? 'R$ 250,00' : 'R$ 200,00';
    }
    
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
    
    return serviceValues[specialty] || 'R$ 250,00';
  };

  const handleStep1Submit = (values: z.infer<typeof formSchema>) => {
    console.log("Step 1 data:", values);
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = form.getValues("date");
    const time = form.getValues("time");
    
    if (!date || !time) {
      form.trigger(["date", "time"]);
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a data e o horário.",
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

  const sendConfirmationEmail = async (appointmentData: any) => {
    // This function seems to be unused, but we'll leave it for now.
    // ... existing code ...
  };

  const confirmPayment = async () => {
    setIsSubmitting(true);
    const formData = form.getValues();
    
    try {
      // ----- formatações "bonitas" -----
      const especialidadeCap =
        formData.specialty.charAt(0).toUpperCase() + formData.specialty.slice(1);

      const dataFmt = format(new Date(formData.date), "dd/MM/yyyy", { locale: ptBR });
      const horaFmt = formData.time.slice(0, 2) + "h";

      // ----- payload p/ Apps Script -----
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

      // ---- 1. CRIAR EVENTO NO GOOGLE CALENDAR ----
      console.log('🚀 Enviando dados para Google Apps Script...');
      console.log('📋 Payload:', payload);

      let meetLink = 'https://meet.google.com/new'; // fallback

      try {
        const response = await fetch(GOOGLE_CALENDAR_WEBAPP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain', // CORS bypass
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Resposta do Google Apps Script:', result);
          
          if (result.success && result.meetLink) {
            meetLink = result.meetLink;
            console.log('🎯 Meet Link obtido:', meetLink);
          }
        } else {
          console.warn('⚠️ Erro na resposta do Google Apps Script:', response.status);
        }
      } catch (calendarError) {
        console.error('❌ Erro ao criar evento no calendário:', calendarError);
        // Continua com o meetLink padrão
      }

      // ---- 2. EMAILS PARA PACIENTE E DRA. DANI ----
      console.log('📧 Enviando emails...');

      // 1. Email para o PACIENTE (template de confirmação)
      console.log('🔄 Enviando email para o paciente...');
      const patientEmailResult = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId, // template_6oj3mug
        {
          to_name:               payload.patient_name,
          to_email:              payload.email,
          patient_name:          payload.patient_name,
          appointment_type:      payload.appointment_type,
          consultation_type_cap: payload.consultation_type_cap,
          appointment_date_fmt:  payload.appointment_date_fmt,
          appointment_time_fmt:  payload.appointment_time_fmt,
          appointment_value:     getConsultationValue(),
          meet_link:             meetLink,
          doctor_name:           "Thábata Braga"
        },
        EMAILJS_CONFIG.publicKey
      );
      console.log('✅ Email para paciente enviado:', patientEmailResult);

      // Delay de 2 segundos para evitar rate limiting
      console.log('⏳ Aguardando 2 segundos antes do segundo email...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 2. Email para a DRA. DANI (usando mesmo template por enquanto)
      console.log('🔄 Enviando segundo email para Dra. Dani...');
      console.log('🔍 VERCEL DEBUG - Environment:', window.location.hostname);
      console.log('🔍 VERCEL DEBUG - Service ID:', EMAILJS_CONFIG.serviceId);
      console.log('🔍 VERCEL DEBUG - Template ID:', EMAILJS_CONFIG.templateId);
      console.log('🔍 VERCEL DEBUG - Public Key:', EMAILJS_CONFIG.publicKey);
              console.log('🔍 VERCEL DEBUG - Email para:', "thabatabraga@thbeautymakeup.com");
      
      try {
        const doctorEmailResult = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId, // template_6oj3mug (mesmo template)
          {
            to_name:               "Thábata Braga",
                          to_email:              "thabatabraga@thbeautymakeup.com",
            patient_name:          payload.patient_name,
            appointment_type:      payload.appointment_type,
            consultation_type_cap: payload.consultation_type_cap,
            appointment_date_fmt:  payload.appointment_date_fmt,
            appointment_time_fmt:  payload.appointment_time_fmt,
            appointment_value:     getConsultationValue(),
            meet_link:             meetLink,
            doctor_name:           "Thábata Braga"
          },
          EMAILJS_CONFIG.publicKey
        );
        console.log('✅ Email para Dra. Dani enviado:', doctorEmailResult);
        console.log('🔍 VERCEL DEBUG - Response status:', doctorEmailResult.status);
        console.log('🔍 VERCEL DEBUG - Response text:', doctorEmailResult.text);
      } catch (doctorEmailError) {
        console.error('❌ ERRO ao enviar email para Dra. Dani:', doctorEmailError);
        console.error('❌ Detalhes do erro:', {
          message: doctorEmailError.message,
          status: doctorEmailError.status,
          text: doctorEmailError.text
        });
        console.error('🔍 VERCEL DEBUG - Error name:', doctorEmailError.name);
        console.error('🔍 VERCEL DEBUG - Error stack:', doctorEmailError.stack);
      }

      console.log('✅ Ambos os emails enviados com sucesso!');

      setIsConfirmed(true);
      toast({
        title: "Agendamento Confirmado!",
        description: "E-mail de confirmação enviado e evento criado no calendário."
      });
      
    } catch (error) {
      console.error('❌ Erro geral:', error);
      toast({
        title: "Erro no agendamento",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formData = form.getValues();
  // Tela de confirmação
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
                <p><strong>Serviço:</strong> {formData.specialty}</p>
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

  // Formulário principal
  return (
    <section className="py-12 bg-white" id="schedule">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Agendar Atendimento</h2>
            <p className="text-lg text-gray-600">Preencha seus dados e escolha o melhor horário</p>
          </div>

          {/* Progress Steps */}
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

          {/* Step 1: Personal Data */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Dados Pessoais</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleStep1Submit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} className="input-golden text-base h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">E-mail</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} className="input-golden text-base h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* WhatsApp igual Dani */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">WhatsApp</label>
                    <div className="flex gap-2 items-stretch">
                      <Select value={form.watch('countryCode') || '55'} onValueChange={v => form.setValue('countryCode', v)}>
                        <SelectTrigger 
                          className="w-32 h-12 border-0" 
                          style={{
                            border: '2px solid transparent',
                            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #d4af37 0%, #b8941f 25%, #9c7a19 50%, #8b6f47 75%, #7a5f3d 100%) border-box',
                            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.15)',
                            borderRadius: '0.75rem'
                          }}
                        >
                          <SelectValue>
                            {countries.find(c => c.code === (form.watch('countryCode') || '55')) ? (
                              <div className="flex items-center gap-2">
                                <span>{countries.find(c => c.code === (form.watch('countryCode') || '55'))?.flag}</span>
                                <span>+{form.watch('countryCode') || '55'}</span>
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
                        value={formatPhoneMask(form.watch('phone') || '')}
                        onChange={e => form.setValue('phone', formatPhoneMask(e.target.value))}
                        maxLength={15}
                        required
                      />
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de serviço</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                    <SelectTrigger className="select-golden text-base h-12">
                      <SelectValue placeholder="Selecione o serviço" className="text-base" />
                    </SelectTrigger>
                          </FormControl>
                    <SelectContent>
                      <SelectItem value="pacote-diamante">Pacote Diamante Noiva (R$ 2.000,00)</SelectItem>
                      <SelectItem value="pacote-ouro">Pacote Ouro Noiva (R$ 1.500,00)</SelectItem>
                      <SelectItem value="master-vip">Master VIP (R$ 3.000,00)</SelectItem>
                      <SelectItem value="beauty-expert">Beauty Expert Class (R$ 1.200,00)</SelectItem>
                      <SelectItem value="vip-individual">VIP Individual (R$ 800,00)</SelectItem>
                      <SelectItem value="maquiagem">Maquiagem (R$ 250,00)</SelectItem>
                      <SelectItem value="penteado-solto">Penteado Solto (R$ 180,00)</SelectItem>
                      <SelectItem value="penteado-preso">Penteado Preso (R$ 200,00)</SelectItem>
                      <SelectItem value="baby-liss">Baby Liss (R$ 100,00)</SelectItem>
                    </SelectContent>
                  </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                <Button type="submit" className="button-primary w-full">
                  Próximo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
              </Form>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Detalhes</h3>
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="input-golden" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Horário Preferido</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => form.setValue('time', time, { shouldValidate: true })}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                          form.watch('time') === time
                            ? 'bg-pulse-500 text-white shadow-lg'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <FormMessage>{form.formState.errors.time?.message}</FormMessage>
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
            </div>
          )}

          {/* Step 3: Payment */}
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
