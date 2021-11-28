import Player from "./player.js";
import BattleSystem from "./battleSystem.js";
export default class Game {
  constructor() {
    this.player = new Player();
    this.battleSystem = new BattleSystem(this.player);
    this.player.updateFullUI();
    this.cultivationTimeInterval();
    this.battleSystem.clickOnMonster();
    this.battleSystem.clickNextStage();
    this.battleSystem.clickPerviousStage();
  }
  cultivationTimeInterval() {
    setInterval(() => this.player.cultivate(), 500);
  }

}
