/*
 * Create a list that holds all of your cards
 */
let deck = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];
let openCards = [],
matchedCards = [],
matches = 0,
attempts = 0,
gameActive = false;
const mainDeck = document.getElementById('main-deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function createDeck() {       
     // Remove existing deck
    mainDeck.innerHTML = "";  
    for (let i = 0; i < deck.length; i++){
        let shuffledDeck = document.createElement('li');
        shuffledDeck.className = "card";        
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
    var currentIndex = array.length, temporaryValue, randomIndex;

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
function showCard(){
    event.target.classList.add('open'); 
    event.target.classList.add('show');
}


function increaseMatch(){
    matches = matches + 1;
}


// Add shown card to new array and check to see if a match occurs 
document.addEventListener('click', function(event){
    // To prevent user from clicking the same card twice.
    if (event.target.classList.contains('open')) {
        return; 
    }
    showCard();
    addCard(event); // This parameter event here is used from the accepted parameter above 
    compareCards(); 
})

// Remember: Function can't access variables defined inside another function.

function addCard(event){
    openCards.push(event.target);
}


function compareCards(){
    if (openCards.length === 2){   
        if (openCards[0].childNodes[0].className == openCards[1].childNodes[0].className){
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
            openCards[0].className = 'wobble';
            openCards[1].className ='wobble';
            setTimeout(function(){ 
                openCards[0].classList.add('card');
                openCards[1].classList.add('card');               
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
