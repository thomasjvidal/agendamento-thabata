/**
 * GOOGLE APPS SCRIPT - Sistema de Agendamento Dra. Daniele Ferreira
 * Versão 28 - Descrição limpa no Google Calendar (WhatsApp via email)
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    console.log('📥 Dados recebidos:', data);

    const start = new Date(`${data.appointment_date}T${data.appointment_time}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hora depois

    console.log('📅 Criando evento no calendário...');
    console.log('⏰ Data/hora início:', start);
    console.log('⏰ Data/hora fim:', end);

    // Formatações
    const especialidadeCap = data.consultation_type.charAt(0).toUpperCase() + data.consultation_type.slice(1);
    
    // Formatar data brasileira
    const dataObj = new Date(data.appointment_date);
    const dataFmt = dataObj.toLocaleDateString('pt-BR');
    const horaFmt = data.appointment_time.slice(0, 2) + 'h';

    // 📝 DESCRIÇÃO LIMPA E PROFISSIONAL
    const description = [
      `📋 Detalhes da Consulta`,
      ``,
      `👤 Paciente: ${data.patient_name}`,
      `📞 Telefone: ${data.phone}`,
      `📧 Email: ${data.email}`,
      ``,
      `🏥 Atendimento: ${data.appointment_type}`,
      `🔬 Especialidade: ${especialidadeCap}`,
      `💰 Valor: R$ ${data.appointment_value}`,
      ``,
      `📅 Data: ${dataFmt}`,
      `🕐 Horário: ${horaFmt}`,
      ``,
      `📝 Observação: WhatsApp automático disponível via email da notificação`
    ].join('\n');

    // Criar evento usando a Calendar API avançada
    const eventRequest = {
      summary: `${data.appointment_type} - ${data.patient_name}`,
      description: description,
      start: {
        dateTime: start.toISOString(),
        timeZone: 'America/Sao_Paulo'
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: 'America/Sao_Paulo'
      },
      attendees: [
        { email: data.email },
        { email: 'contatodradanieleferreira@gmail.com' }
      ],
      conferenceData: {
        createRequest: {
          requestId: 'req-' + Date.now(),
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 1440 }, // 24h antes
          { method: 'email', minutes: 60 }    // 1h antes
        ]
      }
    };

    console.log('🚀 Criando evento com Meet link...');
    
    const event = Calendar.Events.insert(
      eventRequest, 
      'primary', 
      { conferenceDataVersion: 1 }
    );

    console.log('✅ Evento criado:', event.id);
    
    let meetLink = 'https://meet.google.com/new';
    
    if (event.conferenceData && event.conferenceData.entryPoints) {
      const meetEntry = event.conferenceData.entryPoints.find(ep => ep.entryPointType === 'video');
      if (meetEntry) {
        meetLink = meetEntry.uri;
        console.log('🎯 Meet link obtido:', meetLink);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        eventId: event.id,
        meetLink: meetLink,
        message: 'Evento criado com sucesso! WhatsApp disponível via email.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    console.error('❌ Erro:', err);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: err.message 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Sistema de Agendamento Dra. Daniele Ferreira - Versão 28 ✅')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Função de teste
function testFunction() {
  const testData = {
    patient_name: "Thomas J. Vidal",
    appointment_type: "Primeira consulta",
    consultation_type: "metabolismo",
    appointment_date: "2025-06-11",
    appointment_time: "14:00",
    appointment_value: "350.00",
    email: "teste@email.com",
    phone: "21999999999"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('🧪 Teste:', result.getContent());
}

 