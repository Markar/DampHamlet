"use strict";
import {Levels} from '../levels';

export class MarineLevels extends Levels {

  constructor(player) {
    super(player);
    this.player = player;
  }

  raiseAssaultSkill() {
    let player = this.player;
    let assault = this.skills.assault;

    if(!player.hasAssaultRifle) {
      player.writeconsole("You don't have an assault rifle yet.");
      return false;
    }

    if(this.raiseSkill(assault)) {
      player.assaultrifle.setDamage(_.floor(player.assaultrifle.damage * 1.2));
      player.writeconsole(`raised assault to ${assault.current} dealing ${player.assaultrifle.damage} damage.`);
    }

    return true;
  }
  raiseExplosivesSkill() {
    let player = this.player;
    let explosives = this.skills.explosives;

    if(this.raiseSkill(explosives)) {
      player.enableGrenades();
      player.writeconsole(`raised explosives to  ${explosives.current}`);
    }
    else {
      return false;
    }

    return true;
  }

  raisePistolSkill() {
    let player = this.player;

    if(this.raiseSkill(this.skills.pistols)) {
      let newDmg = (player.pistol.damage / 3) + player.pistol.damage;
      player.pistol.setDamage(newDmg);
    }
    else {
      return false;
    }

    return true;
  }

  raiseSkill(skill) {
    let player = this.player;

    if(skill.current >= skill.max) {
      player.writeconsole("You have nothing left to learn.");
      return false;
    }

    if(player.setSkillPoints(-1)) {
      skill.current++;
      return true;
    }

    return false;
  }

  raiseHealthSkill() {
    let player = this.player;
    let health = this.skills.health;

    if(this.raiseSkill(health)) {
      player.changeMaxHp(5);
      player.writeconsole("raised health to " + health.current);
    }

    return true;
  }

  raiseSpeedSkill() {
    let player = this.player;
    let speed = this.skills.speed;

    if(this.raiseSkill(speed)) {
      player.changeSpeed(25);
      this.player.writeconsole(`raised speed to ${speed.current}`);
    }

    return true;
  }

}