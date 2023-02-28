const field = document.querySelector("#field");
const begin = document.querySelector("#begin");
const q = document.querySelector("#q");
const a = document.querySelector("#a");
const b = document.querySelector("#b");
const c = document.querySelector("#c");
const d = document.querySelector("#d");
const displayEval = document.querySelector("#displayEval");

// Used for choosing random array items
const randomIndex = function(max) {
    return Math.floor(Math.random() * max);
}

let correctAnswer;
let chosenAnswer;

// Evaluates if what the user clicked on is correct
const evaluate = function() {

    // debug
    // console.log(`correct: ${correctAnswer}`);
    // console.log(`chosen: ${chosenAnswer}`);

    if (chosenAnswer === correctAnswer) {
        displayEval.textContent = "Correct";
    } else {
        displayEval.textContent = "Wrong";
    }
}

// Question class is used to make all the questions. It accepts a question, four answers, and which answer letter is the solution
class Question {
    constructor(prompt, answerA, answerB, answerC, answerD, solution) {
        this.prompt = prompt;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.solution = solution;
    }

    // Sets the question and four choices
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
}

const qOne = new Question("Example Question 1",
    "bad answer A",
    "correct answer B",
    "bad answer C",
    "bad answer D",
    "#b");

const qTwo = new Question("Example Question 2",
    "bad answer A",
    "bad answer B",
    "bad answer C",
    "correct answer D",
    "#d");

const qThree = new Question("Example Question 3",
    "bad answer A",
    "correct answer B",
    "bad answer C",
    "bad answer D",
    "#b");

const qFour = new Question("Example Question 4",
    "bad answer A",
    "bad answer B",
    "correct answer C",
    "bad answer D",
    "#c");

const qFive = new Question("Example Question 5",
    "correct answer A",
    "bad answer B",
    "bad answer C",
    "bad answer D",
    "#a");

let availableQuestions = [qOne, qTwo, qThree, qFour, qFive];
let answeredList = [];

// Changes displayed question/answer, sets new correct answer, and updates the available question list and answered questions
const changeQuestion = function(qNum){
    let index = availableQuestions.indexOf(qNum);
    qNum.populateField();
    qNum.setCorrectAnswer();
    answeredList.push(qNum);
    availableQuestions.splice(index, 1);
}

// Put these eventlisteners in init function?

// Following four are for the answer buttons
a.addEventListener("click", function() {
    chosenAnswer = "#a";
});
b.addEventListener("click", function() {
    chosenAnswer = "#b";
});
c.addEventListener("click", function() {
    chosenAnswer = "#c";
});
d.addEventListener("click", function() {
    chosenAnswer = "#d";
});

// Clicking on a button will trigger the evaluate function and determine if it's right or wrong.
// Then it will change to a new question
field.addEventListener("click", function(event) {
    if (event.target.matches("button")) {
        evaluate();
        changeQuestion(availableQuestions[randomIndex(availableQuestions.length)]);
        return;
    }
});

// Clicking begin will remove the begin button and display the first question
begin.addEventListener("click", function() {
    changeQuestion(availableQuestions[randomIndex(availableQuestions.length)]);
    begin.style.display = "none";
});