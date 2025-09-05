//for use as a rect for editable projects

//general use

console.log("project");

let htmlGen = 
`
<body>
    <template>
        <p>general text</p>
    </template>
</body>
`

export class Display{
    constructor(document, htmlString=htmlGen){
        console.log("display");
        document.createElement("<p>general text</p>");
    }
}


//learn
