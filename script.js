// Wait for the DOM to finish loading before running the game
// Get teh button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let botton of buttons) {
    botton.addEventListener("click", function(){
      if (this.getAttribute("data-type") == "submit") {
        alert("You clicked submit!");
      } else {
        let gameType = this.getAttribute("data-type");
        alert(`You clicked ${gameType}`);
      }
    })
  }
})

function runGame() {
  // Generate two random numbers between 1 and 25
  // Math.floor rounds down to nearest whole number
  // Math.random generates random numbers

  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;
}

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAddition() {

}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}

