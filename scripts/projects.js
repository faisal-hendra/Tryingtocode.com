//for use as a rect for editable projects

import { runUserCode } from "./pyrun.js";
import { CodeArea } from "./codearea.js";

//general use

let htmlGen = 
`
    <div id="learn-project" class="project mini pixel-font">
        <div class="top-bar">
            <div class="button">
            <button class="project-close-button">
                <img id="close-img" src='./components/art/close button 1.png'>
            </button>
            </div>
            <div class="button">
            <button class="project-restart-button">
                <img id="reset-img" src="./components/art/rewind icon - stroke.png">
            </button>
            </div>
            <p class="project-title" id="project-title">Hello World Project:</p>
        </div>
        <p class="instructions">instructions</p>
        <div class="codeAreaParent"></div>
        <button name="run-button" class="run-code" class="output pixel-font">run</button>
    </div>
`;

let correctCode = new CustomEvent("correctCode", {
    detail: {
        value: 5
    }
});

async function isCorrectCode(code, output, JSON){
    if(JSON.returns != "*/n" && output == JSON.returns){
        return true;
    }
    let correct = false;

    let checkerCode = await fetch(`./projects/python - unit 1/${JSON.title}.json`);
    //const checkerJSON = await checkerCode.json();

    correct = await runUserCode(checkerCode);

    correct = runUserCode(checkerCode);
    if(correct){
        return true;
    }
    return false;
}

export class Display {
    constructor(document, parent, projectJSON, htmlString = htmlGen, textareaSize = 1 /*default to 1 line*/, toggled=false, code=null) { 
        this.toggled = toggled;

        this.createElements(document, parent, htmlString);
        this.findElements();

        this.min = true;

        this.closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleElements(false);
        });

        this.projectEl.addEventListener('click', async () => {
            if (this.projectEl.classList.contains('mini')) {
                this.toggleElements(true);
            }
        })

        this.rewindButton.addEventListener('click', () => {
            this.codeArea.createText(this.projectJSON.code);
        });

        this.projectJSON = projectJSON;
        
        setupRunButton(this);

        this.textareaSize = textareaSize;
        this.codeArea.createText("\n");

        this.lastLineCount = 1;

        this.setAttributes();

        this.reward = 5;
    }

    createElements(document, parent, htmlString){
        let template = document.createElement('template');
        template.innerHTML = htmlString.trim();

        this.content = template.content;
        this.projectEl = template.content.firstElementChild;
        parent.appendChild(this.content);

        this.codeAreaParent = this.projectEl.querySelector('[class="codeAreaParent"]');

        this.codeArea = new CodeArea(document, this.codeAreaParent);
    }

    findElements(){
        const query = (_name_) => {return this.projectEl.querySelector(_name_);}

        this.run_button = query('[name="run-button"]');
        this.output = query('[name="output"]');
        this.textarea = this.codeArea.textarea;
        this.lineNumbers = query(".line-numbers");
        this.closeButton = query(".project-close-button");
        this.rewindButton = query(".project-restart-button");
        this.title = query(".project-title");
        this.instructions = query(".instructions");
    }    

    setAttributes(){
        let addAmm = this.projectJSON.code.split("\n").length - 1;
        this.codeArea.createText(this.projectJSON.code);
        this.codeArea.editPresses(() => this.updateLineNumbers())
        let title = this.projectJSON.title;
        this.title.innerHTML = title;
        this.instructions.innerHTML = 'mission: ' + this.projectJSON.instruction;
        this.output.disabled = true;
    }

    async getInput(){
        this.old = this.output.value;
        this.output.disabled = false;
        return new Promise (resolve => {
            const handler = (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    this.output.removeEventListener("keydown", handler);
                    this.output.disabled = true; 
                    resolve(this.output.value.slice(this.old.length));
                }
                if(e.key === "Backspace"){
                    e.preventDefault();
                }
            }
            this.output.addEventListener("keydown", handler);
        });
    }

    toggleElements(value=false){ // false = stop showing this project
        window.currentDisplay = this;

        this.editClass("mini", !value);
        this.editClass("notmini", value);
        
        this.projectEl.dispatchEvent(
            new CustomEvent('toggleElements', {
                detail: { shouldShow: this.projectEl.classList.contains("notmini") }
            }
        )
        );
    }

    //make small
    minimize(element=this){
        element.editClass("gone", false);
        element.editClass("notmini", false);
        element.editClass("mini", true);
    }

    //make totally invisible
    hide(element=this){
        element.editClass("gone", true);
        element.editClass("notmini", false);
        element.editClass("mini", true);
    }

    editClass(className, set){
        this.projectEl.classList.toggle(className, set);
    }

    toggleClass(className, element){
        element.classList.toggle(className);
    }

    async displayUserCode(code){
        this.output.value = "";
        let result = await runUserCode(code);
        this.output.value = result;
        return result;
    }
    
    setupTextarea(){
        this.textarea.addEventListener('input', () => this.updateLineNumbers());

        this.textarea.addEventListener('scroll', () => {
            this.lineNumbers.scrollTop = this.textarea.scrollTop;
        });
        
        this.updateLineNumbers();
    }

    updateLineNumbers(){
        const lines = this.textarea.value.split('\n').length;
        this.lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
        this.lastLineCount = lines;
    }
}

function setupRunButton(display){
    display.run_button.addEventListener('click', async () => {
        let value = display.textarea.value;
        let codeReturn = await display.displayUserCode(value);
        if(isCorrectCode(value, codeReturn, display.projectJSON)){
            correctCode = new CustomEvent("correctCode", {
                detail: {
                    value: (display.reward !== undefined) ? display.reward : 5
                }
            });
            window.dispatchEvent(correctCode);
            display.reward = 0;
        }
        else{
            console.log("user code was " + codeReturn + " || But the code should've been " + display.projectJSON.returns);
        }
    });
}
