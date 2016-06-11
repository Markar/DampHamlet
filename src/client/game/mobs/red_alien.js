import {Mob} from './mob';

export class RedAlien extends Mob {

  constructor(name, game, startx, starty) {
    super(name, 'red_alien', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed = 20 + (Math.random() * 5);
    this.hp = 75;
    this.nextAttack = 1000; 
    this.attackRate = 200 + (Math.random() * 500);
    this.weaponSprite = 'purple_shot2';
    this.weapon.setDamage(2);
    this.xp = 2;
    this.credits = game.rnd.between(2, 10);
  }

  move() {       
    super.move();     
  }

  attack() {     
    super.multifire(this.body.x, this.body.y);
  }

  weaponHit(body1, body2) {
    super.weaponHit(body1, body2);
  }

  enemyHitByWeapon(body1, body2) {  
    super.enemyHitByWeapon(body1, body2);
  }



}