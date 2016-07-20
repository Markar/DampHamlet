import {Eye} from '../client/game/mobs/eye';
import {Slime} from '../client/game/mobs/slime';
import {GreenAlien} from '../client/game/mobs/greenalien';
import {RedAlien} from '../client/game/mobs/red_alien';
import {Octopus} from '../client/game/mobs/octopus';
import {Rat} from '../client/game/mobs/rat';
import {TealAlien} from '../client/game/mobs/tealalien';
import {FurryAlien} from '../client/game/mobs/furryalien';
import {Spider} from '../client/game/mobs/spider';

export class Creator {

  constructor(game, map) {
    this.game = game;
    this.map = map;
    this.damphamlet = window.damphamlet;
  }

  createEye(x, y) {
    let eye = new Eye('eye', this.game, x, y);
    this.game.eyes.push(eye);
    this.game.enemies.push(eye);
    return eye;
  }
  createSlime(x, y) {
    let slime = new Slime('slime', this.game, x, y);
    this.game.slimes.push(slime);
    this.game.enemies.push(slime);
    return slime;
  }

  createGreenAlien(x, y) {
    let green = new GreenAlien('greenalien', this.game, x, y);
    this.game.greenaliens.push(green);
    this.game.enemies.push(green);
    return green;
  }

  createRedAlien(x, y) {
    let red = new RedAlien('redalien', this.game, x, y);
    this.game.redaliens.push(red);
    this.game.enemies.push(red);
    return red;
  }

  getRandomPosition(map) {
    return [Math.random() * (map.width * this.game.scalemultiple * 8),
      Math.random() * (map.height * this.game.scalemultiple * 8)];
  }

  createEyes(count) {
    for(let i = 0; i < count; i++) {
      let pos = this.getRandomPosition(this.map);
      let eye = new Eye('eye', this.game, pos[0], pos[1], i);
      this.game.eyes.push(eye);
    }
    this.game.enemies.push(this.game.eyes);
    return this.game.eyes;
  }
  createSlimes(count) {
    let game = this.game;
    for(let i = 0; i < count; i++) {
      let startx = (Math.random() * (game.width - 200) + 100);
      let starty = (Math.random() * (game.height - 200) + 100);
      let slime = new Slime('slime', game, startx, starty, i);
      game.slimes.push(slime);
    }
    game.enemies.push(game.slimes);
    return game.slimes;
  }
  createGreenAliens(count) {
    for(let i = 0; i < count; i++) {
      let pos = this.getRandomPosition(this.map);
      let greenalien = new GreenAlien('greenalien', this.game, pos[0], pos[1]);
      console.log('green ', pos[0], pos[1]);
      this.game.greenaliens.push(greenalien);
    }
    this.game.enemies.push(this.game.greenaliens);
  }

  createRedAliens(count) {
    for(let i = 0; i < count; i++) {
      let pos = this.getRandomPosition(this.map);
      let redalien = new RedAlien('rednalien', this.game, pos[0], pos[1]);
      this.game.redaliens.push(redalien);
    }
    this.game.enemies.push(this.game.redaliens);
  }
  createOctopi(count) {
    for(let i = 0; i < count; i++) {
      let pos = this.getRandomPosition(this.map);
      let octopus = new Octopus('octopus', this.game, pos[0], pos[1]);
      this.game.octopi.push(octopus);
    }
    this.game.enemies.push(this.game.octopi);
  }
  createFurryAliens(count) {
    for(let i = 0; i < count; i++) {
      let pos = this.getRandomPosition(this.map);
      let furryalien = new FurryAlien('furryalien', this.game, pos[0], pos[1]);
      this.game.furryaliens.push(furryalien);
    }
    this.game.enemies.push(this.game.furryaliens);
  }
  createTealAliens(count) {
    for(let i = 0; i < count; i++) {
      let pos = this.getRandomPosition(this.map);
      let tealalien = new FurryAlien('tealalien', this.game, pos[0], pos[1]);
      this.game.tealaliens.push(furryalien);
    }
    this.game.enemies.push(this.game.tealaliens);
  }

  loopEnemies() {
    for (let enemyIndex = 0; enemyIndex < this.game.enemies.length; enemyIndex++) {
      for(let mobIndex = 0; mobIndex < this.game.enemies.length; mobIndex++) {
        let mob = this.game.enemies[mobIndex];
        mob.checkForPlayers(200, 1400);
      }
    }
  }
  // loopEnemies() {
  //   for (let enemyIndex = 0; enemyIndex < this.game.enemies.length; enemyIndex++) {

  //     console.log('tick');
  //     debugger;
  //     for(let mobIndex = 0; mobIndex < this.game.enemies[enemyIndex].length; mobIndex++) {
  //       debugger;
  //       let mob = this.game.enemies[enemyIndex][mobIndex];
  //       mob.checkForPlayers(200, 1400);
  //     }

  //   }
  // }

}


