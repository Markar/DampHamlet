export class Teleport {

  constructor() {
      this.power = 1;
  }

  focusTeleportation(player, game) {
    if(player.canmove) {
      let concentration = player.skills.concentration.current; 

      let useEnergy = player.attributes.addEnergy(-25);
      let distance = (concentration / 3) * 150;

      if(useEnergy) {
        let castTime = 1500 - (concentration * 100);
        player.canmove = 0;
        player.writeconsole('Focusing on twisting twisting space.');

        game.time.events.add(castTime, () => {
          player.canmove = 1;
          this.teleport(distance, player);
          return true;
        });
      }
    }
  }

  teleport(distance, player) {
    console.log('need to add a raycast check here');

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