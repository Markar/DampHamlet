import {Mob} from './mob';

export class GreenAlien extends Mob {

  constructor(name, game, startx, starty) {
    super(name, 'green_alien', game, startx, starty);
    this.sprite = super.getSprite();

    this.game = game;
    this.speed = 55;
    this.hp = 30;
    this.nextAttack = 1000;
    this.firingPause = 250;
    this.mass = 100;

    this.xp = 3;
    this.credits = game.rnd.between(10, 20);

    this.weapon.setDamage(2);
    this.weapon.setInt('speed', 400);
    this.weapon.fireRate = 2000;
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
