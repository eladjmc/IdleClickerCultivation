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
    autoAdvanceButton: document.querySelector(".auto_advance"),
  };
  autoAdvanceActive = false;
  autoAdvanceInterval;

  constructor(player) {
    this.attackSidePic = true;
    this.player = player;
    this.stage = 1;
    this.maxStage = 1;

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



  clickNextStage() {
    this.selectors.nextStageButton.addEventListener("click", () => {
      this.nextStageButtonLogic();
    });


  }
  clickPerviousStage() {
    this.selectors.previousStageButton.addEventListener("click", () => {
      if (this.stage > 1) {
        this.stage--;
        clearInterval(this.autoAdvanceInterval);
        this.selectors.autoAdvanceButton.style.color = "black";
        this.createBattle();
        this.selectors.stageText.innerHTML = this.stage;
        if (this.stage === 1) {
          this.selectors.nextStageButton.disabled = true;
          this.selectors.previousStageButton.style.opacity = "0";
        }
        if (this.stage < this.maxStage) {
          this.selectors.nextStageButton.disabled = false;
          this.selectors.nextStageButton.style.opacity = "1";
        }
      }
    });
  }
  nextStageButtonLogic(){
    if (this.stage < this.maxStage) {
      this.stage++;
      this.createBattle();
      this.selectors.stageText.innerHTML = this.stage;
      if (this.stage === this.maxStage) {
        this.selectors.nextStageButton.disabled = true;
        this.selectors.nextStageButton.style.opacity = "0";
      }
    }
    if (this.stage < this.maxStage) {
      this.selectors.nextStageButton.disabled = false;
      this.selectors.nextStageButton.style.opacity = "1";
    }
    if (this.stage > 1) {
      this.selectors.previousStageButton.style.opacity = "1";
      this.selectors.previousStageButton.disabled = false;
    }
  }

  createBattle() {
    this.monster = new Monster(this.calcHpForMonster());
    this.selectors.monsterMaxHpText.innerHTML = this.player.displayFixedNumber(
      this.monster.maxHp
    );
    this.selectors.monsterCurrentHpText.innerHTML =
      this.player.displayFixedNumber(this.monster.hp);
    this.selectors.monstersHpBar.style.width = "100%";
    this.monster.setBattleXPreward(this.stage * 10);
  }


  clickAutoAdvance() {
    this.selectors.autoAdvanceButton.addEventListener("click", () => {
      this.autoAdvanceActive=!this.autoAdvanceActive;
      if (this.autoAdvanceActive) {
        this.selectors.autoAdvanceButton.style.color = "rgb(11, 253, 3)";
        this.autoAdvanceInterval = setInterval(()=>{
          this.nextStageButtonLogic();
          if(this.selectors.autoAdvanceButton.style.color == "rgb(5, 99, 2)"){
            this.selectors.autoAdvanceButton.style.color = "rgb(11, 253, 3)";
          }
          else{
          this.selectors.autoAdvanceButton.style.color = "rgb(5, 99, 2)";
          }
        }, 500);
      } 
      else {
        clearInterval(this.autoAdvanceInterval);
        this.selectors.autoAdvanceButton.style.color = "black";
      }
    });
  }

  calcHpForMonster() {
    return Math.pow(this.stage, 1.4) * 10;
  }

  rewardPlayer() {
    this.player.spiritStones += this.monster.spiritStonesReward;
  }

  dmgMonster() {
    const hpLeft = this.monster.receiveDmg(this.player.calcClickPower());
    this.selectors.monsterCurrentHpText.innerHTML =
      this.player.displayFixedNumber(hpLeft);
    this.selectors.monstersHpBar.style.width =
      this.monster.calcHpPercentageLeft() + "%";
    if (this.monster.isDead()) {
      this.winBattle();
    }
  }
  winBattle() {
    this.revealRewardTexts();
    this.player.winBattle(
      this.monster.battleXpReward,
      this.monster.spiritStonesReward
    );
    this.createBattle();
    if (this.stage === this.maxStage) {
      this.maxStage++;
      this.selectors.nextStageButton.style.opacity = "1";
      this.selectors.nextStageButton.disabled = false;
    }
  }
  randomizeRewardTextLocation() {
    this.selectors.battleXpRewardText.style.left =
      16 + Math.floor(Math.random() * 10) + "%";
    this.selectors.spiritStonesRewardText.style.right =
      16 + Math.floor(Math.random() * 10) + "%";
    this.selectors.battleXpRewardText.style.top =
      16 + Math.floor(Math.random() * 5) + "%";
    this.selectors.spiritStonesRewardText.style.top =
      16 + Math.floor(Math.random() * 5) + "%";
  }
  revealRewardTexts() {
    this.randomizeRewardTextLocation();
    this.selectors.battleXpRewardText.innerHTML =
      "XP+" + this.player.displayFixedNumber(this.monster.battleXpReward);
    this.selectors.spiritStonesRewardText.innerHTML =
      "SS+" + this.player.displayFixedNumber(this.monster.spiritStonesReward);
    this.selectors.battleXpRewardText.style.opacity = "1";
    this.selectors.spiritStonesRewardText.style.opacity = "1";
    setTimeout(() => {
      this.selectors.battleXpRewardText.style.opacity = "0";
      this.selectors.spiritStonesRewardText.style.opacity = "0";
      this.selectors.battleXpRewardText.style.left = "25%";
      this.selectors.spiritStonesRewardText.style.right = "25%";
      this.selectors.battleXpRewardText.style.top = "15%";
      this.selectors.spiritStonesRewardText.style.top = "15%";
    }, 500);
  }
}
