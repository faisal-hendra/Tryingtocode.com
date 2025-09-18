import { CoinObj } from "./coinObj.js";


let userCoins = localStorage.getItem("coin") || "0";
localStorage.setItem("coin", userCoins);

let counter = document.getElementById("coin-counter");

console.log(userCoins);

let canvas = document.getElementById('render-canvas');
let ctx = canvas.getContext('2d');

const coinImgSrc = '../components/art/ttc coin icon.png';

let objects = []

//getCoin(1, counter);
    
window.requestAnimationFrame(draw);

function draw(sizeX=30, sizeY=300) {
    ctx.clearRect(0, 0, sizeX, sizeY);

    objects.forEach(element => {
        element.RenderImage(ctx, coinImgSrc);
        element.tick(.01);
        element.gravitate(counter);
        let gt_rect = counter.getBoundingClientRect();
        if(element.dead === true){
            objects = objects.filter(e => e !== element);
            changeNumber(1)
        }
        //console.log("draw (x, y): (" + String(Math.round(element.x_pos)) + ", " + String(Math.round(element.y_pos)) + ") vs counter (x, y): (" + String(Math.round(gt_rect.left + window.scrollX + gt_rect.width / 2)) + ", " + String(Math.round(gt_rect.top + window.scrollY + gt_rect.height / 2)) + ")");
    });
    window.requestAnimationFrame(draw);
}

export function getCoin(amm, counter, startElementPos, startString = ''){
    let coinObj = new CoinObj(counter, startElementPos.getBoundingClientRect().left + window.scrollX, startElementPos.getBoundingClientRect().top + window.scrollY, Math.random() * 10, Math.random() * 10);
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