// Wait for the DOM to finish loading before running the game
// Get teh button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let botton of buttons) {
    botton.addEventListener("click", function(){
      if (this.getAttribute("data-type") == "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    })
  }

  document.getElementById("answer-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  })

  runGame("addition");
})

function runGame(gameType) {
  // Generate two random numbers between 1 and 25
  // Math.floor rounds down to nearest whole number
  // Math.random generates random numbers

  document.getElementById("answer-box").value = "";
  document.getElementById("answer-box").focus();

  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
  } else if (gameType === "division") {
      if (num1 % num2 === 0) {
        displayDivisionQuestion(num1, num2);
      } else runGame(gameType); 
  } else {
    alert(`Unknown game type ${gameType}`);
    throw `Unknown game type ${gameTYpe}, aborting`;
  }
}

function checkAnswer() {
  // Reads user's guess from the DOM and compares to the calculated correct answer array

  let userAnswer = parseInt(document.getElementById("answer-box").value);
  // uses .value as this is a user input field, need to use value and not innerText for this
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert("Hey! You got it right :D");
    incrementScore();
  } else {
    alert(`Aww.. you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
    incrementWrongAnswer();
  }

  runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
  // Gets the operands and the operator directly from the DOM

  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  // Items returned from the DOM are strings by default, so parseInt is needed so
  // that we can perform calculations with the results that are loaded.
  let operator = document.getElementById("operator").innerText;

  if (operator === "+") {
    return [operand1 + operand2, "addition"];
  } else if (operator === "x") {
    return [operand1 * operand2, "multiply"];
  } else if (operator === "-") {
    return [operand1 - operand2, "subtract"];
  } else if (operator ==="/") {
    return [operand1 / operand2, "division"];
  } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}, aborting!`;
  }
}

function incrementScore() {
  // Reads the current value from the DOM, adds one if correct answer, and then writes it back to the DOM
  // Increments the score without creating any global variables

  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore; // same as 'oldScore + 1'; uses compound addition operator instead; 
  //have to put ++ before the variable here so the updated score gets written back to the DOM, putting them after results in JS writing the oldScore back to the DOM before adding.
}

function incrementWrongAnswer() {
  // Reads the current value from the DOM, adds one to wrong answer tally if incorrect answer, and then writes it back to the DOM
  // Increments the score without creating any global variables

  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore; 
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2; //works like an if statement to return the larger random operator as operand1
  document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2; //works like an if statement to return the larger random operator as operand1
  document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "/";
}