
/*-----------------CASTILLO-----------------*/
export class level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });



    }
    init() {

        this.box = null;
        this.linea = null;
        this.castleGround = null;
        this.groundTop = null;
        this.jumpCount = 0;
        this.spikes = null;
        this.castlePlataformas = null;
        //this.isFlapMode = false;

        this.puertaCastle = null;
        this.castleTile = null;
        this.columnasTile = null;
        this.boxPos = null;


        this.timmer = 80;//variable del tiempo
        this.tempCounteat = 0;//para resetear las veces de aumento de tiempo
        this.aumentVel = 0;
        this.typeFood = 10;
        this.energy = null;
        this.valueEnergy = 5;


    }

    preload() {


        this.load.image('linea', '/assets/images/levels/linea.png')
        this.load.image('castleTile', '/assets/images/level2/castle.png');
        this.load.image('columnasTile', '/assets/images/level2/columnas.png');
        this.load.image('castleGround', '/assets/images/level2/castleGround.png');
        this.load.image('castlePlataforma', '/assets/images/level2/castlePlataforma.png');
        this.load.image('spikeBottomCastle', '/assets/images/level2/spikeBottomCastle.png');
        this.load.image('puertaCastle', '/assets/images/level2/puertaCastle.png');
        this.load.image('level2', '/assets/images/level2/level2.png')


        this.load.image('box', '/assets/images/levels/box.png');
        this.load.image('groundTop', '/assets/images/levels/Top.png');

        this.load.image('spikeSide', '/assets/images/levels/spikeSide.png');
        /*sonidos*/
        this.load.audio('temaCastillo', '/assets/sounds/temaCastillo.mp3')


        /*------comidas---------*/
        this.load.image('manzana', '/assets/images/food/manzana.png')//cambiar por palta
        this.load.image('burger', '/assets/images/food/burger.png')
        this.load.image('pizza', '/assets/images/food/pizza.png')



        this.load.spritesheet('energy', '/assets/images/interface/energia.png', { frameWidth: 586, frameHeight: 67 })



    }

    create() {
        this.cameras.main.fadeIn(500);
        this.game.sound.stopAll();
        this.castleTile = this.add.tileSprite(0, 0, 1000, 600, "castleTile");
        this.castleTile.setOrigin(0, 0);
        this.castleTile.setScrollFactor(0);

        this.columnasTile = this.add.tileSprite(0, 0, 1000, 600, "columnasTile");
        this.columnasTile.setOrigin(0, 0);
        this.columnasTile.setScrollFactor(0);

        this.temaCastillo = this.sound.add('temaCastillo');
        this.temaCastillo.play();
        this.box = this.physics.add.sprite(300, 300, 'box');
        this.linea = this.physics.add.sprite(-3, 300, 'linea')
            .setImmovable(true);
        this.physics.add.overlap(this.box, this.linea, this.gameOver, null, this);
        this.castleGround = this.physics.add.sprite(0, 650, 'castleGround')
            .setOrigin(0, 1)
            .setImmovable(true);
        this.groundTop = this.physics.add.sprite(0, -90, 'groundTop')
            .setOrigin(0, 0)
            .setImmovable(true);
        this.box.body.gravity.y = 4000;
        this.physics.add.collider(this.box, this.castleGround);
        this.physics.add.collider(this.box, this.groundTop);

        //plataformas 
        this.castlePlataforma = this.physics.add.group();
        //castlePlataforma.setImmovable(true);

        for (let plataf of castlePlataformaList2) {
            let positionX = 0;
            for (let i = 0; i < plataf.quantity; i++) {
                let platAux = this.castlePlataforma.create((plataf.seconds * 700) + positionX, plataf.y, 'castlePlataforma').setOrigin(0, 1);
                positionX += platAux.width;
                platAux.setImmovable(true);
            }

        }
        this.physics.add.collider(this.box, this.castlePlataforma);
        //obstacles
        this.spikes = this.physics.add.group();
        for (let spike of spikeBottomCastleList2) {
            let positionX = 0;
            for (let i = 0; i < spike.quantity; i++) {
                let spikeAux = this.spikes.create((spike.seconds * 700) + positionX, spike.y, 'spikeBottomCastle').setOrigin(0, 1);
                positionX += spikeAux.width;
            }
        }
        // for (let spike of spikeTopList2) {
        //     let positionX = 0;
        //     for (let i = 0; i < spike.quantity; i++) {
        //         let spikeAux = this.spikes.create((spike.seconds * 700) + positionX, spike.y, 'spikeTop').setOrigin(0, 1);
        //         positionX += spikeAux.width;
        //     }
        // }

        for (let spike of spikeSideList2) {
            let positionY = 0;
            for (let i = 0; i < spike.quantity; i++) {
                let spikeAux = this.spikes.create((spike.seconds * 700), spike.y + positionY, 'spikeSide').setOrigin(0, 1);
                positionY += spikeAux.width;
            }
        }

        this.spikes.setVelocityX(-700);
        this.castlePlataforma.setVelocityX(-700);

        //this.physics.add.collider(this.box, this.spikes, this.gameOver, null, this)
        this.physics.add.collider(this.box, this.castlePlataforma, null, this)


        //puertaCastle
        this.puertaCastle = this.physics.add.sprite(60 * 700, 550, 'puertaCastle').setOrigin(0, 1);
        this.puertaCastle.body.velocity.x = -700;
        this.physics.add.overlap(this.box, this.puertaCastle, this.win, null, this);


        this.input.on('pointerdown', this.jump, this);







        this.Time = this.add.text(790, 560, 'Time: ' + this.timmer, { fontSize: '30px', fill: '#c8fd56',stroke:'#000000' ,strokeThickness:3, fontFamily: 'Permanent Marker' });


        // this.spikes = this.physics.add.group();

        // this.crear_objetos(this.spikes, spikeUno, 'spikeUno');






        this.goodFoods = this.physics.add.group();

        this.crear_food(this.goodFoods, paltaList, 'manzana');

        this.goodFoods.setVelocityX(-700);


        this.physics.add.overlap(this.box, this.goodFoods, this.plustemp, null, this)

        this.badFoods = this.physics.add.group();

        this.crear_badfood(this.badFoods, burgerList, 'burger');
        this.crear_badfood(this.badFoods, pizzaList, 'pizza');

        this.badFoods.setVelocityX(-700);

        this.physics.add.overlap(this.box, this.badFoods, this.resttemp, null, this)



        this.level2 = this.add.sprite(490, 570, 'level2')
        this.level2.scaleX = 0.3;
        this.level2.scaleY = 0.3;


        this.input.keyboard.on('keydown-SPACE', this.jump, this);


        this.energy = this.add.sprite(150, 570, 'energy').setScale(0.5)

        this.energy.setFrame(this.valueEnergy)






    }

    update() {
        this.castleTile.tilePositionX += 0.5;
        this.columnasTile.tilePositionX += 4;
        if (this.box.body.touching.down || this.box.body.touching.up) {
            this.jumpCount = 0;
        }

      
        if (this.box.body.positionX <= 10) {
            
            this.gameOver();
        }
        

        if (this.timmer > 0) {
            this.timmer -= 0.02;
        }
        this.Time.setText('Time: ' + this.timmer.toFixed(0));
        if (this.timmer<=40 && this.timmer>20) {
            this.Time.setColor(  '#f57c16')
        }else if (this.timmer<=20) {
            this.Time.setColor(  '#e62020')
        }else(
            this.Time.setColor(  '#c8fd56')
        )
        

        if (this.timmer <= 0.2 || this.valueEnergy === 0) {
            this.gameOver();
        }

        this.energy.setFrame(this.valueEnergy);

        if (this.box.body.onOverlap == false) {
            this.temCount = 0;//no sirve
        }

        

    }

    crear_objetos(names, list, src) {
        if (src = 'spikeUno') {
            for (let name of list) {
                let positionX = 0;
                for (let i = 0; i < name.quantity; i++) {

                    let nameAux = names.create((name.seconds * 700) + positionX, name.y, src).setOrigin(0, 1).setImmovable(true).setScale(0.2, 0.1);
                    positionX += nameAux.width * 0.2;

                }
            }
        }

    }



    crear_food(foods, lista, srce) {

        for (let name of lista) {
            let positionX = 0;
            for (let i = 0; i < name.quantity; i++) {

                let nameAux = foods.create((name.seconds * 700) + positionX, name.y, srce).setOrigin(0, 1).setImmovable(true).setScale(0.25);
                positionX += nameAux.width;

            }
        }


    }

    crear_badfood(foods, lista, srce) {

        for (let name of lista) {
            let positionX = 0;
            for (let i = 0; i < name.quantity; i++) {

                let nameAux = foods.create((name.seconds * 700) + positionX, name.y, srce).setOrigin(0, 1).setImmovable(true).setScale(0.2);
                positionX += nameAux.width;

            }
        }


    }

    plustemp(box, goodFood) {

        this.contTempo();
        if (this.tempCounteat >= 1) {
            return;
        }
        if (this.valueEnergy < 5) {
            this.valueEnergy += 1
        }
        this.timmer += this.typeFood;
        goodFood.disableBody(true, true);

    }

    contTempo() {
        this.tempCounteat++;
        if (this.tempCounteat >= 9) {
            this.tempCounteat = 0;
        }
    }


    resttemp(box, badFood) {

        this.contTempo();
        if (this.tempCounteat >= 1) {
            return;
        }
        this.valueEnergy -= 1;
        this.timmer -= this.typeFood;
        badFood.disableBody(true, true);

    }

    jump() {


        // if (this.isFlapMode) {
        //     this.box.body.velocity.y = -800;
        //     return;
        // }

        if (this.jumpCount >= 2) {
            return;
        }
        this.jumpCount++;
        this.box.body.velocity.y = -1100;
        // if (this.isGravityInverted) {
        //     this.box.body.velocity.y = 900;
        // } else {
        //     if (this.isFlapMode) {
        //         this.box.body.velocity.y = -200;
        //         return;
        //     }
        //     this.box.body.velocity.y = -1100;
        // }

    }

    win(){
        this.time.addEvent({
            delay: 700,
            callback: () => {
                this.scene.start('levelComplete');
            },
            loop: false
        })

    }







    gameOver() {
        this.temaCastillo.stop();
        this.physics.pause();
        this.box.visible = false;


        this.time.addEvent({
            delay: 200,
            callback: () => {
                this.scene.restart();
            },
            loop: false
        })
    }
}


