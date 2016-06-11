import {Mob} from './mob';

export class Dog extends Mob {

  constructor(name, game, startx, starty) {
    super(name, 'dog', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed = 10 + (Math.random() * 5);
    this.hp = 50;  
    this.nextAttack = 1000; 
    this.attackRate = 2000;       
    this.weaponSprite = 'red_shot3';
  }

  move() {       
    super.move();     
  }

  attack() {    
    super.attack();           
  }

  weaponHit(body1, body2) {
    super.weaponHit(body1, body2);
  }

  enemyHitByWeapon(body1, body2) {  
    super.enemyHitByWeapon(body1, body2);
  }
}