import { CoinObj } from "./coinObj.js";


let userCoins = localStorage.getItem("coin") || "0";
localStorage.setItem("coin", userCoins);

let counter = document.getElementById("coin-counter");

console.log(userCoins);

let canvas = document.getElementById('render-canvas');
let ctx = canvas.getContext('2d');

const coinImgSrc = '../components/art/ttc coin icon.png';

let objects = []

getCoin(1, counter);
window.requestAnimationFrame(draw);

function draw(sizeX=300, sizeY=300) {
    ctx.clearRect(0, 0, sizeX, sizeY);

    objects.forEach(element => {
        element.RenderImage(ctx, coinImgSrc);
        element.tick(.0001);
        element.gravitate(ctx);
    });
    window.requestAnimationFrame(draw);
}

export function getCoin(amm, counter, startString = ''){
    let coinObj = new CoinObj(counter);
    objects.push(coinObj)

    changeNumber(amm);
}

function changeNumber(amm, startString=''){
    let currentCoins = String(parseInt(localStorage.getItem("coin")) + amm);
    localStorage.setItem("coin", currentCoins);
    if (counter != null){
        counter.innerHTML = startString + currentCoins;
    }
}