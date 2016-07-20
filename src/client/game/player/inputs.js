
export class PlayerInputs {

  constructor(game, player) {
    this.player = player;
    this.game = game;

    player.inputs = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),

      fire: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      interact: game.input.keyboard.addKey(Phaser.Keyboard.E),
      reload: game.input.keyboard.addKey(Phaser.Keyboard.R),
      useMedkit: game.input.keyboard.addKey(Phaser.Keyboard.H),
      setSpeed: game.input.keyboard.addKey(Phaser.Keyboard.EQUALS),
      // recall: game.input.keyboard.addKey(Phaser.Keyboard.F12),
      sprint: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),

      loadCharacter: game.input.keyboard.addKey(Phaser.Keyboard.P),
      loadTalents: game.input.keyboard.addKey(Phaser.Keyboard.N),

      weapon1: game.input.keyboard.addKey(Phaser.Keyboard.ONE),
      weapon2: game.input.keyboard.addKey(Phaser.Keyboard.TWO),
      weapon3: game.input.keyboard.addKey(Phaser.Keyboard.THREE),
      weapon4: game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
      weapon5: game.input.keyboard.addKey(Phaser.Keyboard.FIVE),
      grenade: game.input.keyboard.addKey(Phaser.Keyboard.G),

      talent1: game.input.keyboard.addKey(Phaser.Keyboard.F1),
      talent2: game.input.keyboard.addKey(Phaser.Keyboard.F2),
      talent3: game.input.keyboard.addKey(Phaser.Keyboard.F3),
      talent4: game.input.keyboard.addKey(Phaser.Keyboard.F4),
      talent5: game.input.keyboard.addKey(Phaser.Keyboard.F5)
    };

    this.setupInputs();
    this.setupMovement();
  }

  setupInputs() {
    let game = this.game;
    let player = this.player;
    let inputs = player.inputs;
    let openDialog = player.damphamlet.openDialog;

    inputs.fire.onDown.add(function() {
      if(player.alive === 1) {
        player.attack();
        player.isFireDown = true;
      }
    }, this);
    inputs.fire.onUp.add(function() {
      if(player.alive === 1) {
        player.isFireDown = false;
      }
    }, this);

    // inputs.recall.onDown.add(function() {
    //   if(player.alive == 1) {
    //     player.recall();
    //   }
    // }, this);

    inputs.sprint.onDown.add(function() {
      if(player.alive === 1) {
        player.sprint();
      }
    }, this);

    inputs.grenade.onDown.add(function() {
      if(player.alive === 1) {
        player.throwGrenade();
      }
    }, this);

    inputs.talent1.onDown.add(function() {
      if(player.alive === 1) {
        player.useFirstTalent();
      }
    }, this);

    inputs.talent2.onDown.add(function() {
      if(player.alive === 1) {
        player.useSecondTalent();
      }
    }, this);
    inputs.talent3.onDown.add(function() {
      if(player.alive === 1) {
        player.useThirdTalent();
      }
    }, this);
    inputs.talent4.onDown.add(function() {
      if(player.alive === 1) {
        player.useFourthTalent();
      }
    }, this);
    inputs.talent5.onDown.add(function() {
      if(player.alive === 1) {
        player.useFifthTalent();
      }
    }, this);

    inputs.weapon1.onDown.add(function() {
      player.switchWeapons(player.pistol);
    }, this);
    inputs.weapon2.onDown.add(() => {
      if(player.laser !== null) {
        player.switchWeapons(player.laser);
        return true;
      }
      player.writeconsole("You don't have a laser pistol yet.");
    });
    inputs.weapon3.onDown.add(() => {
      if(player.rockets !== null) {
        player.switchWeapons(player.rockets);
        return true;
      }
      player.writeconsole("You don't have a rocket launcher yet.");
    });
    inputs.weapon4.onDown.add(() => {
      if(player.assaultrifle !== null) {
        player.switchWeapons(player.assaultrifle);
        return true;
      }
      player.writeconsole("You don't have an assault rifle yet.");
    });
    inputs.weapon5.onDown.add(() => {
      if(player.shotgun !== null) {
        player.switchWeapons(player.shotgun);
        return true;
      }
      player.writeconsole("You don't have a shotgun yet.");
    });

    inputs.interact.onDown.add(function() {
      player.interact();
    }, this);

    inputs.reload.onDown.add(function() {
      player.reload();
    }, this);

    inputs.useMedkit.onDown.add(function() {
      player.useMedkit();
    }, this);

    inputs.setSpeed.onDown.add(function() {
      console.log('raise speed');
      player.changeSpeed(50);
    }, this);

    inputs.loadCharacter.onDown.add(() => {
      player.damphamlet.clickProfile();
    });

    inputs.loadTalents.onDown.add(() => {
      player.damphamlet.clickAttributes();
    });
  }


  setupMovement() {
    let player = this.player;
    let inputs = player.inputs;
    let pressStack = player.pressStack;

    inputs.up.onDown.add(function() {
      pressStack.push('up');
    }, this);
    inputs.down.onDown.add(function() {
      pressStack.push('down');
    }, this);
    inputs.left.onDown.add(function() {
      pressStack.push('left');
    }, this);
    inputs.right.onDown.add(function() {
      pressStack.push('right');
    }, this);

    inputs.up.onUp.add(function() {
      this.onUpRelease();
    }, this);
    inputs.down.onUp.add(function() {
      this.onDownRelease();
    }, this);
    inputs.left.onUp.add(function() {
      this.onLeftRelease();
    }, this);
    inputs.right.onUp.add(function() {
      this.onRightRelease();
    }, this);
  }

  onUpRelease() {
    let pressStack = this.player.pressStack;
    let i = pressStack.indexOf('up');
    pressStack.splice(i, 1);
  }
  onDownRelease() {
    let pressStack = this.player.pressStack;
    let i = pressStack.indexOf('down');
    pressStack.splice(i, 1);
  }
  onLeftRelease() {
    let pressStack = this.player.pressStack;
    let i = pressStack.indexOf('left');
    pressStack.splice(i, 1);
  }
  onRightRelease() {
    let pressStack = this.player.pressStack;
    let i = pressStack.indexOf('right');
    pressStack.splice(i, 1);
  }


}
