// DECK STUFF FROM REPLIT =================================
// Constants
const suits = ["s", "c", "d", "h"];
const ranks = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
renderDeckInContainer(
  masterDeck,
  document.getElementById("master-deck-container")
);

/*----- app's state (variables) -----*/
let shuffledDeck;
// USE THIS TO GET THE CARDS USING THEIR INDEX's

/*----- cached element references -----*/
const shuffledContainer = document.getElementById("shuffled-deck-container");

/*----- functions -----*/
function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function renderNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  renderDeckInContainer(shuffledDeck, shuffledContainer);
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = "";
  // Let's build the cards as a string of HTML
  let cardsHtml = "";
  deck.forEach(function (card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === "A" ? 11 : 10),
      });
    });
  });
  return deck;
}

renderNewShuffledDeck();

/*----- constants =======================================================-----*/

// something to do with moving the images might not need it

/*----- state variables -----*/ // These will be changed as it goes on
let playerCards;
let computerCards;
let cardTotals;
let scores;
let winner;
let wins;
let draws;
let losses;
//  BOOLEANS to check things in the game
let gameStart = false;
let turnEnd = false;

/*----- cached elements  -----*/
// Selecting the Buttons from DOM
const hitBtn = document.querySelector("#hit-btn");
const betBtn = document.querySelector("#bet-btn");
const standBtn = document.querySelector("#stand-btn");
// Selecting Scores from DOM
const winScoreEl = document.querySelector("#wins-scores");
const lossScoreEl = document.querySelector("#loss-scores");
const drawScoreEl = document.querySelector("#draw-scores");
// Selecting the totals
const compTotalEl = document.querySelector("#comp-total");
const playerTotalEl = document.querySelector("#player-total");
// Select the card images for player and computer
const compCardImages = {
  compCardOneEl: document.querySelector("#compcard-1"),
  compCardOneImage: document.querySelector("#computercardimage-1"),
  compCardTwoEl: document.querySelector("#compcard-2"),
  compCardTwoImage: document.querySelector("#computercardimage-2"),
  compCardThreeEl: document.querySelector("#compcard-3"),
  compCardFourEl: document.querySelector("#compcard-4"),
};
// Select Player Card images
const playerCardImages = {
  playerCardOneEl: document.querySelector("#playercard-1"),
  playerCardOneImage: document.querySelector("#playercardimage-1"),
  playerCardTwoEl: document.querySelector("#playercard-2"),
  playerCardTwoImage: document.querySelector("#playercardimage-2"),
  playerCardThreeEl: document.querySelector("#playercard-3"),
  playerCardFourEl: document.querySelector("#playercard-4"),
};
//     // Grab button section to add in the new buttons when game starts
// const buttonSectionEl = document.querySelector('#button-section')

/*----- event listeners -----*/
betBtn.addEventListener("click", dealCards);
hitBtn.addEventListener("click", playerHitCard);
standBtn.addEventListener("click", playerStandCard);

init(); // CALL INIT FUNCTION
/*----- functions -----*/

function dealCards() {
  // runs when bet button is clicked
  // insert something here to spit out images from a randomly chosen card
  // When button is clicked create two new button elements
  // remove display none class and add btn class to make them appear
  hitBtn.classList.remove("display-none");
  hitBtn.classList.add("btn");
  standBtn.classList.remove("display-none");
  standBtn.classList.add("btn");

  // Remove the two cards that are showing to display none
  playerCardImages.playerCardOneImage.classList.add("display-none");
  playerCardImages.playerCardTwoImage.classList.add("display-none");

  // Take out cards that were played for player
  removedCardOne = shuffledDeck.pop();
  removedCardTwo = shuffledDeck.pop();

  // Now need to add to the total for player cards
  cardTotals.player += removedCardOne.value;
  cardTotals.player += removedCardTwo.value;

  // Make them deal random cards from the deck and switch the images
  const playerFirstCard = document.createElement("div");
  // give it styling
  playerFirstCard.setAttribute("class", `card ${removedCardOne.face}`);
  playerCardImages.playerCardThreeEl.appendChild(playerFirstCard);
  // create card two and show it on the screen
  const playerSecondCard = document.createElement("div");
  // give it styling whatever index 1 is card and then the face of it will be the class name
  playerSecondCard.setAttribute("class", `card ${removedCardTwo.face}`);
  playerCardImages.playerCardFourEl.appendChild(playerSecondCard);


  // ADD IN COMPUTER CARDS =================
  // Remove the two cards that are showing to display none
  compCardImages.compCardOneImage.classList.add("display-none");

  // Remove card drawn for comp
  removedCardThree = shuffledDeck.pop();

  // Make them deal random cards from the deck and switch the images
  const compFirstCard = document.createElement("div");
  // give it styling aka class = what card shows
  compFirstCard.setAttribute("class", `card ${removedCardThree.face}`);
  compCardImages.compCardThreeEl.appendChild(compFirstCard);
  // create card two and show it on the screen
  // const compSecondCard = document.createElement('div')

  // Now need to add to the total for player cards
  cardTotals.computer += removedCardThree.value;

  // if they get 21 off bat winner is losses on scoreboard
  // add in computer wins later on the screen if I have time

    if(cardTotals.player === 21){
        console.log('YOU GOT 21')
        winner = 'wins'
    } else if (cardTotals.player > 21){
        console.log('You Busted')
        winner = 'losses'
    }

    scores[winner] +=1 

  render();
}

function playerHitCard() {
  // Add stuff to add to total of cards and display another card
  // Make them deal random cards from the deck and switch the images
  removedCardFour = shuffledDeck.pop();

  // Make them deal random cards from the deck and switch the images
  const playerNewCard = document.createElement("div");
  // give it styling aka class = what card shows
  playerNewCard.setAttribute("class", `card ${removedCardFour.face}`);
  playerCardImages.playerCardThreeEl.appendChild(playerNewCard);
  // create card two and show it on the screen
  // const compSecondCard = document.createElement('div')

  // Now need to add to the total for player cards
  cardTotals.player += removedCardThree.value;
  
winnerMessage()

  render();
}

function winnerMessage(){
    if (cardTotals.player > 21){
        console.log('BUST!')
        winner = 'losses'
    } else if (cardTotals.player > cardTotals.computer || cardTotals.computer > 21){
        console.log('YOU WIN!')
        winner = 'wins'
    } else if (cardTotals.player === cardTotals.computer){
        console.log('PUSH AKA DRAW')
        winner = 'draws'
    } else {}
    scores[winner] += 1
    
    render()
}

function compHitCard() {
  // Add in if statement if less than 17 draww more cards
}



function playerStandCard() {
      if(cardTotals.computer < 17){
        removedCardFive = shuffledDeck.pop();

  // Make them deal random cards from the deck and switch the images
  const computerNewCard = document.createElement("div");
  // give it styling aka class = what card shows
  computerNewCard.setAttribute("class", `card ${removedCardFive.face}`);
  compCardImages.compCardFourEl.appendChild(computerNewCard);
  // Now need to add to the total for cards
  cardTotals.computer += removedCardFive.value;
  
      } else if (cardTotals === 21)

    
}


function compStandCard() {}

function checkScores() {}

function randomCard() {
  // Add stuff to get random cards probably not needed
  const random = ranks[Math.floor(Math.random() * ranks.length)];
  console.log(random);
}

// Function is to Reset the game
function init() {
  // set inital scores to 0
  scores = {
    wins: 0,
    draws: 0,
    losses: 0,
  };
  // set inital totals to 0
  cardTotals = {
    player: 0,
    computer: 0,
  };

  getNewShuffledDeck();

  winner = null; // eventually it would be wins draws or losses

  render(); // call render function
}

function render() {
  // Called after every controller function which updates the DOM to show everything
  // Add what scores shouldd be set to here
  // Set scores = to whatever scores object is set to
  winScoreEl.innerText = scores.wins;
  drawScoreEl.innerText = scores.draws;
  lossScoreEl.innerText = scores.losses;

  // Set card totals to whatever cardTotals.comp or player is set or changed to
  compTotalEl.innerText = cardTotals.computer;
  playerTotalEl.innerText = cardTotals.player;
}
