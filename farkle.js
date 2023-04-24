var diceArr = [];
let totalScore = 0;


function initializeDice() {
  for (i = 0; i < 6; i++) {
    diceArr[i] = {};
    diceArr[i].id = "die" + (i + 1);
    diceArr[i].value = i + 1;
    diceArr[i].clicked = 0;
  }
	rollDice();
}

/*Rolling dice values*/
function rollDice() {
  for (var i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      diceArr[i].value = Math.floor(Math.random() * 6 + 1);
    }
  }
  updateDiceImg();

  var score = calculateScore();
  if (score == 0) {
    // Farkle
		totalScore = 0;
		resetGame(totalScore);
    alert("Farkle! You earned no points this turn.");
  } else {
    // Update the total score
    document.getElementsByClassName("score")[0].innerHTML = score;
    totalScore = score;
  }

	updateTotalScoreDisplay();

  console.log(totalScore);
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg() {
  var diceImage;
  for (var i = 0; i < 6; i++) {
    diceImage = "images/" + diceArr[i].value + ".png";
    document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
  }
}

function diceClick(img) {
  var i = img.getAttribute("data-number");

  img.classList.toggle("transparent");
  if (diceArr[i].clicked === 0) {
    diceArr[i].clicked = 1;
  } else {
    diceArr[i].clicked = 0;
  }
}

/* Calculate score based on the rolled dice */
function calculateScore() {
  var score = 0;
  var counts = [0, 0, 0, 0, 0, 0];
  for (var i = 0; i < 6; i++) {
    counts[diceArr[i].value - 1]++;
  }
  for (var i = 0; i < 6; i++) {
    if (counts[i] >= 3) {
      if (i == 0) {
        score += 1000;
      } else {
        score += (i + 1) * 100;
      }
      counts[i] -= 3;
    }
  }
  score += counts[0] * 100;
  score += counts[4] * 50;
  return score;
}

/* Bank the score and reset game for next turn */
function bankScore() {
	resetGame();
}

function createScoreListItem(score) {
  // Get the score list element
  const scoreList = document.querySelector("#score-list ol");

  // Create a new list item for the current score
  const scoreListItem = document.createElement("li");
  scoreListItem.textContent = `${score}`;

  // Append the new list item to the score list
  scoreList.appendChild(scoreListItem);
}

function resetGame() {
  createScoreListItem(totalScore);
  for (let i = 0; i < diceArr.length; i++) {
    diceArr[i].clicked = 0;
    const diceImage = document.getElementById(`die${i + 1}`);
    diceImage.classList.remove("transparent");
  }
	document.getElementsByClassName("score")[0].innerHTML = 0;
	totalScore = 0;
	rollDice();
}

function calculateTotalScore() {
  let scoreList = document.getElementById("score-list");
  let scoreItems = scoreList.querySelectorAll("li");
  let sumScore = 0;
  for (let i = 0; i < scoreItems.length; i++) {
    let scoreText = scoreItems[i].textContent;
    let score = parseInt(scoreText);
    sumScore += score;
  }
  return sumScore;
}

function updateTotalScoreDisplay() {
  let displayScore = calculateTotalScore();
  let totalScoreDisplay = document.getElementById("total-score");
  totalScoreDisplay.textContent = `Total Score: ${displayScore}`;
}