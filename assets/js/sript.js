// List of Quiz questions and answers
var questions = [
    {
      question: "What is the Capital of Canada?",
      choices: ["Quebec", "Ottawa", "Vancouver", "Montreal", "Toronto"],
      answer: "Ottawa",
    },
    {
      question: "Who invented the lightbulb?",
      choices: ["Thomas Edison", "Lewis Howard", "Michael Faraday", "Alexander Lodygin"],
      answer: "Thomas Edison",
    },
    {
      question: "If a backyard is 50 feet long and 20 feet wide, how many square feet is the yard?",
      choices: ["100 sq ft", "70 sq ft", "1000 sq ft", "2000 sq ft"],
      answer: "1000 sq ft",
    },
    {
      question: "What is the process of water turning into vapor called?",
      choices: ["Evaporation", "Dehydration", "Dissipation", "Melting", "Vanishing"],
      answer: "Evaporation",
    },

    {
      question: "On the periodic table, which element is represented by the letter N?",
      choices: ["Nickel", "Zinc", "Nitrogen", "Helium", "Sodium"],
      answer: "Nitrogen",
    },
  ];

// DOM Elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("timer");
var choicesEl = document.getElementById("options");
var submitBtn = document.getElementById("submit-score");
var startBtn = document.getElementById("start");
var nameEl = document.getElementById("name");
var feedbackEl = document.getElementById("feedback");
var reStartBtn = document.querySelector("#restart");
var scoresBtn = document.querySelector("#view-high-scores");

// Initial stage of the quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//Starting quiz and hiding the front page
function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers, create a list with buttons
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, i) {      
    var choiceBtn = document.createElement("button"); 
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesEl.appendChild(choiceBtn);
    })
}
// Checking for the correct answer and deducting time for the wrong answers. Going to the next question.
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// End quiz, hide the questions, stop the timer and show the final score
function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("quiz-end");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("score-final");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
  saveHighscore(); // Save the score when quiz ends
}

// End quiz if the timer reaches 0
function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

// Saving player's name and score in local storage
function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "" && currentQuestionIndex === questions.length) {
      var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
          score: time,
          name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

// Function to print high scores
function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  var highscoresList = document.getElementById("highscores");
  highscoresList.innerHTML = ""; // Clear previous entries
  highscores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.name + " - " + score.score;
    highscoresList.appendChild(liTag);
  });
}

// Event listener for restarting the quiz
reStartBtn.addEventListener("click", function() {
  restartQuiz();
});

// Saving player's name and score in local storage
function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "" && currentQuestionIndex === questions.length && !scoreSubmitted) {
      var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
          score: time,
          name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      scoreSubmitted = true; // Set the flag to true
  }
}
// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  time = questions.length * 15;
  clearInterval(timerId);
  timerId = null;
  quizStart(Event);
}
