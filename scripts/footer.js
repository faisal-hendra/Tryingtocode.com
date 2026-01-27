class TTCFooter extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        this.render();
        console.log("rendered successfully.");
    }
    render(){
        const copywrite = this.getAttribute("copywrite");
        const legalSRCs = this.getAttribute("legal-src");
        const mailTo = this.getAttribute("mail-to");

        this.innerHTML = `
            <footer class="footer">
                <a href="mailto:${mailTo}" class="footer--link">${mailTo}</a>
                <a href="${legalSRCs}" class="footer--link">legal</a>
                <p>&copy; ${new Date().getFullYear()} ${copywrite} - All Rights Reserved</p>
            </footer>
        `;
    }
}

customElements.define("ttc-footer", TTCFooter);