const gameContainer = document.getElementById('game');
let firstCard = null;
let secondCard = null; 
let startGame = document.getElementById('start-game');
let reset = document.getElementById('reset-game');
let scoreBoard = document.getElementById('scoreBoard');
let cardsId = []; 
let cardsSelected = [];
let matched = 0; 
let canClick = true; 


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (!canClick) return; //check to prevent clicking too quickly 
  let selected = event.target;
  selected.style.backgroundColor = selected.classList[0];

  //finds the index of the clicked element in its parent list of children, 
  //uses that index to get the color from COLOR array, assigns to empty arrays.
  const index = Array.from(selected.parentNode.children).indexOf(selected); 
  cardsSelected.push(COLORS[index]); 
  cardsId.push(selected); 
  this.classList.add('flip');

  //after 2 cards selected, will not allow for more cards to be picked,
  //moves to check for a match. 
  if (cardsId.length === 2) {
    canClick = false;
    setTimeout (checkForMatch, 1000); 
  }

  function checkForMatch() {
    const [firstCard, secondCard] = cardsId;
    const [firstColor, secondColor] = cardsSelected;
    if (firstColor === secondColor && firstCard !== secondCard) {
      alert ('You have a match!');
      matched++;
      scoreBoard.innerHTML = matched;
      setTimeout(checkWon, 500)
    } else {
      const [card1, card2] = cardsId;
      const [color1, color2] = cardsSelected;

      //clears the cards if not a match
      setTimeout(() => {
        card1.style.backgroundColor = null;
        card2.style.backgroundColor = null;
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        cardsSelected = [];
        cardsId = [];
        canClick = true;
        alert ('Try Again!');
      }, 1000)
    }
  }
  function checkWon() {
    if (matched === COLORS.length / 2) {
      alert('You Won!')
    } else {
      canClick = true;
      cardsSelected = [];
      cardsId = [];
    }
  }
  console.log("you just clicked", event.target);
}

reset.addEventListener('click', function() {
  //reset game variables
  firstCard = null;
  secondCard = null;
  cardsId = [];
  cardsSelected = [];
  matched = 0;
  canClick = true;
  scoreBoard.innerHTML='0';
  //shuffle colors and create new cards 
  shuffledColors = shuffle(COLORS);
  gameContainer.innerHTML = '';
  createDivsForColors(shuffledColors);
});


// when the DOM loads
createDivsForColors(shuffledColors);
