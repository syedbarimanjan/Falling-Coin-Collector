const basket = document.getElementById("basket");
const gameboard = document.getElementById("game");

basket.addEventListener("mousemove",(e) => {
    console.log(e)
})

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

        checkCollision(coin);

        if(topValue > window.innerHeight) {
            coin.remove()
            clearInterval(interval)
        }
    }, 20);
}

setInterval(createCoin, 1000);