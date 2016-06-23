export class Misson {
  constructor() {
    console.log('compose mission');
    window['mission'] = this;
    this.missions = [];
  }

  acceptMission(event) {
    let key = event.target.getAttribute('data-value');
    let player = damphamlet.phasergame.playerone;
    let destination = player.destinations.get(key);

    //set the mission instance on the player to active, so we know what to display
    let mission = player.missionlog.getByKey(key);
    mission.active = true; 

    window['travel'].destinations.push(destination);

    player.writeconsole(`${destination.name} has been added to your ship's navigation system. Return to me once you've completed your task.`);
    damphamlet.closeMenu();

  }

  addMission(mission) {
    this.missions.push(mission); 

  }

}
