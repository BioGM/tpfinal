
export class level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level1' });
       
        

    }
    init() {

        this.linea = null;
        this.groundBottom = null;
        this.groundTop = null;
        this.jumpCount = 0;

        this.spikes = null;
        this.hellPlataforma = null;
        this.portalFlap = null;
        this.isFlapMode = false;
        this.portalGravity = null;
        this.portal = null;
        this.portalNoFlap = null;

        this.hellTile = null;
        this.hellPartTile = null;
        this.boxPos = null;
        this.timmer = 80;//variable del tiempo
        this.tempCounteat = 0;//para resetear las veces de aumento de tiempo
        this.aumentVel = 0;
        this.typeFood = 10;
        this.energy = null;
        this.valueEnergy = 5;


    }

    preload() {





        this.load.image('level1', '../assets/images/level1.png')
        this.load.image('manzana', '../assets/images/manzana.png')//cambiar por palta
        this.load.image('burger', '../assets/images/burger.png')
        this.load.image('pizza', '../assets/images/pizza.png')



        this.load.spritesheet('energy', '../assets/images/energia.png', { frameWidth: 586, frameHeight: 67 })



        this.load.image('linea', '../assets/images/linea.png')
        this.load.image('hellTile', '../assets/images/hell.png');
        this.load.image('hellPartTile', '../assets/images/hellParticulas.png');
        this.load.image('box', '../assets/images/box.png');
        this.load.image('rocket', '../assets/images/rocket.png');
        this.load.image('groundBottom', '../assets/images/hellGround.png');
        this.load.image('hellPlataforma', '../assets/images/hellPlataforma.png');
        this.load.image('groundTop', '../assets/images/hellTop.png');
        this.load.image('spikeBottom', '../assets/images/spikeBottom.png');
        this.load.image('spikeTop', '../assets/images/spikeTop.png');
        this.load.image('spikeSide', '../assets/images/spikeSide.png');
        this.load.image('portalFlap', '../assets/images/portalFlap.png');
        this.load.image('portalGravity', '../assets/images/portalGravity.png');
        this.load.image('portal', '../assets/images/portal.png');
        this.load.image('xob', '../assets/images/xob.png');

        /*sonidos*/
        this.load.audio('temaCastillo', '../assets/sounds/temaCastillo.mp3')

    }

    create() {
        this.cameras.main.fadeIn(500);
        this.game.sound.stopAll();
        this.hellTile = this.add.tileSprite(0, 0, 1000, 600, "hellTile");
        this.hellTile.setOrigin(0, 0);
        this.hellTile.setScrollFactor(0);

        this.hellPartTile = this.add.tileSprite(0, 0, 1000, 600, "hellPartTile");
        this.hellPartTile.setOrigin(0, 0);
        this.hellPartTile.setScrollFactor(0);

        this.temaCastillo = this.sound.add('temaCastillo');
        this.temaCastillo.play();
        this.box = this.physics.add.sprite(300, 300, 'box');
        this.linea = this.physics.add.sprite(-3, 300, 'linea')
            .setImmovable(true);
        this.physics.add.overlap(this.box, this.linea, this.gameOver, null, this);
        this.groundBottom = this.physics.add.sprite(0, 650, 'groundBottom')
            .setOrigin(0, 1)
            .setImmovable(true);
        this.groundTop = this.physics.add.sprite(0, -90, 'groundTop')
            .setOrigin(0, 0)
            .setImmovable(true);
        this.box.body.gravity.y = 4000;
        this.physics.add.collider(this.box, this.groundBottom);
        this.physics.add.collider(this.box, this.groundTop);

        //plataformas 
        this.hellPlataforma = this.physics.add.group();
        //hellPlataforma.setImmovable(true);

        for (let plataf of hellPlataformaList) {
            let positionX = 0;
            for (let i = 0; i < plataf.quantity; i++) {
                let platAux = this.hellPlataforma.create((plataf.seconds * 700) + positionX, plataf.y, 'hellPlataforma').setOrigin(0, 1);
                positionX += platAux.width;
                platAux.setImmovable(true);
            }

        }
        this.physics.add.collider(this.box, this.hellPlataforma);
        //obstacles
        this.spikes = this.physics.add.group();
        for (let spike of spikeBottomList) {
            let positionX = 0;
            for (let i = 0; i < spike.quantity; i++) {
                let spikeAux = this.spikes.create((spike.seconds * 700) + positionX, spike.y, 'spikeBottom').setOrigin(0, 1);
                positionX += spikeAux.width;
            }
        }
        for (let spike of spikeTopList) {
            let positionX = 0;
            for (let i = 0; i < spike.quantity; i++) {
                let spikeAux = this.spikes.create((spike.seconds * 700) + positionX, spike.y, 'spikeTop').setOrigin(0, 1);
                positionX += spikeAux.width;
            }
        }

        for (let spike of spikeSideList) {
            let positionY = 0;
            for (let i = 0; i < spike.quantity; i++) {
                let spikeAux = this.spikes.create((spike.seconds * 700), spike.y + positionY, 'spikeSide').setOrigin(0, 1);
                positionY += spikeAux.width;
            }
        }

        this.spikes.setVelocityX(-700);
        this.hellPlataforma.setVelocityX(-700);

        //this.physics.add.collider(this.box, this.spikes, this.gameOver, null, this)
        this.physics.add.collider(this.box, this.hellPlataforma, null, this)


        //portal
        this.portal = this.physics.add.sprite(60 * 700, 550, 'portal').setOrigin(0, 1);
        this.portal.body.velocity.x = -700;
        this.physics.add.overlap(this.box, this.portal, this.gameOver, null, this);



        this.input.on('pointerdown', this.jump, this);



        this.Time = this.add.text(790, 560, 'Time: ' + this.timmer, { fontSize: '30px', fill: '#c8fd56', fontFamily: 'Permanent Marker' });


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



        this.level1 = this.add.sprite(490, 570, 'level1')
        this.level1.scaleX = 0.3;
        this.level1.scaleY = 0.3;


        this.input.keyboard.on('keydown-SPACE', this.jump, this);


        this.energy = this.add.sprite(150, 570, 'energy').setScale(0.5)

        this.energy.setFrame(this.valueEnergy)






    }

    update() {

        this.hellTile.tilePositionX += 0.5;
        this.hellPartTile.tilePositionX += 4;
        if (this.box.body.touching.down || this.box.body.touching.up) {
            this.jumpCount = 0;
        }

        if (this.isFlapMode && this.input.activePointer.isDown) {
            this.jump();
        }
        if (this.box.body.positionX <= 10) {
            
            this.gameOver();
        }
        




        if (this.timmer > 0) {
            this.timmer -= 0.02;
        }
        this.Time.setText('Time: ' + this.timmer.toFixed(0));
       
        if (this.timmer <= 0.2 || this.valueEnergy === 0) {
            this.gameOver();
        }

        this.energy.setFrame(this.valueEnergy);

        if (this.box.body.onOverlap == false) {
                    this.temCount = 0;//no sirve
                }
    
        console.log(this.temCount)

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
        if (this.isFlapMode) {
            this.box.body.velocity.y = -800;
            return;
        }

        if (this.jumpCount >= 2) {
            return;
        }
        this.jumpCount++;
        if (this.isGravityInverted) {
            this.box.body.velocity.y = 900;
        } else {
            if (this.isFlapMode) {
                this.box.body.velocity.y = -200;
                return;
            }
            this.box.body.velocity.y = -1100;
        }


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









