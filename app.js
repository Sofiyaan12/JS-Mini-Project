let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let totalGames = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

let stats = document.createElement("h3");
stats.innerText = `Games Played: ${totalGames} | High Score: ${highScore}`;
document.body.insertBefore(stats, h2.nextSibling);

function startGame() {
    if (!started) {
        started = true;
        levelUp();
        document.getElementById("startBtn").style.display = "none"; 
    }
}

document.addEventListener("keypress", startGame);
document.getElementById("startBtn").addEventListener("click", startGame);

function updateStats() {
    stats.innerText = `Games Played: ${totalGames} | High Score: ${highScore}`;
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
};

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
};

function levelUp() {
    userSeq = [];
    level++;
    document.getElementById("levelProgress").value = level;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 4); 
    let randomColor = btns[randomIndex];
    let randomButton = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    console.log(gameSeq);

    gameFlash(randomButton);
};

function checkAnswer(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        totalGames++;
        if (level > highScore) {
            highScore = level;
        }
        updateStats();

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key or Start to play again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = ""; 
        }, 250)
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAnswer(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.getElementById("levelProgress").value = 0;
    document.getElementById("startBtn").style.display = "inline-block"; 
}

let toggle = document.getElementById("modeToggle");

toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");

    
    if (document.body.classList.contains("dark-mode")) {
        document.querySelector("body").style.backgroundColor = "#121212"; 
    } else {
        document.querySelector("body").style.backgroundColor = ""; 
    }
});
