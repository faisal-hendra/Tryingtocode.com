//for use in learn.html
import { Display } from "./projects.js";
import { getCoin } from "./coin.js";

let loadProjects = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];


let toggleAboveProjects = (index) => {
    console.log(projects.slice(0, index - 1));
    projects.slice(0, index - 1).forEach(element => {
        element.toggleClass("gone", element.projectEl);
    })
}

const loadProjectJSON = async (index) => {
    const response = await fetch('../python-projects.json');
    const json = await response.json();
    return json["projects"][index];
};

let parent = document.getElementById('project-parent');
let projects = [];
let display;

function loadProject(this_project){
    loadProjectJSON(this_project).then(JSON => {
        display = new Display(document, parent, JSON);
        projects.push(display);
        display.projectEl.addEventListener('toggleElements', () => {
            toggleAboveProjects(this_project);
        })
        display.setupTextarea();
        let title = document.getElementById("main-content")
    });
}

loadProjects.forEach(index => {
    loadProject(index);
});