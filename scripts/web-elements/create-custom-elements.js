import { ImageButton } from "../tools.js";

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

<ttc-view-data-projects></ttc-view-data-projects>
<div class="create-align" >
    <div class="create" data-js-tag="create-page-holder">
        <div class="user-create-project main-font">

            <div class="create-main">
                <textarea class="main-font code-lines create-section" name="section" data-js-tag="create-section" placeholder="section">default</textarea>
                <textarea class="main-font code-lines create-title" data-js-tag="title-section" placeholder="title"></textarea>
                <textarea class="code-lines create-mission main-font" placeholder="mission" data-js-tag="mission-section"></textarea>
                <div class="create-code-container">
                    <ttc-typeable-code data-js-tag="create-code" data-js-tag="create-code" name="defualt code" class="main-font code-lines create-code" placeholder="defualt code" language="python"></ttc-typeable-code>
                </div>
            </div>

            <button class="advanced--toggle nice-button" data-js-tag="advanced-toggle"><img draggable="false" class="advanced--toggle--image" src="../components/art/advanced settings - 1.png" alt="advanced settings"></button>
            <div data-js-tag="settings-toggled-element">

                <button class="language-select nice-button" data-js-tag="language-select-toggle"><img title="select language" draggable="false" src="../components/art/language logo - python.png" alt="select language" class="language-select-toggle--image"></button>
                <div data-js-tag="language-toggled-element" class="language-toggled-elements">
                    <li name="language-select--image-element-python" class="language-select--image-element" id="python-element"><img title="python" alt="python" draggable="false" src="../components/art/language logo - python.png" class="language-select--image-element--image"></li>
                    <li name="language-select--image-element-javascript" class="language-select--image-element unsupported" id="javascript-element"><img title="not supported yet" alt="not supported yet" draggable="false" src="../components/art/language logo - javascript.png" class="language-select--image-element--image"></li>
                    <li name="language-select--image-element-html" class="language-select--image-element unsupported" id="html-element"><img title="not supported yet" alt="not supported yet" draggable="false" src="../components/art/language logo - html.png" class="language-select--image-element--image"></li>
                    <li name="language-select--image-element-c" class="language-select--image-element unsupported" id="c-element"><img title="not supported yet" alt="not supported yet" draggable="false" src="../components/art/language logo - c.png" class="language-select--image-element--image"></li>
                </div>
                

                <!--select name="language" class="user-create-project--language-select advanced--language-select" id="user-create-project--language-select">
                    <option value="py">python <img draggable="false" src="../components/art/language logo - python.png" alt=""></img></option> 
                    <option value="js">javascript <img draggable="false" src="../components/art/language logo - javascript.png" alt=""></img></option>
                    <option value="htm">html <img draggable="false" src="../components/art/language logo - html.png" alt=""></img></option>
                    <option value="c">c <img draggable="false" src="../components/art/language logo - c.png" alt=""></img></option>
                </select-->
                <div data-js-tag="user-measure" class="usercode-measure">
                    <textarea class="main-font code-lines usercode-measure--textarea" data-js-tag="measure-output-includes" id="measures--output-includes" placeholder="output includes"></textarea>
                    <textarea class="main-font code-lines usercode-measure--textarea" data-js-tag="measure-code-includes" id="measures--code-includes" placeholder="code includes"></textarea>
                    <textarea class="main-font code-lines usercode-measure--textarea" data-js-tag="measure-output-discludes" id="measures--output-discludes" placeholder="output discludes"></textarea>
                    <textarea class="main-font code-lines usercode-measure--textarea" data-js-tag="measure-code-discludes" id="measures--code-discludes" placeholder="code discludes"></textarea>
                </div>

                <p>do not change these values:</p>
                <input type="password" data-js-tag="owner-section" type="text" placeholder="Owner" class="code-lines main-font" required minlength="4">
                <textarea class="main-font code-lines create-section" name="priority-within-section" id="create-section" placeholder="priority (int)"></textarea>
            </div>

            
        </div>
        
    </div>

    <button class="submit-button nice-button" data-js-tag="submit-button"><img draggable="false" class="submit-button--image" src="../components/art/submit - 1.png" alt="submit"></button>
    <p data-js-tag="error-text" class="error-message">must contain -title- and -mission-</p>
    
    <div id="create-output">
        <ttc-create-project-output data-js-tag="project-output"></ttc-create-project-output>
    </div>
    
    <div class="test">
        <div id="project-parent" class="project-parent"></div>
    </div>
</div>
        `;

        this.initValues();
        this.setupLinkButton();
        this.setupViewButton();

        let create_project_set = new Event("create_project_set");
        window.dispatchEvent(create_project_set);

    }


    initValues() {
        let queryME = (dataJSTag) => { return this.querySelector(`[data-js-tag=${dataJSTag}]`); }

        this.PROJECT_OUTPUT = queryME('project-output');
        this.VIEW_DATA = this.querySelector("ttc-view-data-projects");
        this.PROJECT_OUTPUT.render();

        this.sectionElement =   queryME("create-section");
        this.titleElement =     queryME("title-section");
        console.log(this.titleElement);
        this.mission =          queryME('mission-section');
        this.codeArea =         queryME("create-code");
        this.ownerElement =     queryME("owner-section");
        this.submitButton =     queryME("submit-button");
        this.errorElement =     queryME("error-text");
        
        this.measureParent =    queryME("user-measure");
        this.outputIncludes =   this.measureParent.querySelector("[data-js-tag='measure-output-includes']");
        this.codeIncludes =     this.measureParent.querySelector("[data-js-tag='measure-code-includes']");
        this.outputDiscludes =  this.measureParent.querySelector("[data-js-tag='measure-output-discludes']");
        this.codeDiscludes =    this.measureParent.querySelector("[data-js-tag='measure-code-discludes']");

        this.createOutput = this.querySelector("ttc-create-project-output");
        this.linkButton = this.createOutput.querySelector("[name='link-unlink-toggle']");

        this.advancedSettingsToggleElement =     queryME("advanced-toggle");
        this.advancedSettingsBeingToggled =      queryME("settings-toggled-element");
        this.languageSelectToggle =              queryME("language-select-toggle");
        this.languageSelectElementsBeingToggled = this.querySelectorAll(".language-toggled-elements");
        this.languageSelectImageElements =       this.querySelectorAll(".language-select--image-element");

        //////////////////////////////////////////////////////
    }

    setupViewButton(){
        //add changing owner
        //add changing section
        this.ownerElement.addEventListener("input", (input) => {
            this.VIEW_DATA.owner = this.ownerElement.value;
            console.log(this.ownerElement);
            console.log(this.ownerElement.value);
        });
    }

    setupLinkButton(){

        this.linkButtonImageSwapper = new ImageButton(this.linkButton, ["../components/art/link-unlink -1.png", "../components/art/link-unlink -2.png"]);
        this.linkButtonImageSwapper.changeOnClick();
    }


    loadDatabaseProject(title, mission, data){
        console.log(this.titleElement);
        console.log(title, mission, data, this.titleElement, this.mission, this.codeArea);

        this.titleElement.value = title;
        this.mission.value = mission;
        this.codeArea.textarea.value = data;
    }
}

customElements.define("ttc-create-project", TTCCreateProject);

class TTCViewProject extends TTCCreateProject {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log("yea boi!");
    }
}

customElements.define("ttc-view-project", TTCViewProject);