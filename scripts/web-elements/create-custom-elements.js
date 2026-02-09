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
<div class="create-align" id="create-project-container">
    <div class="create" id="create-page-holder">
        <!--button class="main-font" id="change-setting">change setting</button-->

        <div class="user-create-project main-font">

            <div class="create-main">
                <textarea class="main-font code-lines create-title" name="title" id="create-title" placeholder="title"></textarea>
                <textarea class="code-lines create-mission main-font" placeholder="mission" id="create-mission"></textarea>
                <div class="create-code-container">
                    <!--div class="code-lines">1 2 3 4 5</div-->
                    <textarea class="main-font code-lines create-code" name="defualt code" id="create-code" placeholder="defualt code"></textarea>
                </div>
            </div>

            <button class="advanced--toggle nice-button" id="user-create-project--advanced-toggle"><img class="advanced--toggle--image" src="../components/art/advanced settings - 1.png" alt="advanced settings"></button>
            <div class="user-create-project--toggled-element">

                <div name="language-select" id="language-select-toggle"><img src="../components/art/language logo - python.png" alt=""></div>
                <div name="language-select-elements" class="language-select-elements" id="language-select-toggled-elements">
                    <li class="language-select--image-element" id="python-element"><img src="../components/art/language logo - python.png" alt=""></li>
                    <li class="language-select--image-element" id="javascript-element"><img src="../components/art/language logo - javascript.png" alt=""></li>
                    <li class="language-select--image-element" id="html-element"><img src="../components/art/language logo - html.png" alt=""></li>
                    <li class="language-select--image-element" id="c-element"><img src="../components/art/language logo - c.png" alt=""></li>
                </div>
                

                <!--select name="language" class="user-create-project--language-select advanced--language-select" id="user-create-project--language-select">
                    <option value="py">python <img src="../components/art/language logo - python.png" alt=""></img></option> 
                    <option value="js">javascript <img src="../components/art/language logo - javascript.png" alt=""></img></option>
                    <option value="htm">html <img src="../components/art/language logo - html.png" alt=""></img></option>
                    <option value="c">c <img src="../components/art/language logo - c.png" alt=""></img></option>
                </select-->
                <div class="usercode-measure">
                    <textarea class="main-font code-lines usercode-measure--textarea" name="" id="measures--output-includes" placeholder="output includes"></textarea>
                    <textarea class="main-font code-lines usercode-measure--textarea" name="" id="measures--code-includes" placeholder="code includes"></textarea>
                    <textarea class="main-font code-lines usercode-measure--textarea" name="" id="measures--output-discludes" placeholder="output discludes"></textarea>
                    <textarea class="main-font code-lines usercode-measure--textarea" name="" id="measures--code-discludes" placeholder="code discludes"></textarea>
                </div>
            </div>
        </div>
        
        <button class="submit-button nice-button" id="submit-button"><img class="submit-button--image" src="../components/art/submit - 1.png" alt="submit"></button>
        <p id="submit-button-error" class="error-message">must contain -title- and -mission-</p>
        <p id="create-output">output</p>
    </div>
    <div class="test">
        <div id="project-parent" class="project-parent"></div>
    </div>
</div>
        `;
        
        let create_project_set = new Event("create_project_set");
        window.dispatchEvent(create_project_set);
    }
}


customElements.define("ttc-create-project", TTCCreateProject);