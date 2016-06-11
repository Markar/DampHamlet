"use strict";
import {Player} from '../player';
import {PlayerInputs} from '../inputs';
import {SplicerLevels} from './splicerlevels';

//import {PsiOrb} from './psiorb';
//import {PsiLevels} from './psilevels';
//import {Heal} from './heal';
//import {Teleport} from './teleport';

export class Splicer extends Player {
  constructor(game, creationInfo, playerObj) {
    super(game, creationInfo, playerObj);

    if (playerObj) {
      console.log('load player object super call in splicer');
      super.loadPlayerObject(playerObj);
      this.loadSplicer();
    }
    else{
      console.log('initialize new splicer');
      this.initNewPlayer();
    }
  }

  //load anything specific to this call here
  loadSplicer() {
    console.log('before loading splicer');
    this.levels = new SplicerLevels(this);
    console.log('after loading splicer');
  }

  initNewPlayer() {
    this.playertype = this.creationInfo.sprite;
    this.stagelevel = 0;
    this.console = [];
    this.consoleLimit = 5;
    this.pressStack = [];
    this.canmove = 1;
    this.canfire = 1;
    this.alive = 1;
    this.nextHit = 0;
    this.direction = 1;

    this.classInfo = {
      name: 'Splicer'
    };

    //Attributes
    this.attributes = {
      hp: 10,
      maxhp: 10,

      stamina: 100,
      staminaMax: 100,
      staminaRegen: 10,

      energy: {
        current: 100,
        max: 100,
        regen: 10
      },

      speed: 125,
      armor: 0,
      xp: 0,
      level: 0,

      credits: 200,
      weaponsFired: 0,
      nextAttack: 0,
      attackRate: 200
    };

    this.skills = {
      points: {'available': 0, 'allocated': 0},
      sprint: {'name': 'sprint', 'cost': -25, 'active': 0},
      pistols: {'name': 'pistols', 'current': 0, max: 5},
      concentration: {'name': 'concentration', 'current': 0, max: 5},
      health: {'name': 'health', 'currentHealthSkill': 0, maxHealthSkill: 5},
      speed: {'name': 'speed', 'currentSpeedSkill': 0, maxSpeedSkill: 2}
    };

    this.dna = {
      //basic
      cat: {'slot': 'hands', 'available': 0, 'current': 0, 'max': 0}, //melee weapon, prevent firearms
      bear: {'slot': 'body', 'available': 0, 'current': 0, 'max': 0}, //improve hp
      eagle: {'slot': 'eyes','available': 0, 'current': 0, 'max': 0}, //improve firearms
      //black market

      //looted
    };

    this.items = {
      medkits: {quantity: 0, restore: 15, carryMax: 2},
      grenades: {quantity: 0, carryMax: 5}
    };

    this.hasPistol = 1;
    this.hasLaserPistol = 0;
    this.hasRocketLauncher = 0;
    this.hasAssaultRifle = 0;
    this.hasShotgun = 0;

    //set this before adding weapons, since it uses hasX for adding them
    //this.debug();

    //default to the pistol
    if (this.hasPistol) {
      this.addPistol();
      this.weapon = this.pistol;
    }
    if (this.hasLaserPistol) {
      this.addLaserPistol();
    }
    if (this.hasRocketLauncher) {
      this.addRocketLauncher();
    }
    if (this.hasAssaultRifle) {
      this.addAssaultRifle();
    }
    if (this.hasShotgun) {
      this.addShotgun();
    }
    this.resetSprite(this.game);

    //set this on each level
    this.playerinputs = new PlayerInputs(this.game, this);
    this.setupUIValues();
  }

  update() {
    super.update();
  }

  useFirstTalent() {
    //this.psiOrb.focusPsiorb(this);
  }
  useSecondTalent() {
    //this.healing.focusHealing(this);
  }
  useThirdTalent() {
    //this.teleport.focusTeleportation(this);
  }

  takeDamage(amount) {
    let dmg = 0;

    if (this.attributes.armor > -1) {
      dmg = amount - this.attributes.armor;

      if (dmg < 1) {
        dmg = 1;
      }
    }

    this.addHealth(-dmg);

    //play sound effect
    let rnd = this.game.rnd.between(4, 6);
    if (rnd == 4)
      this.sfxHit1.play();
    if (rnd == 5)
      this.sfxHit2.play();
    else
      this.sfxHit3.play();
  }

  hit(body1, body2) {
    if (this.alive === 1 && this.game.time.now > this.nextHit) {

      let dmg = 0;

      if (body2 != null) {
        this.takeDamage(body2.sprite.damage);
      }

      this.nextHit = this.game.time.now + 50;
    }
  }
}