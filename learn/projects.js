const template = document.createElement("template");
template.innerHTML = 
    `<link rel="stylesheet" href="./learn.css"> 
    <div id="proj-1">
        <div class="pixel-button" id="project-button" proj-button>
            <button style="display: none;" class="hidden back-button" id="back-button">back</button>
            <h1 class="pixel"><slot name="title">101 not found</slot></h1>
            <textarea class="user_code" name="user-code" id="user-code" placeholder="code here" style="resize: none"></textarea>
            <button style="display: none;" class="hidden run-button">run</button>
            <iframe id="sandbox" class="hidden" style="display:none" allow-scripts></iframe>
            <p class="pixel" id="description"><slot name="description">101 not found</slot></p>
        </div>
    </div>`;



window.addEventListener("message", (event) => {
    console.log("User code result:", event.data);
});

class Learning_Project extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));
        
        this.big = false;

        this.clicked = this.clicked.bind(this);

        this.button = this.shadow.querySelector("[proj-button]");
        this.button.addEventListener("click", this.clicked);

        this.runButton = this.shadow.querySelector(".run-button");
        this.runButton.addEventListener("click", () => {
        const code = this.shadow.getElementById("user-code").value;
        this.run_sandbox(code);
        });
    }

    create_sandbox(){
        this.iframe = document.createElement("iframe");
        this.iframe.id = "sandbox";
        this.iframe.classList.add("hidden");
        this.iframe.style.display = "none";
        this.iframe.setAttribute("sandbox", "allow-scripts");
        return this.iframe;
    }

    run_sandbox(code){
        const iframe = this.shadow.getElementById("sandbox");

        iframe.style.display = "block";
        iframe.classList.remove("hidden");

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
            <html>
            <body>
                <div id="output" style="font-family: monospace; white-space: pre; color: white;"></div>
                <script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"><\/script>
                <script>
                    async function main() {
                        const pyodide = await loadPyodide();
                        try {
                            let result = await pyodide.runPythonAsync(\`${code.replace(/`/g, '\\`')}\`);
                            document.getElementById("output").textContent = result || "[no output]";
                            parent.postMessage("Python Output: " + result, "*");
                        } catch (err) {
                            document.getElementById("output").textContent = "Error: " + err.message;
                            parent.postMessage("Python Error: " + err.message, "*");
                        }
                    }
                    main();
                <\/script>
            </body>
            </html>
    `);
        iframeDoc.close();
    }

    clicked(event){
        console.log("clicked");

        event.stopPropagation();

        const target = event.target;
        
        if(this.toggle_size()){
            this.button.removeEventListener("click", this.clicked);
            this.shadow.querySelector(".back-button").addEventListener("click", this.clicked);
            

        } else{
            this.button.addEventListener("click", this.clicked);
            this.shadow.querySelector(".back-button").removeEventListener("click", this.clicked);
        }

        this.toggle_elements();

    }

    toggle_size(){
        this.big = !this.big;

        //const btn = this.shadow.getElementById("project-button");
        const btn = this.button;
        btn.classList.toggle("pixel-button-large");

        return this.big;
    }

    toggle_elements(){
        let elements = Array.from(this.shadow.querySelectorAll(".hidden"));

        elements.forEach(hidden_element => {
            hidden_element.style.display = toggle_visibility(hidden_element);
        });
    }
}

function toggle_visibility(_element){
    if(_element.style.display === "none"){
        return "block";
    } else{
        return "none";
    }
}

customElements.define("learn-project", Learning_Project);



