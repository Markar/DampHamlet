import {Health} from '../items/health';
import {BulletAmmo} from '../items/ammo';
import {Credits} from '../items/credits';
//import {FastShot} from '../weapons/enemyweapons/fastshot';
import {SlowShot} from '../weapons/enemyweapons/slowshot';

export class Mob extends Phaser.Sprite {

  constructor(name, spritename, game, x, y) {
    super(game, x, y, spritename);
    game.add.existing(this);
    game.physics.p2.enable(this);
    game.enemyCount += 1;

    this.game = game;
    this.target = null;
    this.hateList = [];
    this.resetEnemy();
    this.setupSprite();
    this.weapon = new SlowShot(game);
    this.firingPause = 200;
    this.credits = game.rnd.between(10, 25);
    this.xp = 1;

    this.distanceToTarget = 0;
    this.angleToTarget = 0;
    this.direction = 0;
    this.nextDirection = 5000;
  }

  update() {
    this.move();
    this.attack();
  }

  setCredits(num) {
    this.credits = num;
  }

  //return the angle and distance
  checkForPlayers(aggro, deAggro) {
    if (this.alive) {
      for (let i = 0; i < this.game.players.length; i++) {
        this.distanceToTarget = this.game.physics.arcade.distanceBetween(this, this.game.players[i]);

        if (this.distanceToTarget < aggro) {
          this.target = this.game.players[i];
          this.angleToTarget = this.game.math.normalizeAngle(this.game.physics.arcade.angleBetween(this, this.target));
          this.getDirToTarget(this.angleToTarget);
        }
        //if we have a target and haven't reached deAggro distance, keep tracking them
        if (this.distanceToTarget < deAggro && this.hateList.length > 0) {
          this.hateList.push(this.game.players[i]);
          this.target = this.game.players[i];
          this.angleToTarget = this.game.math.normalizeAngle(this.game.physics.arcade.angleBetween(this, this.target));
          this.getDirToTarget(this.angleToTarget);
        }

        if (this.distanceToTarget > deAggro && this.hateList.length < 1) {
          this.target = null;
          this.direction += 1;
          // console.log('first mob at ' + this.distanceToTarget);
          if (this.direction > 3) {
            this.direction = 0;
          }
        }
      }
    }
  }

  getDirToTarget(angle) {
    if (angle > (4 * Math.PI / 3) && angle < (7 * Math.PI / 4)) {
      this.direction = 0;
    }
    else if (angle > (7 * Math.PI / 4) && angle < (2 * Math.PI)
      || (angle > 0 && angle < (Math.PI / 6))
    ) {
      this.direction = 1;
    }
    else if (angle > (Math.PI / 4) && angle < (3 * Math.PI / 4)) {
      this.direction = 2;
    }
    else if ((angle > (3 * Math.PI / 4) && angle < (5 * Math.PI / 4))) {
      this.direction = 3;
    }
    else {
      // console.log('NO ANGLE getDirToTarget', angle);
      this.direction = Math.floor(Math.random() * 4);
    }
  }


  evasivePattern() {

  }


  move() {
    if (this.alive === 1 && this.nextMove) {

      if (this.hateList.length > 0) {
        this.target = this.hateList[0];
      }

      if (this.target !== null) {
        this.moveByInteger(this.direction);
        return;
        //  this.game.physics.arcade.moveToObject(this, this.target, this.speed);
      }
      else {
        if (this.game.time.now > this.nextDirection) {
          this.direction = Math.floor(Math.random() * 4);
          this.nextDirection = this.game.time.now + 5000;
        }
      }
      this.moveByInteger(this.direction);
    }
  }

  moveByInteger(direction) {
    if (direction === 0) {
      this.body.moveUp(this.speed);
      this.animations.play('up');
    }
    else if (direction === 1) {
      this.body.moveRight(this.speed);
      this.animations.play('right');
    }
    else if (direction === 2) {
      this.body.moveDown(this.speed);
      this.animations.play('down');
    }
    else if (direction === 3) {
      this.body.moveLeft(this.speed);
      this.animations.play('left');
    }
  }

  attack() {
    if (this.target !== null) {
      //let direction = Math.floor(Math.random() * 4);
      let fired = this.weapon.fire(this.body.x, this.body.y, this.direction);

      if (fired) {
        this.nextMove = this.game.time.now + this.firingPause;
      }
    }
  }
  multifire() {
    this.weapon.multifire(this.body.x, this.body.y);
  }
  rageattack() {
    let fired = this.weapon.multifire(this.body.x, this.body.y, 0);
    let fired1 = this.weapon.multifire(this.body.x, this.body.y, 1);
    let fired2 = this.weapon.multifire(this.body.x, this.body.y, 2);
    let fired3 = this.weapon.multifire(this.body.x, this.body.y, 3);


    if (fired) {
      this.nextMove = this.game.time.now + this.firingPause;
    }
  }

  resetEnemy() {
    this.hp = 1;
    this.speed = 10;
    this.nextAttack = 1000;
    this.attackRate = 300 + (Math.random() * 2000);
    this.nextMove = 1000;
    this.name = name;
    this.alive = 1;
    this.weaponSprite = 'purple_shot';
    this.damage = 3;
    this.scale.setTo(this.game.scalemultiple);
    this.smoothed = false;

    this.weapons = this.game.add.group();
    this.weapons.enableBody = true;
    this.weapons.physicsBodyType = Phaser.Physics.P2JS;

    this.nextEvade = 0;
  }

  setupSprite() {
    let game = this.game;

    this.animations.add('right', [1, 2], 4, true);
    this.animations.add('down', [4, 5], 4, true);
    this.animations.add('left', [7, 8], 4, true);
    this.animations.add('up', [10, 11], 4, true);

    this.body.setCircle(20);
    this.body.setCollisionGroup(game.enemyCollisionGroup);
    this.body.fixedRotation = true;
    this.body.collides(game.weaponCollisionGroup, this.enemyHitByWeapon, this);
    this.body.collides(game.playerCollisionGroup);
    this.body.collides(game.blockCollisionGroup, this.hitBlock, this);
    this.body.collides([game.enemyCollisionGroup, game.tileCollisionGroup], this.hitWallOrAlly, this);
    this.body.mass = 10;
    this.body.damping = 0.999;
  }

  block(body1, body2) {
    console.log('mob hit orb');
  }
  hitWallOrAlly() {
    this.direction = Math.floor(Math.random() * 4);
    // console.log('direction', this.direction);
  }

  getSprite() {
    return this;
  }

  weaponHit(body1, body2) {
    this.kill();
  }

  enemyHitByWeapon(body1, body2) {
    console.log('hit by weapon', this.alive);
    this.hp -= body2.sprite.damage;
    this.game.target.name = this.name;
    this.game.target.health = this.hp;

    if (body2.sprite.player === undefined) {
      if (this.hp < 1) {
        this.die();
      }
    } else {
      this.target = body2.sprite.player;
      this.hateList.push(body2.sprite.player);
      this.angleToTarget = this.game.math.normalizeAngle(this.game.physics.arcade.angleBetween(this, this.target));
      this.getDirToTarget(this.angleToTarget);

      if (this.hp < 1) {
        this.die(body2.sprite.player);
      }
    }
  }

  die(player) {
    this.alive = 0;
    this.body.setCircle(0);
    this.game.enemyCount--;
    // $(".enemyCount").text(this.game.enemyCount);
    let item = new Credits(this.game, this.body.x, this.body.y, this.credits);

    if (player === undefined) {
      // console.log('player undefined on that projectiles');
    } else {
      console.log('add xp from mob');
      player.writeconsole(`gained ${this.xp} experience`);
      player.levels.addXP(this.xp);
    }
    this.destroy();
  }
}
