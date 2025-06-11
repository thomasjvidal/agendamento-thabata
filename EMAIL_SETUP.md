# 📧 Configuração EmailJS - E-mails Reais

## 📋 Visão Geral

Sistema de envio de e-mails reais usando EmailJS. Quando um agendamento é confirmado:
- ✅ **Paciente recebe confirmação** por e-mail
- ✅ **Dra. Daniele é notificada** do novo agendamento
- ✅ **Logs detalhados** para monitoramento

## 🚀 Configuração Rápida (5 minutos)

### 1. Criar Conta EmailJS
- Acesse [emailjs.com](https://www.emailjs.com/)
- Clique "Sign Up" → Crie conta gratuita
- Confirme seu e-mail

### 2. Conectar Gmail
- No dashboard: "Add New Service"
- Escolha "Gmail" 
- Faça login com o Gmail da Dra. Daniele
- Autorize as permissões
- **Anote o Service ID** (ex: service_abc123)

### 3. Criar Template
- Vá em "Email Templates" → "Create New Template"
- Cole este template:

```
Assunto: Consulta Agendada - {{appointment_date}} às {{appointment_time}}

Olá {{to_name}},

Sua consulta com a Dra. Daniele Ferreira foi confirmada! 

📋 **DETALHES DA CONSULTA:**
• Paciente: {{patient_name}}
• Data: {{appointment_date}}
• Horário: {{appointment_time}}
• Tipo: {{appointment_type}}
• Especialidade: {{consultation_type}}
• Valor: {{appointment_value}}
• WhatsApp: {{whatsapp}}

📍 **LOCAL:**
Consultório da Dra. Daniele Ferreira
Endocrinologista - CRM-RJ 5201291467
Rio de Janeiro - RJ

📱 **CONTATO:**
WhatsApp: (24) 99988-7766

⚕️ **ORIENTAÇÕES:**
• Chegue 15 minutos antes do horário
• Traga seus exames mais recentes
• Traga lista de medicamentos em uso
• Documento com foto e carteirinha do convênio

Em caso de dúvidas, entre em contato pelo WhatsApp.

Atenciosamente,
{{from_name}}
```

- Salve como "template_agendamento"
- **Anote o Template ID** (ex: template_xyz789)

### 4. Pegar Chave da API
- Vá em "Integration" → "Browser"  
- **Copie a Public Key** (ex: abc123xyz789)

### 5. Configurar no Site
- Abra `src/config/constants.ts`
- Substitua estas linhas:

```typescript
export const EMAILJS_CONFIG = {
  serviceId: "SEU_SERVICE_ID_AQUI",     // Do passo 2
  templateId: "template_agendamento",    // Do passo 3
  publicKey: "SUA_PUBLIC_KEY_AQUI",     // Do passo 4
  enabled: true
};
```

### 6. Testar
- Recarregue o site (`npm run dev`)
- Faça um agendamento de teste
- Confira se o e-mail chegou

## 📊 Monitoramento

### Logs no Console:
```
🚀 Iniciando envio de e-mail...
📧 Configuração EmailJS: {serviceId: "service_...", ...}
📋 Parâmetros do e-mail: {to_name: "João", ...}
✅ EmailJS configurado, enviando e-mail...
🎉 E-mail enviado com sucesso! {status: 200, ...}
```

### Em caso de erro:
```
❌ ERRO ao enviar e-mail: Error details...
```

## 🔧 Personalização

### Campos Disponíveis no Template:
- `{{to_name}}` - Nome do paciente
- `{{to_email}}` - E-mail do paciente
- `{{from_name}}` - "Dra. Daniele Ferreira"
- `{{patient_name}}` - Nome completo
- `{{appointment_type}}` - "Primeira consulta" ou "Retorno"
- `{{consultation_type}}` - Especialidade escolhida
- `{{appointment_date}}` - Data da consulta
- `{{appointment_time}}` - Horário da consulta
- `{{appointment_value}}` - Valor da consulta
- `{{whatsapp}}` - Telefone do paciente
- `{{doctor_name}}` - "Dra. Daniele Ferreira"

## 🎯 Benefícios

✅ **E-mails reais** - Não vai para spam  
✅ **Fácil configuração** - 5 minutos  
✅ **Gratuito** - 200 e-mails/mês  
✅ **Confiável** - 99.9% de entrega  
✅ **Profissional** - Template personalizado  

## ⚠️ Resolução de Problemas

### E-mail não enviado:
1. Verificar se Service ID está correto
2. Confirmar Template ID
3. Validar Public Key
4. Verificar logs no console

### E-mail vai para spam:
1. Usar domínio personalizado no EmailJS
2. Configurar SPF/DKIM
3. Evitar palavras gatilho

### Limite excedido:
1. Upgrade para plano pago
2. Usar múltiplas contas
3. Implementar cache para evitar duplicatas

## 📞 Suporte

Em caso de dúvidas:
1. Verificar documentação: [docs.emailjs.com](https://www.emailjs.com/docs/)
2. Testar no dashboard do EmailJS
3. Verificar console do navegador 