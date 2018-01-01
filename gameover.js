var GameOver = {
    
        preload : function() {
           this.load.image('start', './assets/start.png');
           console.log('loading image')
        },
    
        create : function() {
            game.add.text(500, 350, " GAME OVER", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
            
            console.log('create func')
            // Create button to start game like in Menu.
            this.stage.backgroundColor =  "#4488AA";
            this.add.button(200, 100, 'start', this.startGame, this);
            console.log('button stat create')
            
            game.add.text(235, 350, "SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
            game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
    
        },
    
        startGame: function () {
    
            // Change the state back to Game.
            score = 0;
            lives = 3;
            this.state.start('Preload');
    
        }
    
    };