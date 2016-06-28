export class PsiOrb {

  constructor(player, game) {
    this.game = game;
    this.player = player;

    this.psiorbs = this.game.add.group();
    this.psiorbs.enableBody = true;
    this.psiorbs.physicsBodyType = Phaser.Physics.P2JS;
    this.psiorbs.parent = this.player;
    this.addOrbs(8);
    this.cooldown = 5000;

    this.orbsActive = 0;
    this.maxOrbs = 1;
    this.concentrationTime = 2500; 
  }

  init(player, game) { 
    this.player = player; 
    this.game = game;

    this.psiorbs = this.game.add.group();
    this.psiorbs.enableBody = true;
    this.psiorbs.physicsBodyType = Phaser.Physics.P2JS;
    this.psiorbs.parent = this.player;
    this.addOrbs(8); 
  }

  rotate(speed) {
    this.psiorbs.rotation += speed;
  }

  addMaxOrbs(count) {
    //Max of 8 so they stay in a close circle 
    this.maxOrbs += count;

    if(this.maxOrbs > 8) { 
      this.maxOrbs = 8; 
    } 
  }

  createOrb(x, y) {
    let orb = this.psiorbs.getFirstDead();
    orb.reset(x,y);
  }

  removeAllOrbs() {
    this.psiorbs.forEachAlive(function(orb) {
      orb.kill()
    });

    this.orbsActive = 0;
  }
  removeOrb() {
    this.psiorbs.getChildAt(this.orbsActive - 1).kill();
    this.orbsActive--;
  }

  reduceConcentrationTime(amount) { 
    this.concentrationTime -= amount; 
    if(this.concentrationTime < 250) { 
      this.concentrationTime = 250; 
    }
  }

  addOrbs(count) {
    for(let i = 0; i < count; i++) {
      let orb = this.psiorbs.create(0, 0, 'item-57', 0, false);
      this.game.physics.p2.enable(orb);
      orb.scale.setTo(0.5);
      orb.anchor.setTo(0.5);
      orb.smoothed = false;
      orb.body.mass = 5;
      orb.body.kinematic = true;
    }
  }

  checkPsiBlock(player) {
    let blockChance = 0.3 + (this.orbsActive / 20); //10% for 1 ball

    if(this.game.rnd.between(0, 1) < blockChance) {
      this.removeOrb();
      player.writeconsole('You anticipated the hit just in time.');
      return true;
    }
    player.writeconsole('You failed to anticipate where the hit was coming from.');
    return false;
  }

  focusPsiorb(player) {
    if(!player.canmove) {
      player.writeconsole("You're already concentrating on something else.");
      return;
    }

    let success = player.attributes.addEnergy(-10);

    if (success) {

      if (this.orbsActive >= this.maxOrbs) {
        player.writeconsole('Your focus lapses as you try controlling too many orbs.');
        player.attributes.addHealth(-5);
        this.removeAllOrbs();
        return;
      }

      player.writeconsole('You close your eyes as you focus on bringing another orb into existence.');
      player.canmove = 0;

      let orb = {
        x: 0,
        y: 0,
        mag: 10
      };

      switch (this.orbsActive){
        case 0:
          orb.x = 0;
          orb.y = orb.mag;
          break;
        case 1:
          orb.x = orb.mag;
          orb.y = 0;
          break;
        case 2:
          orb.x = 0;
          orb.y = -orb.mag;
          break;
        case 3:
          orb.x = -orb.mag;
          orb.y = 0;
          break;

        case 4:
          orb.x = orb.mag * 0.75;
          orb.y = orb.mag * 0.75;
          break;
        case 5:
          orb.x = orb.mag * 0.75;
          orb.y = -orb.mag * 0.75;
          break;
        case 6:
          orb.x = -orb.mag * 0.75;
          orb.y = -orb.mag * 0.75;
          break;
        case 7:
          orb.x = -orb.mag * 0.75;
          orb.y = orb.mag * 0.75;
          break;
      }

      this.game.time.events.add(this.concentrationTime, () => {
        player.canmove = 1;
        this.orbsActive++;
        this.createOrb(orb.x, orb.y);

        return true;
      });

      return true;
    }
    return false;
  }

}