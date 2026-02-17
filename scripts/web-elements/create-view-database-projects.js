import { timeSince } from "../tools.js";
import { findProjects } from "../firebase-backend/firebaseProjects.js";

class TTCViewDataProjects extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){

        this.innerHTML = `
            <div>
                <button name="load-database-options">load database options</button>
                <div name="database-project-dropdown" id="database-project-dropdown">
                    <p></p>
                </div>
            </div>
        `;

        this.initValues();
        this.initButton();
    }

    initValues(){
        this.maxAmmountPerMinute = 20;
        this.timeSinceLastDone = 0;
        this.owner;
        this.databaseProjectButtonDropdown = this.querySelector("#database-project-dropdown"); 
        //rough fix \/
        this.createProject = this.parentElement;
    }

    initButton(){
        this.loadOptionsButton = this.querySelector("[name='load-database-options']");
        this.loadOptionsButton.addEventListener("click", () => {
            this.timeSinceLastDone += timeSince("loaded-database", 60001);
            this.loadOptions();
        });
    }


    async loadOptions(){
        if(typeof this.owner !== "string") { console.error(" owner not set: thou shalt set thine owner ");}

        let canLoadOptions = (this.timeSinceLastDone > (60000 / this.maxAmmountPerMinute)) ? true : false;
        if(!canLoadOptions) {
            console.error("can't load, not enough time elapsed: ", this.timeSinceLastDone);
            return null;
        }

        this.projects = await findProjects({ owner: this.owner });
        this.timeSinceLastDone = 0;
        this.showButtons();
    }



    showButtons(){
        let databaseProjectButtonDropdown = this.databaseProjectButtonDropdown
        let projectButtons = [];

        if(typeof this.projectButtons !== "undefined"){
            this.projectButtons.forEach((button) => {
                button.remove();
            });
        }
        
        this.projects.forEach((project) => {
            let buttonName = project.title.replaceAll(" ", "-").toLowerCase();
            let buttonClasses = "nice-button main-font";
            
            let newButton = document.createElement("button");
            newButton.class = buttonClasses;
            newButton.name = buttonName;
            newButton.innerHTML = project.title;

            databaseProjectButtonDropdown.appendChild(newButton);

            newButton.addEventListener("click", () => {
                this.createProject.loadDatabaseProject(project.title, project.mission, project.data);
            });

            projectButtons.push(newButton);
        });

        this.projectButtons = projectButtons;
    }
}

customElements.define("ttc-view-data-projects", TTCViewDataProjects);