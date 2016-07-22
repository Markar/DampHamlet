import {Destinations} from '../client/game/player/destinations';
import {MissionLog, Mission} from '../client/game/player/mission-log';

export class Travel {
  constructor() {
    window['travel'] = this;
    this.dest = new Destinations();

    this.destinations = [];
    // this.destinations.push(this.dest.base);
    // this.destinations.push(this.dest.town);

    //debug
    // this.destinations.push(this.dest.level1);

    this.destination = '';
    this.difficulty = 'Easy';
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

  goToHome() {
    let player = damphamlet.phasergame.playerone;
    this.destination = this.dest.base;
    player.goToMission(this.destination.key);
    damphamlet.closeMenu();
  }

  goToTown() {
    let player = damphamlet.phasergame.playerone;
    this.destination = this.dest.town;
    player.goToMission(this.destination.key);
    damphamlet.closeMenu();
  }

  goToMission() {
    let player = damphamlet.phasergame.playerone;
    if (this.destination === '') {
      player.writeconsole('No destination selected.');
    }
    player.goToMission(this.destination.key, this.difficulty);
    damphamlet.closeMenu();
  }

  setDifficulty(el) {
    let key = el.target.getAttribute('data-key');

    if(key === '0') {
      this.difficulty = 'Easy';
      el.target.classList.remove('fa-circle-o');
      el.target.classList.add('fa-circle');

      el.target.nextElementSibling.classList.remove('fa-circle');
      el.target.nextElementSibling.classList.add('fa-circle-o');
      el.target.nextElementSibling.nextElementSibling.classList.remove('fa-circle');
      el.target.nextElementSibling.nextElementSibling.classList.add('fa-circle-o');
    }
    else if(key === '1') {
      this.difficulty = 'Normal';
      el.target.classList.remove('fa-circle-o');
      el.target.classList.add('fa-circle');
      el.target.previousElementSibling.classList.remove('fa-circle-o');
      el.target.previousElementSibling.classList.add('fa-circle');

      el.target.nextElementSibling.classList.remove('fa-circle');
      el.target.nextElementSibling.classList.add('fa-circle-o');
    }
    else if( key === '2') {
      //hard
      this.difficulty = 'Hard';
      el.target.classList.remove('fa-circle-o');
      el.target.classList.add('fa-circle');
      el.target.previousElementSibling.classList.remove('fa-circle-o');
      el.target.previousElementSibling.classList.add('fa-circle');
      el.target.previousElementSibling.previousElementSibling.classList.remove('fa-circle-o');
      el.target.previousElementSibling.previousElementSibling.classList.add('fa-circle');
    }
  }

}
