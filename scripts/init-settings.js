//this script is a very simple script to be run before anything else
//it grabs local settings, and puts them in window for use by other scripts

let changeLocalSetting = (setting, value) => {
    //get from local storage
    let settings = localStorage.getItem("user_settings");
    let settingsObject = JSON.parse(settings);

    settingsObject[setting] = value;

    //send to local storage
    let updatedSettings = JSON.stringify(settingsObject);
    localStorage.setItem("user_settings", updatedSettings);
}

changeLocalSetting("theme", "pixel-1"); //should be pixel-1 temporarily

//the way to read this name is: update the theme from local storage
let updateThemeFromLocal = () => {
    let settings = localStorage.getItem("user_settings");
    let settingsObject = JSON.parse(settings);

    let theme = settingsObject["theme"] ?? "pixel-1";

    window.theme = theme;
}

updateThemeFromLocal();
console.log(window.theme);

let updateXPFromLocal = () => {
    let settings = localStorage.getItem("user_settings");
    let settingsObject = JSON.parse(settings);

    let xp = settingsObject["xp"] ?? "0";
    xp = Math.round(xp);

    window.xp = xp;
}

updateXPFromLocal();
console.log(window.level);