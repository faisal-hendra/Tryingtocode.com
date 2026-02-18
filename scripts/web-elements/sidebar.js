
class TTCSidebar extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        this.render();
    }
    render(){

        this.innerHTML = `
<div class="sidebar">  
    <a href="index" title="Home"  class="logo" id="home-icon" draggable="false">
        <img src="components/art/ttc coin icon.png" alt="Coin logo" class="nice-button">
    </a>
    <button id="dropdown-button" class="toggle-dropdown" draggable="false">
        <img class="toggle-dropdown--img nice-button" src="components/art/yellow - toggle arrow up.png" alt="" id="toggle-button">
    </button>
    <div class="dropdown">
        <ul class="dropdown--list">
            <li class="dropdown--element"><a href="index" title="Home">
                <img class="dropdown--image nice-button" src="components/art/clean icon - 9.png" alt="Home" draggable="false">
            </a></li>
            <li class="dropdown--element"><a href="learn" title="Learn">
                <img class="dropdown--image nice-button dark-glow" src="components/art/clean icon - 10.png" alt="Learn" draggable="false">
            </a></li>
            <li class="dropdown--element"><a href="create.html" title="Create">
                <img class="dropdown--image nice-button dark-glow rotate-45" src="components/art/clean icon - hammer.png" alt="Create" draggable="false">
            </a></li>
        </ul>
    </div>
    <p id="coin-counter" class="main-font">404</p>
</div>
    `;
    }
}

customElements.define("ttc-sidebar", TTCSidebar);