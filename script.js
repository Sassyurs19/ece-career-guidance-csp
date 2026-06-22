console.log("ECE Career Explorer Loaded");

/* MOBILE MENU */

function toggleMenu() {

    document
        .getElementById("nav-links")
        .classList
        .toggle("active");
}

/* QUIZ */

function checkQuiz() {

    let score = 0;

    const answers = document.querySelectorAll(
        'input[value="correct"]:checked'
    );

    score = answers.length;

    let result =
        document.getElementById("quiz-result");

    if (!result) return;

    if (score === 5) {

        result.innerHTML =
            "🌟 Excellent! Score: 5/5";

    }

    else if (score >= 3) {

        result.innerHTML =
            "🚀 Great Job! Score: " +
            score +
            "/5";

    }

    else {

        result.innerHTML =
            "📚 Nice Try! Score: " +
            score +
            "/5";

    }
}

/* FADE ANIMATION */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document
    .querySelectorAll(".fade-in")
    .forEach((el) => observer.observe(el));

/* CRO LOADER */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");
    const text = document.getElementById("loading-text");

    if(!loader || !text) return;

    const messages = [

        "Initializing CRO...",
        "Loading Circuit Components...",
        "Analyzing Signals...",
        "Starting Communication Systems...",
        "Launching ECE Explorer..."

    ];

    let index = 0;

    const interval = setInterval(() => {

        index++;

        if(index < messages.length){

            text.textContent = messages[index];

        }

    }, 350);

    setTimeout(() => {

        clearInterval(interval);

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

        }, 500);

    }, 2200);

});

/* SCROLL TO TOP BUTTON */

const scrollBtn =
    document.getElementById("scrollTopBtn");

if (scrollBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            scrollBtn.style.display = "flex";

        }

        else {

            scrollBtn.style.display = "none";

        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}