//Selecting the list section by class.
const quizSections = document.querySelectorAll(".quizSection");

// assigning consts to Start section and start button.
const startSection = document.getElementById("start");
const startButton = document.getElementById("start-button");

//Quiz section 
const quizSection = document.getElementById("quizQuestions");
const timeRemaining = document.getElementById("timeRemaining");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const choiceStatuses = document.querySelectorAll(".choice-status");
const correct = document.getElementById("correct");
const wrong = document.getElementById("wrong");

//End, Form Elements
const endSection= document.getElementById("end");
const endTitle = document.getElementById("endTitle");
const score = document.getElementById("score");
const initials = document.getElementById("initials");
const submitScore = document.getElementById("submitScore");
const error = document.getElementById("errorMessage");

// questions
class Question {
constructor(question, choices, indexOfCorrectChoice){
    this.question = question;
    this.choices = choices;
    this. indexOfCorrectChoice= indexOfCorrectChoice; 
}
}
const question1 = new Question ("Commonly used data types do not include:", ["Alerts", "Boleans", "Strings","Numbers"], 0);
const question2 = new Question ("The condition if/else is enclosed within:",["Curly Brackets", "Quotes", "Square Brackets", "Parenthesis"], 3);
const question3 = new Question ("Arrays in javaScript can be used to store:", ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], 3);
const question4 = new Question ("String values must be enclosed within _____ when being assigned to variables.", ["Commas", "Curly brackets", "Quotes", "Parentheses"], 2);
const question5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is: ", 
  ["JavaScript", "Terminal/Bash", "For Loops", "console.log"], 3);

  const questionList = [question1, question2, question3, question4, question5];

  let currentQuestion = 0;
  let totalTime = 75;
  let totalTimeInterval;
  let choiceStatusTimeout;

  //----Event listners
  startButton.addEventListener("click",startQuiz);
  choices.addEventListener("click", processChoice);
  submitScore.addEventListener("click", processInput);

  //--Start Quiz
  function startQuiz(){
    showElement(quizSections, quizSection)
    displayTime();
    displayQuestion();
    startTimer();
  }

  //hide / unhide the elements
  function showElement(siblingList, showElement){
    for (element of siblingList){
        hideElement(element);
    }
    showElement.classList.remove("hidden");
  }
  function hideElement(element) {
    if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
    }
  }

  //---time
  function displayTime() {
    timeRemaining.textContent = totalTime;
  }
  
  function startTimer() {
    totalTimeInterval = setInterval(function() {
      totalTime--;
      displayTime();
      checkTime();
  
    }, 1000);
  }
  
  function checkTime() {
    if (totalTime <= 0) {
      totalTime = 0;
      endGame();
    }
  }
  
  /******** QUESTIONS ********/ 
function displayQuestion() {
    question.textContent = questionList[currentQuestion].question;
  
    displayChoiceList();
  }
  
  function displayChoiceList() {
    choices.innerHTML = "";
  
    questionList[currentQuestion].choices.forEach(function(answer, index) {
      const li = document.createElement("li");
      li.dataset.index = index;
      const button = document.createElement("button");
      button.textContent = (index + 1) + ". " + answer;
      li.appendChild(button);
      choices.appendChild(li);
    });
  }

  //when user answers a question
function processChoice(event) {
    const userChoice = parseInt(event.target.parentElement.dataset.index);
  
    resetChoiceStatusEffects();
    checkChoice(userChoice);
    getNextQuestion();
  }
  
  //Displaying choice statuses
  function resetChoiceStatusEffects() {
    clearTimeout(choiceStatusTimeout);
    styleTimeRemainingDefault();
  }
  
  function styleTimeRemainingDefault() {
    timeRemaining.style.color = "#4616E8";
  }
  
  function styleTimeRemainingWrong() {
    timeRemaining.style.color = "#4616E8";
  }
  
  function checkChoice(userChoice) {
    if (isChoiceCorrect(userChoice)) {
      displayCorrectChoiceEffects();
    } else {
      displayWrongChoiceEffects();
    }
  }
  
  function isChoiceCorrect(choice) {
    return choice === questionList[currentQuestion].indexOfCorrectChoice;
  }
  
  function displayWrongChoiceEffects() {
    deductTimeBy(10);
  
    styleTimeRemainingWrong();
    showElement(choiceStatuses, wrong);
  
    choiceStatusTimeout = setTimeout(function() {
      hideElement(wrong);
      styleTimeRemainingDefault();
    }, 1000);
  }
  
  function deductTimeBy(seconds) {
    totalTime -= seconds;
    checkTime();
    displayTime();
  }
  
  function displayCorrectChoiceEffects() {
    showElement(choiceStatuses, correct);
  
    choiceStatusTimeout = setTimeout(function() {
      hideElement(correct);
    }, 1000);
  }
  
  //Get next question
  function getNextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questionList.length) {
      endGame();
    } else {
      displayQuestion();
    }
  }
  
  /******** ENDING THE GAME ********/ 
  function endGame() {
    clearInterval(totalTimeInterval);
    
    showElement(quizSections, endSection);
    displayScore();
    setEndHeading();
  }
  
  function displayScore() {
    score.textContent = totalTime;
  }
  
  function setEndHeading() {
    if (totalTime === 0) {
      endTitle.textContent = "Sorry! time out!";
    } else {
      endTitle.textContent = "Congrats! Your done!";
    }
  }
  
  /******** SUBMITTING INITIALS ********/ 
  function processInput(event) {
    event.preventDefault();
  
    const initials = initialsInput.value.toUpperCase();
  
    if (isInputValid(initials)) {
      const score = totalTime;
      const highscoreEntry = getNewHighscoreEntry(initials, score);
      saveHighscoreEntry(highscoreEntry);
      window.location.href= "./highscores.html";
    }
  }
  
  function getNewHighscoreEntry(initials, score) {
    const entry = {
      initials: initials,
      score: score,
    }
    return entry;
  }
  
  function isInputValid(initials) {
    let errorMessage = "";
    if (initials === "") {
      errorMessage = "You can't submit empty initials!";
      displayFormError(errorMessage);
      return false;
    } else if (initials.match(/[^a-z]/ig)) {
      errorMessage = "Initials may only include letters."
      displayFormError(errorMessage);
      return false;
    } else {
      return true;
    }
  }
  
  function displayFormError(errorMessage) {
    errorMessage.textContent = errorMessage;
    if (!initials.classList.contains("error")) {
      initials.classList.add("error");
    }
  }
  
  function saveHighscoreEntry(highscoreEntry) {
    const currentScores = getScoreList();
    placeEntryInHighscoreList(highscoreEntry, currentScores);
    localStorage.setItem('scoreList', JSON.stringify(currentScores));
  }
  
  function getScoreList() {
    const currentScores = localStorage.getItem('scoreList');
    if (currentScores) {
      return JSON.parse(currentScores);
    } else {
      return [];
    }
  }
  
  function placeEntryInHighscoreList(newEntry, scoreList) {
    const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
    scoreList.splice(newScoreIndex, 0, newEntry);
  }
  
  function getNewScoreIndex(newEntry, scoreList) {
    if (scoreList.length > 0) {
      for (let i = 0; i < scoreList.length; i++) {
        if (scoreList[i].score <= newEntry.score) {
          return i;
        }
      } 
    }
    return scoreList.length;
  }
