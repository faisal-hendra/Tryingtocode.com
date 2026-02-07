class TTCCreateProject extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback(){
        this.render();
    }
    render(){
        this.exampleAttribute = this.getAttribute("ex");

        this.innerHTML = `
<div class="create-align">
    <div class="create" id="create-page-holder">
        <!--button class="main-font" id="change-setting">change setting</button-->

        <div class="user-create-project main-font">
            <div class="create-main">
                <textarea class="main-font code-lines create-title" name="title" id="create-title" placeholder="title"></textarea>
                <div class="create-code-container">
                    <!--div class="code-lines">1</div-->
                    <textarea class="main-font code-lines create-code" name="defualt code" id="create-code" placeholder="defualt code"></textarea>
                </div>
            </div>
            <div class="advanced-toggle" id="user-create-project--advanced-toggle">extra</div>
            <select name="language">
                <option value="py">python</option>
                <option value="js">javascript</option>
                <option value="htm">html</option>
                <option value="c">c</option>
            </select>
            <div class="usercode-measure">
                <textarea class="main-font code-lines usercode-measure--textarea" name="" id="measures--output-includes" placeholder="output includes"></textarea>
                <textarea class="main-font code-lines usercode-measure--textarea" name="" id="measures--code-includes" placeholder="code includes"></textarea>
                <textarea class="main-font code-lines usercode-measure--textarea" name="" id="measures--output-discludes" placeholder="output discludes"></textarea>
                <textarea class="main-font code-lines usercode-measure--textarea" name="" id="measures--code-discludes" placeholder="code discludes"></textarea>
            </div>
        </div>
        
        <button id="submit-button">submit</button>
        <p id="create-output">output</p>
    </div>
    <div class="test">
        <div id="project-parent" class="project-parent"></div>
    </div>
</div>
        `;
    }
}


customElements.define("ttc-create-project", TTCCreateProject);