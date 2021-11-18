export class levelComplete extends Phaser.Scene {
    constructor() {
      super({ key: 'levelComplete' });
    }
  
    preload() {
      this.load.image('completed', '../assets/images/levelComplete.png');
    }
    
    create() {
        this.completedBackground = this.image.add(500, 500, 'completed');
    }

    update() {
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.scene.start('¿menu?'); /* Aun no se implementa el menu o pantalla de pausa */
            },
            loop: false
        })
    }
  }