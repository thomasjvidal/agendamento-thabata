# 🗓️ Integração Google Calendar via Apps Script

## 📋 Visão Geral

Este sistema integra automaticamente o formulário de agendamento com o Google Calendar da Dra. Daniele usando Google Apps Script.

## ✅ Status Atual

✅ **Frontend Configurado** - Formulário enviando dados para Apps Script  
✅ **URL do Web App** - Configurada e funcional  
✅ **Tratamento de Erros** - Feedback ao usuário implementado  
✅ **EmailJS** - Confirmação por email implementada  

## 🔗 URL do Google Apps Script

```
https://script.google.com/macros/s/AKfycbzw_R194oJxJwJD2hNaM93gqgy7-E7qiHH9i8MN1963Sm7PgsBrHZcyH_1m3LmOJ2MSvA/exec
```

## 📤 Dados Enviados

O formulário envia os seguintes dados para o Apps Script:

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "24999887766", 
  "data": "2024-12-10",
  "horario": "14:00",
  "tipoAtendimento": "Primeira consulta",
  "tipoConsulta": "Endocrinologia",
  "valor": "300.00",
  "tituloEvento": "Consulta agendada com João Silva",
  "descricaoEvento": "Profissional: Dra. Daniele Ferreira (Endocrinologista)\nContato do paciente:\n- E-mail: joao@email.com\n- Telefone: 24999887766\n\nTipo: Primeira consulta\nEspecialidade: Endocrinologia\nValor: R$ 300,00\n\nLembrete: 30 minutos antes\nObservações: Levar exames atualizados e anotar dúvidas para a médica.",
  "lembreteMinutos": 30,
  "duracaoMinutos": 60,
  "localizacao": "Consultório Dra. Daniele Ferreira - Rio de Janeiro, RJ"
}
```

## 🎯 Funcionalidades Implementadas

### 1. **Envio Automático ao Google Calendar**
- Dados do formulário são enviados automaticamente
- Evento criado no Google Calendar da Dra. Daniele
- Título profissional: "Consulta agendada com [Nome do Paciente]"
- Descrição detalhada com todas as informações
- Lembrete automático de 30 minutos
- Duração padrão de 60 minutos
- Localização definida

### 2. **E-mail de Confirmação**
- EmailJS configurado para enviar emails reais
- Paciente recebe confirmação
- Dra. Daniele é notificada

### 3. **Tratamento de Erros**
- Feedback visual ao usuário (toasts)
- Logs detalhados no console
- Sistema robusto com fallbacks

### 4. **Formato Profissional do Evento**
- **Título**: "Consulta agendada com [Nome]"
- **Descrição**: Informações completas do paciente e consulta
- **Lembrete**: 30 minutos antes
- **Duração**: 60 minutos
- **Local**: Consultório especificado

## 🔧 Como Funciona

### Fluxo de Dados:
1. **Usuário preenche** o formulário de agendamento
2. **Clica em "Já realizei o pagamento"**
3. **Sistema envia dados** para Google Apps Script
4. **Apps Script cria evento** no Google Calendar
5. **EmailJS envia confirmação** por email
6. **Sistema mostra confirmação** ao usuário

### Código Implementado:
```typescript
// Enviar dados para o Google Apps Script
const response = await fetch(GOOGLE_CALENDAR_WEBAPP_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

// Enviar email via EmailJS
const emailResult = await emailjs.send(
  EMAILJS_CONFIG.serviceId,
  EMAILJS_CONFIG.templateId,
  emailParams,
  EMAILJS_CONFIG.publicKey
);
```

## 🧪 Como Testar

### 1. **Teste Local**
```bash
npm run dev
# Abrir http://localhost:8082
# Preencher formulário de agendamento
# Confirmar pagamento
# Verificar console do navegador para logs
```

### 2. **Verificar Resultados**
- Abrir Google Calendar da Dra. Daniele
- Verificar email na caixa de entrada
- Confirmar se evento foi criado

### 3. **Logs de Debug**
Abrir DevTools (F12) e verificar:
```
📋 Dados do agendamento para Google Calendar: {...}
🗓️ Enviando dados para Google Calendar...
📧 E-mail enviado com sucesso!
✅ Agendamento confirmado!
```

## ⚙️ Configurações

### Arquivo: `src/config/constants.ts`

```typescript
// URL do Google Apps Script
export const GOOGLE_CALENDAR_WEBAPP_URL = "https://script.google.com/macros/s/[SUA_URL]/exec";

// Configurações do EmailJS
export const EMAILJS_CONFIG = {
  serviceId: "service_XXXXXX",
  templateId: "template_XXXXXXX", 
  publicKey: "XXXXXXXXXXXXXXX",
  enabled: true
};
```

## 📋 **Google Apps Script - Código Atualizado**

Para usar os novos campos, atualize seu Google Apps Script:

```javascript
function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);
    
    // Configurar calendário
    const calendar = CalendarApp.getDefaultCalendar();
    
    // Criar data/hora do evento
    const [ano, mes, dia] = dados.data.split('-');
    const [hora, minuto] = dados.horario.split(':');
    const dataInicio = new Date(ano, mes-1, dia, hora, minuto);
    const dataFim = new Date(dataInicio.getTime() + (dados.duracaoMinutos * 60000));
    
    // Criar evento com novo formato
    const evento = calendar.createEvent(
      dados.tituloEvento, // "Consulta agendada com [Nome]"
      dataInicio,
      dataFim,
      {
        description: dados.descricaoEvento,
        location: dados.localizacao,
        guests: dados.email,
        sendInvites: true
      }
    );
    
    // Adicionar lembrete
    if (dados.lembreteMinutos) {
      evento.addPopupReminder(dados.lembreteMinutos);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        eventId: evento.getId(),
        message: 'Evento criado com sucesso!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 🎨 **Resultado no Google Calendar**

### **Título do Evento:**
```
Consulta agendada com João Silva
```

### **Descrição do Evento:**
```
Profissional: Dra. Daniele Ferreira (Endocrinologista)
Contato do paciente:
- E-mail: joao@email.com
- Telefone: (24) 99953-0806

Tipo: Primeira consulta
Especialidade: Endocrinologia
Valor: R$ 300,00

Lembrete: 30 minutos antes
Observações: Levar exames atualizados e anotar dúvidas para a médica.
```

### **Configurações:**
- 🔔 **Lembrete**: 30 minutos antes
- ⏱️ **Duração**: 60 minutos
- 📍 **Local**: Consultório Dra. Daniele Ferreira - Rio de Janeiro, RJ
- 📧 **Convite**: Enviado automaticamente para o paciente

## 🚀 Próximos Passos

1. ✅ **Integração básica** - Completa
2. ✅ **E-mails reais** - Configurado
3. ✅ **Google Calendar** - Integrado com formato profissional
4. ✅ **Descrição detalhada** - Implementada
5. 🔄 **Melhorias futuras** - Notificações SMS, confirmação de pagamento 