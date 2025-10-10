//for use in learn.html
import { Display } from "./projects.js";
import "./coin.js";

let learnProjects = localStorage.getItem("projects") || "";
localStorage.setItem("projects", learnProjects);


let loadProjects = Array.from({length: 21}, (_, i) => i + 1);
let finishedProjects = localStorage.getItem("finished") || "";
localStorage.setItem("finished", finishedProjects);

let toggleAboveProjects = (index, add) => {
    console.log(projects.slice(0, index - 1));
    console.log(add.shouldShow)
    projects.slice(0, index - 1).forEach(element => {
        if (add.shouldShow == true){
            console.log("it is adding it");
            element.projectEl.classList.add("gone");
            element.projectEl.classList.remove("notminimized");
            element.projectEl.classList.add("minimized");
        }else{
            console.log("it is subtracting it");
            element.projectEl.classList.remove("gone");
        }
    })
}

// Save or update a project
let saveProject = (this_proj) => {
    const [title, content] = this_proj.split(":");
    let projects = JSON.parse(localStorage.getItem("projects") || "{}");
    projects[title] = content;
    localStorage.setItem("projects", JSON.stringify(projects));
};

let getProject = (title) => {
    const projects = JSON.parse(localStorage.getItem("projects") || "{}");
    return projects[title] || null;
};

// saveProject("helloworld:print('hello1')");
// saveProject("helloworld2:print('hello2')");
// let proj = getProject("helloworld");
// console.log(proj);

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
        display.projectEl.addEventListener('toggleElements', (shouldShow) => {
            console.log("This is shouldShow: ")
            console.log(shouldShow.detail.shouldShow)
            toggleAboveProjects(this_project, shouldShow.detail);
        })
        display.setupTextarea();
        let title = document.getElementById("main-content")
    });
}



loadProjects.forEach(index => {
    loadProject(index);
});