const basket = document.getElementById("basket");
const gameboard = document.getElementById("game");
const scoreDiv = document.getElementById("score");
const livesDiv = document.getElementById("lives");

let score = 0;
let lives = 3;


// basket.addEventListener("mousemove",(e) => {
//     console.log(e)
// })

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
    const fallSpeed = 3;

    const interval = setInterval(() => {
        topValue += fallSpeed;
        coin.style.top = topValue + "px";

        checkCollision(coin,interval);
        console.log(topValue + "val")
        console.log(window.innerHeight + "hie")

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
        score++
        scoreDiv.textContent = "Score: " + score;
        coin.remove()
        clearInterval(interval)
    }
}


setInterval(() => {
    if(lives > 0){
        createCoin()
    }
}, 1000);