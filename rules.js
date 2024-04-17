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

Engine.load(Start, 'myStory.json');