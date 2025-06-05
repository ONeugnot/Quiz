let ApiUrl = `https://opentdb.com/api.php`;
let NumberOfQuestion = 0;
let question = "";
let scores = 0;
let levelQuestion = "";
let level = "";
let IsGame = false;
let tabResponse = [];
let newTabResponseRandom = [];
const btnLevel = document.querySelectorAll(".difficulty-btn");
const btnNext = document.querySelector("#next");
const btnstartQuizz = document.querySelector("#startQuiz");
const menuStart = document.querySelector("#menu");
const quizContainer = document.querySelector("#quizContainer");
const dificultyValue = document.querySelector(".difficulty-value");
const allResponseCanBeUse = document.querySelectorAll(".answer-text");
const scoreValue = document.querySelector(".score-display");
const QuestionChange = document.querySelector("#question");

function selectLevelAndStartTheGale(ready) {
  IsGame = false;

  ready = IsGame;

  for (let i = 0; i < btnLevel.length; i++) {
    btnLevel[i].addEventListener("click", () => {
      const isAlreadySelected = btnLevel[i].classList.contains("selected");
      for (let j = 0; j < btnLevel.length; j++) {
        btnLevel[j].classList.remove("selected");
      }
      if (!isAlreadySelected) {
        btnLevel[i].classList.add("selected");
        level = btnLevel[i].dataset.difficulty;
        IsGame = true;
        ready = IsGame;
        console.log(level);
        if (level === "Easy") {
          NumberOfQuestion = 3;
        } else if (level === "Medium") {
          NumberOfQuestion = 7;
        } else if (level === "Hard") {
          NumberOfQuestion = 10;
        }
      }
    });
  }

  btnstartQuizz.addEventListener("click", () => {
    if (ready === false) {
      console.log("Veuillez choisir un level");

      return;
    } else {
      ApitestQuestion();
      menuStart.remove();
      quizContainer.style.display = "block";
    }
  });
}

function ElementChangeQuiz(
  response,
  score,
  NumberQuestionApi,
  level,
  questionss
) {
  dificultyValue.textContent = level;
  scoreValue.textContent = `Score ${score} / ${NumberQuestionApi}`;
  QuestionChange.textContent = `${questionss}`;
  for (let i = 0; i < allResponseCanBeUse.length; i++) {
    const responseText = allResponseCanBeUse[i];
    responseText.textContent = `${response}`;
  }
}

async function ApitestQuestion() {
  let response = await fetch(
    `${ApiUrl}?amount=${NumberOfQuestion}&type=multiple`,
    {
      method: "GET",
    }
  );
  let data = await response.json();

  if (data.results && data.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomQuestion = data.results[randomIndex];
    const newtab = [
      ...randomQuestion.incorrect_answers,
      randomQuestion.correct_answer,
    ];

    tabResponse.push(newtab);
    newTabResponseRandom = [...tabResponse].sort(() => Math.random() - 0.5);
    question = randomQuestion.question;

    console.log(newTabResponseRandom);
    for (let i = 0; i < newTabResponseRandom.length; i++) {
      console.log(newTabResponseRandom[i]);

      ElementChangeQuiz(
        newTabResponseRandom[0],
        scores,
        NumberOfQuestion,
        level,
        question
      );
    }
  }
}

selectLevelAndStartTheGale();
