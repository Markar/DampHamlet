"use strict";

export class Levels {

  constructor(player) {
    this.player = player;

    let levels = [];
    levels[1] = 1;
    levels[2] = 2;
    levels[3] = 3;
    levels[4] = 5;
    levels[5] = 8;
    levels[6] = 13;
    levels[7] = 21;
    levels[8] = 34;
    levels[9] = 55;
    levels[10] = 89;

    this.levels = levels;
    this.skills = player.skills;
    this.nextlevel = levels[this.player.attributes.level + 1];
  }

  addXP(amount) {
    let player = this.player;
    player.attributes.xp += amount;
    this.checkLevelup();

    console.log('addXP in player');
    $('.xp').text(player.attributes.xp);
  }

  checkLevelup() {
    let player = this.player;

    let lvl = player.attributes.level;
    let nextlevel = lvl + 1;

    if (player.attributes.xp > this.levels[nextlevel]) {
      let newlvl = this.levelup();
      player.writeconsole(`You are now level ${newlvl}.`);
      this.nextlevel = this.levels[newlvl + 1];
    }
  }

  levelup() {
    let player = this.player;
    player.attributes.level++;
    player.setSkillPoints(1);
    return player.attributes.level;
  }
}