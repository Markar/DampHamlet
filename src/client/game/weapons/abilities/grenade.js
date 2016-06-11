export class Grenade {

  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.sfxExplosion = game.add.audio('explosion');

    this.addGrenade(game, player);

    player.inputs.grenade.onDown.add(() => {
      if(player.items.grenades.quantity > 0 && player.alive) {
        this.throwGrenade(player);
      }
    });
  }

  addGrenade(game, player) {
    let grenade = game.add.sprite(0, 0, 'item-14');
    grenade.smoothed = false;
    grenade.scale.setTo(this.game.scalemultiple);
    game.physics.p2.enable(grenade);
    grenade.physicsBodyType = Phaser.Physics.P2JS;
    grenade.enableBody = true;
    this.grenade = grenade;


    let explosion = game.add.sprite(0, 0, 'item-35');
    explosion.smoothed = false;
    explosion.scale.setTo(this.game.scalemultiple * 2);
    game.physics.p2.enable(explosion);
    explosion.physicsBodyType = Phaser.Physics.P2JS;
    explosion.enableBody = true;
    this.explosion = explosion;

    //kill these so they don't show up until fired.
    this.explosion.kill();
    this.grenade.kill();
  }

  throwGrenade(player) {
    let grenade = this.grenade;

    if (grenade.alive == true)
      return;

    player.addGrenades(-1);
    let dir = player.direction;

    grenade.reset(player.body.x, player.body.y);
    grenade.anchor.setTo(0.5, 0.5);
    grenade.body.mass = 10;
    grenade.damage = 1;
    grenade.player = player;
    grenade.speed = 200;

    grenade.body.setCircle(10);
    grenade.body.setCollisionGroup(this.game.weaponCollisionGroup);
    grenade.body.collides([this.game.enemyCollisionGroup], this.grenadeHit, this);
    grenade.body.collides([this.game.tileCollisionGroup]);
    grenade.body.rotateLeft(75);
    grenade.body.damping = 0.4;
    grenade.body.angularDamping = 0.5;
    grenade.scale.setTo(this.game.scalemultiple / 2);

    this.game.time.events.add(2000, () => {
      this.explode(grenade.body.x, grenade.body.y, grenade.player, true);
      grenade.kill();
    });


    switch (dir){
      case 0:
        grenade.body.angle = 0;
        grenade.body.moveLeft(grenade.speed);
        return;
      case 1:
        grenade.body.angle = 0;
        grenade.body.moveRight(grenade.speed);
        return;
      case 2:
        grenade.body.angle = 180;
        grenade.body.moveUp(grenade.speed);
        return;
      case 3:
        grenade.body.angle = 180;
        grenade.body.moveDown(grenade.speed);
        return;
    }
  }

  grenadeHit(body1, body2) {
    //destroy the grenade, and create a larger explosion
    //this.explode(this.grenade.body.x, this.grenade.body.y, body1.sprite.player);
    //this.grenade.kill();
    body1.setZeroVelocity();
    body1.setCircle(0);
  }

  explode(x, y, player, timed) {
    let explosion = this.explosion;
    let game = this.game;

    explosion.reset(x, y);
    explosion.body.mass = 10000;
    explosion.body.setRectangleFromSprite();
    explosion.player = player;
    explosion.damage = 25;
    explosion.body.setCollisionGroup(game.weaponCollisionGroup);
    explosion.body.collides([game.enemyCollisionGroup], this.explosionHit, explosion);
    this.sfxExplosion.play();
    //explosion.body.collides([game.tileCollisionGroup], this.explosionHit, explosion);

    if(timed) {
      this.game.time.events.add(50, () => {
        explosion.kill();
      });
    }

    //if(explode) {
    //  console.log('kill explosion');
    //  explosion.kill();
    //}

  }

  explosionHit(body1, body2) {
    console.log('hit');
    this.kill();
  }


}