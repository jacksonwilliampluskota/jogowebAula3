window.addEventListener('load', body_onload);

function body_onload() {
    var principalState = {
        preload: function () {
            game.load.image('haduken', 'assets/player.png');
        },

        create: function () {
            this.sprite = game.add.sprite(200, 161, 'haduken');
        },
        update: function () {
            this.sprite.angle += 1;
        }
    };

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
    game.state.add('principal', principalState);
    game.state.start('principal');
}
