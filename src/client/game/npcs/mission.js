import {Mob} from '../mobs/mob';

export class Mission extends Mob {

  constructor(name, game, startx, starty) {
    super(name, 'mission', game, startx, starty);        
    this.sprite = super.getSprite(); 

    this.game = game;           
    this.speed = 0
    this.hp = 5000;  
    this.body.mass = 99999999999999;
    this.game.time.events.loop(1000, this.checkForPlayers, this);    
  }

  weaponHit(body1, body2) {
    super.weaponHit(body1, body2);
  }

  enemyHitByWeapon(body1, body2) {  
    super.enemyHitByWeapon(body1, body2);
  }

  checkForPlayers() {

    if(this.alive){
      for(let i = 0; i < this.game.players.length;i++) {
        this.distanceToTarget = this.game.physics.arcade.distanceBetween(this, this.game.players[i]);

        if(this.distanceToTarget < 50) {
            console.log('player in range');
            this.game.players[i].missionNPC = true; 
        }
        else { 
            console.log('player out of range');
            this.game.players[i].missionNPC = false; 
        }
      }
    }

  }

}