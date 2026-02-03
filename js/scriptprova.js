
// =======================
// POPOLA SELECT
// =======================
function popolaSelect(idSelect, valori) {
	const select = document.getElementById(idSelect);
	[...new Set(valori)].forEach(valore => {
	const option = document.createElement("option");
	option.value = valore;
	option.textContent = valore;
	select.appendChild(option);
	});
}

popolaSelect("filtroTitolo", lettere.map(l => l.titolo));
popolaSelect("filtroNumero", lettere.map(l => l.numero));
popolaSelect("filtroDestinatario", lettere.map(l => l.destinatario));
popolaSelect("filtroLuogo", lettere.map(l => l.luogo));
popolaSelect("filtroArgomento", lettere.flatMap(l => l.argomenti));
// =======================
// FILTRO MULTIPLO
// =======================


function filtraLettere() {
	const testo = document.getElementById("searchBar").value.toLowerCase().trim();
	const titolo = document.getElementById("filtroTitolo").value;
	const numero = document.getElementById("filtroNumero").value;
	const destinatario = document.getElementById("filtroDestinatario").value;
	const luogo = document.getElementById("filtroLuogo").value;
	const argomento = document.getElementById("filtroArgomento").value;

	const risultati = lettere.filter(l => {

	//  ricerca libera
	if (testo) {
	const matchTesto = Object.values(l).some(v =>
	v.toString().toLowerCase().includes(testo)
	);
	if (!matchTesto) return false;
	}

	//  filtri strutturati
	if (titolo && l.titolo !== titolo) return false;
	if (numero && l.numero != numero) return false;
	if (destinatario && l.destinatario !== destinatario) return false;
	if (luogo && l.luogo !== luogo) return false;

	//  filtro argomenti (ARRAY!)
	if (
		argomento &&
		!l.argomenti
			.map(a => a.toLowerCase().trim())
			.includes(argomento.toLowerCase().trim())
		) return false;

	return true;
	});

	mostraRisultati(risultati);
}


// =======================
// OUTPUT RISULTATI
// =======================

function mostraRisultati(lista) {
	const container = document.getElementById("risultati");
	container.innerHTML = "";

	if (lista.length === 0) {
		container.innerHTML = `
		<div class="alert alert-warning">
		Nessun risultato trovato
		</div>
		`;
		return;
	}

	const row = document.createElement("div");
	row.className = "row g-3";

	lista.forEach(l => {
		const col = document.createElement("div");
		col.className = "col-12 col-md-6 col-lg-4";

		col.innerHTML = `
			<div class="card h-100 shadow-sm">
				<div class="card-body d-flex flex-column flex-fill categorieDC">
				<a href="${l.url}"><img src="${l.immagine}" class="card-img-top p-1 image" alt="Immagine lettera ${l.immagine}"></a>
				<h5 class="card-title">${l.titolo}</h5>
				<h6 class="card-subtitle mb-2 text-muted">Lettera n. ${l.numero}</h6>
				
				<ul class="list-unstyled mt-3 mb-4">
					<li><strong>Destinatario:</strong> ${l.destinatario}</li>
					<li><strong>Data:</strong> ${l.data}</li>
					<li><strong>Luogo:</strong> ${l.luogo}</li>
					
				</ul>

				<a href="${l.url}" class="btn btn-primary" role="button">Vai alla lettera</a>
				</div>
			</div>
		`;

		row.appendChild(col);
	});

	container.appendChild(row);
}

// =======================
// EVENT LISTENER
// =======================

// 1. Esegui la funzione una volta all'avvio per mostrare tutto il catalogo subito
mostraRisultati(lettere);

// 2. Collega il filtraggio al click del bottone
const tastoFiltra = document.getElementById("btnFiltra");

tastoFiltra.addEventListener("click", () => {
    filtraLettere();
    
    // Opzionale: Chiude l'accordion su mobile dopo aver filtrato
    const accordionElement = document.getElementById('collapseOne');
    const bsCollapse = bootstrap.Collapse.getInstance(accordionElement);
    if(bsCollapse) {
        bsCollapse.hide();
    }
});

// Funzione per leggere i parametri dall'URL e filtrare all'avvio
function controllaParametriURL() {
    const params = new URLSearchParams(window.location.search);
    const argomentoDaCloud = params.get('argomento');

    if (argomentoDaCloud) {
        const selectArgomento = document.getElementById("filtroArgomento");
        
        // Imposta il valore della select
        selectArgomento.value = argomentoDaCloud;
        
        // Esegue il filtro
        filtraLettere();
        
        // (Opzionale) Chiude l'accordion per mostrare subito i risultati
        const collapseElement = document.getElementById('collapseOne');
        if (collapseElement) {
            const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });
            bsCollapse.hide();
        }
    } else {
        // Se non ci sono parametri, mostra comunque tutto il catalogo
        mostraRisultati(lettere);
    }
}

// Avvia il controllo quando la pagina è pronta
document.addEventListener('DOMContentLoaded', controllaParametriURL);