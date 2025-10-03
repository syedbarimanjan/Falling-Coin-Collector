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