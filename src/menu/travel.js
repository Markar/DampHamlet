import {Destinations} from '../client/game/player/destinations'

export class Travel {
  constructor() {
    window['travel'] = this;
    this.dest = new Destinations();

    this.destinations = [];
    this.destinations.push(this.dest.base);
    this.destinations.push(this.dest.town);
    
    //debug
    // this.destinations.push(this.dest.level1);

    this.destination = this.dest.town;
  }

  setDestination(el) {
    let key = el.target.getAttribute('data-key');

    for (let i = 0; i < this.destinations.length; i++) {
      if (this.destinations[i].key === key) {
        this.destination = this.destinations[i];
      }
    }
  }

  addDestination(destination) {
    this.destinations.push(destination);
  }

  remove(key) {
    for(let i = 0; this.destinations.length; i++) { 
      if(this.destinations[i].key === key) { 
        this.destinations.splice([i], 1);
        return; 
      }
    } 
  }

  setTown() { 
    this.destination = this.dest.town; 
  }

  goToMission() {
    let player = damphamlet.phasergame.playerone;
    if (this.destination == '') {
      player.writeconsole('No destination selected.');
    }
    player.goToMission(this.destination.key);
    damphamlet.closeMenu();
  }

}