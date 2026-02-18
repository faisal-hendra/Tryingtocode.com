class TTCCreateProjectOutput extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        console.log("render only when told to, not when created -- maybe?");
        //this.render();
    }
    render() {
        const language = this.getAttribute("language") ?? "python";
        const typingDisabled = this.getAttribute("typing-disabled") ?? "true";
        const codeText = this.getAttribute("codeText") ?? "";


        this.innerHTML = `
<div id="learn-project" class="project main-font">
        <div class="column-elements">
            <div class="top-bar proj-child show-when-mini">
                <div class="close-restart">
                    <div class="button">
                        <button class="project-close-button project-button" title="close project">
                            <img style="width: 30px; height: 30px;" name="close-img" src='./components/art/x.png' class="nice-button">
                        </button>
                    </div>
                    <div class="button">
                        <button class="project-restart-button project-button" title="reset code to defualt">
                            <img style="width: 30px; height: 30px;" name="reset-img" src="./components/art/reload - 3.png" class="nice-button">
                        </button>
                    </div>
                    <p class="project-title show-when-mini" name="project-title">title</p>
                    <div class="button project-hint-button">
                        <button class="project-hint-button project-button" title="get hint if stuck">
                            <img style="width: 50px; height: 50px;" name="hint-img" src="./components/art/clue - 5.png" class="nice-button">
                        </button>
                    </div>
                </div>
                <dialog class="main-font hint-popup hide" open>404</dialog>
            </div>  
            <p class="instructions proj-child" name="project-mission">mission</p> 
            <button class="nice-button link-button" name="link-unlink-toggle"><img class="link-button--image" src="../components/art/link-unlink -1.png"></img></button>
            <div>
                <ttc-typeable-code name="ttc-typeable-code" readonly="true" language=${language} typing-disabled=${typingDisabled} code-text=${codeText}><ttc-typeable-code>
            </div>   
        </div>
    </div>
</div>
        `;
        this.oldLanguage = language;
        this.initValues();
    }

    initValues(){
        this.languageElement = this.querySelector("[name='code-editor--pretty-code']");
        this.projectTitle = this.querySelector("[name='project-title']");
        this.mission = this.querySelector("[name='project-mission']");
        this.typeableCodeElement = this.querySelector("[name='ttc-typeable-code']");
        this.code = this.typeableCodeElement.textarea;
        this.prettyCode = this.typeableCodeElement.prettyCode;
        this.linkUnlink = this.querySelector("[name='link-unlink-toggle']");
        
    }

    updateCode() {
        this.typeableCodeElement.createPrettyCode(this.prettyCode, this.code.value);
    }

    updateValues(){
        debugger;
    }

    changeLanguage(newLanguage) {
        if(this.oldLanguage){
            this.languageElement.classList.remove(this.oldLanguage); 
        } else{
            this.oldLanguage = this.languageElement.classList.forEach((classElement) => {
            if(classElement.contains("language-")){ 
                return classElement;
            }
            return "error";
            });

            if(this.oldLanguage == "error"){ console.error("no old language"); return; }

            this.languageElement.classList.remove(this.oldLanguage); 
        }
        
        this.languageElement.classList.add(`language-${newLanguage}`);
    }
}

customElements.define("ttc-create-project-output", TTCCreateProjectOutput);