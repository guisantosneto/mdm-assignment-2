// --- INTERAÇÃO DO MENU ---
document.getElementById('menu-btn').addEventListener('click', () => {
    document.getElementById('side-menu').classList.toggle('open');
});

// ... (O resto do teu código: addEventListener DOMContentLoaded, fetchCardDetails, etc.) ...

// Espera que a página carregue
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Apanha o ID da URL
    const params = new URLSearchParams(window.location.search);
    const cardId = params.get('id');

    if (cardId) {
        // 2. Chama a API com esse ID específico
        fetchCardDetails(cardId);
    } else {
        document.getElementById('card-detail-container').innerHTML = 
            "<p>Erro: ID da carta não encontrado.</p>";
    }
});

const fetchCardDetails = (id) => {
    const apiUrl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`;
    const container = document.getElementById('card-detail-container');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // A API retorna um array 'data' com 1 item
            const card = data.data[0]; 
            // 3. Constrói o HTML
            renderCardDetails(card, container);
        })
        .catch(error => {
            console.error('Erro:', error);
            container.innerHTML = "<p>Não foi possível carregar os detalhes.</p>";
        });
};

const renderCardDetails = (card, container) => {
    // Para cartas sem ATK/DEF (ex: Magias), mostra 'N/A'
    const atk = card.atk ?? 'N/A';
    const def = card.def ?? 'N/A';
    const level = card.level ?? 'N/A';

    container.innerHTML = `
        <div class="detail-card">
            <div class="detail-image">
                <img src="${card.card_images[0].image_url}" alt="${card.name}">
            </div>
            <div class="detail-info">
                <h2>${card.name}</h2>
                <p><strong>Tipo:</strong> ${card.type}</p>
                <p><strong>Raça:</strong> ${card.race}</p>
                <p><strong>Atributo:</strong> ${card.attribute ?? 'N/A'}</p>
                <p><strong>Nível/Rank:</strong> ${level}</p>
                <p><strong>ATK / DEF:</strong> ${atk} / ${def}</p>
                
                <h3>Descrição:</h3>
                <p class="description">${card.desc.replace(/\r\n/g, '<br>')}</p>
            </div>
        </div>
    `;
};