import Phaser from 'phaser'; 

export class Item {
	
	constructor(game, x, y, spritename) { 
		let item = game.add.sprite(x, y, spritename);  
	    item.scale.setTo(game.scalemultiple / 2);
	    item.smoothed = false; 
	    game.physics.p2.enable(item);	       
	    
	    item.body.setCircle(5);
	    item.body.setCollisionGroup(game.itemCollisionGroup);    	    
	    item.body.fixedRotation = true; 	    

	    this.item = item; 
	}

	getItem() { 
		return this.item; 
	}	

	destroy() {
		this.item.destroy();
	}
} 
  