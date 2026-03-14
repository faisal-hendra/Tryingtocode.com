console.log("readddy for settings rider sir");

const localStorageSettingsString = "user_settings";

const DEFAULT_SETTINGS = {
    "font": "main-font",
};

//FIX THIS LATER!
let playerSettings = {
    "font": "main-font"
};
//Should be, storing settings with firebase or something

export let changeSetting = (setting, value) => {
    Object.keys(playerSettings).forEach(playerSetting => {
        if(playerSetting == setting){
            playerSettings[setting] = value;
        }
    })
}

export let fontChange = (toFont) => {
    console.log(toFont);
    editSetting({ font: toFont });
    /*
    document.querySelectorAll('*').forEach(element => {
        if(toFont == "pixel1"){
            element.classList.toggle("main-font", true);
            element.classList.toggle("pixel-alt", false);
        }
        if(toFont == "arial1"){
            element.classList.toggle("main-font", false);
            element.classList.toggle("pixel-alt", true);
        }

    });*/
}


export let getSettingsObject = () => {
    let storedSettings = localStorage.getItem(localStorageSettingsString);
    let storedSettingsObject = JSON.parse(storedSettings);
    return storedSettingsObject;
}

let initSettingsObject = () => {
    let settingsObject = getSettingsObject();
    if(settingsObject == null){
        localStorage.setItem(localStorageSettingsString, JSON.stringify(DEFAULT_SETTINGS));
    }
}

initSettingsObject();

export let editSetting = (newSettings = { /* supported settings: font, theme */ }) => {
    let settingsObject = getSettingsObject();
    console.log(newSettings, settingsObject);
    Object.keys(newSettings).forEach(newSettingsKey => {
        settingsObject[newSettingsKey] = newSettings[newSettingsKey];
    });
    let settingsObjectString = JSON.stringify(settingsObject);
    localStorage.setItem(localStorageSettingsString, settingsObjectString);
}

export let applySettings = () => {
    let settingsObject = getSettingsObject();


    let applyFont = () => {
        document.querySelectorAll('*').forEach(element => {
            if(!element.classList.contains("main-font")){ return; }

            element.classList.toggle("pixel-1", settingsObject["font"] == "pixel1");
            element.classList.toggle("arial-1", settingsObject["font"] == "arial1");
        });
    }

    applyFont();
}

applySettings();
requestAnimationFrame(applySettings);

/*var isPixel = true;
export let updateSettings = (document) => {
    isPixel = !isPixel;
    document.querySelectorAll('*').forEach(element => {
        element.classList.toggle("main-font", isPixel);
        element.classList.toggle("pixel-alt", !isPixel);
    });
}*/

//make below \/\/

/**
export let updateSettings = (setting) =>

let updateSettingsButton = document.getElementById("change-setting");
let filledSettings = () => {updateSettings(playerSettings[0]);}
updateSettingsButton.addEventListener("click", filledSettings);
 */

