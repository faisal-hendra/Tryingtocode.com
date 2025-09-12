const AREAHTML = `
<div class="input-output">
    <div class="code-editor">
        <div class="line-numbers"></div>
        <textarea name="user-code" id="user-code" placeholder="code here..."></textarea>
    </div>
    <textarea name="output" id="output" class="output">output</textarea>
</div>
`

export class CodeArea{
    constructor(parent, codeAreaHTML=AREAHTML, lineNumber=1){

        let template = document.createElement('template');
        template.innerHTML = codeAreaHTML.trim();
        this.content = template.content;
        this.projectEl = template.content.firstElementChild;
        parent.appendChild(this.content);

        this.textarea = this.projectEl.querySelector('textarea[name=user-code]');

        this.textarea.addEventListener('keydown', function(event) {
            if (event.keyCode === 9) {
                event.preventDefault();
                let start = this.selectionStart;
                let end = this.selectionEnd;
                this.value = this.value.substring(0, start) + " " + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 1;
            }
        });
    }

    returnValues(){
        return this.content;
    }
}