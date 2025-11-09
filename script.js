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
            displayCards(allCards.slice(0, 50)); // Mostra as primeiras 50
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
        const cardElement = document.createElement('div');
        cardElement.className = 'card';

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