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
      player.writeconsole(`I am now level ${newlvl}.`);
      this.nextlevel = this.levels[newlvl + 1];
      this.checkLevelup();
    }
  }

  levelup() {
    let player = this.player;
    player.attributes.level++;
    player.setSkillPoints(1);
    return player.attributes.level;
  }


  raiseAssaultSkill() {
    let player = this.player;
    let assault = this.skills.assault;

    if(!player.hasAssaultRifle) {
      player.writeconsole("I don't have an assault rifle yet.");
      return false;
    }

    if(this.raiseSkill(assault)) {
      player.assaultrifle.setDamage(_.floor(player.assaultrifle.damage * 1.2));
      // player.writeconsole(`raised assault to ${assault.current} dealing ${player.assaultrifle.damage} damage.`);
    }

    return true;
  }
  raiseExplosivesSkill() {
    let player = this.player;
    let explosives = this.skills.explosives;

    if(this.raiseSkill(explosives)) {
      player.enableGrenades();
      player.writeconsole(`Let's try some explosives.`);
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

  raiseHealthSkill() {
    let player = this.player;
    let health = this.skills.health;

    if(this.raiseSkill(health)) {
      player.changeMaxHp(5);
      // player.writeconsole("raised health to " + health.current);
      if(health.current === 5) { 
        player.writeconsole("My body can process stimulants now.");
        player.skills.enableStimulants(); 
        
      }
    }

    return true;
  }

  raiseStaminaSkill() {
    let player = this.player;
    let stamina = this.skills.stamina;

    if(this.raiseSkill(stamina)) {
      player.attributes.changeSpeed(10);
      player.attributes.changeStamina(10);
      // player.writeconsole(`After intensive training, stamina to ${stamina.current}`);
    }

    return true;
  }

  raiseConcentrationSkill() {
    let player = this.player;
    let concentration = this.skills.concentration;

    if(this.raiseSkill(concentration)) {
      // player.setMaxOrbs();
      // player.writeconsole(`My mind feels at ease.`);
      //Increase max energy and energy regen
      player.attributes.changeEnergy(25);
      
      if(concentration.current === 1) { 
        //Add psi orb skill
        player.skills.enablePsiOrb(player, damphamlet.phasergame);
        player.writeconsole('Focusing on defense now available.'); 
      }
      else if(concentration.current === 3) { 
        //Add teleport skill 
        player.skills.enableTeleport();
        player.writeconsole('Focusing on location now available.');
      }
      else if(concentration.current === 6) { 
        //Add heal skill
        player.skills.enableHeal(); 
        player.writeconsole('Focusing on recovery now available.');
      }

      player.skills.psiorb.addMaxOrbs(1);
      player.skills.psiorb.reduceConcentrationTime(250);
      
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



}