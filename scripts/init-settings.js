//this script is a very simple script to be run before anything else
//it grabs local settings, and puts them in window for use by other scripts

let getSettingsObject = () => {
    let settings = localStorage.getItem("user_settings");
    let settingsObject = JSON.parse(settings);
    return settingsObject;
}

let getLocalSetting = (settingsName) => {
    let settingsObject = getSettingsObject();
    let getSetting = settingsObject[settingsName];
    return getSetting;
}

let changeLocalSetting = (setting, value) => {
    //get from local storage
    let settingsObject = getSettingsObject();

    settingsObject[setting] = value;

    //send to local storage
    let updatedSettings = JSON.stringify(settingsObject);
    localStorage.setItem("user_settings", updatedSettings);
}

//changeLocalSetting("theme", "pixel-1");
//changeLocalSetting("image-extension", ".png");

changeLocalSetting("theme", "vector-1");
changeLocalSetting("image-extension", ".svg");

let updateThemeFromLocal = () => {
    let theme = getLocalSetting("theme") ?? "pixel-1";

    window.theme = theme;
}

updateThemeFromLocal();
console.log(window.theme);

let updateImageExtensionFromLocal = () => {
    let imageExtension = getLocalSetting("image-extension") ?? ".png";

    window.imageExtension = imageExtension;
}

updateImageExtensionFromLocal();
console.log(window.imageExtension);

let updateXPFromLocal = () => {
    let xp = getLocalSetting("xp") ?? "0";
    xp = Math.round(xp);

    window.xp = xp;
}

updateXPFromLocal();
console.log(window.level);