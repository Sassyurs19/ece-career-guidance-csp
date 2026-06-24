console.log("ECE Career Explorer Loaded");

/* ============================================================
   MOBILE MENU (click + keyboard + aria-expanded sync)
   ============================================================ */

function setExpanded(isOpen) {
    const toggle = document.querySelector(".menu-toggle");
    if (toggle) {
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    }
}

function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    if (!navLinks) return;
    const isOpen = navLinks.classList.toggle("active");
    setExpanded(isOpen);
}

function closeMenu() {
    const navLinks = document.getElementById("nav-links");
    if (navLinks) navLinks.classList.remove("active");
    setExpanded(false);
}

/* Keyboard activation for div-based controls (Enter / Space) */
document.addEventListener("keydown", (e) => {

    const isActivate =
        e.key === "Enter" || e.key === " " || e.key === "Spacebar";

    if (!isActivate) return;

    const target = e.target;
    if (!target || !target.classList) return;

    if (target.classList.contains("menu-toggle")) {
        e.preventDefault();
        toggleMenu();
    }

    else if (target.classList.contains("back-arrow")) {
        e.preventDefault();
        history.back();
    }
});

/* ============================================================
   QUIZ
   ============================================================ */

function checkQuiz() {

    const result = document.getElementById("quiz-result");

    if (!result) return;

    const totalQuestions = 5;

    /* Count how many distinct questions have an answer selected */
    const answeredGroups = new Set();

    document
        .querySelectorAll('input[type="radio"]:checked')
        .forEach((input) => answeredGroups.add(input.name));

    if (answeredGroups.size < totalQuestions) {

        result.innerHTML =
            '<i class="fas fa-circle-info" aria-hidden="true"></i> ' +
            'Please answer all questions before submitting.';

        return;
    }

    const score = document.querySelectorAll(
        'input[value="correct"]:checked'
    ).length;

    if (score === 5) {

        result.innerHTML =
            '<i class="fas fa-star" aria-hidden="true"></i> Excellent! Score: 5/5';

    }

    else if (score >= 3) {

        result.innerHTML =
            '<i class="fas fa-rocket" aria-hidden="true"></i> Great Job! Score: ' +
            score + '/5';

    }

    else {

        result.innerHTML =
            '<i class="fas fa-book" aria-hidden="true"></i> Nice Try! Score: ' +
            score + '/5';

    }
}

/* ============================================================
   FADE ANIMATION
   ============================================================ */

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

/* ============================================================
   ADVANCED CRO LOADER
   ============================================================ */

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

        if (index < messages.length) {

            text.textContent =
                messages[index];

            index++;

        }

    }, 500);

    const percentInterval = setInterval(() => {

        percent += 4;

        if (percentElement) {

            percentElement.textContent =
                percent + "%";

        }

        if (percent >= 100) {

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

/* ============================================================
   SCROLL TO TOP BUTTON
   ============================================================ */

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

/* ============================================================
   CLOSE MOBILE MENU ON LINK CLICK OR OUTSIDE TAP
   ============================================================ */

document.addEventListener("click", (e) => {

    const navLinks = document.getElementById("nav-links");
    const toggle = document.querySelector(".menu-toggle");

    if (!navLinks || !navLinks.classList.contains("active")) return;

    // Close when a nav link is tapped
    if (e.target.closest("#nav-links a")) {
        closeMenu();
        return;
    }

    // Close when tapping outside the menu and the toggle
    if (!navLinks.contains(e.target) && !(toggle && toggle.contains(e.target))) {
        closeMenu();
    }
});
