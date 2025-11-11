# Yu-Gi-Oh! Card Finder

This project was developed for the Web Development (2025) course at the University of Coimbra. The primary goal was to create a static, yet dynamic, website demonstrating modern front-end skills, including API consumption, responsive design, and user interaction.

## About The Project

The website functions as a visual search engine for Yu-Gi-Oh! cards. The homepage presents the user with a minimalist, search-focused design, allowing for two main actions: searching for a card by name or discovering a random card.

All card information is fetched in real-time from the public [YGOProDeck API](https://db.ygoprodeck.com/api-guide/). The site was built entirely with HTML5, CSS3, and vanilla JavaScript (ES6+), without relying on any external libraries or frameworks.

## Features and Technical Implementation

The user experience begins with a centered hero container, where a name search dynamically filters results (using JavaScript) without requiring a page reload. The search results appear in a responsive grid (created with CSS Grid) below the search area.

Upon clicking a card (either from the search results or via the "Random Card" button), the user is redirected to a details page. This page isolates the card ID from the URL (using `URLSearchParams`), makes a new `fetch` call to the API to get the complete data for that specific card, and dynamically populates the page template with its stats, description, and high-resolution artwork.

The design is mobile-first and utilizes media queries to ensure the interface adapts correctly to all screen sizes, from mobile phones to desktops.

## Website

The site is hosted and publicly available via GitHub Pages:

https://guisantosneto.github.io/mdm-assignment-2/