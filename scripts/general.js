//for use in ALL HTML FILES
import { Collapsable } from "./tools.js";
import { Toggle } from "./tools.js";


/*let dropdown = new Collapsable( document.getElementById("dropdown-button"), 
                                Array.from(document.getElementsByClassName("dropdown")), 
                                ['components/art/yellow - toggle arrow down.png', 
                                    'components/art/yellow - toggle arrow up.png']
                                );
*/

let dropdownButton = document.getElementById("dropdown-button");
let dropdownElements = Array.from(document.getElementsByClassName("dropdown"));
let art = ['components/art/yellow - toggle arrow down.png', 
           'components/art/yellow - toggle arrow up.png'];

let dropdown = new Toggle(dropdownButton, dropdownElements, "hide");

dropdown.parent.addEventListener('click', () =>{
    dropdown.toggle();
});