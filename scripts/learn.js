//for use in learn.html
import { Display } from "./projects.js";

let d = new Display(document, document.body);

let run_button = d.content.querySelector('[name="run-button"]');
let code = d.content.querySelector('[name="user-code"]');
run_button.addEventListener('click', () => {
    d.displayUserCode();
})