export class Teleport {

  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.power = 1;
  }

  focusTeleportation(psiops) {
    if(this.player.canmove) {
      let useEnergy = psiops.addEnergy(-5);
      let distance = this.power * 150;

      if(useEnergy) {
        this.player.canmove = 0;
        psiops.writeconsole('Focusing on twisting twisting space.');

        this.game.time.events.add(1500, () => {
          this.player.canmove = 1;
          this.teleport(distance);
          return true;
        });
      }
    }
  }

  teleport(distance) {
    console.log('need to add a raycast check here');
    let player = this.player;

    switch(player.pressStack[player.pressStack.length - 1]) {
      case "left":
        player.body.x += -distance;
        return;
      case "right":
        player.body.x += distance;
        return;
      case "up":
        player.body.y += -distance;
        return;
      case "down":
        player.body.y += distance;
        return;
      default:
        return;
    }
  }


}