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

    text.textContent = "Loading...";

    let percent = 0;

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



/* ============================================================
   NAV "MIXED INTO PAGE" — usable only at the very top
   Visible/interactive at scrollY ~ 0; hides smoothly on scroll down,
   returns when the user scrolls back to the top.
   ============================================================ */

/* (removed) Header is now a static sticky bar — no scroll hide/show logic needed. */



/* ============================================================
   CINEMATIC INTRO — flashlight beam + ENTER discovery
   (homepage only; plays once per session)
   ============================================================ */

(function () {

    const intro = document.getElementById("intro");
    if (!intro) return;

    const enterBtn = document.getElementById("enterBtn");

    /* Intro plays every time the page opens (project demo). */

    /* lock scroll/body movement while the intro is on screen (mobile + iOS Safari) */
    document.body.classList.add("intro-active");
    document.documentElement.classList.add("intro-active");

    const blockScroll = (e) => { if (document.body.classList.contains("intro-active")) e.preventDefault(); };
    document.addEventListener("touchmove", blockScroll, { passive: false });
    document.addEventListener("wheel", blockScroll, { passive: false });

    const reduceMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    /* target (pointer) + eased current beam position, in px */
    let tx = W() * 0.18, ty = H() * 0.22;
    let cx = tx, cy = ty;

    let pointerActive = false;
    let autoScan = false;
    const startTime = performance.now();

    /* Place the hidden ENTER button in a dark corner of the room */
    function placeButton() {
        // centered on screen
        const bx = W() * 0.5;
        const by = H() * 0.5;
        enterBtn.style.left = bx + "px";
        enterBtn.style.top = by + "px";
    }
    placeButton();
    window.addEventListener("resize", () => {
        placeButton();
        if (!pointerActive) { tx = W() * 0.18; ty = H() * 0.22; }
    });

    /* Pointer / touch control */
    function setTarget(x, y) {
        tx = x; ty = y;
        pointerActive = true;
        autoScan = false;
    }

    intro.addEventListener("mousemove", (e) => setTarget(e.clientX, e.clientY));
    intro.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches[0]) {
            setTarget(e.touches[0].clientX, e.touches[0].clientY);
        }
        e.preventDefault();
    }, { passive: false });

    let discovered = false;
    function checkDiscovery() {
        if (discovered) return;
        const r = enterBtn.getBoundingClientRect();
        const bxC = r.left + r.width / 2;
        const byC = r.top + r.height / 2;
        // only "discovered" when the beam is actually ON the button
        const margin = Math.min(W(), H()) < 600 ? 14 : 22;
        const within =
            cx > r.left - margin && cx < r.right + margin &&
            cy > r.top - margin && cy < r.bottom + margin;
        if (within) {
            discovered = true;
            enterBtn.classList.add("discovered");
            enterBtn.setAttribute("aria-hidden", "false");
            enterBtn.setAttribute("tabindex", "0");
            autoScan = false;
            const hint = intro.querySelector(".intro-hint");
            if (hint) hint.textContent = "Click the power button to enter";
        }
    }

    /* Smooth auto-scan path so it feels human-controlled before input */
    function autoScanPos(t) {
        const s = (t - startTime) / 1000;
        const x = W() * (0.5 + 0.26 * Math.sin(s * 0.7));
        const y = H() * (0.5 + 0.18 * Math.sin(s * 0.95 + 1.2));
        return { x, y };
    }

    function frame(now) {
        // eased follow
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;

        const bx = (cx / W() * 100).toFixed(2) + "%";
        const by = (cy / H() * 100).toFixed(2) + "%";
        intro.style.setProperty("--bx", bx);
        intro.style.setProperty("--by", by);

        checkDiscovery();
        rafId = requestAnimationFrame(frame);
    }

    let rafId = requestAnimationFrame(frame);

    let entering = false;
    function startEntering() {
        if (entering) return;
        entering = true;
        const hint = intro.querySelector(".intro-hint");
        let n = 3;
        if (hint) hint.textContent = "Entering the website in " + n + "…";
        const cd = setInterval(() => {
            n--;
            if (n > 0) {
                if (hint) hint.textContent = "Entering the website in " + n + "…";
            } else {
                clearInterval(cd);
                enterSite();
            }
        }, 1000);
    }

    /* ENTER click → cinematic fade + camera push, then reveal homepage */
    function enterSite() {
        if (intro.classList.contains("intro-exit")) return;
        intro.classList.add("intro-exit");
        setTimeout(() => {
            cancelAnimationFrame(rafId);
            document.body.classList.remove("intro-active");
            document.documentElement.classList.remove("intro-active");
            intro.remove();
        }, reduceMotion ? 500 : 1400);
    }

    enterBtn.addEventListener("click", () => {
        if (enterBtn.classList.contains("discovered")) startEntering();
    });
    enterBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            if (enterBtn.classList.contains("discovered")) startEntering();
        }
    });

})();
