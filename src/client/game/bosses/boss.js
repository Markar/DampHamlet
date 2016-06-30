import {Health} from '../items/health';
import {BulletAmmo} from '../items/ammo';
import {FastShot} from '../weapons/enemyweapons/fastshot';
import {SlowShot} from '../weapons/enemyweapons/slowshot';

export class Boss extends Phaser.Sprite { 
  
  constructor(name, spritename, game, x, y) {
    super(game, x, y, spritename);
    game.add.existing(this);
    game.physics.p2.enable(this);
    game.enemyCount += 1; 
    $(".enemyCount").text(game.enemyCount);
    
    this.game = game; 
    this.target = null;
    this.reset(game);
    this.weapon = new SlowShot(game);
    this.firingPause = 500;
    this.game.time.events.loop(500, this.flip, this);    
  }
  
  update() {
    this.checkForPlayers(500, 3000);
    this.move(this.target);
    this.attack();
  }

  checkForPlayers(min, max) {
    let game = this.game;
    for(let i = 0; i < game.players.length;i++) {
      let distance = this.game.physics.arcade.distanceBetween(this, game.players[i]);

      if(distance < min) {
        //this.hateList.push(game.players[i]);
        this.target = game.players[i];
      }
      if(distance > max) {
        //this.hateList.splice(game.players[i]);
        this.target = null;
      }
    }
  }

  move() {

    if(this.alive == 1 && this.nextMove && this.target != null) {

      let angle = this.game.math.normalizeAngle(this.game.physics.arcade.angleBetween(this, this.target));     

      if(angle > (Math.PI / 4)  && angle < (3 * Math.PI / 4)) {
        this.body.moveDown(this.speed);
      }
      else if(angle > (7 * Math.PI / 4) && angle < (2 * Math.PI)
          || (angle > 0 && angle < (Math.PI / 6))
        ) { 
        this.body.moveRight(this.speed); 
      }
      else if(angle > (4 * Math.PI / 3) && angle < (7 * Math.PI / 4)) {
        this.body.moveUp(this.speed);
      }
      else if( (angle > (3 * Math.PI / 4) && angle < (5 * Math.PI / 4)) ) {
        this.body.moveLeft(this.speed);
      }
      else{
        this.game.physics.arcade.moveToObject(this, this.target, this.speed);     
      }
    }  
  }
  
  flip() { 
    this.scale.x *= -1; 
  }
  attack() {
    if(this.target != null) {
      let direction = Math.floor(Math.random() * 4);
      let fired = this.weapon.fire(this.body.x, this.body.y, direction);

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

  reset(game) {
    this.hp = 1; 
    this.speed = 10; 
    this.nextAttack = 1000; 
    this.attackRate = 5000 + (Math.random() * 5000);
    this.nextMove = 1000;
    this.name = name;
    this.alive = 1; 
    this.weaponSprite = 'purple_shot';
    this.damage = 2;
    this.scale.setTo(this.game.scalemultiple);
    this.smoothed = false;

    this.body.setRectangleFromSprite();
    this.body.setCollisionGroup(game.enemyCollisionGroup);
    this.body.fixedRotation = true;
    this.body.collides(game.weaponCollisionGroup, this.enemyHitByWeapon, this);
    this.body.collides([game.enemyCollisionGroup, game.playerCollisionGroup, game.tileCollisionGroup]);
    this.body.mass = 10;
    this.body.damping = 0.999;
    
    this.weapons = this.game.add.group();    
    this.weapons.enableBody = true;
    this.weapons.physicsBodyType = Phaser.Physics.P2JS;    
  }

  
  getSprite() {
    return this;
  }  

  weaponHit(body1, body2) {
    this.kill();
  }
  enemyHitByWeapon(body1, body2) {  
    this.hp -= body2.sprite.damage;
    $('.enemyHealth').text(this.name + ' ' +  this.hp);

    if(this.hp < 1) {
      this.die();
    }
  }

  die() {
      this.alive = 0; 
      this.game.enemyCount--; 
      $(".enemyCount").text(this.game.enemyCount);
      let item = this.game.rnd.between(1, 5);

      if(item == 1) {
        let health = new Health(this.game, this.body.x, this.body.y);
      }
      if(item == 2) {
        let ammo = new BulletAmmo(this.game, this.body.x, this.body.y);
      }

      this.destroy();
  }

}