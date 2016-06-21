

export class Destinations { 

    constructor() {
        let base = new Destination('Base', 'Home', 'true');
        let town = new Destination('Town', 'Town', 'true');
        let level1 = new Destination('Level1', 'Mission 1', 'false');
        let level2 = new Destination('Level2', 'Clear Space Station (Hard)', 'false');
        let level3 = new Destination('Level3', 'Assassinate Bork', 'false');

        this.allDestinations = []; 
        this.allDestinations.push(base);
        this.allDestinations.push(town);
        this.allDestinations.push(level1);
        this.allDestinations.push(level2);
        this.allDestinations.push(level3);
        
        this.destinations = [];
        this.destinations.push(base);
        this.destinations.push(town);

    }

    //key, boolean - destinations.set('Level1', 'true');
    set(destination, flag) { 
        for(let i = 0; i < this.destinations.length; i++) {
            if(this.destinations[i].key == destination) {
                this.destinations[i].available = flag; 
            } 
        }
    }

    add(key) {
        //find the destination by key, add it to the player's destinations
        console.log('add l ', this.destinations.length);
         for(let i = 0; i < this.allDestinations.length; i++) {
             let currentDestination = this.allDestinations[i];

             if(currentDestination.key == key) {
                this.destinations.push(currentDestination); 
            } 
        }
        console.log('add l2 ', this.destinations.length);


    }

    get(key) {
        for(let i = 0; i < this.allDestinations.length; i++ ) {
            let cur = this.allDestinations[i]; 
            if(cur.key === key) { 
                return cur;
            } 
        } 
    }

    sync(uiDestinations) {
        console.log('ui' + uiDestinations.length);
        uiDestinations = [];  
        for(let i = 0; i < this.destinations.length; i++) { 
            uiDestinations.push(this.destinations[i]);
        }
        console.log('ui' + uiDestinations.length);
    }

}


export class Destination { 

    constructor(key, name, available) { 
        this.key = key; 
        this.name = name;
        this.available = available;
    }
}

