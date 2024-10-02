const questions = [
  {
    question: "Which of the following is NOT a valid HTTP method?",
    answers: [
      {text: "GET", correct: false},
      {text: "POST", correct: false},
      {text: "FETCH", correct: true},
      {text: "DELETE", correct: false}
    ]
  },

  {
    question: "In python, which is the correct way to define a function?",
    answers: [
      {text: "function myFunction()", correct: false},
      {text: "def myFunction()", correct: true},
      {text: "fun myFunction()", correct: false},
      {text: "func myFunction()", correct: false}
    ]
  },

  {
    question: "In SQL, which keyword is used to remove duplicate rows from a query result?",
    answers: [
      {text: "REMOVE", correct: false},
      {text: "DISTINCT", correct: true},
      {text: "DELETE", correct: false},
      {text: "DROP", correct: false}
    ]
  }
];


const questionElement = document.getElementById('questions');
const answerBtn = document.getElementById('answer-btn');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function quizFunction() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  reset();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function reset() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const CorrectAnswer = selectedBtn.dataset.correct === "true";
  if (CorrectAnswer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerBtn.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    } 
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function nextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  reset();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    nextButton();
  } else {
    quizFunction();
  }
})

quizFunction();