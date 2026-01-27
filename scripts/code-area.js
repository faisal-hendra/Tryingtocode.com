//output and input area for user code
const AREAHTML = 
`
<div class="top-bar input-output main-font">
    <div class="code-editor">
        <div class="line-numbers lines"></div>
        <div class="single-block-grid">
            <textarea class="main-font codearea" name="user-code" placeholder="code here..." spellcheck="false"></textarea>
            <pre class="code-highlight" name="pretty-pre"><code class="main-font language-python" name="pretty-code"></code>
            </pre>
        </div>
    </div>
    <textarea name="output" id="output" class="lines output main-font">output</textarea>
</div>

`
export class CodeArea{
    constructor(document, parent, codeAreaHTML=AREAHTML, lineAmm=1){
        this.document = document;
        this.parent = parent;
        this.codeAreaHTML = codeAreaHTML;
        this.lineAmm = lineAmm;

        this.setAttributes();
    }

    setAttributes(){
        let template = document.createElement('template');

        template.innerHTML = this.codeAreaHTML.trim();
        this.content = template.content;
        this.projectEl = this.content.firstElementChild;
        this.parent.appendChild(this.content);

        this.textarea = this.projectEl.querySelector('textarea[name=user-code]');
        this.prettyCode = this.projectEl.querySelector('code[name=pretty-code]');
        this.prettyPre = this.projectEl.querySelector('pre[name=pretty-pre]');

        let matchScrollFilled = () => {this.matchScroll(this.prettyPre, this.textarea);}
        this.textarea.addEventListener('scroll', matchScrollFilled);
    }

    matchScroll(result_element, element){
        // Get and set x and y
        result_element.scrollTop = element.scrollTop;
        result_element.scrollLeft = element.scrollLeft;
    }

    createPrettyCode(prettyCodeElement, content){
        prettyCodeElement.textContent = content;
        Prism.highlightElement(prettyCodeElement);

    }

    //called by project.js 
    editPresses(call, tab="   "){
        let prettyCode = this.prettyCode;

        this.textarea.addEventListener('keydown', function(event) {
            let value = this.value;
            createPrettyCode(prettyCode, value);

            if (event.keyCode === 9) { //tab is space instead
                event.preventDefault();
                let start = this.selectionStart;
                let end = this.selectionEnd;
                this.value = this.value.substring(0, start) + tab + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + tab.length;
            }
            if (event.keyCode === 13){ //make (): have an indent next line
                let end = this.selectionEnd;
                let end_value = this.value.substring(end - 1, end);
                if(end_value === ":"){
                    let start = this.selectionStart;
                    event.preventDefault();
                    this.value = this.value.substring(0, start) + "\n" + tab + this.value.substring(end);
                }
            }

            call();
        });

        let createPrettyCode = this.createPrettyCode;
        this.textarea.addEventListener('input', () => {
            let value = this.textarea.value
            createPrettyCode(prettyCode, value);
        });
    }

    createText(value){
        this.textarea.value = value;
        for (let index = 0; index < this.lineAmm - 1; index++) {
            this.textarea.value += "\n";
        }

        this.createPrettyCode(this.prettyCode, this.textarea.value);

        return this.textarea.value.split("\n").length;
    }
}