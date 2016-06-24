import {Mob} from '../mobs/mob';

export class Ship1 extends Mob {

  constructor(name, game, startx, starty, direction) {
    super(name, 'ship1', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed = 0
    this.hp = 5000;  
    this.body.mass = 99999999999999;
    this.game.time.events.loop(500, this.checkForPlayers, this);
    this.animations.play(direction);    
  }

  weaponHit(body1, body2) {
    super.weaponHit(body1, body2);
  }

  enemyHitByWeapon(body1, body2) {  
    super.enemyHitByWeapon(body1, body2);
  }

   setupSprite() {
    let game = this.game;

    this.animations.add('up', [0], 1, true);
    this.animations.add('right', [1], 1, true);
    this.animations.add('down', [2], 1, true);
    this.animations.add('left', [3], 1, true);
    

    this.body.setCircle(20);
    this.body.setCollisionGroup(game.enemyCollisionGroup);
    this.body.fixedRotation = true;
    this.body.collides(game.weaponCollisionGroup, this.enemyHitByWeapon, this);
    this.body.collides(game.playerCollisionGroup);
    this.body.collides(game.blockCollisionGroup, this.hitBlock, this);
    this.body.collides([game.enemyCollisionGroup, game.tileCollisionGroup], this.hitWallOrAlly, this);
    this.body.mass = 5000;
    this.body.damping = 0.999;
  }


  move() {

  }

  checkForPlayers() {

    if(this.alive){
      for(let i = 0; i < this.game.players.length;i++) {
        this.distanceToTarget = this.game.physics.arcade.distanceBetween(this, this.game.players[i]);

        if(this.distanceToTarget < 50) {
            this.game.players[i].shipNPC = true; 
        }
        else { 
            this.game.players[i].shipNPC = false; 
        }
      }
    }

  }

}