//for use as a rect for editable projects

//general use

console.log("project");

let htmlGen = `
    <div id="learn-project-">
        <p>title!</p>
        <textarea name="user-code" id="user-code-" placeholder="code here..."></textarea>
        <button name="run-button">run</button>
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
        return template.content.firstElementChild;
    }

}


//learn
