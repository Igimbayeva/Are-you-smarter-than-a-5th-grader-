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

// Initial stage of the quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//Starting quiz and hiding the front page
