import {Mob} from './mob';

export class Octopus extends Mob {

    constructor(name, game, startx, starty) {
    super(name, 'octopus', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed = 15 + (Math.random() * 5);
    this.hp = 75;  
    this.nextAttack = 3000; 
    this.attackRate = 200;
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