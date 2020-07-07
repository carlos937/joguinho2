import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { World } from 'matter';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'JogoComPhase';

  config: Phaser.Types.Core.GameConfig;
  phaserGame: Phaser.Game;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: window.innerHeight - 10,
      width: window.innerWidth - 10,
      scene: [MainScene],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    };
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }



}
class MainScene extends Phaser.Scene {

  public keys;
  retangle: Phaser.GameObjects.Rectangle;
  player: Phaser.GameObjects.Sprite;
  retangle2: Phaser.GameObjects.Rectangle;
  retangle3: Phaser.GameObjects.Rectangle;
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('fundo', '../assets/campodesoja.jpg');
    this.load.spritesheet('pessoa', '../assets/eu/meus frames.png', { frameWidth: 600, frameHeight: 1050 });
  }
  create() {
    this.keys = this.input.keyboard.createCursorKeys();
    this.physics.systems.start(Phaser.Physics.Arcade);

    let larguraTela = window.innerWidth * 2 - 10;
    let alturaTela = window.innerHeight * 2 - 10;

    let fundo = this.add.sprite(500, 251, 'fundo');
    fundo.displayWidth = larguraTela;
    fundo.displayHeight = alturaTela;
    fundo.setAlpha(0.5)


    this.retangle = this.add.rectangle(251, alturaTela - 630, larguraTela, 20, 222);
    this.retangle2 = this.add.rectangle(251, 170, larguraTela / 4, 20, 222);
    this.retangle3 = this.add.rectangle(larguraTela - (larguraTela / 4) * 2, 390, larguraTela / 4, 20, 222);


    let plataformaEstatica = this.physics.add.staticGroup();

    plataformaEstatica.add(this.retangle);
    plataformaEstatica.add(this.retangle2);
    plataformaEstatica.add(this.retangle3);

    this.physics.add.existing(this.retangle);
    this.physics.add.existing(this.retangle3);
    this.physics.add.existing(this.retangle2);

    (this.retangle.body as Phaser.Physics.Arcade.Body).collideWorldBounds = true;

    this.player = this.physics.add.sprite(500, 500, 'pessoa');

    this.player.setScale(0.13, 0.13)

    this.physics.world.enable(this.player);
    this.physics.world.enable(this.retangle);

    (this.player.body as Phaser.Physics.Arcade.Body).gravity.y = 300;

    (this.player.body as Phaser.Physics.Arcade.Body).bounce.y = 0.2;

    (this.player.body as Phaser.Physics.Arcade.Body).collideWorldBounds = true;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNames('pessoa', { start: 6, end: 9 }),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNames('pessoa', { start: 4, end: 5 }),
      frameRate: 2
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNames('pessoa', { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1
    });


    this.physics.add.collider(this.player, this.retangle);
    this.physics.add.collider(this.player, this.retangle2);
    this.physics.add.collider(this.player, this.retangle3);

  }
  update() {
    var cursors = this.keys;
    var player: any = this.player;

    if (cursors.left.isDown) {
      player.setVelocityX(-90);
      (this.player.body as Phaser.Physics.Arcade.Body).gravity.y = 300;
      (this.player.body as Phaser.Physics.Arcade.Body).bounce.y = 0.2;
      player.anims.play('left', true);
    }
    else if (cursors.up.isDown) {
      (this.player.body as Phaser.Physics.Arcade.Body).bounce.y = 2;
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(90);
      player.anims.play('right', true);
      (this.player.body as Phaser.Physics.Arcade.Body).gravity.y = 300;
      (this.player.body as Phaser.Physics.Arcade.Body).bounce.y = 0.2;
    }
    else {
      player.setVelocityX(0);
      (this.player.body as Phaser.Physics.Arcade.Body).gravity.y = 300;
      (this.player.body as Phaser.Physics.Arcade.Body).bounce.y = 0.2;
      player.anims.play('turn');
    }

  }
}
