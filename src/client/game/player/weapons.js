import {Item} from './item';

export class Weapon extends Item {
  constructor(name, durability, quality, cost, weaponType) {
    super(name, durability, quality, cost, weaponType)
  }
}

export class Pistol extends Weapon {
  constructor(name) {
    super(name, 100, 1, 100, 'pistol');
  }
}
export class LaserPistol extends Weapon {
  constructor(name) {
    super(name, 100, 1, 100, 'laserpistol');
  }

  buy(player) {
    if(player.credits >= this.cost && !player.hasLaserPistol) {
      player.addCredits(-this.cost);
      player.addLaserPistol();
      player.writeconsole("laser pistol equipped on 2.")
      return true;
    }
    else {
      player.writeconsole("invalid purchase");
    }
  }
}
export class AssaultRifle extends Weapon {
  constructor(name) {
    super(name, 100, 1, 100, 'assaultrifle');
  }

  buy(player) {
    if(player.credits >= this.cost && !player.hasAssaultRifle) {
      player.addCredits(-this.cost);
      player.addAssaultRifle();
      player.writeconsole("assault rifle equipped on 4.")
      return true;
    }
    else {
      player.writeconsole("invalid purchase");
    }
  }
}
export class Shotgun extends Weapon {
  constructor(name) {
    super(name, 50, 1, 100, 'shotgun');
  }

  buy(player) {
    if(player.credits >= this.cost && !player.hasShotgun) {
      player.addCredits(-this.cost);
      player.addShotgun();
      player.writeconsole("shotgun equipped on 5.")
      return true;
    }
    else {
      player.writeconsole("invalid purchase");
    }
  }
}

export class RocketLauncher extends Weapon {
  constructor(name) {
    super(name, 100, 1, 150, 'rocketlauncher');
  }

  buy(player) {
    if(player.credits >= this.cost && !player.hasRocketLauncher) {
      player.addCredits(-this.cost);
      player.addRocketLauncher();
      player.writeconsole("rocket launcher equipped on 3.")
      return true;
    }
    else {
      player.writeconsole("invalid purchase");
    }
  }
}