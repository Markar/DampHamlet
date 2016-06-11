export class PsiOrb {

  constructor(game, player) {
    this.game = game;
    this.player = player;

    this.psiorbs = game.add.group();
    this.psiorbs.enableBody = true;
    this.psiorbs.physicsBodyType = Phaser.Physics.P2;
    this.psiorbs.parent = player;
    this.addOrbs(8);
    this.cooldown = 5000;

    this.orbsActive = 0;
  }

  rotate(speed) {
    this.psiorbs.rotation += speed;
  }

  createOrb(x, y) {
    let orb = this.psiorbs.getFirstDead();
    orb.reset(x,y);
  }

  removeAllOrbs() {
    this.psiorbs.forEachAlive(function(orb) {
      orb.kill()
    });

    this.player.orbsActive = 0;
  }
  removeOrb() {
    this.psiorbs.getChildAt(this.player.orbsActive - 1).kill();
    this.player.orbsActive--;
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

  focusPsiorb(psiops) {
    if(!psiops.canmove) {
      psiops.writeconsole("You're already concentrating on something else.");
      return;
    }

    let success = psiops.addEnergy(-10);

    if (success) {

      if (psiops.orbsActive >= psiops.maxOrbs) {
        psiops.writeconsole('Your focus lapses as you try controlling too many orbs.');
        psiops.addHealth(-5);
        psiops.psiOrb.removeAllOrbs();
        return;
      }

      psiops.writeconsole('You close your eyes as you focus on bringing another orb into existence.');
      psiops.canmove = 0;

      let orb = {
        x: 0,
        y: 0,
        mag: 10
      };

      switch (psiops.orbsActive){
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

      this.game.time.events.add(2500, () => {
        psiops.canmove = 1;
        psiops.orbsActive++;
        psiops.psiOrb.createOrb(orb.x, orb.y);

        return true;
      });

      return true;
    }
    return false;
  }

}