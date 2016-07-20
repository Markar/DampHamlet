
export class MusicHandler {
  constructor(game) {
    this.game = game;
    this.loadSoundtracks();
  }

  loadSoundtracks() {
    this.tracks = [];

    this.hangar1 = this.game.add.audio('hangar1');
    this.hangar2 = this.game.add.audio('hangar2');
    this.lavaActive = this.game.add.audio('lava-active');
    this.lavaDeep = this.game.add.audio('lava-deep');
    this.underwaterActive = this.game.add.audio('underwater-active');
    this.underwaterDeep = this.game.add.audio('underwater-deep');
    this.forest = this.game.add.audio('forest');

    this.tracks.push(this.hangar1);
    this.tracks.push(this.hangar2);
    this.tracks.push(this.lavaActive);
    this.tracks.push(this.lavaDeep);
    this.tracks.push(this.underwaterActive);
    this.tracks.push(this.underwaterDeep);
    this.tracks.push(this.forest);
    this.setVolume(0.15, true);
  }

  setVolume(volume, loop) {
    for(let i = 0; i < this.tracks.length; i++) {
      let track = this.tracks[i];
      track.volume = volume;
      track.loop = loop;
    }
  }

  getTrack(track) {
    for(let i = 0; i < this.tracks.length; i++) {
      if(this.tracks[i].name === track) {
        return this.tracks[i];
      }
    }
    return '';
  }

  playTrack(name) {
    this.stopMusic();
    let track = this.getTrack(name);
    track.play();
    console.log('playing track ' + track.name);
  }

  stopMusic() {
    for(let i = 0; i < this.tracks.length; i++) {
      this.tracks[i].stop();
      console.log('stopping track ' + i);
    }
  }

}
