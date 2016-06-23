export class Travel {
  constructor() {
    window['travel'] = this;
    let base = new Destination(0, 'Base', 'Home', 'true');
    let town = new Destination(1, 'Town', 'Town', 'true');
    this.level1 = new Destination(2, 'Level1', 'Reclaim Space Station', 'false');
    this.level2 = new Destination(3, 'Level2', 'Save the Corinthian', 'false');
    this.level3 = new Destination(4, 'Level3', 'Assassinate Bork', 'false');

    this.destinations = [];
    this.destinations.push(base);
    this.destinations.push(town);
    // this.destinations.push(this.level1);

    this.destination = base;
  }

  setDestination(el) {
      let key = el.target.getAttribute('data-key');

      for(let i = 0; i < this.destinations.length; i++) { 
        if(this.destinations[i].key === key) { 
            this.destination = this.destinations[i];
        }
      } 
  }

  addDestination(destination) { 
      this.destinations.push(destination);
  }

  goToMission() {
      let player = damphamlet.phasergame.playerone; 
      if(this.destination == '') { 
        player.writeconsole('No destination selected.');
      } 
      player.goToMission(this.destination.key);
      damphamlet.closeMenu();
  }
}


class Destination { 

    constructor(id, key, name, available) { 
        this.id = id; 
        this.key = key; 
        this.name = name;
        this.available = available;
    }
}