/*
 * Create a list that holds all of your cards
 */
let deck = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
let openCards = [];
matchedCards = [],
matches = 0,
moves = 0,
time = 0;
gameActive = false;
const mainDeck = document.getElementById('main-deck');
const movesDisplay = document.querySelector('.moves'),
starDisplay = document.querySelector('.stars'),
timeDisplay = document.querySelector('.time');
restartButton = document.querySelector('.restart'),
modalRestartButton = document.querySelector('.modal-restart'),
modal = document.querySelector('.modal'),
modalTime = document.querySelector('.modal-time'),
modalMoves = document.querySelector('.modal-moves'),
modalStars = document.querySelector('.modal-stars');
var stopTimer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function createDeck() {
  // Remove existing deck
  mainDeck.innerHTML = "";
  for (let i = 0; i < deck.length; i++) {
    let shuffledDeck = document.createElement('li');
    shuffledDeck.className = "card";
    shuffledDeck.onclick = function(event) {
      if (openCards.length == 2) {
        return;
      }
      if (shuffledDeck !== event.target) return;
      if (event.target.classList.contains('open')) {
        return;
      }
      showCard();
      moveCounter();
      addCard(event); // This parameter event here is used from the accepted parameter above 
      compareCards();
      gameOver();
      gameTimer();
    };
    let shuffledCards = document.createElement('i');
    shuffledCards.className = deck[i];

    mainDeck.appendChild(shuffledDeck);
    shuffledDeck.appendChild(shuffledCards);
  }
}
shuffle(deck);
createDeck();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// Show a card
function showCard() {
  event.target.classList.add('open', 'show');
}


function increaseMatch() {
  matches = matches + 1;
}


function moveCounter() {
  moves = moves + 0.5;
  movesDisplay.innerHTML = Math.floor(moves);
  starTracker(moves);
}


function starTracker(moves) {
  if (moves <= 15) {
    stars = '★★★';
  } else if (moves <= 20) {
    stars = '★★';
  } else {
    stars = '★';
  }
  starDisplay.innerHTML = stars;
}


function gameTimer() {
  if (gameActive == false) {
    gameActive = true;
    stopTimer = setInterval(function() {
      time = time + 1;
      timeDisplay.innerHTML = time + " seconds";
    }, 1000);
  }
}


function startOver() {
  window.location.reload();
}


function gameOver() {
  if (matchedCards.length == 16) {
    clearInterval(stopTimer);
    setTimeout(function() {
      modal.classList.add('modal-is-visible');
      modalMoves.innerHTML = moves;
      modalStars.innerHTML = "You got " + stars + "  stars, good job!";
      modalTime.innerHTML = time;
    }, 400);
  }
}


restartButton.addEventListener('click', startOver);
modalRestartButton.addEventListener('click', startOver);
// Remember: Function can't access variables defined inside another function.

function addCard(event) {
  openCards.push(event.target);
}


function compareCards() {
  if (openCards.length > 1) {
    if (openCards[0].childNodes[0].className == openCards[1].childNodes[0].className) {
      increaseMatch();
      // openCards[0].classList.add('card');
      // openCards[0].classList.add('match');
      // openCards[1].classList.add('card');
      // openCards[1].classList.add('match')
      openCards[0].className = 'card match grow';
      openCards[1].className = 'card match grow';
      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);
      openCards = [];
    } else {
      openCards[0].className = 'card wobble show';
      openCards[1].className = 'card wobble show';
      setTimeout(function() {
        openCards[0].className = 'card';
        openCards[1].className = 'card';
        openCards = [];
      }, 600);
    }
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
