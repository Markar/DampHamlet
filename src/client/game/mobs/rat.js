import {Mob} from './mob';

export class Rat extends Mob {

  constructor(name, game, startx, starty) {
    super(name, 'rat', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed = 10 + (Math.random() * 5);
    this.hp = 20;  
    this.nextAttack = 1000; 
    this.attackRate = 1000;      
    this.weaponSprite = 'purple_shot';
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