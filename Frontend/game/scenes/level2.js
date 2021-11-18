
export class level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });
       
        

    }
    init() {

      


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
       
        this.load.image('box', '../assets/box.png');
        this.load.image('groundTop', '../assets/hellTop.png');
        this.load.image('spikeTop', '../assets/spikeTop.png');
        this.load.image('spikeSide', '../assets/spikeSide.png');
        /*sonidos*/
        this.load.audio('temaCastillo', '../sounds/temaCastillo.mp3')





        this.load.image('level2', '../assets/images/level1.png')
        this.load.image('manzana', '../assets/images/manzana.png')//cambiar por palta
        this.load.image('burger', '../assets/images/burger.png')
        this.load.image('pizza', '../assets/images/pizza.png')



        this.load.spritesheet('energy', '../assets/images/energia.png', { frameWidth: 586, frameHeight: 67 })



    }

    create() {
        this.cameras.main.fadeIn(500);
        



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


