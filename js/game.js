var game = new Phaser.Game(width, height, Phaser.CANVAS,'game');
 // -- criação de 5 estados do jogo
game.state.add('Instrucoes', Game.Instrucoes);
game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Play', Game.Play);
game.state.add('Over', Game.Over);
// -- inicia o estado de jogo 'Boot' 
game.state.start('Boot');