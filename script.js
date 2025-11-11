const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
let allCards = []; 

const container = document.getElementById('card-container');
const searchBar = document.getElementById('search-bar');
const randomBtn = document.getElementById('random-btn');

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    
    const filteredCards = allCards.filter(card => {
        return card.name.toLowerCase().includes(searchString);
    });
    
    displayCards(filteredCards.slice(0, 50));
});

randomBtn.addEventListener('click', () => {
    if (allCards.length > 0) {
        const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
        window.location.href = `card.html?id=${randomCard.id}`;
    } else {
        alert('Cards are still loading, please try again!');
    }
});

const loadCards = () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            allCards = data.data; 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

const displayCards = (cards) => {
    container.innerHTML = ''; 
    
    cards.forEach(card => {
        const cardElement = document.createElement('a');
        cardElement.className = 'card';
        cardElement.href = `card.html?id=${card.id}`; 

        cardElement.innerHTML = `
            <h3>${card.name}</h3>
            <img src="${card.card_images[0].image_url_small}" alt="${card.name}">
            <p>${card.type}</p>
        `;

        container.appendChild(cardElement);
    });
};

loadCards();