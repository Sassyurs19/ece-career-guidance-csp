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

/* ADVANCED CRO LOADER */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    const text =
        document.getElementById("loading-text");

    const percentElement =
        document.querySelector(".loading-percent");

    if (!loader || !text) return;

    const messages = [

    "Booting CRO...",

    "Scanning Communication Channels...",

    "Analyzing Signals...",

    "Loading ECE Pathways...",

    "Launching Explorer..."

];

    let index = 0;

    let percent = 0;

    const messageInterval = setInterval(() => {

        if(index < messages.length){

            text.textContent =
                messages[index];

            index++;

        }

    }, 500);

    const percentInterval = setInterval(() => {

        percent += 4;

        if(percentElement){

            percentElement.textContent =
                percent + "%";

        }

        if(percent >= 100){

            clearInterval(percentInterval);

        }

    }, 80);

    setTimeout(() => {

        clearInterval(messageInterval);

        loader.style.opacity = "0";

        loader.style.transition =
            "opacity 0.8s ease";

        setTimeout(() => {

            loader.remove();

        }, 800);

    }, 2500);

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


/* CLOSE MOBILE MENU ON LINK CLICK OR OUTSIDE TAP */

document.addEventListener("click", (e) => {

    const navLinks = document.getElementById("nav-links");
    const toggle = document.querySelector(".menu-toggle");

    if (!navLinks || !navLinks.classList.contains("active")) return;

    // Close when a nav link is tapped
    if (e.target.closest("#nav-links a")) {
        navLinks.classList.remove("active");
        return;
    }

    // Close when tapping outside the menu and the toggle
    if (!navLinks.contains(e.target) && !(toggle && toggle.contains(e.target))) {
        navLinks.classList.remove("active");
    }
});