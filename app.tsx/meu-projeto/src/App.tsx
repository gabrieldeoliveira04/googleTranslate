import { useEffect } from 'react';
import './App.css';

// Declara a função global(exigência do typescript) no escopo da janela
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

function App() {
  useEffect(() => {
    // verifica se a função ja foi chamada pra não criar vários botões
    if (document.getElementById('google-translate-script')) return;
     // Define a função que o script do Google chama quando estiver pronto
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'pt', //idioma padrão da página
          includedLanguages: 'en,pt,fr,es', //idiomas adicionados(pode-se adicionar mais)
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE //layout do seletor(padrão do google)
        },
        'google_translate_element' // id do container onde o widget será inserido
      );
    };
// Cria dinamicamente o script do Google Tradutor e insere no body e solicita a api do link
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []); // faz com que a função só execute uma vez ao carregar o elemento

  return (
    <>
      <div id="google_translate_element" /> {/* container do widget de idioma */}
      <h1>Olá Mundo</h1>
    </>
  );
}

export default App;

