import Phaser from 'phaser'; 
import {Item} from './item';

export class Grenade extends Item {

  constructor(game, x, y) {
    super(game, x, y, 'item-93');        
    this.item = super.getItem();         
    this.game = game;               
    this.item.damage = 5; 
    this.item.body.collides(game.playerCollisionGroup, this.pickup, this);       
  }

  pickup(body1, body2) { 
    body2.sprite.hp += this.item.health; 	
    $('.health').text(body2.sprite.hp);
  	super.destroy();
  }
  

}