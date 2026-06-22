console.log("ECE Career Explorer Loaded");

function toggleMenu() {
    document
        .getElementById("nav-links")
        .classList
        .toggle("active");
}

function checkQuiz() {

    let score = 0;

    const answers =
        document.querySelectorAll(
            'input[value="correct"]:checked'
        );

    score = answers.length;

    let result =
        document.getElementById("quiz-result");

    if (score === 5) {
        result.innerHTML =
            "🌟 Excellent! Score: 5/5";
    }

    else if (score >= 3) {
        result.innerHTML =
            "🚀 Great Job! Score: " + score + "/5";
    }

    else {
        result.innerHTML =
            "📚 Nice Try! Score: " + score + "/5";
    }
}

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

document.querySelectorAll(".fade-in")
.forEach((el) => observer.observe(el));
const messages = [

    "Initializing CRO...",

    "Loading Circuit Components...",

    "Analyzing Signals...",

    "Starting Communication Systems...",

    "Launching ECE Explorer..."
];

let index = 0;

const text = document.getElementById("loading-text");

const interval = setInterval(() => {

    index++;

    if(index < messages.length){

        text.textContent = messages[index];
    }

}, 300);

window.addEventListener("load", () => {

    setTimeout(() => {

        clearInterval(interval);

        document.getElementById("loader").style.display = "none";

    }, 1800);

});

/* CRO LOADING SCREEN */

const messages = [

    "Initializing CRO...",

    "Loading Circuit Components...",

    "Analyzing Signals...",

    "Starting Communication Systems...",

    "Launching ECE Explorer..."

];

window.addEventListener("load", () => {

    const text = document.getElementById("loading-text");

    const loader = document.getElementById("loader");

    if(text && loader){

        let index = 0;

        const interval = setInterval(() => {

            index++;

            if(index < messages.length){

                text.textContent = messages[index];

            }

        }, 300);

        setTimeout(() => {

            clearInterval(interval);

            loader.style.opacity = "0";

            loader.style.transition = "0.5s";

            setTimeout(() => {

                loader.style.display = "none";

            }, 500);

        }, 2000);

    }

});