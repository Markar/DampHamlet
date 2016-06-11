import {Mob} from './mob';

export class Slime extends Mob {

  constructor(name, game, startx, starty) {
    super(name, 'slime', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed = 35;
    this.hp = 65;
    this.nextAttack = 1000; 
    this.attackRate = 250;
    this.weaponSprite = 'purple_shot2';
    this.hateList = [];
    this.weapon.setDamage(3);
    //this.setCredits(1);
  }

  update() {
    //this.checkForPlayers(200, 600);
    this.move();
    this.attack();
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

  checkForPlayers(aggro, deAggro) {

    if(this.alive){
      for(let i = 0; i < this.game.players.length;i++) {
        this.distanceToTarget = this.game.physics.arcade.distanceBetween(this, this.game.players[i]);

        if(this.distanceToTarget < aggro) {
          this.target = this.game.players[i];
          this.angleToTarget = this.game.math.normalizeAngle(this.game.physics.arcade.angleBetween(this, this.target));
          this.getDirToTarget(this.angleToTarget);
        }
        //if we have a target and haven't reached deAggro distance, keep tracking them
        if(this.distanceToTarget < deAggro) {
          console.log('check for players', this.distanceToTarget, deAggro);
          this.target = this.game.players[i];
          this.angleToTarget = this.game.math.normalizeAngle(this.game.physics.arcade.angleBetween(this, this.target));
          this.getDirToTarget(this.angleToTarget);
        }

        if(this.distanceToTarget > deAggro) {
          this.target = null;
          this.direction += 1;
          console.log('first mob at ' + this.distanceToTarget);
          if(this.direction > 3) {
            this.direction = 0;
          }
        }
      }
    }
  }

}
