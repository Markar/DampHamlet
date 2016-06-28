export class Talents {
  constructor() {

  }

  //Attribtues  
  raiseHealthSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raiseHealthSkill();
  }

  raiseStaminaSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raiseStaminaSkill();
  }

  raiseConcentrationSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raiseConcentrationSkill();
  }


  //Skills
  raisePistolSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raisePistolSkill();
  }
  
  raiseAssaultSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raiseAssaultSkill();
  }
  
  raiseExplosivesSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raiseExplosivesSkill();
  }
  
  
}
