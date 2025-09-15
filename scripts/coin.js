userCoins = 0;

function getCoin(amm, counter=null, string = ''){
    userCoins += amm;
    if (counter != null){
        counter.value = string + string(amm);
    }
}