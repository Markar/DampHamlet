import Phaser from 'phaser';
import {Item} from './item';

export class BulletAmmo extends Item {

    constructor(game, x, y) {
        super(game, x, y, 'item-44');
        this.item = super.getItem();
        this.game = game;
        this.item.quantity = game.rnd.between(1, 5) * 6;
        this.item.body.collides(game.playerCollisionGroup, this.pickup, this);
    }

    pickup(body1, body2) {
        body2.sprite.addAmmo(this.item.quantity);
        super.destroy();
    }


}