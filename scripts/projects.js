//for use as a rect for editable projects

//general use

console.log("project");

let htmlGen = `
<p>hello hello hello</p>
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
