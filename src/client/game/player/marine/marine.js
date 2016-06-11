"use strict";
import {Player} from '../player';
import {PlayerInputs} from '../inputs';
import {MarineLevels} from './marinelevels';
import {Stimulants} from './stimulants';

export class Marine extends Player {
  constructor(game, creationInfo, playerObj) {
    super(game, creationInfo, playerObj);

    this.stimulants = new Stimulants(game, this);

    if (playerObj) {
      console.log('load player object super call in marine');
      super.loadPlayerObject(playerObj);
      this.loadMarine();
    }
    else{
      console.log('initialize new marine');
      this.initNewPlayer();
    }
  }

  //load anything specific to this call here
  loadMarine() {
    this.levels = new MarineLevels(this);
  }

  useFirstTalent() {
    this.stimulants.use(this);
  }
  useSecondTalent() {
    //this.stimulants.use()
  }
  useThirdTalent() {
    //this.stimulants.use()
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
      name: 'Marine'
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
        regen: 10
      },

      speed: 110,
      armor: 0,
      xp: 0,
      level: 0,
      credits: 200,
      weaponsFired: 0,
      nextAttack: 0,
      attackRate: 1
    };
    

    this.hasPistol = 1;
    this.hasLaserPistol = 1;
    this.hasRocketLauncher = 1;
    this.hasAssaultRifle = 1;
    this.hasShotgun = 1;

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
}