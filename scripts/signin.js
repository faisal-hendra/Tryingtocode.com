const htmlGen =  
`
<div id="sign-in" class="pixel-font center si-container">
    <form action="">
        <h1 class="si-title">sign in</h1>
        <div class="input-box si-input-container">
            <input id="username" type="text" placeholder="Username (required)" required>
        </div>
        <div class="input-box si-output-container">
            <input id="password" type="text" placeholder="Password">
        </div>
    </form>
    <button id="submit-button" class="si-submit">submit</button>
</div>
`

export class SignIn{
    constructor(document, parent, HTML=htmlGen){
        let template = document.createElement('template');

        template.innerHTML = HTML.trim();
        this.content = template.content;
        this.projectEl = this.content.firstElementChild;

        parent.appendChild(this.content);

        this.findElements();

        this.toggle();
    }

    findElements(){
        this.user = this.projectEl.querySelector("#username");
        this.password = this.projectEl.querySelector("#password");
        this.submit = this.projectEl.querySelector("#submit-button");
    }

    toggleButton(button){
        button.addEventListener("click", () => {
            this.toggle();
        });
    }

    toggle(){
        console.log("toggle");
        this.projectEl.classList.toggle("gone");
    }
}
