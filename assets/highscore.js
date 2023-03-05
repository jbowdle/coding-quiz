const quizLink = document.querySelector("#quiz-link");
const tBody = document.querySelector("tbody");
const resetButton = document.querySelector("#reset-button");

let submittedScores = [];

// Updates highscore table with scores stored in local storage
const renderScores = function() {
    for (let i = 0; i < submittedScores.length; i++) {
        let score = submittedScores[i];
        let initials = score.slice(0, 2);
        let scoreNum = score.slice(2);

        let newRow = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");

        td1.textContent = initials;
        td2.textContent = scoreNum;

        newRow.appendChild(td1);
        newRow.appendChild(td2);

        tBody.appendChild(newRow);
    }
}

// Deletes scores stored in local storage and reloads the page, forcing renderScores() to fire and update the table
const reset = function() {
    localStorage.removeItem("storedScores");
    location.reload();
}

// All functions to be fired when the page loads
const init = function() {
    quizLink.addEventListener("click", function() {
        window.location.href = "./index.html";
    });

    resetButton.addEventListener("click", function() {
        reset();
    });

    let storedScores = JSON.parse(localStorage.getItem("storedScores"));

    if (storedScores !== null) {
        submittedScores = storedScores;
    }

    renderScores();
}

init();