"use strict";
import {Player} from '../player';
import {PlayerInputs} from '../inputs';
import {PsiOrb} from './psiorb';
import {PsiLevels} from './psilevels';
import {Heal} from './heal';
import {Teleport} from './teleport';

export class PsiOps extends Player {
  constructor(game, creationInfo, playerObj) {
    super(game, creationInfo, playerObj);

    this.psiOrb = new PsiOrb(game, this);
    this.healing = new Heal(game, this);
    this.teleport = new Teleport(game, this);

    this.orbsActive = 0;
    if (playerObj) {
      console.log('load player object super call in psi ops');
      super.loadPlayerObject(playerObj);
      this.loadPsiOps();
    }
    else{
      console.log('initialize new psi ops');
      this.initNewPlayer();
    }
    this.setMaxOrbs();
  }

  //load anything specific to this call here
  loadPsiOps() {
    console.log('before loading psi ops');
    this.levels = new PsiLevels(this);
    console.log('after loading psi ops');
  }

  setMaxOrbs() {
    this.maxOrbs = 2 + this.skills.concentration.current;
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
      name: 'Psi Ops'
    };

    //Attributes    
    this.attributes = {
      health: { 
        current: 10, 
        max: 10, 
        regen: 0
      },

      stamina: { 
        current: 100, 
        max: 100, 
        regen: 10
      },

      energy: {
        current: 100,
        max: 100,
        regen: 1
      },

      speed: 125,
      armor: 0,
      xp: 0,
      level: 0,
      credits: 200,
      weaponsFired: 0,
      nextAttack: 0,
      attackRate: 1
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
  }

  update() {
    super.update();
    this.psiOrb.rotate(0.02);
  }

  useFirstTalent() {
    this.psiOrb.focusPsiorb(this);
  }
  useSecondTalent() {
    this.healing.focusHealing(this);
  }
  useThirdTalent() {
    this.teleport.focusTeleportation(this);
  }

  checkPsiBlock() {
    let blockChance = 0.3 + (this.orbsActive / 20); //10% for 1 ball

    if(this.game.rnd.between(0, 1) < blockChance) {
      this.psiOrb.removeOrb();
      this.writeconsole('You anticipated the hit just in time.');
      return true;
    }
    this.writeconsole('You failed to anticipate where the hit was coming from in time.');
    return false;
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
    if (this.alive == 1 && this.game.time.now > this.nextHit) {

      //If we have any psi orbs active, remove one and negate the hit
      if(this.ballsActive > 0 && this.checkPsiBlock()) {
        return;
      }

      let dmg = 0;

      if (body2 != null) {
        this.takeDamage(body2.sprite.damage);
      }

      this.nextHit = this.game.time.now + 50;
    }
  }
}