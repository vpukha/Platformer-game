var game;

// Create a new game instance 800 wide and 600 tall:
//game = new Phaser.Game(800, 600, Phaser.AUTO, '');

testExp = new RegExp('Android|webOS|iPhone|iPad|' +
'BlackBerry|Windows Phone|'  +
'Opera Mini|IEMobile|Mobile' , 
'i');
//if mobile device
if (testExp.test(navigator.userAgent)){
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');
    console.log('mobile')
    




}
else {
    //laptop device
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
    console.log('laptop')
    }

//game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameArea');
// First parameter is how our state will be called.
// Second parameter is an object containing the needed methods for state functionality
game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);
game.state.start('Boot');
