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
            switch (choice.Target){
                case "":
                
                case undefined:
                    break;
                default:
                    this.engine.gotoScene(Location, choice.Target);
                    break;
            }
            if (choice.Item)
                this.engine.inventory.addItem(choice.Item);
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