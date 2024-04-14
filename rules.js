class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Inventory {
    constructor(){
        this.stuff = [];
    }
    addItem(item){
        this.stuff.push(item);
    }
    hasItem(item){
        for (let i = 0; i < this.stuff.length; i++){
            if (this.stuff[i] == item)
                return true;
        }
        return false;
    }
    removeItem(item){
        temp = []
        for (let i = 0; i < this.stuff.length; i++){
            if (this.stuff[i] != item)
                temp.push(item);
        }
        this.stuff = temp
    }
    removeNumOfItem(item,number){
        temp = []
        for (let i = 0; i < this.stuff.length; i++){
            if ((this.stuff[i] != item) || (!number))
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

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Image)
        this.engine.drawText(locationData.Body);
        
        if(locationData.Choices) {
            for(let choice of locationData.Choices) { 
                this.engine.addChoice(choice.Text,choice); 
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            //this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');