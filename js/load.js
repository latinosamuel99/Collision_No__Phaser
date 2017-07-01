Game = {};

var width = 400;
var height = 600;
var points = 0;

Game.Boot  = function(game) {};

Game.Boot.prototype = {
  preload: function () {
	// -- adicionar um texto a informar o carregamento da aplicacao, antes de iniciar um jogo, e sempre que o browser for atualizado
    label = game.add.text(width / 2 , height / 2, 'Loading...', { font: '24px Lucida Console', fill: '#1F0BCE' });
    label.anchor.setTo(0.5, 0.5);
    
	// -- carregamento em memória das imagens é áudio a usar no jogo
    game.load.image('inicio', 'assets/inicio.png');
    game.load.image('fundo', 'assets/fundo.png');
    game.load.image('nave', 'assets/nave.png');
    game.load.image('obestaculo1', 'assets/obestaculo1.png');
	game.load.image('botao-pausa','assets/botao-pausa.png');
    game.load.image('obestaculo2', 'assets/obestaculo2.png');
	game.load.image('nivel','assets/nivel.png');
	game.load.audio('somColisao',['assets/audio/bounce.ogg',
				'assets/audio/bounce.mp3','assets/audio/bounce.m4a']);
	game.load.audio('fundomusica',['assets/audio/MusicaFundoo.mp3']);
	game.load.spritesheet('button-audio', 'assets/button-audio.png', 35, 35);
	game.load.image('instrucoes','assets/instrucoes.png');
	game.load.image('button-inst','assets/button-inst.png');
	game.load.image('button-voltar','assets/voltar.png');
	
  },

  create: function () {
	
	// -- inicia o estado de Load
    game.state.start('Load');
	// -- botão de passagem para o estado instrucoes (contem informacao do funcionamento do jogo)
    // -- ------------------------------------------------------------------------------------------
	this.buttonContinue = this.add.button(1, 10, 'button-inst', this.instrucao, this);
	this.buttonContinue.input.useHandCursor = true;
	
	if(this.pont= null){
		var pont =0;
	}
	else{
		// -- criacao de uma variavel para permitir guardar locamente a pontuacao do jogo
		var pont = localStorage.getItem('game');
	}
	// -- strings de texto (Pontuacao do jogo anterior, aparece sempre no painel inicial do jogo, sempre que o browser for atualizado)
    // -- ------------------------------------------------------------------------------------------------------------------------------
	label = game.add.text(49 , 240, 'Pontuacao do Jogo Anterior: '+pont+' pontos\n ',{ font: '14px Lucida Console', fill: '#FF0000', align: 'center'});
	// -- som de audio de fundo previamente carregado
	this.music = this.game.add.audio('fundomusica');
	// -- som de audio de fundo iniciado, sempre que a aplicacao for iniciada
    this.music.play();
	},
	
	instrucao: function() {
		this.game.state.add('Instrucoes', Game.Instrucoes);
		// -- inicia o estado de Instrucoes
		this.game.state.start('Instrucoes');
	}
  };

Game.Load = function(game) {};

Game.Load.prototype = {
  preload: function () {
	// -- adicao da imagem inicial da aplicacao
    // -- -------------------------------------
    inicio = game.add.sprite(0, 0, 'inicio');
  }

};

	// -- implementacao do estado do jogo "Game Over"
    // -- --------------------------------------------
Game.Over = function(game) {};

Game.Over.prototype = {
	// -- função específica do Phaser
  create: function() {
			
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		}
	};

    xhttp.open( "POST", "/phaser/Jogo/api/updateScore.php", true );
	xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send( "points=" +points);
  
	// -- armazenar localmente a pontuacao no final de um jogo (sempre que ocorrer uma colisao), no qual so aparecera, se o browser for atualizado
	localStorage.setItem('game', points);
	// -- strings de texto (Game Over e pontuacao, aparece sempre que ocorrer uma colisao com as barras) com a fonte Lucida Console
    // -- -------------------------------------------------------------------------------------------------------------------------
    label = game.add.text(width / 2 , height / 2, 'G A M E  O V E R\n\nPontuacao Total no final do Jogo:'+points+'',{ font: '18px Lucida Console', fill: '#1F0BCE', align: 'center'});
    label.anchor.setTo(0.5, 0.5);
	
	// -- botão de passagem para o estado instrucoes (contem informacao do funcionamento do jogo)
    // -- ------------------------------------------------------------------------------------------
	this.buttonVoltar = this.add.button(1, 1, 'button-voltar', this.voltar, this);
	// -- adicao de um alerta ao jogador a informar que o jogo acabou porque ocorreu uma colisao
    // -- --------------------------------------------------------------------------------------
	alert('O Jogo Terminou !');
  },
  
  // -- implementacao da função voltar que permite recomecar um jogo, no fim de o ter perdido, mudando para o estado inicial Load
  // -- -------------------------------------------------------------------------------------------------------------------------
  voltar: function() {
		//-- garantia de que a pontuacao recomeca do zero
		points=0;
		// -- inicia o estado de Load
		this.game.state.start('Load');
		this.buttonContinue = this.add.button(1, 10, 'button-inst', this.instrucao, this);
		this.buttonContinue.input.useHandCursor = true;
  },

  	// -- implementacao da funcao instrucao no qual permite que sempre que o jogador clicar sobre o botao "start", iniciara o estado "instrucao"
    // -- --------------------------------------------------------------------------------------------------------------------------------------
  instrucao: function() {
		//-- garantia de que a pontuacao recomeca do zero
		points=0;
		this.game.state.add('Instrucoes', Game.Instrucoes);
		// -- inicia o estado de Instrucoes
		this.game.state.start('Instrucoes');
	}
  
};


