import {Weapon} from './weapon'

export class Rockets extends Weapon {

  constructor(game, player) {
    super(game, 'item-45', 30, player);
    this.player = player;
    this.setup(game, player);
  }

  setup(game, player) {
    this.fireRate = 250;
    this.weaponsFired = 0;
    this.name = "Rockets";
    let sprite = game.add.sprite(4, 0, 'item-8');
    sprite.smoothed = false;
    sprite.scale.setTo(0.5);
    sprite.anchor.setTo(0.5, 0.5);
    player.addChild(sprite);
    sprite.visible = false;
    this.sprite = sprite;

    //this.explosion = game.add.sprite(0, 0, 'explosion');
    //this.explosion.animations.add('explode');

    this.sfxExplosion = game.add.audio('explosion');
    this.sfxFire = game.add.audio('flyby-slow');

    this.clipSize = 3;
    this.clip = this.clipSize;
    this.ammo = (this.clipSize * 2);
    this.reloadTime = 3000;

    $(".clip").text(this.clip);
    $(".ammo").text(this.ammo);


    this.speed = 400;
    this.mass = 1;
    this.size = 5;
    this.damage = 80;

    this.weapons.setAll('speed', this.speed);
    this.weapons.setAll('mass', this.mass);
    this.weapons.setAll('size', this.size);
    this.weapons.setAll('damage', this.damage);
  }

  setDamage(amount) {
    this.damage = amount;
    this.weapons.setAll('damage', amount);
  }

  weaponHit(body1, body2) {
    this.class.explode(this.body.x, this.body.y, body1.sprite.player);
    this.kill();
  }
  explode(x, y, player) {
    console.log('explode');
    let game = this.game;
    this.player = player;

    let explosion = game.add.sprite(0, 0, 'item-35');

    //this.explosion.smoothed = false;
    //this.explosion.scale.setTo(this.game.scalemultiple * 2);
    //this.explosion.reset(x, y);
    //this.explosion.animations.play('explode', 1, false);


    this.playFX();
    explosion.smoothed = false;
    explosion.scale.setTo(this.game.scalemultiple * 2);
    game.physics.p2.enable(explosion);
    explosion.physicsBodyType = Phaser.Physics.P2JS;
    explosion.enableBody = true;
    explosion.reset(x, y);
    explosion.body.mass = 1000;
    explosion.body.setRectangleFromSprite();
    explosion.player = player;
    explosion.damage = 10;
    explosion.force = 500;
    explosion.body.setCollisionGroup(game.weaponCollisionGroup);
    explosion.body.collides([game.enemyCollisionGroup,game.tileCollisionGroup], this.explosionHit, explosion);

    this.game.time.events.add(500, () => {
      if(explosion)
        explosion.kill();
    });
  }
  playFX() {
    this.sfxExplosion.play();
    console.log('playing explosion');
  }

  explosionHit(body1, body2) {
    let radius = 5;
    let distance = this.game.physics.arcade.distanceBetween(body2, this);
    let angle = this.game.physics.arcade.angleBetween(body2, this.player);

    let vx = Math.cos(angle) * ((radius - distance) / body2.mass) * this.force;
    //console.log('a ' + angle + ' cos ' + Math.cos(angle));
    //console.log('r ' + radius + ' d ' + distance + ' m ' + body2.mass + ' f ' + this.force);
    //console.log('vx ' + vx);
    let vy = Math.sin(angle) * ((radius - distance) / body2.mass) * this.force;

    console.log('mob ' + body2.constructor.name + ' ' + body2.velocity.x + ' ' + body2.velocity.y);
    body2.velocity.x += vx;
    body2.velocity.y += vy;
    console.log('mob v ' + body2.velocity.x + ' ' + body2.velocity.y);

    this.kill();
  }

  fire() {
    if(this.clip > 0) {
      if(super.fire(this.fireRate)) {
        let p = this.player;
        if(p.direction == 0) {
          this.player.body.velocity.x += 300;
        }
        else if(p.direction == 1) {
          this.player.body.velocity.x -= 300;
        }
        else if(p.direction == 2) {
          this.player.body.velocity.y += 300;
        }
        else if(p.direction == 3) {
          this.player.body.velocity.y -= 300;
        }
      }
    }
  }

  reload() {
    super.reload();
  }
}