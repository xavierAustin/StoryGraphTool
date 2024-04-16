class Inventory {
    constructor(){
        this.stuff = [];
    }
    addItem(item){
        this.stuff.push(item);
    }
    hasItem(item){
        for (let i of this.stuff){
            if (i == item)
                return true;
        }
        return false;
    }
    removeItem(item){
        temp = []
        for (let i of this.stuff){
            if (i != item)
                temp.push(item);
        }
        this.stuff = temp
    }
    removeNumOfItem(item,number){
        temp = []
        for (let i of this.stuff){
            if ((i != item) || (!number))
                temp.push(item);
            else
                number --;
        }
        this.stuff = temp
    }
    describeItem(item){
        switch(item){
            case "Dryer Lint":
                return "An allergy-inducing toxin produced in self-defense when humans attempt to bereave dryers of their clothing innards.";
            case "Atom with Spin":
                return "I could probably get a similar effect by flipping a coin blindfolded, but I'm broke. Also, I probably shouldn't have looked at these since observing them colapses the wave function.";
            case "Atom":
                return "100 picometers of everyones favorite flavors of quarks. Perfect for splitting with a friend!";
            case "Chekov's Gun":
                return "A loaded handgun. I'm not sure why it has the name 'Chekov' scrawled on it, or who that is, but it feels important.";
            case "Cardboard Box":
                return "Hehe B o x."; 
            case "Sound Foam":
                return "Foam that reduces sound. I put this up because my neighbores are just too loud! They'll scream stuff like 'HELP, I'VE BEEN TRAPPED HERE FOR TWELVE WEEKS,' and 'OH GOD- PLEASE, I JUST WANT TO SEE MY FAMILY AGAIN,' at all hours of the day. It's very rude!";
            case "Fridge Magnets":
                return "Magnets that at one point spelled out 'I <3 Death.' Now they spell '3ID e<t ha' which I think might be an anagram for 'I <3 Death.'";
            case "Rat Poison":
                return "Tasting notes: a little nutty; very bitter; a delicate sunscreen flavor towards the end; overall, I'd give it a 6/10.";
            case "Superconductor":
                return "Bitten by a radioactive piccoloist, Super Conductor effortlessly directs the simultaneous performance of an entire orchestra!"
            case "Extension Cable":
                return "My favorite fuseless, OSHA approved, eletric hazard. Seeing that this game cannonically takes place in Canada, this item doesn't make any sense but... uh... shut up!";
            case "Water Tray":
                return "Dihydrogen Monoxide constrained to a set volume! Oh, how I love playing god!";
            case "Ice Tray":
                return "A plastic tray with skull shaped patterns in each of the holes. I'd fill this with water but my water is broken. It's supposed to be a liquid but it comes out of the faucet as a supercritical fluid!";
            case "Ice Ice Baby - Vanilla Ice":
                return "The debut single by American rapper Vanilla Ice, K. Kennedy and DJ Earthquake. It's melting a little but it's still cold enough to get the job done.";
            case "Bucket Cat":
                return "Buckets hold liquids and cats are one of those! A match made in heaven!";
            case "Cat Bucket":
                return "Hmm, that doesn't look quite right...";
            case "Cat & Bucket":
                return "Man, I sure wish there was some kind of holding receptacle I could put this cat in so I wouldn't have to hold both it and this bucket... Wait, I have an idea!";
            case "Lid":
                return "This is a lid to an old tupperware container I had. I don't have the container part since there was a big bug on it once, and so I took the most reasonable course of action: I threw the whole thing out the window and then went outside and lit it on fire.";
            case "Bucket":
                return "Hehe B u c k e t.";
            case "Oven Mitts":
                return "A pair of oven mitts. I don't cook, though. I also don't own a pair of oven mitts. Where did these come from?";
            case "Sardines":
                return "Garbage-trash-fish in a cute little tin. I've been trying to get rid of these but they keep reappearing! I think they're mad at me...";
            default:
                return "Hmm, looks like this item is missing a description! Looks like somebody doesn't know how to program.";
        }
    }
    drawItems(){

    }
}

class Engine {

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        this.inventory = new Inventory();

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
        this.scene.create(data);
    }

    addChoice(action, data) {
        //modified to display images occasionally
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = action;
        let toggleAppear = 1;
        let temp = 
            `color:#d0ffe2;
            background-color: transparent;
            border: 0;
            font-family: 'Comic Sans MS','Chalkboard SE', 'Comic Neue',cursive;
            font-size:2vmin;
            margin:0;
            padding:0;
            opacity:0;
            justify-content: center;
            text-shadow:
                0.3vmin  0.0vmin  0 #72708c,
                -0.3vmin 0.0vmin  0 #72708c,
                0.0vmin  0.3vmin  0 #72708c,
                0.0vmin -0.3vmin  0 #72708c,
                0.2vmin  0.2vmin  0 #72708c,
                -0.2vmin -0.2vmin 0 #72708c,
                -0.2vmin 0.2vmin  0 #72708c,
                0.2vmin -0.2vmin  0 #72708c;`;
        switch (action){
            case "Go to the Washroom":
                temp +=
                    `position:absolute;
                    color:#ffd5c9;
                    border: 0.3vmin solid red;
                    top:32%;
                    left:42%;
                    width:11%;
                    height:26%;`;
                break;
            case "Go to the Living Room":
                temp +=
                    `position:absolute;
                    color:#ffd5c9;
                    border: 0.3vmin solid red;
                    top:34%;
                    left:76%;
                    width:11%;
                    height:28%;`;
                break;
            case "Inspect Blueprints":
                temp +=
                    `position:absolute;
                    color:#ffd5c9;
                    border: 0.3vmin solid red;
                    top:31%;
                    left:55%;
                    width:18%;
                    height:20%;`;
                break;
            case "Jump out of the window":
                temp +=
                    `position:absolute;
                    color:#ffd5c9;
                    border: 0.3vmin solid red;
                    top:26%;
                    left:23%;
                    width:14%;
                    height:25%;`;
                break;
            default:
                temp +=
                    `position:relative;
                    top:93%;
                    left:2%;
                    background-color: #9f9db1;
                    border: 0.3vmin solid #72708c;
                    color: #fff;
                    align-items:top;
                    padding:0.5vmin;
                    opacity:1`;
                    toggleAppear = 0;
                break;
        }
        button.style = temp;
        if (toggleAppear){
            button.addEventListener('mouseover',() => {
                button.style.opacity = 1;
            });
            button.addEventListener('mouseout',() => {
                button.style.opacity = 0;
            });
        }
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
                animation-delay: `+i/12+`s;
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
            console.log(i);
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