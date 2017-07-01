Game.Play = function(game) {};

Game.Play.prototype = {

	// -- função específica do Phaser
  create: function() {
    // criar scrolling do background
    this.fundo = game.add.tileSprite(0, 100, game.world.width, game.world.height, 'fundo');

    // criar nave
	//-----------
	// -- adiciona o objeto (nave)
    this.nave = game.add.sprite(70, 100, 'nave');
	// -- tamanho do circulo do body da nave
    // -- (para que a colisão da nave com o alvo só seja detetada quando a nave está "dentro" do circulo e colide com o alvo)
    this.nave.body.setCircle(20);
    this.nave.body.gravity.y = 700;
    this.nave.body.bounce = 0.5;
    this.nave.body.collideWorldBounds = true;
	
	// criar nivel (neste jogo somente existe um nivel)
	//-------------------------------------------------
	// -- adiciona a imagem "nivel" 
	this.nivel=this.add.sprite(150,10,'nivel');
	// -- botão de pausa do jogo e eliminacao do audio da colisao
    // -- -------------------------------------------------------
	this.pauseButton = this.game.add.sprite(0, 60, 'botao-pausa');
	this.audioStatus = true;
	this.audioButton = this.add.button(50-this.pauseButton.width-10*2, 10, 'button-audio', this.manageAudio, this);
	
	this.audioButton.input.useHandCursor = true;
	// -- alteracao do estado do botao audioButton sempre que o som e omitido e iniciado
    // -- ------------------------------------------------------------------------------
	this.audioButton.animations.add('true', [0], 10, true);
	this.audioButton.animations.add('false', [1], 10, true);
	//iniciar a animacao de mudanca de animacao do botao de audio
	this.audioButton.animations.play(this.audioStatus);
	

    // criar os obstaculos no topo de forma aleatoria
	// -- -------------------------------------------
    this.obestaculoTopo = game.add.group();
    this.obest = this.obestaculoTopo.create(this.game.world.width + Math.random() * 500, 0, 'obestaculo1');
	// -- inserir mais obstaculos no topo
    this.obest.events.onOutOfBounds.add(this.resetartTop, this);
    this.obest.body.velocity.x = -400;

    // criar os obstaculos no fundo de forma aleatoria
	// -- --------------------------------------------
    this.obBot = game.add.group();
    this.obb = this.obBot.create(this.game.world.width + Math.random() * 500, game.world.height, 'obestaculo2');
    this.obb.anchor.setTo(1,1, this);
	// -- inserir mais obstaculos no fundo 
    this.obb.events.onOutOfBounds.add(this.resetartBot, this);
    this.obb.body.velocity.x = -400;
	// -- adiciona o som de colisao
	this.somColisao=this.game.add.audio('somColisao');

    // criar 
    this.scoreText = this.game.add.text(380, 10, '', {font: "16px Lucida Console", fill: "#1F0BCE", align: "left"});
	label = game.add.text(280 , 10, 'Pontuacao: ' ,{ font: '16px Lucida Console', fill: '#1F0BCE', align: 'left'});
	label = game.add.text(5 , 580, 'Samuel Latino n 1725 - IPVC ' ,{ font: '12px Lucida Console', fill: '#FF0000', align: 'left'});

	this.pauseButton.inputEnabled = true;
	this.pauseButton.events.onInputUp.add(function () {this.game.paused = true;
	
	},this);
		// -- função adicionada que irá aguardar que seja precionado o botao de pausa
        // -- -----------------------------------------------------------------------
	  this.game.input.onDown.add(function() {
				// -- retira o estado do jogo de "paused"
				this.game.paused=false;
				
		},this);
	
  },
  		
  // -- função que permite alterar a animacao do botao de audio
  // -- -------------------------------------------------------
  manageAudio: function() {
		this.audioStatus =! this.audioStatus;
		//iniciar a animacao de mudanca de animacao do botao de audio
		this.audioButton.animations.play(this.audioStatus);
	},
  
  // -- função específica do Phaser
  // -- deteta colisões com elementos do jogo (obstaculos do topo e do fundo (barras))
  // -- ------------------------------------------------------------------------------
  update: function() {
    this.fundo.tilePosition.x += 0.1;
	// -- deteção de colisões com os limites inferior (barras inferiores)
    this.game.physics.collide(this.nave, this.obBot, this.collisonHandler,null, this);
    // -- deteção de colisões com os limites superior (barras superiores)
    this.game.physics.collide(this.nave, this.obestaculoTopo, this.collisonHandler,null, this);

    if (this.game.input.activePointer.isDown) {
      this.nave.body.velocity.y = -200;
    }
  },

  // -- implementacao da funcao collisonHandler 
  // ------------------------------------------------------------------------------------------------------------
  collisonHandler: function() {
	  
    this.nave.kill();
	if(this.audioStatus) {
	//nivel de som emitido pelas colunas
	this.somColisao.volume += 8;
    // -- inicia o som da colisao
	this.somColisao.play();
	 
	}
	// -- inicia o estado de Over (inicia um estado implementado no Load)
    game.state.start('Over');

  },

  // -- implementacao da funcao resetartTop que permite inserir mais alvos no topo sempre que for percorrido o stage
  // ------------------------------------------------------------------------------------------------------------
  resetartTop: function() {
    this.obest.reset(this.game.world.width + Math.random() * 200, 0, 'obestaculo1');
    this.obest.body.velocity.x = -400;
    this.gameScore(1);
  },

  // -- implementacao da funcao resetartBot que permite inserir mais alvos no fundo sempre que for percorrido o stage
  // -------------------------------------------------------------------------------------------------------------
  resetartBot: function() {
    this.obb.reset(this.game.world.width + Math.random() * 200, game.world.height, 'obestaculo2');
    this.obb.body.velocity.x = -400;
    this.gameScore(1);
  },

  // -- implementacao da funcao gameScore que permite gerar a pontuacao (incrementacao) sempre que o jogo for iniciado
  // -----------------------------------------------------------------------------------------------------------------
  gameScore: function(n) {
    points += n;
	// -- o texto scoreText contem o numero de pontos sempre que comeca a contagem de pontos (vai sempre incrementando)
    this.scoreText.content = points;
  },
};