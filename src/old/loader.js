import $ from 'jquery';

export class Loader {

  constructor() {
    var openDialog = instructionsDialog;
    var gender = '';
    var playerClass = 'Marine';

    window.onkeydown = function(event) {
      if (event.keyCode === 27) {
        if (openDialog != null) {
          openDialog.close();
          openDialog = null;
        }
        else {
          instructionsDialog.show();
          openDialog = instructionsDialog;
        }

      }
    };

    var profileDialog = document.getElementById('Profile');

    $('.profileIcon').click(function() {

      debugger;
      if (openDialog != null) {
        openDialog.close();
      }
      profileDialog.show();
      openDialog = profileDialog;
    });
    $('.closeProfile').click(function() {
      profileDialog.close();
      openDialog = null;
    });



    var talentDialog = document.getElementById('Talents');

    $('.attributesIcon').click(function() {
      if (openDialog != null) {
        openDialog.close();
      }
      talentDialog.show();
      openDialog = talentDialog;
    });
    $('.closeTalents').click(function() {
      talentDialog.close();
      openDialog = null;
    });

    var weaponsDialog = document.getElementById('Weapons');

    $('.weaponsIcon').click(function() {
      if (openDialog != null) {
        openDialog.close();
      }
      weaponsDialog.show();
      openDialog = weaponsDialog;
    });
    $('.closeWeapons').click(function() {
      weaponsDialog.close();
      openDialog = null;
    });

    var explosivesDialog = document.getElementById('Explosives');

    $('.grenadeIcon').click(function() {
      if (openDialog != null) {
        openDialog.close();
      }
      explosivesDialog.show();
      openDialog = explosivesDialog;
    });
    $('.closeExplosives').click(function() {
      explosivesDialog.close();
      openDialog = null;
    });

    var shopDialog = document.getElementById('Shop');

    $('.shopIcon').click(function() {
      if (openDialog != null) {
        openDialog.close();
      }
      shopDialog.show();
      openDialog = shopDialog;
    });
    $('.closeShop').click(function() {
      shopDialog.close();
      openDialog = null;
    });

    var instructionsDialog = document.getElementById('Instructions');

    $('.instructionsIcon').click(function() {
      if (openDialog != null) {
        openDialog.close();
      }
      instructionsDialog.show();
      openDialog = instructionsDialog;
    });
    $('.closeInstructions').click(function() {
      instructionsDialog.close();
      openDialog = null;
    });

    $('.playbutton').click(function() {
      alert('play');
      $('.creationwindow').hide();
      $('.gamePanel').show();
      window['game'].state.start('GameState');
    });

    $('.profileImg').click(function() {
      gender = this.getAttribute('gender');
      $(this).siblings().css('border', "0.25em aliceblue ridge")
      $(this).css('border', "0.25em gold ridge");
    });

    $('.classes').click(function(clicked) {
      debugger;
      playerClass = clicked.target.innerText;
      $(this).siblings().css('border', "0.25em aliceblue ridge")
      $(this).css('border', "0.25em gold ridge");

      if (playerClass == 'Mutant' || playerClass == 'Cyborg') {
        $('.console').append(`<li> ${playerClass} is coming soon.</li>`);
        playerClass = 'Marine';
      }
    });
  }

}

