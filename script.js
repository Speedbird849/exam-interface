const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Capital of France?",
        options: ["London", "Berlin", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which language runs in the browser?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correct: 3
    },
    {
        question: "Which is a JavaScript framework?",
        options: ["Django", "React", "Flask", "Laravel"],
        correct: 1
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style System"],
        correct: 1
    },
    {
        question: "Which is a JavaScript framework?",
        options: ["Django", "React", "Flask", "Laravel"],
        correct: 1
    }
];

let cur = 0;
let answers = [];
let timeLeft = 15*60;

for (let i = 0; i < questions.length; i++) {
    answers[i] = null;
}

function sidebar() {
    var nav = document.getElementById("question-nav");
    nav.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
        var btn = document.createElement("button");
        btn.className = "btn";
        btn.innerHTML = (i + 1);
        btn.setAttribute("onclick", "goTo(" + i + ")");
        nav.appendChild(btn);
    }

    colour();
}

function goTo(index) {
    cur = index;
    load(index);
}

function colour() {
    let buttons = document.getElementsByClassName("btn");

    for (let i = 0; i < questions.length; i++) {
        if (answers[i] != null) {
            buttons[i].style.backgroundColor = "#34a15f";
        } else {
            buttons[i].style.backgroundColor = "#2c2c2c";
        }
    }
}

function load(index) {
    let q = questions[index];
    document.getElementById("question").innerHTML = q.question;

    if (index == 3) {
        document.getElementById("img").setAttribute("src", "images.png");
    } else {
        document.getElementById("img").setAttribute("src", "    ");
    }

    let op = document.getElementById("options");
    op.innerHTML = "";

    for (let i = 0; i < q.options.length; i++) {
        let btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = q.options[i];

        if (answers[index] == i) {
            btn.className = "option-btn sel";
        }

        btn.setAttribute("onclick", "select(" + index + "," + i + ")");
        op.appendChild(btn);
    }
}

function select(qIndex, opIndex) {
    answers[qIndex] = opIndex;
    load(qIndex);
    colour();
}

function submit() {
    var score = 0;

    for (let i = 0; i < questions.length; i++) {
        if (answers[i] == questions[i].correct) {
            score++;
        }
    }

    alert("Exam submitted!\nYour score is: " + score + " / " + questions.length );
}

let timerInterval = setInterval(function () {

    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.getElementById("timer").innerHTML = minutes + ":" + seconds;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submit();
    }

    timeLeft--;

}, 1000);

sidebar();
load(0);