var ready = false;
var Preload = {
  
      preload : function() {
        this.preloadBar = this.add.sprite(170, 0, 'preloadBar');
                this.load.setPreloadSprite(this.preloadBar);
                game.load.tilemap('map', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
                //game.load.image('background','assets/background.png');
                game.load.image('tile','assets/platformertiles (1).png');
              game.load.spritesheet('enemy','assets/zombie.png', 32, 48, 36);  
              game.load.spritesheet('coin','assets/coin_gold.png');  
              
               // game.load.image('kenney_16x16', 'as/kenney_16x16.png');
               // game.load.image('terrain', 'as/terrain.png');
               game.load.spritesheet('player', 'assets/george.png', 48, 48 ,12);
              // game.load.spritesheet('coin', 'as/coinsfull.png', 16, 16);
               game.load.audio('jump', 'as/jump.wav');
               game.load.audio('coinsPlus', 'as/coins.wav');
               game.load.audio('enemyS', 'as/bombs.wav');
        this.load.onLoadComplete.add(this.loadComplete, this);
        
    },
    loadComplete: function(){
       ready = true;
       console.log('this is true');
       
    },
    update: function(){
        if(ready === true) 
        {
          console.log('starting a game');
          game.scale.setShowAll();
          game.scale.refresh();
            this.state.start('Game');    
        } 
    }
  
  };
  