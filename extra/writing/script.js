import { timeSince } from "../../scripts/tools.js";

let defaultMaxTimeInput = document.getElementById("default-time-time");
let defaultEditTimeInput = document.getElementById("default-edit-time");
let defaultTotalTimeInput = document.getElementById("default-total-time");
let appendToFullButton = document.getElementById("append-full-write-textarea");
let recoverOldButton = document.getElementById("recover-old");
let deleteOldButton = document.getElementById("delete-old");
let fullTextArea = document.getElementById("full-write-textarea");
let textArea = document.getElementById("speed-write-textarea");
let editTime = document.getElementById("edit-time");
let timeTime = document.getElementById("time-time");
let totalTime = document.getElementById("total-time");

textArea.style.color = "#ada2a2";

let activeTextarea = false;
const failure_message = "failure, you didn't write fast enough";
let defualtMaxTime = 2;
let defualtEditTime = 10;
let defualtTotalTime = 60;
let maxTime = defualtMaxTime;        // seconds
let editTimeLeft = defualtEditTime;  // seconds
let totalTimeLeft = defualtTotalTime
let timeSinceLastTyped = timeSince("textareaTyped");

let checkTimeInterval;
let resetAmm = 0;

textArea.addEventListener("copy", (event) => {
    if(activeTextarea){ event.preventDefault(); }
});
textArea.addEventListener('dragstart', (e) => {if(activeTextarea){ e.preventDefault(); }});

let resetTextarea = () => {
    if(activeTextarea) { return null; }

    console.log(maxTime, editTimeLeft, totalTimeLeft, defualtMaxTime, defualtEditTime, defualtTotalTime);
    maxTime = defualtMaxTime;
    editTimeLeft = defualtEditTime;
    totalTimeLeft = defualtTotalTime;

    resetAmm += 1;

    defaultMaxTimeInput.style.display = "block";
    defaultEditTimeInput.style.display = "block";
    defaultTotalTimeInput.style.display = "block";
    textArea.style.color = "#fff";

    textArea.placeholder = "press enter again";
    textArea.value = "";

    if(resetAmm < 2) { return "not ready yet"; }
    
    resetAmm = 0;

    textArea.style.color = "#e8fc7c";

    activeTextarea = true;
    textArea.value = "";
    textArea.placeholder = "start typing";
    defaultMaxTimeInput.style.display = "none";
    defaultEditTimeInput.style.display = "none";
    defaultTotalTimeInput.style.display = "none";

    checkTimeInterval = setInterval(checkTime, 1000);
}


let succeeded = () => {
    activeTextarea = false;
    //textArea.value = textArea.value + " \n\npress enter to reset."
    clearInterval(checkTimeInterval);
    let oldValue = localStorage.getItem("oldStoredStuff");
    localStorage.setItem("oldStoredStuff", oldValue + textArea.value);
    textArea.placeholder = "press enter";
    textArea.style.backgroundColor = "#00994d13";
}

let failed = () => {
    activeTextarea = false;
    textArea.value = failure_message;
    clearInterval(checkTimeInterval);
    textArea.placeholder = "press enter";

    //setTimeout(resetTextarea, 3000);
}

let setTimes = () => {
    editTime.innerHTML = "Editing time left: " + String(Math.round(editTimeLeft));
    timeTime.innerHTML = "Temporary time left: " + String(Math.max(0, Math.round((maxTime * 1000 - timeSinceLastTyped) / 1000)));
    totalTime.innerHTML = "Total time left: " + String(Math.round(totalTimeLeft));
}

let checkTime = () => {
    let deltaTime = timeSince("textareaTyped");

    timeSinceLastTyped += deltaTime;
    //totalTimeLeft -= deltaTime / 1000;

    if(timeSinceLastTyped > maxTime * 1000){
        editTimeLeft -= deltaTime / 1000;
        textArea.style.backgroundColor = "#99000013";
    } else {
        textArea.style.backgroundColor = "#0c2723";
    }

    console.log(timeSinceLastTyped, editTimeLeft);

    if(editTimeLeft <= 0){
        failed();
    }
    if(totalTimeLeft <= 0){
        succeeded();
    }

    setTimes();
}

textArea.addEventListener("input", (input) => {
    if(input === "Backspace") { return; }
    if(!activeTextarea && input.inputType === "insertLineBreak") { resetTextarea(); timeSince("textareaTyped"); }
    else if(!activeTextarea) {let selection = textArea.selectionEnd; /*textArea.value += "\n\npress enter to reset";*/ textArea.selectionEnd = selection; }

    timeSinceLastTyped = 0;

    if(activeTextarea) {
        let deltaTime = timeSince("textareaTyped");
        totalTimeLeft -= deltaTime / 1000;

        setTimes();
    }
});

appendToFullButton.addEventListener("click", () => {
    if(!activeTextarea){
        fullTextArea.value += textArea.value + "\n";
        localStorage.setItem("newestStoredStuff", fullTextArea.value)
    }
});

recoverOldButton.addEventListener("click", () => {
    if(!activeTextarea){
        fullTextArea.value = localStorage.getItem("oldStoredStuff");
    }
})

deleteOldButton.addEventListener("click", () => {
    localStorage.setItem("oldStoredStuff", "");
});

if(localStorage.getItem("oldStoredStuff") == null){ localStorage.setItem("oldStoredStuff", ""); }

let createEventListenerForInput = (input, value, value2) => {
    input.addEventListener("input", () => {
        if(!activeTextarea){
            value = parseFloat(input.value);
            value2 = value;
            console.log("yep", parseFloat(input.value), value);

        }
    });
}

defaultEditTimeInput.addEventListener("input", () => {
    if(!activeTextarea){
        defualtEditTime = parseFloat(defaultEditTimeInput.value);
    }
});
defaultMaxTimeInput.addEventListener("input", () => {
    if(!activeTextarea){
        defualtMaxTime = parseFloat(defaultMaxTimeInput.value);
    }
});
defaultTotalTimeInput.addEventListener("input", () => {
    if(!activeTextarea){
        defualtTotalTime = parseFloat(defaultTotalTimeInput.value);
    }
});
