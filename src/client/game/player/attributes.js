export class Attributes {

  constructor(player) {

     this.player = player; 

     this.health = { 
        current: 10, 
        max: 10, 
        regen: 0
      };

      this.stamina = { 
        current: 50, 
        max: 50, 
        regen: 5
      };

      this.energy = {
        current: 0,
        max: 0,
        regen: 0
      },

      this.speed = 130,
      this.armor = 0,
      this.xp = 0,
      this.level = 0,
      this.credits = 0,
      this.weaponsFired = 0,
      this.nextAttack = 0,
      this.attackRate = 1;
      
      this.hasPistol = 1;
      this.hasLaserPistol = 0;
      this.hasRocketLauncher = 0;
      this.hasAssaultRifle = 0;
      this.hasShotgun = 0;
  }

  changeSpeed(amount) {
    this.speed += amount;
  }
  changeStamina(amount) {
    this.stamina.max += amount;
    this.stamina.regen = (this.stamina.max / 10); 
  }
  regenStamina() { 
    this.addStamina(this.stamina.regen); 
  }
  //accepts positive or negative integers, returns success
  addStamina(amount) {
    let current = this.stamina.current;
    let max = this.stamina.max;
    //check if consuming stamina
    if(amount < 0) {
      //check if we have enough stamina
      if(current + amount < 0) {
        this.player.writeconsole("I don't have enough stamina.");
        return false;
      }
    }
    //check if healing stamina
    if(amount > 0) {
      //check if healing stamina
      if(current + amount > max) {
        this.stamina.current = max;
        return true;
      }
    }

    //if we get here, heal the stamina by the amount passed in
    this.stamina.current += amount;
    return true;
  }


  changeEnergy(amount) {
    this.energy.max += amount;
    this.energy.regen = (this.energy.max / 10); 
  }
  regenEnergy() { 
    this.addEnergy(this.energy.regen); 
  }
  addEnergy(amount) {
    let current = this.energy.current;
    let max = this.energy.max;

    //check if consuming
    if(amount < 0) {
      //check if we have enough stamina
      if(current + amount < 0) {
        this.player.writeconsole("I don't have enough energy.");
        return false;
      }
    }
    //check if healing stamina
    if(amount > 0) {
      //check if healing stamina
      if(current + amount > max) {
        this.energy.current = max;
        return true;
      }
    }

    //if we get here, heal the stamina by the amount passed in
    this.energy.current += amount;
    return true;
  }


  addHealth(amount) {
    this.health.current += amount;

    if (this.health.current > this.health.max)
      this.health.current = this.health.max;

    if (this.health.current <= 0) {
      this.player.die();
    }
  }

}