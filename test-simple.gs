/**
 * TESTE SIMPLES - Google Apps Script
 */

function doPost(e) {
  try {
    Logger.log('POST recebido');
    
    if (!e || !e.postData) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          error: 'Dados não encontrados' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = JSON.parse(e.postData.contents);
    Logger.log('Dados:', data);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Teste OK',
        received: data
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    Logger.log('Erro:', err);
    
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
    .createTextOutput('Sistema Teste - OK ✅')
    .setMimeType(ContentService.MimeType.TEXT);
} 