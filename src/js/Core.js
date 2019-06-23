import Game from './Game/Game';
import Ui from './Ui/Ui';

class Core {
  constructor() {
    new Game();
    new Ui();
  }
}

new Core();
