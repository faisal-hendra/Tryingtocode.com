import { CoinObj } from "./coin-obj.js";
import { getUserData, setUserDatapoint } from "../firebase.js";

/**
 * This script is meant to tell the canvas to draw coins
 * and to handle when to create coins
 */


let counter = document.getElementById("coin-counter");

let canvas = document.getElementById('render-canvas');

const coinImgSrc = '../components/art/ttc coin icon.png';
let objects = [];

let localCoinCount = parseInt(localStorage.getItem("coin")) || 0;

let getUserCoins = async () => {
    let userData = await getUserData(window.user);

    if(userData == null || userData.coins == null) { return 0; }
    localCoinCount = userData.coins;

    return userData.coins;
}

let userCoins = await getUserCoins();
console.log(userCoins);
localStorage.setItem("coin", userCoins);

let drawAll = (sizeX=300, sizeY=300) => {
    let drawOne = element => {
        element.RenderImage(coinImgSrc);
        element.tick(.1);
        element.gravitate(counter);
        let gt_rect = counter.getBoundingClientRect();
        if(element.collectedCoin === true){
            objects = objects.filter(e => e !== element);
            changeNumber(1);
        }
    }

    ctx.clearRect(0, 0, sizeX, sizeY);
    objects.forEach(drawOne);
    window.requestAnimationFrame(drawAll);
}

if(canvas){
    var ctx = canvas.getContext('2d');
    var title = document.getElementById("main-title");
    window.addEventListener('correctCode', (details) => {
        getCoin(details.detail.value, counter, title);

        console.log(details);
        console.log(window.user);

        getUserData(window.user).then((userdata) => {
            console.log(userdata, userdata.coins);

            console.log(details.detail.value);
            if(userdata.coins == null) { 
                localCoinCount = details.detail.value;
                localStorage.setItem('coin', String(localCoinCount));
                setUserDatapoint(null, null, details.detail.value, null); 
                console.log("set coins done");
            }else {
                let currentCoins = userdata.coins + details.detail.value;
                setUserDatapoint(null, null, currentCoins, null);
                localCoinCount = currentCoins;
                localStorage.setItem(coin, String(localCoinCount));
                console.log("set coins done");
            }
        }); 
    });
    window.requestAnimationFrame(drawAll);
}

export let getCoin = (amm, go_to, startElementPos, startString = '') => {
    for (let index = 0; index < amm; index++) {
        let clientRect = startElementPos.getBoundingClientRect();
        let coinObj = new CoinObj(
            go_to,
            clientRect.left + window.scrollX,
            clientRect.top + window.scrollY,
            Math.random() * 10,
            Math.random() * 10,
            canvas,
            ctx,
            coinImgSrc
        );
        objects.push(coinObj);
    }
}

export let changeNumber = (amm, startString='') => {
    let currentCoins = String(parseInt(localStorage.getItem("coin")) + amm);
    /*getUserCoins().then(result => {
        console.log("getting result", result);
        counter.innerHTML = result;
    })*/
    //localStorage.setItem("coin", currentCoins);
    if (counter != null){
        counter.innerHTML = startString + currentCoins;
    }
    /*if(window.user){ changing this to occur in a more reliable spot
        setUserDatapoint(null, null, currentCoins, null);
        console.error("Save user coin to server");
    }*/
}

changeNumber(0);