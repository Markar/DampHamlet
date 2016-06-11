import {Item} from './item';

export class Consumable extends Item {
  constructor(name, durability, quality, cost) {
    super(name, durability, quality, cost, 'consumable');
  }
}

export class Medkit extends Consumable {
  constructor(name) {
    super(name, 1, 1, 25);
  }

  buy(player) {
    if(player.credits < this.cost) {
      player.writeconsole('You do not have enough credits.');
      return false;
    }
    if(player.medkits >= player.medkitMax) {
      player.writeconsole('You cannot carry another medical kit.');
      return false;
    }

    player.addCredits(-this.cost);
    player.addMedkits(1);
    return true;
  }

}

export class Grenade extends Consumable {
  constructor(name) {
    super(name, 1, 1, 5);
  }

  buy(player) {
    if(player.credits < this.cost) {
      player.writeconsole('You do not have enough credits.');
      return false;
    }
    if(player.medkits >= 20) {
      player.writeconsole('You cannot carry another grenade.');
      return false;
    }

    player.addCredits(-this.cost);
    player.addGrenades(1);
    return true;
  }

}