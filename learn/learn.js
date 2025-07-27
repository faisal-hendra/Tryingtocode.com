import { Collapsible_Element } from "../components/scripts/collapse.js";


let pfp = new Collapsible_Element(document.getElementById("dropdown-button"), Array.from(document.getElementsByClassName("dropdown")));

pfp.button.addEventListener('click', () =>{
    pfp.toggle();
});

// somehow users need to be able to run the code they make without malicous software breaking servers. (this website uses firebase)

