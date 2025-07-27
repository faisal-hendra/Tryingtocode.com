//make a class that takes in a button and if pressed, it
//toggles the contents
export class Collapsible_Element{
    constructor(button, contents, command=null){
        this.button = button;
        this.contents = contents;
        this.hide();
    }

    hide(){
        this.contents.forEach(content => {
            content.style.display = "none";
            this.shown = false;
        });
    }

    show(){
        this.contents.forEach(content => {
            content.style.display = "block";
            this.shown = true;
        });
    }

    get_condition(){
        return this.shown;
    }

    toggle(){
        if(this.shown){this.hide();}else{this.show();}
    }

}

export function Create_Collapsibles(buttons, contents){
    var col_els = [];
    var i = 0;
    for (let i = 0; i < buttons.length; i++) {
        col_els.push(new Collapsible_Element(buttons[i], contents[i]));
    }
    return col_els;
}
