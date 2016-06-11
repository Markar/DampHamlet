"use strict";
import {Levels} from '../levels';

export class PsiLevels extends Levels {

  constructor(player) {
    super(player);
    this.player = player;
  }

  checkLevelup() {
    let lvl = this.player.attributes.level;
    let nextlevel = lvl + 1;

    if (this.player.attributes.xp > this.levels[nextlevel]) {
      this.levelup();
      this.player.writeconsole("You are now level " + nextlevel);
    }
  }

  levelup() {

    let player = this.player;
    player.attributes.level++;
    console.log('leveling up to ' + player.attributes.level);
    player.setSkillPoints(1);
  }

  raiseConcentrationSkill() {
    let player = this.player;
    let concentration = this.skills.concentration;

    if(player.setSkillPoints(-1)) {
      concentration.current++;
      player.setMaxOrbs();
      player.writeconsole(`raised concentration to ${concentration.current}.`);
    }

    return true;
  }
}