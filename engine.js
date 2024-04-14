class Engine {

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        this.output = document.body.appendChild(document.createElement("div"));
        this.actionsContainer = document.body.appendChild(document.createElement("div"));
        this.header = document.body.appendChild(document.createElement("h1"));

        document.body.style = 
            `color: #fff;
            background-color: #9f9db1;
            font-family: 'Comic Sans MS','Chalkboard SE', 'Comic Neue',cursive;
            text-shadow:
                2px 2px 0 #72708c,
                -2px 2px 0 #72708c,
                -2px -2px 0 #72708c,
                2px -2px 0 #72708c,
                1px 1px 0 #72708c,
                -1px 1px 0 #72708c,
                -1px -1px 0 #72708c,
                1px -1px 0 #72708c;`;

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
        this.scene.create(data);
    }

    addChoice(action, data) {
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = action;
        button.style = 
            `color: #fff;
            background-color: transparent;
            border: 3px solid #72708c;
            font-family: 'Comic Sans MS','Chalkboard SE', 'Comic Neue',cursive;
            text-shadow:
                2px 2px 0 #72708c,
                -2px 2px 0 #72708c,
                -2px -2px 0 #72708c,
                2px -2px 0 #72708c,
                1px 1px 0 #72708c,
                -1px 1px 0 #72708c,
                -1px -1px 0 #72708c,
                1px -1px 0 #72708c;`;
        button.onclick = () => {
            while(this.actionsContainer.firstChild) {
                this.actionsContainer.removeChild(this.actionsContainer.firstChild)
            }
            this.scene.handleChoice(data);
        }
    }

    setTitle(title) {
        document.title = title;
        this.header.innerText = title;
    }

    drawText(msg){
        if (this.textbox)
            while (this.textboxContent.length){
                this.textbox.removeChild(this.textboxContent.pop())
            }
        else{
            this.textbox = document.createElement("div");
            this.textbox.style = 
                `height:23%;
                width: 65%;
                position: relative;
                top: 3.7%;
                left: 2%;
                font-size:3vmin;
                text-shadow: none;`;
            this.ui.appendChild(this.textbox);
            this.textboxContent = []
        }
        let i = 1;   
        let textcolor = "#fff";
        let asteriskFlag = 1;
        for (let x of msg){
            this.textboxContent.unshift(document.createElement("span"));
            this.textboxContent[0].style = ``;
            this.textboxContent[0].style.color = textcolor;
            if (x == ":" && msg[0] == "Y"){
                textcolor = "#d0ffe2";
            }else if (x == ":" && msg[0] == "C"){
                textcolor = "#ffd5c9";
            }else if (x == ":" && msg[0] == "D"){
                textcolor = "#dac7ff";
            }
            this.textboxContent[0].textContent = x;
            if (x == "," || x == "." || x == ":" || x == "-" || x == ";" || x == "!")
                i += 2;
            asteriskFlag ^= (x == "*");
            i += asteriskFlag;
            console.log(i);
            this.textbox.appendChild(this.textboxContent[0]);
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
            this.ui = document.createElement("div");
            this.div = document.createElement("div");
            this.ui.style = 
                `height: 100vh;
                width: 129vh;
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