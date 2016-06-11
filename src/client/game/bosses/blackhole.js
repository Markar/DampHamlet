import {Boss} from './boss';

export class BlackHole extends Boss {

  constructor(name, game, startx, starty) {
    super(name, 'blackhole', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed = 75;
    this.hp = 750;
    this.nextAttack = 1500;
    this.weapon.setInt('speed', 250);
    this.weapon.setDamage(5);
    this.weapon.fireRate = 150;
    this.direction = 0;
    this.xp = 15;
    this.credits = game.rnd.between(150, 250);
  }

  move() {       
    super.move();    
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