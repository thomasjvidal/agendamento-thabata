import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, ArrowLeft, Copy, Check, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EMAILJS_CONFIG, GOOGLE_CALENDAR_WEBAPP_URL, CONSULTATION_PRICES } from '@/config/constants';


interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  appointmentType: string;
  specialty: string;
  date: string;
  time: string;
}

const AppointmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pixCopied, setPixCopied] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados simples para cada campo
  const [formData, setFormData] = useState<AppointmentData>({
    name: "",
    email: "",
    phone: "",
    appointmentType: "",
    specialty: "",
    date: "",
    time: ""
  });

  const handleInputChange = (field: keyof AppointmentData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getConsultationValue = () => {
    if (!formData.specialty) {
      return formData.appointmentType === 'primeira' ? 'R$ 250,00' : 'R$ 200,00';
    }
    
    const serviceValues = {
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
    console.log("Step 1 data:", formData); // Debug
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone || !formData.appointmentType) {
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
    console.log("Step 2 data:", formData); // Debug
    
    // Validação básica
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

  const sendConfirmationEmail = async (appointmentData: any) => {
    try {
      console.log('🚀 Iniciando envio de e-mail...');
      console.log('📧 Configuração EmailJS:', EMAILJS_CONFIG);
      
      const emailParams = {
        to_name: appointmentData.nome,
        to_email: appointmentData.email,
        from_name: "Thábata Braga - Th Beauty Makeup Clinic",
        patient_name: appointmentData.nome,
        appointment_type: appointmentData.tipoAtendimento,
        consultation_type: appointmentData.tipoConsulta,
        appointment_date: appointmentData.data,
        appointment_time: appointmentData.hora,
        appointment_value: `R$ ${appointmentData.valor}`,
        whatsapp: appointmentData.whatsapp,
        doctor_name: "Thábata Braga"
      };

      console.log('📋 Parâmetros do e-mail:', emailParams);

      // Verificar se o EmailJS está configurado
      if (!EMAILJS_CONFIG.enabled || EMAILJS_CONFIG.publicKey === "YOUR_EMAILJS_PUBLIC_KEY") {
        console.log('⚠️ EmailJS não configurado ainda. E-mail que seria enviado:', emailParams);
        return { success: false, reason: 'not_configured' };
      }

      console.log('✅ EmailJS configurado, enviando e-mail...');

      // Enviar e-mail real via EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        emailParams,
        EMAILJS_CONFIG.publicKey
      );

      console.log('🎉 E-mail enviado com sucesso!', result);
      return { success: true, reason: 'sent' };
    } catch (error) {
      console.error('❌ ERRO ao enviar e-mail:', error);
      return { success: false, reason: 'error', error };
    }
  };

  const confirmPayment = async () => {
    setIsSubmitting(true);
    
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

        // campos só pro e-mail
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
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                  <input 
                    className="input-golden"
                    placeholder="Seu nome completo" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input 
                    className="input-golden"
                    type="email" 
                    placeholder="seu@email.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <input 
                    className="input-golden"
                    placeholder="(11) 99999-9999" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de atendimento</label>
                  <Select value={formData.appointmentType} onValueChange={(value) => handleInputChange('appointmentType', value)}>
                    <SelectTrigger className="select-golden">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primeira">Primeiro Atendimento (R$ 250,00)</SelectItem>
                      <SelectItem value="retorno">Atendimento de Retorno (R$ 200,00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="button-primary w-full">
                  Próximo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Detalhes</h3>
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de serviço</label>
                  <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                    <SelectTrigger className="select-golden">
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
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
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                  <input 
                    className="input-golden"
                    type="date" 
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Horário Preferido</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map((time) => (
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
