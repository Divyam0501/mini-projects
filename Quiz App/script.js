document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuesIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuesIndex++;
    if (currentQuesIndex < questions.length) {
      showQues();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuesIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  })

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQues();
  }

  function showQues() {
    nextBtn.classList.add("hidden");
    // questionContainer.classList.remove("hidden");

    questionText.textContent = questions[currentQuesIndex].question;
    choicesList.innerHTML = "" //clear choices 
    questions[currentQuesIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => {
        selectAnswer(choice);
        HighlightSelected(li) //self added
      }); //this call back passes the reference of the fn so that it doesn't execute immediately and allows to pass a parameter
      choicesList.appendChild(li);
    });
  }

    //self added

  function HighlightSelected(selectedli) {
    const alllis = choicesList.querySelectorAll("li");
    alllis.forEach((li) => li.classList.remove("Selected"));
    selectedli.classList.add("Selected");
  }

  function selectAnswer(choice) {
    const correctAns = questions[currentQuesIndex].answer;
    if (choice === correctAns) {
      score++
    }
    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`
  };
})