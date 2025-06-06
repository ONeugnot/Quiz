let ApiUrl = `https://opentdb.com/api.php`;
let NumberOfQuestion = 0;
let question = "";
let scores = 0;
let levelQuestion = "";
let level = "";
let IsGame = false;
let tabResponse = [];
let newTabResponseRandom = [];
let resultsPlayerChooce = "";
const btnLevel = document.querySelectorAll(".difficulty-btn");
const btnNext = document.querySelector("#next");
const btnstartQuizz = document.querySelector("#startQuiz");
const menuStart = document.querySelector("#menu");
const quizContainer = document.querySelector("#quizContainer");
const dificultyValue = document.querySelector(".difficulty-value");
const allResponseCanBeUse = document.querySelectorAll(".answer-text");
const scoreValue = document.querySelector(".score-display");
const QuestionChange = document.querySelector("#question");
const progressBar = document.querySelector("#progress");

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

function ElementChangeQuiz(score, NumberQuestionApi, level, questionss) {
	dificultyValue.textContent = level;
	scoreValue.textContent = `Score ${score} / ${NumberQuestionApi}`;
	QuestionChange.textContent = `${questionss}`;
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
			for (let j = 0; j < newTabResponseRandom[i].length; j++) {
				const azze = newTabResponseRandom[i][j];
				console.log(azze);

				const responseElem = allResponseCanBeUse[j];

				if (responseElem !== undefined) {
					responseElem.textContent = azze;

					responseElem.addEventListener("click", () => {
						responseElem.classList.toggle("selected");
						resultsPlayerChooce = responseElem.textContent;
						console.log(resultsPlayerChooce);
					});

					ElementChangeQuiz(scores, NumberOfQuestion, level, question);
				}
			}
		}
		btnNext.addEventListener("click", () => {
			if (resultsPlayerChooce === data.correct_answer) {
				scores++;
				progressBar.max = NumberOfQuestion;
				progressBar.value = scores;
				tabResponse = [];
				newTabResponseRandom = [];
				question = "";
				resultsPlayerChooce = "";
				console.log("Bien joué vous avez trouvé la bonne réponse");
			} else {
				scores++;
				progressBar.max = NumberOfQuestion;
				progressBar.value = scores;
				tabResponse = [];
				newTabResponseRandom = [];
				question = "";
				resultsPlayerChooce = "";
				console.log(`Dommage la bonne réponse était ${data.correct_answer}`);
			}
			if (scores > data.length) {
				tabResponse = [];
				newTabResponseRandom = [];

				return;
			}
			console.log(
				newTabResponseRandom,
				tabResponse,
				question,
				resultsPlayerChooce
			);
			ApitestQuestion();
		});
	}
}

selectLevelAndStartTheGale();
