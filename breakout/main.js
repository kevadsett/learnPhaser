var main = {
	preload: function() {
		game.load.image('paddle', 'assets/paddle.png');
		game.load.image('brick', 'assets/brick.png');
		game.load.image('ball', 'assets/ball.png');
	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.cursor = game.input.keyboard.createCursorKeys();
		this.paddle = game.add.sprite(200, 400, 'paddle');
		game.physics.arcade.enable(this.paddle);
		this.paddle.body.immovable = true;
		this.paddle.body.collideWorldBounds = true;

		this.bricks = game.add.group();
		this.bricks.enableBody = true;

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				game.add.sprite(55 + i * 60, 55 + j * 35, 'brick', 0,  this.bricks);
			}
		}

		this.bricks.setAll('body.immovable', true);

		this.ball = game.add.sprite(200, 300, 'ball');
		game.physics.arcade.enable(this.ball);
		this.ball.body.velocity.x = Math.floor(Math.random() * 400) - 200;
		this.ball.body.velocity.y = Math.floor(Math.random() * 400);
		this.ball.body.collideWorldBounds = true;
		this.ball.body.bounce.x = 1;
		this.ball.body.bounce.y = 1;
	},
	update: function() {
		if (this.cursor.right.isDown) {
			this.paddle.body.velocity.x = 350;
		} else if (this.cursor.left.isDown) {
			this.paddle.body.velocity.x = -350;
		} else {
			this.paddle.body.velocity.x = 0;
		}

		game.physics.arcade.collide(this.paddle, this.ball);
		game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

		if (this.ball.y + this.ball.height >= game.height) {
			game.state.start('main');
		}
	},
	hit: function(ball, brick) {
		brick.kill();
	}
};

var game = new Phaser.Game(400, 450, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.start('main');