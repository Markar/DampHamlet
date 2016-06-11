import Phaser from 'phaser';
import {Item} from './item';

export class Credits extends Item {

  constructor(game, x, y, amount) {
    super(game, x, y, 'item-61');
    this.item = super.getItem();
    this.game = game;
    this.item.amount = amount;
    this.item.body.collides(game.playerCollisionGroup, this.pickup, this);
  }

  pickup(body1, body2) {
    body2.sprite.pickupCredits(this.item.amount);

    //$('.health').text(body2.sprite.hp);
    super.destroy();
  }


}