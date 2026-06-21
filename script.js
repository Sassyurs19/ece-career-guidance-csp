console.log("ECE Career Explorer Loaded");

function toggleMenu(){

    document
    .getElementById("nav-links")
    .classList
    .toggle("active");
}

function checkQuiz(){

    let score = 0;

    const answers =
    document.querySelectorAll(
    'input[value="correct"]:checked'
    );

    score = answers.length;

    let result =
    document.getElementById("quiz-result");

    if(score === 5){

        result.innerHTML =
        "🌟 Excellent! Score: 5/5";
    }

    else if(score >= 3){

        result.innerHTML =
        "🚀 Great Job! Score: " + score + "/5";
    }

    else{

        result.innerHTML =
        "📚 Nice Try! Score: " + score + "/5";
    }
}

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");
        }

    });

});

document.querySelectorAll(".fade-in")
.forEach((el) => observer.observe(el));