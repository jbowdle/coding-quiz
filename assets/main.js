const field = document.querySelector("#field");
const begin = document.querySelector("#begin");
const q = document.querySelector("#q");
const a = document.querySelector("#a");
const b = document.querySelector("#b");
const c = document.querySelector("#c");
const d = document.querySelector("#d");
const displayEval = document.querySelector("#displayEval");

let correctAnswer;
let chosenAnswer;

const evaluate = function() {
    if (chosenAnswer === correctAnswer) {
        displayEval.textContent = "Correct";
    } else {
        displayEval.textContent = "Wrong";
    }
}

class Question {
    constructor(prompt, answerA, answerB, answerC, answerD, solution) {
        this.prompt = prompt;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.solution = solution;
    }

    populateField() {
        q.textContent = this.prompt;
        a.textContent = this.answerA;
        b.textContent = this.answerB;
        c.textContent = this.answerC;
        d.textContent = this.answerD;
    }

    setCorrectAnswer() {
        correctAnswer = this.solution;
    }

    setButtons() {
        a.addEventListener("click", function() {
            chosenAnswer = "#a";
        })
        b.addEventListener("click", function() {
            chosenAnswer = "#b";
        })
        c.addEventListener("click", function() {
            chosenAnswer = "#c";
        })
        d.addEventListener("click", function() {
            chosenAnswer = "#d";
        })
    }
}

const qOne = new Question("Example Question",
    "bad answer A",
    "correct answer B",
    "bad answer C",
    "bad answer D",
    "#b");

const startQuiz = function(){
    qOne.populateField();
    qOne.setCorrectAnswer();
    qOne.setButtons();
    field.addEventListener("click", function(event) {
        if (event.target.matches("button")) {
            evaluate();
        }
    })
}

begin.addEventListener("click", function() {
    startQuiz();
    begin.style.display = "none";
});