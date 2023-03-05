const quizLink = document.querySelector("#quiz-link");
const tBody = document.querySelector("tbody");

let submittedScores = [];

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

const init = function() {
    quizLink.addEventListener("click", function() {
        window.location.href = "./index.html";
    });

    let storedScores = JSON.parse(localStorage.getItem("storedScores"));

    if (storedScores !== null) {
        submittedScores = storedScores;
    }

    renderScores();
}

init();