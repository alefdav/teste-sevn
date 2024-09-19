export async function makeRequest() {
  try {
    const response = await fetch('https://sevn-pleno-esportes.deno.dev/');
    
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.statusText);
    }

    const data = await response.json();
    sessionStorage.setItem('apiResponse', JSON.stringify(data));
    console.log('Dados salvos no sessionStorage:', data);
    return data; 
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    return null; 
  }
}