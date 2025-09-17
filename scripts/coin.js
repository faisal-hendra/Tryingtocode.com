import { CoinObj } from "./coinObj";


let userCoins = localStorage.getItem("coin") || "0";
localStorage.setItem("coin", userCoins);

let counter = document.getElementById("coin-counter");

console.log(userCoins);
getCoin(1, counter);

export function getCoin(amm, counter, startString = ''){
    new CoinObj(counter);

    changeNumber(amm);
}

function changeNumber(amm){
    let currentCoins = String(parseInt(localStorage.getItem("coin")) + amm);
    localStorage.setItem("coin", currentCoins);
    if (counter != null){
        counter.value = startString + currentCoins;
    }
}