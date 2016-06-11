import Phaser from 'phaser'; 

export class MobFactory {

	constructor(game) {
		this.game = game;  
	}

	generate(game, mob, count) { 

		for(var i = 0; i < 1; i++) {        
	        let start = this.getRandomStart(); 

	        let mob = new (mob, game, start[0], start[1]);
	        game.eyes.push(eye);
    	}
	}

	getRandomStart() {
		let x = (Math.random() * (game.width - 200) + 100); 
		let y = (Math.random() * (game.height - 200) + 100); 
		return [x, y]; 
	}
	

}
