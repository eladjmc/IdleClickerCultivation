import Player from "./player.js";
import BattleSystem from "./battleSystem.js";
import Interface from "./interface.js";
export default class Game {
  constructor() {
    this.player = new Player();
    this.battleSystem = new BattleSystem(this.player);
    this.Interface = new Interface(this.player, this.battleSystem); // will also get items
    this.player.updateFullUI();
    this.cultivationTimeInterval();
    this.battleSystem.clickOnMonster();
    this.battleSystem.clickNextStage();
    this.battleSystem.clickPerviousStage();
    this.player.clickUpgradeTalentButton();
  }
  cultivationTimeInterval() {
    setInterval(() => this.player.cultivate(), 500);
  }
}
