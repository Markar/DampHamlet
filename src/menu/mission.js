export class Misson {
  constructor() {
    console.log('compose mission');
  }

  acceptMission(event) { 
    let key = event.target.getAttribute('value')
    let player = damphamlet.phasergame.playerone;
    let destination = player.destinations.get(key); 
    window['travel'].destinations.push(destination);

    player.writeconsole( `${destination.name} has been added to your ship's navigation system. Return to me once you've completed your task.`);
    damphamlet.closeMenu();
    
  }
  
}
