window.addEventListener('load', body_onload);

function body_onload() {
    var principalState = {
        preload: function () {
            jogo.load.spritesheet('player', 'assets/player2.png', 20, 20);
            jogo.load.image('wallV', 'assets/wallVertical.png');
            jogo.load.image('wallH', 'assets/wallHorizontal.png');

            // moeda
            jogo.load.image('coin', 'assets/coin.png');
            // enemy
            jogo.load.image('inimigo', 'assets/enemy.png');
        },

        create: function () {
            this.jogador = jogo.add.sprite(jogo.width * 0.5, jogo.height * 0.5, 'player');
            // configurar o pivo no centro do personagem
            this.jogador.anchor.setTo(0.5, 0.5);

            jogo.physics.arcade.enable(this.jogador);
            this.jogador.body.gravity.y = 500;

            this.cursor = jogo.input.keyboard.createCursorKeys();

            //moeda
            this.moeda = jogo.add.sprite(60, 148, 'coin');
            this.moeda.anchor.setTo(0.5, 0.5);
            jogo.physics.arcade.enable(this.moeda);

            this.pontuacaoLabel = jogo.add.text(30, 30, 'pontos: 0',
                { font: '18px Arial', fill: '#fff' });

            this.pontuacao = 0;

            this.updatePontuacao();

            this.criarMundo();
        },
        updatePontuacao: function () {
            this.pontuacaoLabel.text = 'pontos: ' + this.pontuacao;
        },
        update: function () {
            jogo.physics.arcade.collide(this.jogador, this.paredes);

            jogo.physics.arcade.overlap(this.jogador, this.moeda, this.pegarMoeda,
                null, // função extra de processo
                this); // contexto
            this.jogador.animations.add('direita', [1, 2], 8, true);
            this.jogador.animations.add('esquerda', [3, 4], 8, true);

            this.moverJogador();

            if (!this.jogador.inWorld) {
                //this.reiniciar();
                this.jogador.y = 0;
            }
        },
        reiniciar: function () {
            jogo.state.start('principal');
        },
        moverJogador: function () {
            if (this.cursor.left.isDown){
                this.jogador.body.velocity.x = -200;
                this.jogador.animations.play('esquerda');
            }

            else if (this.cursor.right.isDown){
                this.jogador.body.velocity.x = 200;
                this.jogador.animations.play('direita');
            }
            else
                this.jogador.body.velocity.x = 0;

            if (this.cursor.up.isDown && this.jogador.body.touching.down) {
                this.jogador.body.velocity.y = -320;
            }
        },

        criarMundo: function () {
            //criar um grupo e ligar física
            this.paredes = jogo.add.group();
            this.paredes.enableBody = true;

            // add as paredes no grupo
            jogo.add.sprite(0, 0, 'wallV', 0, this.paredes);
            jogo.add.sprite(480, 0, 'wallV', 0, this.paredes);

            jogo.add.sprite(0, 0, 'wallH', 0, this.paredes);
            jogo.add.sprite(300, 0, 'wallH', 0, this.paredes);
            jogo.add.sprite(0, 320, 'wallH', 0, this.paredes);
            jogo.add.sprite(300, 320, 'wallH', 0, this.paredes);

            jogo.add.sprite(-100, 160, 'wallH', 0, this.paredes);
            jogo.add.sprite(400, 160, 'wallH', 0, this.paredes);

            var cima = jogo.add.sprite(100, 80, 'wallH', 0, this.paredes);

            //redimisionar x=150%, y=100&%
            cima.scale.setTo(1.5, 1);

            var baixo = jogo.add.sprite(100, 240, 'wallH', 0, this.paredes);
            baixo.scale.setTo(1.5, 1);

            // immovable
            this.paredes.setAll('body.immovable', true);
        },

        pegarMoeda: function () {
            this.moeda.kill();
            this.pontuacao += 5;
            this.updatePontuacao();
            this.atualizarPosicaoMoeda();
        },

        atualizarPosicaoMoeda: function () {
            var posicoes = [{ x: 140, y: 60 }, { x: 360, y: 60 },
                            { x: 60, y: 140 }, { x: 440, y: 140 },
                            { x: 130, y: 300 }, { x: 370, y: 300 },];
            for (var i = 0; i < posicoes.length; i++) {
                if (posicoes[i].x == this.moeda.x) {
                    posicoes.splice(i, 1);
                    break;
                }
            }
            var novaPosicao = jogo.rnd.pick(posicoes);
            this.moeda.reset(novaPosicao.x, novaPosicao.y);
        },
    };

    var jogo = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
    jogo.state.add('principal', principalState);
    jogo.state.start('principal');
}
