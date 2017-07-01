Game.Instrucoes = function(game) {};
Game.Instrucoes.prototype = {
	
	preload: function () {
	// -- adicao uma imagem referente as instrucoes do jogo
    // -- -------------------------------------------------
    inst = game.add.sprite(40, 0, 'instrucoes');
  },
		create: function() {
		// -- botão de passagem para o estado instrucoes  e Load
		// -- --------------------------------------------------
		this.buttonContinue = this.add.button(1, 0, 'button-inst', this.startGame, this);
		this.buttonVoltar = this.add.button(1, 35, 'button-voltar', this.voltar, this);
		this.buttonContinue.input.useHandCursor= true;
	},
	startGame: function() {
		this.game.state.start('Play');
	},
		// -- implementacao da função voltar que permite voltar para o menu principal do jogo (vai para o estado Load)
		// -- --------------------------------------------------------------------------------------------------------
		voltar: function() {
		// -- inicia o estado de Load
		this.game.state.start('Load');
		// -- botão de passagem para o estado instrucoes (contem informacao do funcionamento do jogo)
		// -- ---------------------------------------------------------------------------------------
		this.buttonContinue = this.add.button(10, 10, 'button-inst', this.instrucao, this);
		this.buttonContinue.input.useHandCursor = true;
	},
	instrucao: function() {
		this.game.state.add('Instrucoes', Game.Instrucoes);
		// -- inicia o estado de Instrucoes
		this.game.state.start('Instrucoes');
	}
};