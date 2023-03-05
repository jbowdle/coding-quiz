const quizLink = document.querySelector("#quiz-link");

const initEventListeners = function() {
    quizLink.addEventListener("click", function() {
        window.location.href = "./index.html";
    });
}

initEventListeners();