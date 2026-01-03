

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

export let updateSettings = (document) => {
    document.elements.forEach(element => {
        element.style = "";
    });
}