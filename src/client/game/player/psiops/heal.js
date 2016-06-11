export class Heal {

  constructor(game, player) {
    this.game = game;
    this.player = player;
  }

  focusHealing(psiops) {
    let useEnergy = psiops.addEnergy(-5);

    if (useEnergy) {
      this.player.canmove = 0;
      psiops.writeconsole('Focusing on healing wounds.');

      this.game.time.events.add(1000, () => {
        this.player.canmove = 1;
        psiops.addHealth(1);
        return true;
      });

    }
  }

  focusRegeneration(psiops) {
    let useEnergy = psiops.addEnergy(-30);

    if (useEnergy) {
      this.player.canmove = 0;

      this.game.time.events.add(5000, () => {
        this.player.canmove = 1;
        psiops.addHealth(50);
        psiops.writeconsole('Focusing on healing wounds.');
        return true;
      });

    }
  }

}