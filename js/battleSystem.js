import Monster from "./monster.js";
export default class BattleSystem {
  selectors = {
    slashOne: document.querySelector("#slash_1"),
    slashTwo: document.querySelector("#slash_2"),
    monsterPic: document.querySelector("#monster_pic"),
    battleXpRewardText: document.querySelector(".xp_reward_text_container"),
    spiritStonesRewardText: document.querySelector(
      ".spirit_stones_reward_text_container"
    ),
    monstersHpBar: document.querySelector(".hp_bar"),
    monsterCurrentHpText: document.querySelector(".hp_current"),
    monsterMaxHpText: document.querySelector(".hp_max"),
    nextStageButton: document.querySelector(".stage_next_button"),
    previousStageButton: document.querySelector(".stage_back_button"),
    stageText: document.querySelector("#current_stage_text"),
  };

  constructor(player) {
    this.attackSidePic = true;
    this.player = player;
    this.stage = 1;
    this.maxStage=1;
    this.createBattle();
  }

  clickOnMonster() {
    this.selectors.monsterPic.addEventListener("click", () => {
      if (this.attackSidePic) {
        this.selectors.slashOne.style.visibility = "visible";
      } else {
        this.selectors.slashTwo.style.visibility = "visible";
      }
      setTimeout(() => {
        this.selectors.slashOne.style.visibility = "hidden";
        this.selectors.slashTwo.style.visibility = "hidden";
      }, 50);
      this.attackSidePic = !this.attackSidePic;
      this.dmgMonster();
    });
  }
  clickNextStage(){
    this.selectors.nextStageButton.addEventListener("click", ()=> {
      if(this.stage<this.maxStage){
        this.stage++;
        this.createBattle();
        this.selectors.stageText.innerHTML=this.stage;
        if(this.stage===this.maxStage){
          this.selectors.nextStageButton.disabled=true;
          this.selectors.nextStageButton.style.opacity="0";
        }
      }
      if(this.stage<this.maxStage){
        this.selectors.nextStageButton.disabled=false;
        this.selectors.nextStageButton.style.opacity="1";
      }
      if(this.stage>1){
        this.selectors.previousStageButton.style.opacity="1";
        this.selectors.previousStageButton.disabled=false;
      }
    });
  }
  clickPerviousStage(){
    this.selectors.previousStageButton.addEventListener("click", ()=> {
      if(this.stage>1){
        this.stage--;
        this.createBattle();
        this.selectors.stageText.innerHTML=this.stage;
        if(this.stage===1){
          this.selectors.nextStageButton.disabled=true;
          this.selectors.previousStageButton.style.opacity="0";
        }
        if(this.stage<this.maxStage){
          this.selectors.nextStageButton.disabled=false;
          this.selectors.nextStageButton.style.opacity="1";
        }
      }

    });
  }

  createBattle() {
    this.monster = new Monster(this.calcHpForMonster());
    this.selectors.monsterMaxHpText.innerHTML =
      Math.round(this.monster.maxHp * 100) / 100;
    this.selectors.monsterCurrentHpText.innerHTML =
      Math.round(this.monster.hp * 100) / 100;
    this.selectors.monstersHpBar.style.width="100%";
    this.monster.setBattleXPreward(this.stage * 10);
  }

  calcHpForMonster() {
    return this.stage * 10;
  }

  rewardPlayer() {
    this.player.spiritStones += this.monster.spiritStonesReward;
  }

  dmgMonster() {
    const hpLeft = this.monster.receiveDmg(this.player.calcClickPower());
    this.selectors.monsterCurrentHpText.innerHTML = hpLeft;
    this.selectors.monstersHpBar.style.width =
      this.monster.calcHpPercentageLeft() + "%";
    if(this.monster.isDead()){
      this.winBattle();
    }
  }
  winBattle(){
    this.player.winBattle(this.monster.battleXpReward,this.monster.spiritStonesReward);
    this.createBattle();
    if(this.stage===this.maxStage){
      this.maxStage++;
      this.selectors.nextStageButton.style.opacity="1";
      this.selectors.nextStageButton.disabled=false;
    }
  }
}
