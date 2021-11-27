import Player from "./player.js";
import BattleSystem from "./battleSystem.js";
export default class Game {
  constructor() {
    this.player = new Player();
    this.battleSystem = new BattleSystem(this.player);
    this.player.updateFullUI();
    this.cultivationTimeInterval();
    this.battleSystem.clickOnMonster();
  }
  cultivationTimeInterval() {
    setInterval(() => this.player.cultivate(), 500);
  }

}
