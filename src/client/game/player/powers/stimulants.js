export class Stimulants {

  constructor(player, game) {
    this.player = player;
    this.game = game;
    this.available = true;
    this.cooldown = 10000;
    this.duration = 5000;
    //this should be negative to consume hp
    this.cost = -1;
  }

  use(player) {
    if(this.available) {
      this.available = false;
      player.writeconsole("Ahh, C4. Time to pump some iron!");
      //instant stat boost and health loss
      let useHealth = player.attributes.addHealth(this.cost);
      let staminaRegen = player.attributes.staminaRegen;
      player.attributes.staminaRegen *= 4;

      let speed = player.attributes.speed;
      player.attributes.speed += 25;
      console.log('stimulant bonus speed', speed);


      let attackRate = player.attributes.attackRate;
      player.attributes.attackRate += -0.25;

      //reverse after duration is over
      this.game.time.events.add(this.duration, () => {
        console.log('reverse stimulant effects', speed);
        player.writeconsole("You feel your buzz wearing off.")
        player.attributes.staminaRegen = staminaRegen;
        player.attributes.speed = speed;
        player.attributes.attackRate = attackRate;
        return true;
      });

      this.game.time.events.add(this.cooldown, () => {
        this.available = true;
        return true;
      });
    }
    else {
      player.writeconsole("No, your heart will explode!");
    }
  }
}