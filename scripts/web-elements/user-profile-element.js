import { SimpleToggle } from '../tools.js';
import { signInUp } from '../firebase-backend/firebase.js';

class TTCUserProfile extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        this.render();
    }
    render(){

        this.innerHTML = `
            <div data-js-tag="profile-holder" class="profile-holder"></div>
                <img src="null" alt="pfp"></img> 
            </div>
            
        `;

        this.findElements();
        this.setupElements();
    }
    
}

customElements.define("ttc-user-profile", TTCUserProfile);