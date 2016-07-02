import {Boss} from './boss';
import {Creator} from '../../../states/creator';
import {SpreadShot} from '../weapons/enemyweapons/spreadshot';

export class BlackHole extends Boss {

  constructor(name, game, startx, starty) {
    super(name, 'blackhole', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed = 50;
    this.hp = 750;
    this.nextAttack = 1500;
    this.weapon.setInt('speed', 250);
    this.weapon.setDamage(1);
    this.weapon.fireRate = 250;
    this.direction = 0;
    this.xp = 15;
    this.credits = game.rnd.between(150, 250);

    this.creator = new Creator(game, this.map);
    this.spreadshot = new SpreadShot(game);

    this.game.time.events.loop(Phaser.Timer.SECOND * 15, this.spawn, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * 6, this.fire_spread, this);
    

  }

  fire_spread() { 
    if(this.target) {
      this.angleToTarget = this.game.math.normalizeAngle(this.game.physics.arcade.angleBetween(this, this.target));
      this.getDirToTarget(this.angleToTarget);

      if(this.direction === 0) { 
        this.spread_up(); 
      }
      if(this.direction === 1) { 
        this.spread_right(); 
      }
      if(this.direction === 2) { 
        this.spread_down(); 
      }
      if(this.direction === 3) { 
        this.spread_left(); 
      } 
    }
  }

  spread_up() {
    //fire a large volley toward the player
    this.spreadshot.fire(this.body.x, this.body.y, 0); 
    this.spreadshot.fire(this.body.x, this.body.y, 4); 
    this.spreadshot.fire(this.body.x, this.body.y, 7);
  }
  spread_right() {
    //fire a large volley toward the player
    this.spreadshot.fire(this.body.x, this.body.y, 1);
    this.spreadshot.fire(this.body.x, this.body.y, 4); 
    this.spreadshot.fire(this.body.x, this.body.y, 5);
  }
  spread_down() {
    //fire a large volley toward the player
    this.spreadshot.fire(this.body.x, this.body.y, 2);
    this.spreadshot.fire(this.body.x, this.body.y, 5); 
    this.spreadshot.fire(this.body.x, this.body.y, 6);
  }
  spread_left() {
    //fire a large volley toward the player
    this.spreadshot.fire(this.body.x, this.body.y, 3);
    this.spreadshot.fire(this.body.x, this.body.y, 6); 
    this.spreadshot.fire(this.body.x, this.body.y, 7);
  }


  update() {
    this.checkForPlayers(500, 4000);
    this.move();
    this.attack();
  }

  move() {       
    super.move();    
  }

  spawn() { 
    //make this randomly differnet type of mob
    let green = this.creator.createGreenAlien(this.body.x, this.body.y);
  }

  attack() {
    if(this.target != null) {
      if(this.direction > 7)
        this.direction = 0;

      let fired = this.weapon.fire(this.body.x, this.body.y, this.direction);

      if (fired) {
        this.nextMove = this.game.time.now + this.firingPause;
        this.direction++;
      }
    }
  }

  weaponHit(body1, body2) {
    super.weaponHit(body1, body2);
  }

  enemyHitByWeapon(body1, body2) {  
    super.enemyHitByWeapon(body1, body2);
  }



}