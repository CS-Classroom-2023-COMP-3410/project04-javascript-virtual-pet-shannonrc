const randIndex = function(lastIndex) {
    return Math.floor(Math.random() * (lastIndex + 1));
}

let allCards = [ 
    "&#127136;", "&#127137;", "&#127138;", "&#127139;", "&#127140;", "&#127141;",
    "&#127142;", "&#127143;", "&#127144;", "&#127145;", "&#127146;", "&#127147;",
    "&#127148;", "&#127149;", "&#127150;", "&#127153;", "&#127154;", "&#127155;",
    "&#127156;", "&#127157;", "&#127158;", "&#127159;", "&#127160;", "&#127161;",
    "&#127162;", "&#127163;", "&#127164;", "&#127165;", "&#127166;", "&#127167;",
    "&#127169;", "&#127170;", "&#127171;", "&#127172;", "&#127173;", "&#127174;",
    "&#127175;", "&#127176;", "&#127177;", "&#127178;", "&#127179;", "&#127180;",
    "&#127181;", "&#127182;", "&#127183;", "&#127185;", "&#127186;", "&#127187;",
    "&#127188;", "&#127189;", "&#127190;", "&#127191;", "&#127192;", "&#127193;",
    "&#127194;", "&#127195;", "&#127196;", "&#127197;", "&#127198;", "&#127199;" ];

let cardBack = allCards[0];
allCards.shift();

let gameDeck = [];
for(let i = 0; i < 8; i++) {
    let lastIndex = allCards.length - 1;
    r = randIndex(lastIndex);
    gameDeck.push(allCards[r]);
    allCards.splice(r, 1);
}

console.log(gameDeck);

gameDeck = gameDeck.concat(gameDeck);

// store flipped cards
let firstCard = null;
let secondCard = null;

// store the indexes in the deck
let firstIndex = null;
let secondIndex = null;

// stops clicking while flip back
let waiting = false;

// score is how many matches
let score = 0;

// moves is how many tries
let moves = 0;

// the timer
let seconds = 0;
let timerStarted = false;
let timerInterval = null;

let moveCountEl = document.getElementById("moveCount");
let timerEl = document.getElementById("timer");
let statusEl = document.getElementById("status");
let restartBtn = document.getElementById("restartBtn");


const handleClick = function(event) {

    // no click while card is flipping
    if(waiting === true) {
        return;
    }

    let clickedCard = event.target;
    let cardIdx = clickedCard.id.slice(5);

    // timer on first click
    if(timerStarted === false) {
        timerStarted = true;
        timerInterval = setInterval(function() {
            seconds = seconds + 1;
            timerEl.innerHTML = seconds;
        }, 1000);
    }

    // flip the clicked card
    clickedCard.innerHTML = gameDeck[cardIdx];

    // if firstCard is empty
    if(firstCard === null) {
        firstCard = clickedCard;
        firstIndex = cardIdx;
        return;
    }

    // if they click the same card twice 
    if(firstCard === clickedCard) {
        return;
    }
    secondCard = clickedCard;
    secondIndex = cardIdx;

    // flipped 2 cards so count as a move
    moves = moves + 1;
    moveCountEl.innerHTML = moves;

    if(gameDeck[firstIndex] === gameDeck[secondIndex]) {

        firstCard.onclick = null;
        secondCard.onclick = null;

        // add to score
        score = score + 1;

        firstCard = null;
        secondCard = null;
        firstIndex = null;
        secondIndex = null;

        // win when score is 8 matches
        if(score === 8) {
            statusEl.innerHTML = "YOU WIN!";
            clearInterval(timerInterval);
        }

    } else {

        waiting = true;

        setTimeout(function() {
            firstCard.innerHTML = cardBack;
            secondCard.innerHTML = cardBack;

            // reset
            firstCard = null;
            secondCard = null;
            firstIndex = null;
            secondIndex = null;

            waiting = false;
        }, 800);
    }
}


for(let i = 0; i < 16; i++) {
    document.querySelector('#card-'+i).onclick = handleClick;
}

// restarting
const restartGame = function() {

    // reset the variables
    firstCard = null;
    secondCard = null;
    firstIndex = null;
    secondIndex = null;
    waiting = false;
    score = 0;
    moves = 0;
    seconds = 0;
    timerStarted = false;
    moveCountEl.innerHTML = "0";
    timerEl.innerHTML = "0";
    statusEl.innerHTML = "";

    // stop time
    if(timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // flip everything back 
    for(let i = 0; i < 16; i++) {
        let card = document.querySelector('#card-'+i);
        card.innerHTML = cardBack;
        card.onclick = handleClick;
    }
}

restartBtn.onclick = restartGame;