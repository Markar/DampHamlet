export class Item {

  constructor(name, durability, quality, cost, itemType) {
    this.name = name;
    this.durability = durability;
    this.quality = quality;
    this.cost = cost;
    this.itemType = itemType;
  }
}


export class Consumable extends Item {
  constructor(name, durability, quality, cost, consumableType) {
    super(name, durability, quality, cost, consumableType);
  }
}

export class Medkit extends Consumable {
  constructor(name) {
    super(name, 100, 1, 10, 'medkit');
  }

  buy(player) {
    if(player.attributes.credits < this.cost) {
      player.writeconsole('You do not have enough credits.');
      return false;
    }
    if(player.items.medkits.quantity >= player.items.medkits.carryMax) {
      player.writeconsole('You cannot carry another kit.');
      return false;
    }

    player.addCredits(-this.cost);
    player.addMedkits(1);
    return true;
  }
}

export class Grenade extends Consumable {
  constructor(name) {
    super(name, 100, 1, 10, 'grenade');
  }

  buy(player) {
    if(player.attributes.credits < this.cost) {
      player.writeconsole('You do not have enough credits.');
      return false;
    }
    if(player.items.grenades.quantity >= player.items.grenades.carryMax) {
      player.writeconsole('You cannot carry another grenade.');
      return false;
    }

    player.addCredits(-this.cost);
    player.addMedkits(1);
    return true;
  }
}

export class Weapon extends Item {
  constructor(name, durability, quality, cost, weaponType) {
    super(name, durability, quality, cost, weaponType);
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
    if (player.hasLaserPistol) {
      player.writeconsole("already have a laser pistol");
      return false;
    }
    if (player.attributes.credits < this.cost) {
      player.writeconsole("not enough credits");
      return false;
    }
    player.addCredits(-this.cost);
    player.addLaserPistol();
    player.writeconsole("laser pistol equipped on 2.")
    return true;

  }
}
export class AssaultRifle extends Weapon {
  constructor(name) {
    super(name, 100, 1, 100, 'assaultrifle');
  }

  buy(player) {

    if (player.hasAssaultRifle) {
      player.writeconsole("already have an assault rifle");
      return false;
    }
    if (player.attributes.credits < this.cost) {
      player.writeconsole("not enough credits");
      return false;
    }

    player.addCredits(-this.cost);
    player.addAssaultRifle();
    player.writeconsole("assault rifle equipped on 4.")
    return true;

  }
}
export class Shotgun extends Weapon {
  constructor(name) {
    super(name, 50, 1, 100, 'shotgun');
  }

  buy(player) {

    if (player.hasShotgun) {
      player.writeconsole("already have a shotgun");
      return false;
    }
    if (player.attributes.credits < this.cost) {
      player.writeconsole("not enough credits");
      return false;
    }

    player.addCredits(-this.cost);
    player.addShotgun();
    player.writeconsole("shotgun equipped on 5.")
    return true;
  }
}

export class RocketLauncher extends Weapon {
  constructor(name) {
    super(name, 100, 1, 150, 'rocketlauncher');
  }

  buy(player) {
    if (player.hasRocketLauncher) {
      player.writeconsole("already have a rocket launcher");
      return false;
    }

    if (player.attributes.credits < this.cost) {
      player.writeconsole("not enough credits");
      return false;
    }

    player.addCredits(-this.cost);
    player.addRocketLauncher();
    player.writeconsole("rocket launcher equipped on 3.")
    return true;
  }
}


export class Ammo extends Item {
  constructor(name, ammotype, quantity, cost) {
    super(name, -1, -1, cost, 'ammo');
    this.quantity = quantity;
    this.ammotype = ammotype;
  }
}

export class LowCaliburRounds extends Ammo {
  constructor(name) {
    super(name, 'standard', 6, 5);
  }

  buy(player) {
    if (player.attributes.credits > this.cost) {
      player.addCredits(-this.cost);
      player.addAmmo(this.quantity);
      return true;
    }

    return false;
  }
}
export class HighCaliburRounds extends Ammo {
  constructor(name) {
    super(name, 'standard', 30, 15);
  }

  buy(player) {
    if (player.attributes.credits > this.cost) {
      player.addCredits(-this.cost);
      player.addHighCaliburAmmo(this.quantity);
      return true;
    }

    return false;
  }
}
export class Rockets extends Ammo {
  constructor(name) {
    super(name, 'rockets', 3, 12);
  }

  buy(player) {
    if (player.attributes.credits > this.cost) {
      player.addCredits(-this.cost);
      player.addRockets(this.quantity);
      return true;
    }

    return false;
  }
}

export class Shells extends Ammo {
  constructor(name) {
    super(name, 'shells', 7, 20);
  }

  buy(player) {
    if (player.attributes.credits > this.cost) {
      player.addCredits(-this.cost);
      player.addShells(this.quantity);
      return true;
    }

    return false;
  }
}