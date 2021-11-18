import { intro } from './scenes/intro.js';
import { startScreen } from './scenes/startScreen.js';
import { menu } from './scenes/menu.js';
import { levels } from './scenes/levels.js';
import { level1} from './scenes/level1.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1000,
  height: 600,
  scene: [/*intro, startScreen, menu, levels,*/ level1],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}


var game = new Phaser.Game(config);