const field = document.querySelector("#field");
const submitScreen = document.querySelector("#submit-screen");
const endScreen = document.querySelector("#end-screen");
const begin = document.querySelector("#begin");
const q = document.querySelector("#q");
const a = document.querySelector("#a");
const b = document.querySelector("#b");
const c = document.querySelector("#c");
const d = document.querySelector("#d");
const displayEval = document.querySelector("#display-eval");
const submitInitials = document.querySelector("#submit-initials");
const highscores = document.querySelectorAll(".highscores");
const retake = document.querySelector("#retake");
const totalScore = document.querySelector("#total-score");
const timerDiv = document.querySelector("#timer-div");
const timeSpan = document.querySelector("#time-span");
const labelSpan = document.querySelector("#label-span");
const minusDisplay = document.querySelector("#minus-display");

// Used for choosing random array items
const randomIndex = function(max) {
    return Math.floor(Math.random() * max);
}

let correctAnswer;
let chosenAnswer;

let score = 0;

let time = 90;
let countdownInterval;
let updateTimerInterval;

// Clears and resets intervals, hides timer, resets time, removes field display, and sets submit screen to show
const stopTimer = function() {
    clearInterval(countdownInterval);
    clearInterval(updateTimerInterval);
    countdownInterval = null;
    updateTimerInterval = null;
    timerDiv.style.display = "none";
    time = 90;
    timeSpan.textContent = time;
    field.style.display = "none";
    submitScreen.style.display = "unset";
}

// Sets timer to be visible, starts timer, updates timer
const startTimer = function() {
    timerDiv.style.display = "unset";
    timeSpan.textContent = time;
    countdownInterval = setInterval( function() {
        if (time > 0) {
            time--;
        } else {
            stopTimer();
            let evalDelay = 3;

            displayEval.textContent = "Time ran out, quiz over";

            displayEval.style.display = "unset";

            const showDisplayEval = setInterval(function() {
                evalDelay--
                if (evalDelay === 0) {
                    clearInterval(showDisplayEval);
                    displayEval.style.display = "none";
                }
            }, 1000);
        }
    }, 1000);

    updateTimerInterval = setInterval( function() {
        timeSpan.textContent = time;
    }, 100);
}

// Evaluates if what the user clicked on is correct
const evaluate = function() {
    let minusDelay = 3;
    let evalDelay = 3;

    if (chosenAnswer === correctAnswer) {
        displayEval.textContent = "Correct";
        score += 5;
    } else {
        displayEval.textContent = "Wrong";
        time = time - 10;

        // Displays "-10" next to timer for three seconds
        minusDisplay.style.display = "unset";

        const minusDisplayInterval = setInterval(function() {
            minusDelay--
            if (minusDelay === 0) {
                clearInterval(minusDisplayInterval);
                minusDisplay.style.display = "none";
            }
        }, 1000);
    }

    totalScore.textContent = score;

    // Displays whether answer was correct or wrong for three seconds
    displayEval.style.display = "unset";

    const showDisplayEval = setInterval(function() {
        evalDelay--
        if (evalDelay === 0) {
            clearInterval(showDisplayEval);
            displayEval.style.display = "none";
        }
    }, 1000);
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

const initEventListeners = function () {
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
            if (availableQuestions.length > 0) {
                changeQuestion(availableQuestions[randomIndex(availableQuestions.length)]);
                return;
            } else {
                field.style.display = "none";
                submitScreen.style.display = "unset";
                stopTimer();
            }
        }
    });

    submitInitials.addEventListener("click", function() {
        submitScreen.style.display = "none";
        endScreen.style.display = "unset";
    });

    retake.addEventListener("click", function() {
        endScreen.style.display = "none";
        
        for (let i = 0; i < answeredList.length; i++) {
            availableQuestions.push(answeredList[i]);
            answeredList.splice(i, 1);
            i--;
        }

        begin.style.display = "unset";

        score = 0;
        correctAnswer = "";
        chosenAnswer = "";
        displayEval.textContent = "";

    });

    // Clicking begin will remove the begin button and display the first question
    begin.addEventListener("click", function() {
        field.style.display = "unset";
        changeQuestion(availableQuestions[randomIndex(availableQuestions.length)]);
        begin.style.display = "none";

        startTimer();
    });
}

initEventListeners();