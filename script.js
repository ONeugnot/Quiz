let ApiUrl = `https://opentdb.com/api.php?amount=10&type=multiple`;
let NumberOfQuestion = 0;
let question = "";
let score = 0;
let levelQuestion = "";
let IsGame = false;
let tabResponse = [];
const btnLevel = document.querySelectorAll(".difficulty-btn");
const btnNext = document.querySelector("#next");
const btnstartQuizz = document.querySelector("#startQuiz");

function selectLevelAndStartTheGale(level, ready) {
    IsGame = false;

    ready = IsGame;

    for (let i = 0; i < btnLevel.length; i++) {
        btnLevel[i].addEventListener("click", () => {
            btnLevel[i].classList.toggle("selected");
            level = btnLevel[i].dataset.difficulty;
            IsGame = true;
            ready = IsGame;

            console.log(level);
        });
    }
    btnstartQuizz.addEventListener("click", () => {
        if (ready === false) {
            console.log("Veuillez choisir un level");

            return;
        } else {
            ApitestQuestion();
        }
    });
}

async function ApitestQuestion() {
    let response = await fetch(`${ApiUrl}`, {
        method: "GET",
    });
    let data = await response.json();
    for (let i = 0; i < data.results.length; i++) {
        const dataQuestion = data.results[i];
        console.log(dataQuestion);
    }
}

selectLevelAndStartTheGale();