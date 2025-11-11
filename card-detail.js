document.addEventListener('DOMContentLoaded', () => {
    
    const params = new URLSearchParams(window.location.search);
    const cardId = params.get('id');

    if (cardId) {
        fetchCardDetails(cardId);
    } else {
        document.getElementById('card-detail-container').innerHTML = 
            "<p>Error: Card ID not found.</p>";
    }
});

const fetchCardDetails = (id) => {
    const apiUrl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`;
    const container = document.getElementById('card-detail-container');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const card = data.data[0]; 
            renderCardDetails(card, container);
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = "<p>Could not load card details.</p>";
        });
};

const renderCardDetails = (card, container) => {
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
                <p><strong>Type:</strong> ${card.type}</p>
                <p><strong>Race:</strong> ${card.race}</p>
                <p><strong>Attribute:</strong> ${card.attribute ?? 'N/A'}</p>
                <p><strong>Level/Rank:</strong> ${level}</p>
                <p><strong>ATK / DEF:</strong> ${atk} / ${def}</p>
                
                <h3>Description:</h3>
                <p class="description">${card.desc.replace(/\r\n/g, '<br>')}</p>
            </div>
        </div>
    `;
};