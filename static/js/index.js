// alert("Linked");

// Age in days
function ageInDays() {
  var birthYear = prompt("In which year were you born?");
  let age = (2022 - birthYear) * 365;
  // alert(age);

  var h1 = document.createElement("h1");
  var text = document.createTextNode("You are " + age + " days old!");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(text);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

// Cat Generator
function generateCat() {
  var img = document.createElement("img");
  var cat = document.getElementById("flex-cat-gen");
  img.src =
    "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg";
  cat.appendChild(img);
}

// Rock paper scissor
function rpsGame(yourChoice) {
  // console.log(yourChoice);
  // console.log(yourChoice.src);

  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  // console.log("Your choice :" + humanChoice);

  botChoice = numberToChoice(randomRPS());
  // console.log("bot choice : " + botChoice);

  var result = decideWinner(humanChoice, botChoice);
  // console.log(result);

  var message = finalMessage(result);
  // console.log(message);

  rpsFrontEnd(humanChoice, botChoice, message);
}
function randomRPS() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissor"][number];
}

function decideWinner(yourChoice, compChoice) {
  var rpsData = {
    rock: { scissor: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissor: 0 },
    scissor: { paper: 1, scissor: 0.5, rock: 0 },
  };

  var humanScore = rpsData[yourChoice][compChoice];
  var botScore = rpsData[compChoice][yourChoice];

  return [humanScore, botScore];
}

function finalMessage([humanScore, botScore]) {
  if (humanScore === 0) {
    return { message: "You lost!", color: "red" };
  } else if (humanScore === 0.5) {
    return { message: "Draw!", color: "yellow" };
  } else {
    return { message: "You won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissor: document.getElementById("scissor").src,
  };

  // remove images on click
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissor").remove();

  // Divs for final result
  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src ='" +
    imageDatabase[humanImageChoice] +
    "'height=150px width=150px style = 'box-shadow: 0 10px 50px blue;'>";

  // Code Refacoring the above code ----!!!!!
  // humanDiv.innerHTML = `<img src ='${imageDatabase[humanImageChoice]}'height=150px width=150px style = 'box-shadow: 0 10px 50px blue;'>`

  messageDiv.innerHTML =
    "<h1 style = 'color: " +
    finalMessage["color"] +
    "; font-size: 60px; padding:30px; '>" +
    finalMessage["message"] +
    "</h1>";

  botDiv.innerHTML = `<img src ='${imageDatabase[botImageChoice]}'height=150px width=150px style = 'box-shadow: 0 10px 50px blue;'>`;

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Button Color Change

var allButtons = document.querySelectorAll(".btnChange"); //Select the buttons
// console.log(allButtons);

let copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
  copyAllButtons.push(allButtons[i].classList[2]);
} //by adding classList[1], we stored the "original" color of buttons.
// console.log(copyAllButtons);

function buttonColorChange(buttonColor) {
  // console.log(buttonColor.value);      Shows the value of button from the HTML page
  if (buttonColor.value === "red") {
    buttonsRed();
  } else if (buttonColor.value === "green") {
    buttonsGreen();
  } else if (buttonColor.value === "reset") {
    buttonsReset();
  } else if (buttonColor.value === "random") {
    buttonsRandom();
  }
}

function buttonsRed() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[2]);
    allButtons[i].classList.add("btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[2]);
    allButtons[i].classList.add("btn-success");
  }
}

function buttonsReset() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[2]);
    allButtons[i].classList.add(copyAllButtons[i]);
    // console.log(copyAllButtons);
  }
}

function buttonsRandom() {
  let colorChoices = [
    "btn-primary",
    "btn-danger",
    "btn-success",
    "btn-warning",
  ];
  for (let i = 0; i < allButtons.length; i++) {
    let randomChoice = Math.floor(Math.random() * 4);
    allButtons[i].classList.remove(allButtons[i].classList[2]);
    allButtons[i].classList.add(colorChoices[randomChoice]);
  }
}

// "BlackJack"

let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },

  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },

  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J", "A"],

  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  },

  wins: 0,
  losses: 0,
  draw: 0,

  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

let hitSound = new Audio("static/sounds/swish.m4a");
let lossSound = new Audio("static/sounds/aww.mp3");
let winSound = new Audio("static/sounds/cash.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    // console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    // document.querySelector("#your-blackjack-result").textContent =
    // YOU["score"];
    // console.log(YOU["score"]);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;

    // showResult(computeWinner());
    // console.log(computeWinner);
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) yourImages[i].remove();

    for (let i = 0; i < dealerImages.length; i++) dealerImages[i].remove();

    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";

    document.querySelector("#blackjack-result").textContent = "Lets play!";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame["turnsOver"] = true;
  }
}

function updateScore(card, activePlayer) {
  // fixing the value of ACE to either 1 or 11. If adding 11 keeps the score below 21, add 11 else add 1.

  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "Bust";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}
//Last step:  function to add a time delay to deal
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

// making the function async to add time delay
async function dealerLogic() {
  blackjackGame["isStand"] = true;

  while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
  let card = randomCard();
  showCard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);
  await sleep(1000);
  }

  
    blackjackGame["turnsOver"] = true;
    let winner = computeWinner();
    showResult(winner);
  
}

function computeWinner() {
  //compute winnner and return who just won
  // update the wins, losses and draws
  let winner;

  if (YOU["score"] <= 21) {
    //condition : higher score than dealer or when dealer busts but you are 21 or under
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      console.log("You Won!");
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      console.log("You lost!!");
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draw"]++;
      console.log("Draw!!!");
    }
    //condition : You bust but dealer does not!
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["losses"]++;
    console.log("You lost!!");
    winner = DEALER;
  } else if (YOU["score"] >= 21 && DEALER["score"] >= 21) {
    blackjackGame["draw"]++;
    console.log("Draw");
  }

  console.log(blackjackGame);
  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You won!!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You lost!!";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draw"];
      message = "Draw!!";
      messageColor = "black";
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
