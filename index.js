/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';

// create a list of objects to store the data about the games
const GAMES_JSON = JSON.parse(games);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop through each game in the array
    for (let game of games) {
        // Create a new div element for the game card
        const gameCard = document.createElement("div");

        // Add the class 'game-card' to the div's class list
        gameCard.classList.add("game-card");

        // Set the inner HTML of the game card using a template literal
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <p><strong>Description:</strong> ${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers}</p>
        `;

        // Append the game card to the games container
        const gamesContainer = document.getElementById("games-container");
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function to add all games to the page
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// Use reduce() to calculate the total number of contributions
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Use reduce() to calculate the total amount raised
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesMessage = numUnfundedGames === 1
    ? `There is currently ${numUnfundedGames} unfunded game.`
    : `There are currently ${numUnfundedGames} unfunded games.`;

// create a new DOM element containing the template string and append it to the description container
const unfundedGamesInfo = document.createElement("p");
unfundedGamesInfo.innerHTML = unfundedGamesMessage;
descriptionContainer.appendChild(unfundedGamesInfo);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = `Top Game: ${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `Runner Up: ${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);
