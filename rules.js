class Inventory {
    constructor(container,engine){
        this.stuff = [];
        this.containter = container;
        this.engine = engine;
    }
    addItem(item){
        //adds item name to inventory.stuff and also adds a button to the inventory container
        this.stuff.push(item);
        let itemVisual = document.createElement("button");
        itemVisual.id = item;
        this.containter.appendChild(itemVisual);
        itemVisual.onclick = () => {
            this.engine.drawText("You: "+this.describeItem(item));
        }
        let urlItem = ((item.replaceAll("&","and")).replaceAll(" ","")).toLowerCase()
        itemVisual.style =
            `height: 12vmin;
            width: 12vmin;
            border:0;
            background: url(items/ui/`+urlItem+`.png);
            background-size:100% 100%;`;
    }
    hasItem(item){
        //checks for an item name in the inventory; returns bool
        for (let i of this.stuff){
            if (i == item)
                return true;
        }
        return false;
    }
    removeItem(item){
        //removes an item name from inventory.stuff AND removes the designated button (inefficient but acceptable)
        let temp = []
        for (let i of this.stuff){
            if (i != item)
                temp.push(i);
        }
        this.stuff = temp;
        let itemVisual = document.getElementById(item);
        if (itemVisual)
            itemVisual.parentNode.removeChild(itemVisual);
    }
    describeItem(item){
        //describes an item based on an item name; called when the button for a given item is clicked
        //really poorly done!
        //I could've just added it to the .json but oh well
        switch(item){
            case "House Keys":
                return "Like normal keys but house-y-er!";
            case "Dryer Lint":
                return "An allergy-inducing toxin produced in self-defense when humans attempt to bereave dryers of their clothing innards.";
            case "Atom with Spin":
                this.removeItem("Atom with Spin");
                this.addItem("Atom");
                return "I probably shouldn't have looked at these since observing them colapses the wave function.";
            case "Atom":
                if (this.hasItem("Fridge Magnets")){
                    this.removeItem("Atom");
                    this.addItem("Atom with Spin");
                    return "Looks like I can use these magnets to... uh... do this! Sick.";
                }
                return "100 picometers of everyones favorite flavors of quarks. Perfect for splitting with a friend! If I had some magnets, I could put some spin on these (which is totally how it works mind you).";
            case "Chekovs Gun":
                return "A loaded handgun. I'm not sure why it has the name 'Chekov' scrawled on it, or who that is, but it feels important.";
            case "Cardboard Box":
                return "Hehe B o x."; 
            case "Sound Foam":
                return "Foam that reduces sound. I put this up because my neighbours are just too loud! They'll scream stuff like 'HELP, I'VE BEEN TRAPPED HERE FOR TWELVE WEEKS,' and 'OH GOD- PLEASE, I JUST WANT TO SEE MY FAMILY AGAIN,' at all hours of the day. It's very rude!";
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
            case "Ice Ice Baby":
                return "The debut single by American rapper Vanilla Ice, K. Kennedy and DJ Earthquake. It's melting a little but it's still cold enough to get the job done.";
            case "Bucket Cat":
                return "Buckets hold liquids and cats are one of those! A match made in heaven!";
            case "Cat Bucket":
                this.removeItem("Cat Bucket");
                this.addItem("Bucket Cat");
                return "Hmm, that doesn't look quite right...";
            case "Cat & Bucket":
                this.removeItem("Cat & Bucket");
                this.addItem("Cat Bucket");
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
}
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Image)
        this.engine.drawText(locationData.Body);

        //remove tutorial text
        if (key == "Bedroom")
            locationData.Body = "You are in your bedroom. It's got a bed in it and it does loosely meet the description of a room.";

        if(locationData.Choices) {
            for(let choice of locationData.Choices) { 
                this.engine.addChoice(choice.Text,choice); 
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice,button) {
        if(choice) {
            if (choice.Require){
                for (let requirements of choice.Require){
                    if (!this.engine.inventory.hasItem(requirements[0])){
                        this.engine.drawText(requirements[1]);
                        return;
                    }
                }
                for (let requirements of choice.Require){
                    if (requirements[0] == "House Keys")
                        break;
                    this.engine.inventory.removeItem(requirements[0]);
                }
            }
            if (choice.Item){
                this.engine.inventory.addItem(choice.Item);
                button.parentNode.removeChild(button);
                choice.Text = 0;
            }
            if (choice.Target)
                this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.drawText(this.engine.storyData.Credits);
    }
}

function StyleButton(action){
    let toggleAppear = 1;
    let style = 
            `position:absolute;
            color:#d0ffe2;
            background-color: transparent;
            background-image: url("items/playarea/shimmer.png");
            border: 0;
            font-family: 'Comic Sans MS','Chalkboard SE', 'Comic Neue',cursive;
            font-size:0vmin;
            margin:0;
            padding:0;
            justify-content: center;
            background-repeat: no-repeat;
            background-size:contain;
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
            //Things & Interactable Elements
            //Kitchen
            case "Put Something in the Freezer":
                style += "top:35%; left:35%; width:18%; height:20%;background:0;";
                break;
            case "Inspect Can-Closer":
                style += "top:72%; left:79%; width:18%; height:20%;background:0;";
                break;
            case "Inspect Can-Opener":
                style += "top:62%; left:79%; width:18%; height:10%;background:0;";
                break;
            case "Grab some Sardines":
                style += "top:36%; left:24%; width:7%; height:7%;";
                break;
            //Living Room
            case "Watch TV":
                style += "top:42%; left:45%; width:22%; height:22%;background:0;";
                break;
            case "Inspect Paper Shredder":
                style += "top:62%; left:65%; width:14%; height:18%;background:0;";
                break;
            case "Grab Old Container Lid":
                style += "top:62%; left:65%; width:14%; height:18%;background:0;";
                break;
            //Bedroom
            case "Inspect Blueprints":
                style += "top:31%; left:55%; width:18%; height:20%;background:0;";
                break;
            //Washroom
            case "Clean the Dryer":
                style += "top:69%; left:51%; width:6%; height:6%;";
                break;
            case "Grab Something Shiny":
                style += "top:74%; left:71%; width:8%; height:8%;";
                break;
            //Alley
            case "Grab???":
                style += "top:95%; left:95%; width:5%; height:5%;background:0;";
                break;
            case "Kitty!!":
                style += "top:66%; left:40%; width:16%; height:18%;background-image: url('items/playarea/cat.png');";
                break;
            case "Water but Free":
                style += "top:84%; left:0%; width:21%; height:16%;background:0;";
                break;
            case "Grab a Cardboard Box":
                style += "top:34%; left:60%; width:23%; height:24%;background-image: url('items/playarea/box.png')";
                break;
            case "A Bucket... Dear God":
                style += "top:72%; left:74%; width:18%; height:20%;;background-image: url('items/playarea/bucket.png')";
                break;
            //Transitions
            //Bathroom & Living Room
            case "Go to the Bedroom":
                style += "color:#ffd5c9; top:24%; left:0%; width:11%; height:65%;background:0;";
                break;
            //Kitchen & Bathroom
            case "Navigate to the Living Room":
                style += "color:#ffd5c9; top:92%; left:34%; width:32%; height:7%;background:0;";
                break;
            //Living Room
            case "Go to the Kitchen":
                style += "color:#ffd5c9; top:20%; left:72%; width:20%; height:50%;background:0;";
                break;
            case "Enter the Washroom":
                style += "color:#ffd5c9; top:26%; left:22%; width:17%; height:57%;background:0;";
                break;
            //Kitchen
            case "Go to the Alley":
                style += "color:#ffd5c9; top:27%; left:63%; width:17%; height:50%;background:0;";
                break;
            //Bedroom
            case "Jump out of the window":
                style += "color:#ffd5c9; top:26%; left:23%; width:14%; height:25%;background:0;";
                break;
            case "Go to the Washroom":
                style += "color:#ffd5c9; top:32%; left:42%; width:11%; height:26%;background:0;";
                break;
            case "Go to the Living Room":
                style += "color:#ffd5c9; top:34%; left:76%; width:11%; height:28%;background:0;";
                break;
            //Alley
            case "Go back Inside":
                style += "color:#ffd5c9; top:20%; left:6%; width:14%; height:45%;background:0;";
                break;
            default:
                style +=
                    `position:relative;
                    top:93%;
                    left:2%;
                    background:0;
                    background-color: #9f9db1;
                    border: 0.3vmin solid #72708c;
                    color: #fff;
                    font-size:2vmin;
                    align-items:top;
                    padding:0.5vmin;`;
                    toggleAppear = 0;
                break;
        }
        return [style,toggleAppear];
}

Engine.load(Start, 'myStory.json');