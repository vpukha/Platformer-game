var Boot = {
    
        preload : function() {
            // Load all the needed resources for the menu.
            //game.load.image('logo', './assets/czuLogo.png');                                
            game.load.image('preloadBar', './assets/loading.png');     
             //  37x45 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load
               
            game.load.image('start', './assets/start.png');            
        },
    
        create: function () {
    
            // Add menu screen.
            // It will act as a button to start the game.
            var style = { font: "bold 32px Arial", fill: "#fff"};
           // this.add.sprite(100,100, 'logo');
            this.stage.backgroundColor =  "#4488AA";
            this.add.text(game.world.centerX - 180, 90, "WELCOME TO CZU GAME", style);          
            this.add.button(game.world.centerX - 150 , 300, 'start', this.loading, this);
        },
    
        loading: function () {
            console.log('fucntion loading');
            
            // Change the state to the actual game.
            this.state.start('Preload');
    
        }
    
    };
    