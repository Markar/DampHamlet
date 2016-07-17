export class Heal {

  constructor(player, game) {
    this.game = game;
    this.player = player;
  }

  focusHealing() {
    let game = this.game
    let player = this.player;
    let concentration = player.skills.concentration.current;
    let useEnergy = player.attributes.addEnergy(-(concentration * 5));

    if (useEnergy) {
      player.canmove = 0;
      player.writeconsole('Focusing on healing wounds.');

      this.game.time.events.add(3000, () => {
        player.canmove = 1;
        player.heal(1 + concentration);
        return true;
      });

    }
  }

  focusRegeneration() {
    let game = this.game
    let player = this.player;
    let useEnergy = player.attributes.addEnergy(-100);

    if (useEnergy) {
      player.canmove = 0;

      this.game.time.events.add(5000, () => {
        player.canmove = 1;
        player.heal(15);
        player.writeconsole('Focusing on healing wounds.');
        return true;
      });

    }
  }

}