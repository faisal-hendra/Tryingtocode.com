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

changeLocalSetting("theme", "pixel-1");

let updateFromLocalTheme = () => {
    let settings = localStorage.getItem("user_settings");
    let settingsObject = JSON.parse(settings);

    let theme = settingsObject["theme"] ?? "pixel-1";

    window.theme = theme;
}

updateFromLocalTheme();
console.log(window.theme);