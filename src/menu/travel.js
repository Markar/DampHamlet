export class Travel {
  constructor() {
    window['travel'] = this;
    let base = new Destination('Base', 'Home', 'true');
    let town = new Destination('Town', 'Town', 'true');
    this.level1 = new Destination('Level1', 'Clear Space Station (Easy)', 'false');
    this.level2 = new Destination('Level2', 'Clear Space Station (Hard)', 'false');
    this.level3 = new Destination('Level3', 'Assassinate Bork', 'false');

    this.destinations = [];
    this.destinations.push(base);
    this.destinations.push(town);

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

    constructor(key, name, available) { 
        this.key = key; 
        this.name = name;
        this.available = available;
    }
}