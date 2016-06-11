"use strict";
import {Levels} from '../levels';

export class SplicerLevels extends Levels {

  constructor(player) {
    super(player);
    this.player = player;
    this.handlers();
    this.setSkillMax();
  }

  setSkillMax() {
    console.log('implement the rest of these splicer skills');
    //$(".skillPistols").children().eq(3).text(this.skills.pistols.maxPistolsSkill);
    $(".skillHealth").children().eq(3).text(this.skills.health.maxHealthSkill);
    $(".skillSpeed").children().eq(3).text(this.skills.speed.maxSpeedSkill);
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

    //update the player level in UI
    $('.level').text(player.attributes.level);
  }

  //TODO make these classes generic for any talents
  handlers() {
    $('.skillPistols').unbind().click( () => {
      this.raisePistolSkill();
    });
    $('.skillAssault').unbind().click( () => {
      this.raiseConcentrationSkill();
    });
    $('.skillExplosives').unbind().click(() => {
      this.raiseExplosivesSkill();
    });
    $('.skillHealth').unbind().click(() => {
      this.raiseHealthSkill();
    });
    $('.skillSpeed').unbind().click(() => {
      this.raiseSpeedSkill();
    });
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