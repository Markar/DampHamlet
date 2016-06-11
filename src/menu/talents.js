export class Talents {
  constructor() {

  }
  
  raisePistolSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raisePistolSkill();
  }
  
  raiseAssaultSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raiseAssaultSkill();
  }
  
  raiseHealthSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raiseHealthSkill();
  }
  
  raiseExplosivesSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raiseExplosivesSkill();
  }
  
  raiseSpeedSkill() { 
    let player = damphamlet.phasergame.playerone;
    player.levels.raiseSpeedSkill();
  }
}
