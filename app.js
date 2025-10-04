const basket = document.getElementById("basket");
const gameboard = document.getElementById("game");
const totalScoreDiv = document.getElementById("total-score");
const currentScoreDiv = document.getElementById("current-score");
const livesDiv = document.getElementById("lives");
const menuDiv = document.getElementById("menu");
const donateMenuDiv = document.getElementById("donateMenu");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
// const charachtersDiv = document.getElementById("charachters-div");
const guitarPlayerDiv = document.getElementById("guitar-player");
const homelessGuyDiv = document.getElementById("homeless-guy");
const assassinDiv = document.getElementById("assassin");
const teenagerDiv = document.getElementById("teenager");

let totalScore = 0;
let currentScore = 0;
let lives = 3;
let guitarist = 0;
let homelessGuy = 0;
let assassin = 0;
let teenager = 0;
let isGameStart = true;

gameboard.addEventListener("mousemove",(e) => {
    basket.style.bottom = e.x + "px";
    basket.style.top = e.y + "px";
    basket.style.left = e.x + "px";
    basket.style.right = e.y + "px";
})

function createCoin() {
    const coin = document.createElement("div")
    coin.classList.add("coin")

    const randomX = Math.random() * (window.innerWidth - 40);
    coin.style.left = randomX + "px";
    coin.style.top = "0px";

    gameboard.appendChild(coin);

    dropCoin(coin);
}

let coinIntervals = [];

function dropCoin(coin) {
    let topValue = 0;
    const fallSpeed = totalScore > 20 ? totalScore / 4 : 5;

    const coinInterval = setInterval(() => {
        topValue += fallSpeed;
        coin.style.top = topValue + "px";

        checkCollision(coin,coinInterval);

        if(topValue > window.innerHeight) {
            lives -= 1;
            livesDiv.textContent = "Lives: " + lives;
            coin.remove()
            clearInterval(coinInterval)
        }
    }, 20);

    coinIntervals.push(coinInterval);
}

function checkCollision(coin,coinInterval) {
    const coinRect = coin.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if(coinRect.bottom >= basketRect.top && coinRect.left < basketRect.right && coinRect.right > basketRect.left){
        totalScore++
        currentScore++
        totalScoreDiv.textContent = "Total Score: " + totalScore;
        currentScoreDiv.textContent = "Current Score: " + currentScore;
        coin.remove()
        clearInterval(coinInterval)
    }
}

function removeAllCoins() {
    gameboard.querySelectorAll(".coin").forEach(coin => coin.remove())
}

startButton.addEventListener("click",() => {
    menuDiv.style.display = "none";
    if(lives <= 0){
        removeAllCoins()
        lives = 3;
        totalScore = 0;
    }
    startGame()
})

let startInterval;
let donateInterval;

function startGame() {
    startInterval = setInterval(() => {
        if(lives > 0 && isGameStart){
            createCoin()
        } else {
            removeAllCoins()
            clearInterval(startInterval)
            clearInterval(donateInterval)
        }
    }, 1000);
    donateInterval = setInterval(() => {
        if(currentScore > 0 && donateMenuDiv.style.display !== "block"){
            donateCoins()
        }
    }, (Math.floor(Math.random() * lives) + 1) * 10000);
}

function donateCoins() {
    donateMenuDiv.style.display = "block"
    clearInterval(startInterval)
    const charachterClasses = ["pos1","pos2","pos3","pos4"]
    
    const allCharachters = [guitarPlayerDiv,homelessGuyDiv,assassinDiv,teenagerDiv]
    
    // This is the Fisher–Yates shuffle Algorithm 
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    const shuffledClasses = shuffle([...charachterClasses]);
    
    allCharachters.forEach((char, index) => {
        char.classList.remove(...charachterClasses);
        
        char.classList.add(shuffledClasses[index]);
    });
}

pauseButton.addEventListener("click",() => {
    clearInterval(startInterval)
    removeAllCoins()
    coinIntervals.forEach(interval => clearInterval(interval))
    clearInterval(donateInterval)
    isGameStart = false;
    pauseButton.classList.add("hide")
    resumeButton.classList.remove("hide")
})

resumeButton.addEventListener("click", () => {
    clearInterval(donateInterval)
    isGameStart = true;
    startGame()
    pauseButton.classList.remove("hide")
    resumeButton.classList.add("hide")

})

// restartButton.addEventListener("click",() => {
//     if(lives <= 0){
//         removeAllCoins()
//         menuDiv.style.display = "block"
//     }
// })




guitarPlayerDiv.addEventListener("click", () => {
    guitarist += currentScore;
    currentScore = 0;
    currentScoreDiv.textContent = "Current Score: " + currentScore
    console.log(guitarist)
    donateMenuDiv.style.display = "none"
    console.log(startInterval)
    clearInterval(donateInterval)
    clearInterval(startInterval)
    startGame()
})

homelessGuyDiv.addEventListener("click", () => {
    homelessGuy += currentScore;
    currentScore = 0;
    currentScoreDiv.textContent = "Current Score: " + currentScore
    console.log(homelessGuy)
    donateMenuDiv.style.display = "none"
    clearInterval(donateInterval)
    clearInterval(startInterval)
    startGame()
})

assassinDiv.addEventListener("click", () => {
    assassin += currentScore;
    currentScore = 0;
    currentScoreDiv.textContent = "Current Score: " + currentScore
    console.log(assassin)
    donateMenuDiv.style.display = "none"
    clearInterval(donateInterval)
    clearInterval(startInterval)
    startGame()
})

teenagerDiv.addEventListener("click", () => {
    teenager += currentScore;
    currentScore = 0;
    currentScoreDiv.textContent = "Current Score: " + currentScore
    console.log(teenager)
    donateMenuDiv.style.display = "none"
    clearInterval(donateInterval)
    clearInterval(startInterval)
    startGame()
})