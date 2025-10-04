const basket = document.getElementById("basket");
const gameboard = document.getElementById("game");
const totalScoreDiv = document.getElementById("total-score");
const currentScoreDiv = document.getElementById("current-score");
const livesDiv = document.getElementById("lives");
const menuDiv = document.getElementById("menu");
const donateMenuDiv = document.getElementById("donateMenu");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
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

function dropCoin(coin) {
    let topValue = 0;
    const fallSpeed = totalScore > 20 ? totalScore / 4 : 5;

    const interval = setInterval(() => {
        topValue += fallSpeed;
        coin.style.top = topValue + "px";

        checkCollision(coin,interval);

        if(topValue > window.innerHeight) {
            lives -= 1;
            livesDiv.textContent = "Lives: " + lives;
            coin.remove()
            clearInterval(interval)
        }
    }, 20);
}

function checkCollision(coin,interval) {
    const coinRect = coin.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if(coinRect.bottom >= basketRect.top && coinRect.left < basketRect.right && coinRect.right > basketRect.left){
        totalScore++
        currentScore++
        totalScoreDiv.textContent = "Total Score: " + totalScore;
        currentScoreDiv.textContent = "Current Score: " + currentScore;
        coin.remove()
        clearInterval(interval)
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
        if(lives > 0){
            createCoin()
        } else {
            removeAllCoins()
            clearInterval(startInterval)
        }
    }, 1000);
    donateInterval = setInterval(() => {
        donateCoins()
    }, Math.random() * 10000 * lives);
}

function donateCoins() {
    donateMenuDiv.style.display = "block"
    clearInterval(startInterval)
}


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
    clearInterval(donateInterval)
    // removeAllCoins()
    startGame()
})

homelessGuyDiv.addEventListener("click", () => {
    homelessGuy += currentScore;
    currentScore = 0;
    currentScoreDiv.textContent = "Current Score: " + currentScore
    console.log(homelessGuy)
    donateMenuDiv.style.display = "none"
    clearInterval(donateInterval)
    // removeAllCoins()
    startGame()
})

assassinDiv.addEventListener("click", () => {
    assassin += currentScore;
    currentScore = 0;
    currentScoreDiv.textContent = "Current Score: " + currentScore
    console.log(assassin)
    donateMenuDiv.style.display = "none"
    clearInterval(donateInterval)
    // removeAllCoins()
    startGame()
})

teenagerDiv.addEventListener("click", () => {
    teenager += currentScore;
    currentScore = 0;
    currentScoreDiv.textContent = "Current Score: " + currentScore
    console.log(teenager)
    donateMenuDiv.style.display = "none"
    clearInterval(donateInterval)
    // removeAllCoins()
    startGame()
})