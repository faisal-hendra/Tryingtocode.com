//used for things such as sign in toggle button, and sidebar toggle
export class Toggle{
    constructor(toggleButton, effectedElement, toggleClass, transitionedElement=null, animatedElement=null){
        this.toggleElement = toggleElement;
        this.effectedElement = effectedElement;
        this.primaryClass = primaryClass;
        this.goneClass = "gone";

        this.transitionedElement = transitionedElement;
        this.animatedElement = animatedElement;
        this.toggleButton = toggleButton;

        this.initializeLogic();
    }

    initializeLogic(){
        this.toggleEventFilled = () => {this.toggle();}
        this.triggerGoneFilled = () => {this.goneEvent();}

        this.addEvent(this.toggleEventFilled);
        this.addEvent(this.triggerGoneFilled);

        this.toggle();
    }

    addEvent(event, button=this.toggleButton){
        button.addEventListener("click", event);
    }

    toggle(button=this.toggleButton, toggleClass=this.toggleClass){
        this.toggle(this.parent)

        let off = this.parent.classList.contains("slow-hide")

        if(hiding){

            const toggleEventListener = () => { 
                this.parent.classList.toggle("gone"); 
                console.log("should be gone");
                this.parent.removeEventListener('transitionend', toggleEventListener);
            }

            this.parent.addEventListener('transitionend', toggleEventListener); 
        }else{
            this.parent.classList.toggle("gone"); 
        }
    }

    goneEvent(){
        let stopEvent = (this.transitionedElement == null) && (this.animatedElement == null);

        if(stopEvent){
            this.toggleButton.removeEventListener("click", this.goneEvent);
            return;
        }

        let goneClass = this.goneClass;
        let isOff = this.effectedElement.classList.contains(this.toggleClass);
        
        if(isOff){
            let addTempListener = (typeend, effectedElement=null) => {
                if(effectedElement == null) {console.log("null element");return;}
                
                const goneListener = () => {
                    effectedElement.classList.toggle(goneClass);
                    effectedElement.removeEventListener(typeend, toggleEventListener);
                }
                effectedElement.addEventListener(typeend, toggleEventListener);
            }
        }
        if(!isOff){
            let effectedElements = [this.transitionedElement, this.animatedElement];
            effectedElements.forEach(element => {
                element.classList.toggle(goneClass);
            });
        }
    }
}

//An element that is collapsable from a toggle button, and toggles elements
export class Collapsable{
    constructor(parent, elements, images=[]){
        this.hidden = true;
        this.parent = parent;
        this.elements = elements;
        this.images = images;
        console.log(this.parent);
        this.hide();
    }
    hide(){
        this.hidden = true;
        this.elements.forEach(elem => {
            elem.classList.add("hide");
        });
        this.parent.querySelector('img').src = this.images[1];
    }
    show(){
        this.hidden = false;
        this.elements.forEach(elem => {
            elem.classList.remove("hide");
        });
        this.parent.querySelector('img').src = this.images[0];
    }
    toggle(){
        this.hidden ? this.show() : this.hide()
    }
}