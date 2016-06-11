
export class LoadAssets {

  constructor(game) {
    this.game = game;

    this.loadItems();
    this.loadCharacters();
    this.loadLevels();
    this.loadSpritesheets();
    this.loadImages();
    this.loadAudio();
    console.log('finish loading assets');
  }

  loadItems() {
    //let itempath = '/assets/items/';
    let game = this.game;

    let exceptions = [6, 30, 31, 36, 49, 51, 66, 79, 96, 126, 141,
      81, 82, 83, 84, 85, 86, 87, 88, 89, 90];

    for (let i = 1; i < 150; i++){
      if (exceptions.indexOf(i) > 0 || (i == 6)) {
        continue;
      }
      game.load.image('item-' + i, this.game.itempath + 'item-' + i + '.png');
    }
  }

  loadCharacters() {
    //let characterpath = '/assets/characters/';
    let game = this.game;
    let characterpath = this.game.characterpath;

    for (let i = 1; i < 22; i++){
      let name = 'char' + i;
      let path = '';
      if (i < 10) {
        path = characterpath + 'Layer-7_0' + i + '.png';
      }
      else
        path = characterpath + 'Layer-7_' + i + '.png';

      game.load.spritesheet(name, path, 8, 8);
    }
  }
  loadLevels() {
    //let assetpath = '/assets/';
    let game = this.game;
    let assetpath = this.game.assetpath;
    //add map images
    game.load.tilemap('base', assetpath + 'base.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level1', assetpath + 'level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2', assetpath + 'level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level3', assetpath + 'level3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', assetpath + 'tiles.png');

    //game.load.spritesheet('explosion', assetpath + 'explode.png', 8, 8, 13);
  }

  loadSpritesheets() {
    let game = this.game;
    //let enemypath = '/assets/enemies/';
    //let bosspath = '/assets/Sliced/Bosses/';
    let enemypath = this.game.enemypath;
    let bosspath = this.game.bosspath;
    game.load.spritesheet('green_alien', enemypath + 'png8_03.png', 8, 8);
    game.load.spritesheet('red_alien', enemypath + 'png8_05.gif', 8, 8);
    game.load.spritesheet('octopus', enemypath + 'png8_06.png', 8, 8);
    game.load.spritesheet('slime', enemypath + 'png8_07.gif', 8, 8);
    game.load.spritesheet('rat', enemypath + 'png8_08.gif', 8, 8);
    game.load.spritesheet('teal_alien', enemypath + 'png8_09.gif', 8, 8);
    game.load.spritesheet('furry_alien', enemypath + 'png8_10.gif', 8, 8);
    game.load.spritesheet('eyeball', enemypath + 'png8_11.gif', 8, 8);
    game.load.spritesheet('spider', enemypath + 'png8_12.gif', 8, 8);
    game.load.spritesheet('dog', enemypath + 'png8_13.gif', 8, 8);
    game.load.spritesheet('zombie', enemypath + 'png8_14.gif', 8, 8);
    game.load.spritesheet('greententacle', enemypath + 'png8_15.gif', 8, 8);
    game.load.spritesheet('white_alien', enemypath + 'png8_16.gif', 8, 8);
    game.load.spritesheet('blue_alien', enemypath + 'png8_17.gif', 8, 8);
    game.load.spritesheet('blackred_alien', enemypath + 'png8_18.gif', 8, 8);
    game.load.spritesheet('plasmoid', enemypath + 'png8_19.gif', 8, 8);
    game.load.spritesheet('green_alien3', enemypath + 'png8_20.gif', 8, 8);
    game.load.spritesheet('snake', enemypath + 'png8_21.gif', 8, 8);
    game.load.spritesheet('furry_alien2', enemypath + 'png8_22.gif', 8, 8);
    game.load.spritesheet('greenchecker', enemypath + 'png8_23.gif', 8, 8);
    game.load.spritesheet('mindflayer', enemypath + 'png8_24.gif', 8, 8);
    game.load.spritesheet('psionicist', enemypath + 'png8_25.gif', 8, 8);
    game.load.spritesheet('grayrobot', enemypath + 'png8_26.gif', 8, 8);
    game.load.spritesheet('yellowrobot', enemypath + 'png8_27.gif', 8, 8);
    game.load.spritesheet('blackblob', enemypath + 'png8_29.gif', 8, 8);
    game.load.spritesheet('blackhole', bosspath + 'BlackHole.png', 32, 32);

  }

  loadImages() {
    let game = this.game;
    //let itempath = '/assets/items/';
    //let fxpath = '/assets/Sliced/fx_32x32/';
    let itempath = this.game.itempath;
    let fxpath = this.game.fxpath;

    game.load.image('explode1', fxpath + 'oryx_16bit_fantasy_fx_83.png');
    game.load.image('explode2', fxpath + 'oryx_16bit_fantasy_fx_83.png');

    game.load.image('red_shot', itempath + 'item-67.png');
    game.load.image('red_shot2', itempath + 'item-68.png');
    game.load.image('red_shot3', itempath + 'item-69.png');
    game.load.image('purple_shot', itempath + 'item-70.png');
    game.load.image('purple_shot2', itempath + 'item-71.png');
    game.load.image('purple_shot3', itempath + 'item-72.png');
  }

  loadAudio() {
    let game = this.game;
    //let soundpath = '/assets/sounds/';
    //let hurtpath = '/assets/sounds/hurt/';
    //let ambiencepath = '/assets/sounds/ambience/';
    //let fabricpath = '/assets/sounds/fabric/';
    //let footpath = '/assets/sounds/footsteps/';
    let soundpath = game.soundpath;
    let hurtpath = game.hurtpath;
    let ambiencepath = game.ambiencepath;
    let fabricpath = game.fabricpath;
    let footpath = game.footpath;

    //weapons
    game.load.audio('explosion', soundpath + 'medium-explosion.wav');
    game.load.audio('flyby-slow', soundpath + 'flyby-slow.wav');
    game.load.audio('short-assaultrifle', soundpath + 'short-assaultrifle.wav');
    game.load.audio('short-pistol', soundpath + 'short-pistol.wav');
    game.load.audio('short-reloadpistol', soundpath + 'short-reloadpistol.wav');
    game.load.audio('short-shotgun', soundpath + 'short-shotgun.wav');
    game.load.audio('shotgun1', soundpath + 'FIREARM Shotgun Model 01 Fire Single RR1 (stereo).wav');
    game.load.audio('shotgun2', soundpath + 'FIREARM Shotgun Model 01 Fire Single RR2 (stereo).wav');
    game.load.audio('shotgun3', soundpath + 'FIREARM Shotgun Model 01 Fire Single RR3 (stereo).wav');
    game.load.audio('shotgunreload', soundpath + 'RELOAD Pump Dark (stereo).wav');
    game.load.audio('short-reloadshotgun', soundpath + 'short-reloadshotgun.wav');
    game.load.audio('blaster1', soundpath + 'BLASTER Bright Piercing Pitch Down (stereo).wav');
    game.load.audio('blaster2', soundpath + 'BLASTER Bright Piercing Pitch Sweep Down (stereo).wav');
    //hurt
    game.load.audio('hurt1', hurtpath + "GROAN Male Hurt Long (mono).wav");
    game.load.audio('hurt2', hurtpath + "GROAN Male Hurt Long Pain (mono).wav");
    game.load.audio('hurt3', hurtpath + "GROAN Male Hurt Long (mono).wav");
    game.load.audio('hurt4', hurtpath + "GRUNT Male Hurt 01 (mono).wav");
    game.load.audio('hurt5', hurtpath + "GRUNT Male Hurt 02 (mono).wav");
    game.load.audio('hurt6', hurtpath + "GRUNT Male Hurt 03 (mono).wav");
    game.load.audio('hurt7', hurtpath + "GRUNT Male Quick (mono).wav");
    game.load.audio('hurt8', hurtpath + "GRUNT Male Quick Deep (mono).wav");
    game.load.audio('hurt9', hurtpath + "GRUNT Male Subtle Hurt (mono).wav");
    game.load.audio('hurt0', hurtpath + "GRUNT Male Subtle Quick (mono).wav");
    //fabric
    game.load.audio('pickup1', fabricpath + 'FABRIC Movement Fast 01 (mono).wav');
    game.load.audio('pickup2', fabricpath + 'FABRIC Movement Fast 02 (mono).wav');
    game.load.audio('pickup3', fabricpath + 'FABRIC Movement Fast 03 (mono).wav');
    //ambience
    game.load.audio('hangar1', ambiencepath + 'AMBIENCE SCI-FI Space Hangar (loop stereo).wav');
    game.load.audio('hangar2', ambiencepath + 'AMBIENCE SCI-FI Large Space Hangar Deep Smooth (loop stereo).wav');
    game.load.audio('lava-deep', ambiencepath + 'AMBIENCE SCI-FI Lava Molten Deep (loop stereo).wav');
    game.load.audio('lava-pit', ambiencepath + 'AMBIENCE SCI-FI Lava Molten Pit (loop stereo).wav');
    game.load.audio('underwater-active', ambiencepath + 'AMBIENCE UNDER WATER Active (loop stereo).wav');
    game.load.audio('underwater-deep', ambiencepath + 'AMBIENCE UNDER WATER Deep and Dark (loop stereo).wav');
    game.load.audio('forest', ambiencepath + 'AMBIENCE NATURE Summer Broadleaf Forest Wind (loop stereo).wav');
    
    //footsteps
    game.load.audio('walkmetal1', footpath + 'FOOTSTEP Run Shoes Hollow Metal RR1 (mono).wav');
    game.load.audio('walkmetal2', footpath + 'FOOTSTEP Run Shoes Hollow Metal RR2 (mono).wav');
    game.load.audio('walkmetal3', footpath + 'FOOTSTEP Run Shoes Hollow Metal RR3 (mono).wav');
    game.load.audio('walkmetal4', footpath + 'FOOTSTEP Run Shoes Hollow Metal RR4 (mono).wav');
    game.load.audio('walkmetal5', footpath + 'FOOTSTEP Run Shoes Hollow Metal RR5 (mono).wav');
    game.load.audio('walkmetal6', footpath + 'FOOTSTEP Run Shoes Hollow Metal RR6 (mono).wav');
    game.load.audio('walkmetal7', footpath + 'FOOTSTEP Run Shoes Hollow Metal RR7 (mono).wav');
    game.load.audio('walkmetal8', footpath + 'FOOTSTEP Run Shoes Hollow Metal RR8 (mono).wav');
    //doors
    game.load.audio('elevatorOpen', soundpath + 'DOOR Elevator Open 01 (mono).wav');
    game.load.audio('doorClose', soundpath + 'DOOR Sci-Fi Heavy Close (mono).wav');
  }

}
