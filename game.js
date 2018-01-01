var enemyAudio;
var coinsAudio;
var jumpAudio;

var player;
var map;
var groundLayer;
var cursors;
var bglayer;
var water;
var score = 0; 
var scoreString = '';
var livesString = '';
var scoreText;
var livesText;
var coinsLayer;
var enemyBullet;
var coins;
var lives = 3;
var enemies;
var level = 1;
var levelText;
var levelString = '';
var canJump;
var decorLayer;
var enemy;



var Game = {

    
    preload: function() {
      
   
},

create: function(){
       
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0, 0, 1920, 560);
        //bglayer = game.add.sprite(10, 1, 'player'); 
        game.stage.backgroundColor = "#4488AA";
        
        map = game.add.tilemap('map');
        map.addTilesetImage('tile','tile');
        
       // map.addTilesetImage('coin','coin');
        
        //tileset, key, tileWidth, tileHeight, tileMargin, tileSpacing, gid
        //map.addTilesetImage('terrain');
        
       
       // water = map.createLayer('RedWater');         
       bglayer = map.createLayer('Background');   
       decorLayer = map.createLayer('Decor');
        groundLayer = map.createLayer('Obstacles');      
         map.setCollisionBetween(1, 100000, true, 'Obstacles');
         bglayer.resizeWorld();

    enemies = game.add.physicsGroup();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;    
    map.createFromObjects('Enemy', 'enemy', 'enemy', 0, true, false, enemies);
    enemies.callAll('animations.add', 'animations', 'run', [0, 1, 2], 10, true);
    enemies.callAll('animations.play', 'animations', 'run');

    enemies.forEach(function(enemy){
       //enemy =game.add.sprite(100,200, 'enemy')       
       //enemy.anchor.set(0.5);
       //enemy.body.setSize(29, 32);
       enemy.scale.set(0.8);
       //enemy.body.collideWorldBounds = true;
       //game.physics.arcade.collide(enemy, groundLayer);   
       //enemy.body.moves = false;
       //enemy.body.immovable = true;   
       //enemy.animations.add('walk', [9, 10, 11], 10, true,true); 
       // enemy.play('walk');
      //game.physics.p2.enable(enemy);       
      // enemy.body.collides(player)
       });


       coins = game.add.physicsGroup();
       coins.enableBody = true;
       coins.physicsBodyType = Phaser.Physics.ARCADE;
       
//  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group

       map.createFromObjects('Gold', 'gold', 'coin', 0, true, false, coins);
       //coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2], 10, true);
       //coins.callAll('animations.play', 'animations', 'spin');
 
       coins.forEach(function(coin){
        //6fps
        //coin.animations.add('rotate', [ 0, 1, 2, 3, 4, 5, 6, 7, 1], 6, true);
        //coin.play('rotate');
        coin.scale.set(0.4);
      //coin.body.moves = false;
       //coin.body.immovable = true;
    //coin.body.collideWorldBounds = true;
  }); 

//10,1 position of sprite
        player = game.add.sprite(0, 0, 'player', 4); 
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        //20 distance between
      //player.body.setSize(29, 32, 11, 10);
        player.scale.set(0.66);
         //size 32
      //4 in number in row, starting from 0
//10 speed of animation
        player.animations.add('left', [1, 5, 9, 13], 10, false,true);
        player.animations.add('right', [3, 7, 11, 15], 10, false,true);

        game.camera.follow(player);      
        cursors = game.input.keyboard.createCursorKeys();


        game.physics.arcade.gravity.y = 300;  
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });
        scoreText.fixedToCamera = true;
        livesString = 'Lives : ';
        livesText = game.add.text(200, 10, livesString + lives, { font: '34px Arial', fill: '#fff' });
        livesText.fixedToCamera = true;
        levelString = 'Level : ';
   levelText = game.add.text(400, 10, levelString + level, { font: '34px Arial', fill: '#fff' });
   levelText.fixedToCamera = true;
   
   

   jumpAudio = game.add.audio('jump');
   coinsAudio = game.add.audio('coinsPlus');
  enemyAudio = game.add.audio('enemyS')

    },

   
    update: function(){
        game.physics.arcade.collide(enemies, groundLayer);
        game.physics.arcade.collide(coins, groundLayer);             
    game.physics.arcade.collide(player, groundLayer);
    game.physics.arcade.overlap(player, coins, this.collectCoin, null, this);
    game.physics.arcade.overlap(player, enemies, this.livesMinus, null, this);
    
    
    player.body.velocity.x = 0;
    
    if (cursors.up.isDown)
    {
         canJump = player.body.onFloor();
       
            if (canJump) {
                jumpAudio.play();
                player.body.velocity.y = -500;   
            }
    }
  
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
        player.animations.play('left');        
        
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
        player.animations.play('right');
        
    }
},


collectCoin: function (player, coin) {
    coinsAudio.play();
    coin.kill();
    score += 1;
    scoreText.text = scoreString + score;
        
    
    },

    livesMinus: function (player, enemy){

        if(enemy.body.touching.up && player.body.touching.down){
            
                            // in this case enemey is killed
                            enemy.kill();
                        }
                        else{

        if (lives > 1){
            enemy.kill();
            enemyAudio.play();
            lives -= 1;
            livesText.text = livesString + lives;

                    }
        
        else if (lives == 1){    
            console.log('audio')  
            lives -= 1;            
            player.kill();
            console.log('player killed')
           var deadText =  game.add.text(400, 10,'YOU ARE DEAD')  
            deadText.fixedToCamera = true; 
            console.log('started a game over')
this.newGame();
                }
            }
               

    },

    newGame: function(){
        console.log('game over call')
        
        this.state.start('GameOver');
        


    },

     render: function() {
        
            // game.debug.text(game.time.physicsElapsed, 32, 32);
            game.debug.body(player);
            game.debug.bodyInfo(player, 16, 500);
        
        }

};

