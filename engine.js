class Engine {

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        this.inventoryContainer = document.createElement("div");
        this.inventory = new Inventory(this.inventoryContainer,this);

        this.header = document.body.appendChild(document.createElement("h1"));
        this.output = document.body.appendChild(document.createElement("div"));
        this.actionsContainer = document.body.appendChild(document.createElement("div"));

        document.body.style = 
            `color: #fff;
            background-color: #9f9db1;
            font-family: 'Comic Sans MS','Chalkboard SE', 'Comic Neue',cursive;
            text-shadow:
                0.5vmin  0.0vmin  0 #72708c,
                -0.5vmin 0.0vmin  0 #72708c,
                0.0vmin  0.5vmin  0 #72708c,
                0.0vmin -0.5vmin  0 #72708c,
                0.3vmin  0.3vmin  0 #72708c,
                -0.3vmin -0.3vmin 0 #72708c,
                -0.3vmin 0.3vmin  0 #72708c,
                0.3vmin -0.3vmin  0 #72708c;`;

        fetch(storyDataUrl).then(
            (response) => response.json()
        ).then(
            (json) => {
                this.storyData = json;
                this.gotoScene(firstSceneClass)
            }
        );
    }

    gotoScene(sceneClass, data) {
        this.scene = new sceneClass(this);
        while(this.actionsContainer.firstChild) {
            this.actionsContainer.removeChild(this.actionsContainer.firstChild)
        }
        this.scene.create(data);
    }

    addChoice(action, data) {
        if (!action)
            return;
        //modified to display images occasionally
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = action;
        let temp = StyleButton(action)
        button.style = temp[0];
        let toggleAppear = temp[1];
        if (toggleAppear){
            button.addEventListener('mouseover',() => {
                button.style.fontSize = "2vmin";
            });
            button.addEventListener('mouseout',() => {
                button.style.fontSize = 0;
            });
        }
        button.onclick = () => {
            this.scene.handleChoice(data,button);
        }
    }

    setTitle(title) {
        document.title = title;
        this.header.innerText = title;
    }

    drawText(msg){
        //added to display text because i modified show to display images
        //im a profesional!
        if (this.textbox)
            while (this.textbox.firstChild){
                this.textbox.removeChild(this.textbox.firstChild)
            }
        else{
            this.textbox = document.createElement("div");
            this.textbox.style = 
                `height:23%;
                width: 65%;
                position: relative;
                top: 3.7%;
                font-size:3vmin;
                line-height: 115%;
                left: 2%;
                text-shadow: none;`;
            this.ui.appendChild(this.textbox);
        }
        let i = 1;   
        let textcolor = "#fff";
        let asteriskFlag = 1;
        for (let indexOfMsg = 0; indexOfMsg < msg.length; indexOfMsg ++){
            let x = msg[indexOfMsg]
            let temp = document.createElement("span");
            temp.style = 
                `opacity : 0;
                color: `+textcolor+`;
                animation-name: textAppear;
                animation-delay: `+i/15+`s;
                animation-duration: 0.3s;  
                animation-fill-mode: forwards;`;
            if (x == ":" && msg[0] == "Y"){
                textcolor = "#d0ffe2";
            }else if (x == ":" && msg[0] == "C"){
                textcolor = "#ffd5c9";
            }else if (x == ":" && msg[0] == "D"){
                textcolor = "#dac7ff";
            }
            asteriskFlag ^= (x == "*");
            i += (asteriskFlag&(x != " "));
            //so all this does is add a pause to the text appearing when there's punctuation so the text reads more fluidly
            //but it turns out there's a lot of edge cases for that to appear fluid >->
            //it basically just boils down to if the punctuation ends a 'thought' then it pauses
            //periods always cause this since elipsies should be drawn out as long as possible for maximum annoyance
            if ((msg[indexOfMsg+1] == " " || msg[indexOfMsg+1] == "\"") && (x == "," || x == ":" || x == "-" || x == ";" || x == "?" || x == "!") || x == ".")
                i += 5*(asteriskFlag&(x != " "));
            if (x == " ")
                x = "\u2002";
            temp.textContent = x;
            this.textbox.appendChild(temp);
        }
    }

    show(img) {
        //modified to only update the div element rather then append new ones every passage
        //also modified to display images rather than text
        if (this.div)
            this.div.style = 
                `height: 68%;
                width: 68%;
                position: relative;
                top: 1%;
                left: 0.8%;
                background:url("`+img+`");
                background-repeat: no-repeat;
                background-size:contain;`;
        else{
            document.body.removeChild(this.actionsContainer);
            document.body.removeChild(this.header);
            this.inventoryContainer.style = 
                `height: 89vmin;
                width: 36vmin;
                position: absolute;
                top: 11.2vmin;
                left: 92vmin;`
            this.ui = document.createElement("div");
            this.div = document.createElement("div");
            this.ui.style = 
                `height: 100vmin;
                width: 129vmin;
                background:url("ui.png");
                background-repeat: no-repeat;
                background-size:contain;`;
            this.div.style = 
                `height: 68%;
                width: 68%;
                position: relative;
                top: 1%;
                left: 0.8%;
                background:url("`+img+`");
                background-repeat: no-repeat;
                background-size:contain;`;
            this.div.innerHTML = "";
            this.output.appendChild(this.ui);
            this.ui.appendChild(this.div);
            this.ui.appendChild(this.inventoryContainer);
            this.actionsContainer = this.div;
        }
    }
}

class Scene {
    constructor(engine) {
        this.engine = engine;
    }

    create() { }

    update() { }

    handleChoice(action) {
        console.warn('no choice handler on scene ', this);
    }
}