// js/wordcloud.js

document.addEventListener('DOMContentLoaded', () => {
    const cloudContainer = document.getElementById('word-cloud');
    
    // Controllo di sicurezza: esegui solo se il contenitore esiste nella pagina
    if (!cloudContainer) return;

    // 1. Estraiamo e contiamo gli argomenti dal dataset 'lettere' (che deve essere già caricato)
    const tuttiGliArgomenti = lettere.flatMap(l => l.argomenti);
    const conteggioArgomenti = {};
    
    tuttiGliArgomenti.forEach(arg => {
        conteggioArgomenti[arg] = (conteggioArgomenti[arg] || 0) + 1;
    });

    // 2. Generiamo i bottoni per ogni argomento unico
    Object.keys(conteggioArgomenti).forEach(arg => {
        const occorrenze = conteggioArgomenti[arg];
        const link = document.createElement('a');
        
        link.href = `catalogo.html?argomento=${encodeURIComponent(arg)}`;
        
        // Calcolo dimensione font dinamica
        const fontSize = 1 + (occorrenze * 0.3); 
        
        link.className = "btn btn-primary btn-cloud shadow-sm";
        link.style.fontSize = `${fontSize}rem`;
        link.style.borderRadius = "20px";
        link.style.margin = "5px";
        link.textContent = arg;

        cloudContainer.appendChild(link);
    });
});