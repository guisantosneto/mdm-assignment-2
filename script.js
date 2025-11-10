const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
let allCards = []; // Variável para guardar TODAS as cartas

// 1. Elementos do DOM
const container = document.getElementById('card-container');
const searchBar = document.getElementById('search-bar');

// 2. Ouvinte de eventos para a barra de pesquisa
// (Dispara sempre que o utilizador escreve algo)
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    
    const filteredCards = allCards.filter(card => {
        return card.name.toLowerCase().includes(searchString);
    });
    
    displayCards(filteredCards.slice(0, 50)); // Mostra os primeiros 50 resultados da filtragem
});

// 3. Função para ir buscar os dados à API
const loadCards = () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            allCards = data.data; // Guarda todas as cartas
            // Já não mostramos nada no início!
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
            container.innerHTML = "<p>Não foi possível carregar as cartas.</p>";
        });
};

// 4. Função para MOSTRAR as cartas no ecrã
// (Separamos esta lógica para a podermos reutilizar)
const displayCards = (cards) => {
    container.innerHTML = ''; // Limpa o container primeiro
    
    cards.forEach(card => {
        // AGORA É UM LINK (<a>) EM VEZ DE UMA DIV
        const cardElement = document.createElement('a');
        cardElement.className = 'card'; // Continuamos a usar a classe .card
        
        // Esta é a parte mais importante:
        // Define o link para a nova página e passa o ID da carta na URL
        cardElement.href = `card.html?id=${card.id}`; 

        cardElement.innerHTML = `
            <h3>${card.name}</h3>
            <img src="${card.card_images[0].image_url_small}" alt="${card.name}">
            <p>${card.type}</p>
        `;

        container.appendChild(cardElement);
    });
};

// 5. Inicia o processo
loadCards();

// --- INTERAÇÃO DO MENU ---
document.getElementById('menu-btn').addEventListener('click', () => {
    document.getElementById('side-menu').classList.toggle('open');
});