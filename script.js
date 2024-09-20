const questions = [
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    answers: [
      { text: "Var", correct: false },
      { text: "Let", correct: false },
      { text: "Both A and B", correct: true },
    ],
  },
  {
    question: "Which object in Javascript doesn’t have a prototype?",
    answers: [
      { text: "All object have a prototype", correct: false },
      { text: "Base object", correct: true },
      { text: "None of the object have a prototype", correct: false },
    ],
  },
  {
    question: "Which of the following are closures in Javascript?",
    answers: [
      { text: "Variables", correct: false },
      { text: "Functions", correct: false },
      { text: "Objects", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question: "Which of the following is not a Javascript framework?",
    answers: [
      { text: "Node", correct: false },
      { text: "Vue", correct: false },
      { text: "React", correct: false },
      { text: "Cassandra", correct: true },
    ],
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    answers: [
      { text: "getElementbyId()", correct: false },
      { text: "getElementbyClassName()", correct: false },
      { text: "Both A and B", correct: true },
    ],
  },
  {
    question: "How to stop an interval timer in Javascript?",
    answers: [
      { text: "clearInterval", correct: true },
      { text: "clearTimer", correct: false },
      { text: "intervalOver", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    // dy lama tados 3la egaba 8alt yatlla3llk el sa7 w zorar el button bat3 next
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `Your score ${score} out of ${questions.lenght}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
