

export class Destinations { 

    constructor() {
        this.base = new Destination(0, 'Base', 'Home', 'true');
        this.town = new Destination(1, 'Town', 'Town', 'true');
        this.level1 = new Destination(2, 'Level1', 'Reclaim Space Station', 'false');
        this.level2 = new Destination(3, 'Level2', 'Clear Space Station', 'false');
        this.level3 = new Destination(4, 'Level3', 'Assassinate Bork', 'false');

        this.allDestinations = []; 
        this.allDestinations.push(this.base);
        this.allDestinations.push(this.town);
        this.allDestinations.push(this.level1);
        this.allDestinations.push(this.level2);
        this.allDestinations.push(this.level3);
        
        this.destinations = [];
        this.destinations.push(this.base);
        this.destinations.push(this.town);

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

    constructor(id, key, name, available) { 
        this.id = id; 
        this.key = key; 
        this.name = name;
        this.available = available;
    }
}

