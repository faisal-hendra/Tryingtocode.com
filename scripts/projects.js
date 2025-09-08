//for use as a rect for editable projects

import { runUserCode } from "./pyrun.js";

//general use

console.log("project");

let htmlGen = `
    <div id="learn-project-">
        <p>title!</p>
        <textarea name="user-code" id="user-code-" placeholder="code here..."></textarea>
        <button name="run-button">run</button>
        <p name="output" id="output-">output</p>
    </div>
`;

export class Display{
    constructor(document, parent, htmlString=htmlGen){
        console.log('yea display');
        let template = document.createElement('template');
        template.innerHTML = htmlString.trim();
        this.content = template.content;
        parent.appendChild(this.content);

        console.log(this.content.firstElementChild);
        //return template.content.firstElementChild;
    }

    displayUserCode(code){
        result = runUserCode(code);
        this.content.querySelector('[name="output"]').textContent = result;
    }
}


//learn
