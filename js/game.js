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
  // clickOnMonster() {
  //   this.battleSystem.selectors.monsterPic.addEventListener("click", () => {
  //     if(this.attackSidePic){
  //     this.battleSystem.selectors.slashOne.style.visibility = "visible";
  //     }
  //     else{
  //     this.battleSystem.selectors.slashTwo.style.visibility = "visible";
  //     }
  //     setTimeout(() => {
  //       this.battleSystem.selectors.slashOne.style.visibility = "hidden";
  //       this.battleSystem.selectors.slashTwo.style.visibility = "hidden";
  //     }, 50);
  //     this.attackSidePic=!this.attackSidePic;
  //     this.dmgMonster();
  //   });
  // }
}
