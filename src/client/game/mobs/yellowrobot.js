import {Mob} from './mob';

export class YellowRobot extends Mob {

  constructor(name, game, startx, starty) {
    super(name, 'yellowrobot', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed += (Math.random() * 5);
    this.hp = 40;  
    this.nextAttack = 1000; 
    this.attackRate = 200 + (Math.random() * 1000);       
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