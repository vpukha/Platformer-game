var Menu = {};

Menu.preload = function(){
    // load the fonts here for use in the different game states
    game.load.bitmapFont('gameover', 'assets/fonts/gameover.png', 'assets/fonts/gameover.fnt');
    game.load.bitmapFont('videogame', 'assets/fonts/videogame.png', 'assets/fonts/videogame.fnt'); // converted from ttf using http://kvazars.com/littera/
    game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
    game.load.spritesheet('button', 'assets/blueSheet.png', 190, 49);
    game.load.audio('music','assets/sound/tetris.mp3'); // load music now so it's loaded by the time the game starts
};

var text;
var button;
var x = 32;
var y = 80;


Menu.create = function(){
    var welcome = game.add.bitmapText(game.world.centerX, 100, 'gameover', 'WELCOME TO CZU GAME',32);
    welcome.anchor.setTo(0.5);
    //listening for each of these events from Phaser.Loader

    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);

    button = game.add.button(game.world.centerX, 400, 'button', startLoading, this, 4, 5, 6);
    button.anchor.setTo(0.5);
    text = game.add.text(32, 32, 'Click to start load', { fill: '#ffffff' });
    
};


function startLoading() {
    
        game.load.start();
        button.visible = false;
    
    }
    
    function loadStart() {
        
            text.setText("Loading ...");
        
        }

        function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
            
                text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
            
        }
            function loadComplete() {
            
                text.setText("Load Complete");
                game.state.start('Game');
                        }


Menu.shutdown = function(){
}
