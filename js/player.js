export default class Player {
  selectors = {
    header: {
      level: document.querySelector(".player_level_number"),
      realmName: document.querySelector(".realm_name"),
      realmSubLevel: document.querySelector(".realm_level_number"),
      talentLevel: document.querySelector(".talent_level"),
      spiritStonesAmount: document.querySelector(".spirit_Stones_amount"),
    },
    playerStatus: {
      breakThroughButton: document.querySelector(
        ".breakthrough_button_container"
      ),
      xpFloatText: document.querySelectorAll(".exp_gain_text"),
      powerNumberDisplay: document.querySelector(".click_power"),
      expBarFullness: document.querySelector(".cultivation_base_bar").style,
      fightExpBarFullness: document.querySelector(".power_xp_bar").style,
      exp: document.querySelector(".player_cultivation_xp_current"),
      maxExp: document.querySelector(".player_cultivation_xp_max"),
      battleExp: document.querySelector(".player_battle_xp_current"),
      maxBattleExp: document.querySelector(".player_battle_xp_max"),
    },
  };

  constructor() {
    this.xpFloatLastUsedIndex = 0;
    this.xp = 0;
    this.maxXp = 10;
    this.baseCultivationXpGain = 0.1;
    this.fightXp = 0;
    this.maxFightXp = 10;
    this.level = 1;
    this.realm = 1;
    this.spiritStones = 0;
    this.talent = 65;
    this.BaseClickPower = 0.5;
    this.itemExtraDmg = 0;
    this.itemExtraCultivationXp = 0;
    this.chanceToBreakthrough = 1;
    this.expMultiplayer = 1.4;
    this.canCultivate = true;
    this.addClickToBreakthrough();
  }
  calcExpPercentageToString(xp, maxXp) {
    var xpPercentageNumber = (xp / maxXp) * 100;
    return xpPercentageNumber + "%";
  }
  getRealmName = () => {
    var realmNameString = [
      "Apprentice",
      "Warrior",
      "Master",
      "King",
      "Emperor",
      "God",
    ];
    if (this.realm > 50) {
      return realmNameString[5];
    }
    return realmNameString[Math.floor(this.realm / 10)];
  };

  getTalentLevelName() {
    var talentNameString = [
      "Worst",
      "Bad",
      "Poor",
      "Decent",
      "Good",
      "High",
      "Extreme",
    ];
    if (this.talent >= 70) return "Extreme - 9";
    return (
      talentNameString[Math.floor(this.talent / 10)] + "-" + (this.talent % 10)
    );
  }
  calcClickPower() {
    var subRealmExtraPower = (this.realm % 10) + 1;
    var battleLevelPowerMultiplier = this.level * 0.85;
    if (this.realm % 10 === 0) {
      return (
        this.BaseClickPower * battleLevelPowerMultiplier + this.itemExtraDmg
      );
    }
    return (
      this.BaseClickPower * subRealmExtraPower * battleLevelPowerMultiplier +
      this.itemExtraDmg
    );
  }

  updateHeaderUI() {
    this.selectors.header.level.innerHTML = " " + this.level;
    this.selectors.header.realmName.innerHTML = " " + this.getRealmName() + "-";
    this.selectors.header.realmSubLevel.innerHTML = "  " + (this.realm % 10);
    if (this.realm > 59) {
      this.selectors.header.realmSubLevel.innerHTML = "  " + "S";
    }
    this.selectors.header.talentLevel.innerHTML = this.getTalentLevelName();
    this.selectors.header.spiritStonesAmount.innerHTML = (Math.round(this.spiritStones*100)/100);
  }

  updatePlayerStatusUI() {
    this.selectors.playerStatus.powerNumberDisplay.innerHTML =
      Math.round(this.calcClickPower() * 100) / 100;
    this.selectors.playerStatus.exp.innerHTML = this.xp;
    this.selectors.playerStatus.maxExp.innerHTML = this.maxXp;
    this.selectors.playerStatus.battleExp.innerHTML = Math.round(100*this.fightXp)/100;
    this.selectors.playerStatus.maxBattleExp.innerHTML = this.maxFightXp;
  }

  updateXpBars() {
    this.selectors.playerStatus.expBarFullness.width =
      this.calcExpPercentageToString(this.xp, this.maxXp);
    this.selectors.playerStatus.fightExpBarFullness.width =
      this.calcExpPercentageToString(this.fightXp, this.maxFightXp);
  }

  updateFullUI() {
    this.updateHeaderUI();
    this.updatePlayerStatusUI();
    this.updateXpBars();
  }

  calcCultivationExp() {
    var talentGradeMulti = Math.floor(this.talent / 4) + 1;
    return (
      this.baseCultivationXpGain * this.talent * talentGradeMulti +
      this.itemExtraCultivationXp
    );
  }
  showFloatXpText(xpGain) {
    this.selectors.playerStatus.xpFloatText[
      this.xpFloatLastUsedIndex
    ].innerHTML = xpGain.toFixed(2);
    this.selectors.playerStatus.xpFloatText[
      this.xpFloatLastUsedIndex
    ].style.opacity = "1";
    const lastUsedIndex = this.xpFloatLastUsedIndex;
    setTimeout(() => {
      this.selectors.playerStatus.xpFloatText[lastUsedIndex].style.opacity =
        "0";
    }, 800);
    if (
      this.xpFloatLastUsedIndex <
      this.selectors.playerStatus.xpFloatText.length - 1
    ) {
      this.xpFloatLastUsedIndex++;
    } else {
      this.xpFloatLastUsedIndex = 0;
    }
  }
  changXpMultiplier() {
    if (this.realm >= 20) {
      this.expMultiplayer = 1.15;
      if (this.realm >= 30) this.expMultiplayer = 1.1;
      if (this.realm >= 40) this.expMultiplayer = 1.05;
    }
  }

  cultivate() {
    if (this.canCultivate) {
      const xpGained = this.calcCultivationExp();
      this.showFloatXpText(xpGained);
      this.xp = Math.round((this.xp + xpGained) * 100) / 100;
      if (this.xp >= this.maxXp) {
        if (this.realm % 10 === 9) {
          this.needBreakThrough();
          this.canCultivate = false;
          return;
        }
        this.advanceRealm();
      }
      this.updateFullUI();
    }
  }

  advanceRealm() {
    if (this.realm % 10 === 9) {
      this.BaseClickPower *= 20;
      this.changXpMultiplier();
    }
    this.realm++;
    this.xp = 0;
    this.maxXp *= this.expMultiplayer;
    this.maxXp = Math.round(this.maxXp * 100) / 100;
    this.updateFullUI();
  }

  needBreakThrough() {
    this.xp = this.maxXp;
    this.updatePlayerStatusUI();
    this.updateXpBars();
    this.selectors.playerStatus.breakThroughButton.style.visibility = "visible";
    this.selectors.playerStatus.breakThroughButton.style.opacity="1";
  }

  clickedBreakthroughButton() {
    var realmUpgradeFailChance = (this.realm + 1) / 10;
    var randomizeChance = Math.floor(1 + Math.random() * 10);
    if (randomizeChance <= realmUpgradeFailChance) {
      this.xp *= (1-((this.realm + 1) / 100));
      this.updatePlayerStatusUI();
      this.updateXpBars();
      this.selectors.playerStatus.breakThroughButton.style.visibility="hidden";
      this.canCultivate = true;
    } else {
      this.selectors.playerStatus.breakThroughButton.style.visibility="hidden";
      this.advanceRealm();
      this.canCultivate = true;
      this.updateFullUI();
    }
  }
  addClickToBreakthrough(){
    this.selectors.playerStatus.breakThroughButton.addEventListener("click",()=>{
      this.clickedBreakthroughButton();
    });
  }
  winBattle(xpReward,SpiritStonesReward){
    this.rewardsBattleXp(xpReward)
    this.spiritStones+=SpiritStonesReward;
    this.updateFullUI();
  }
  rewardsBattleXp(xpReward){
    const totalXp=xpReward+this.fightXp;
    if(totalXp>=this.maxFightXp){
      this.fightXp=0;
      this.level++;
      this.maxFightXp*=2;
    }
    else{
      this.fightXp=totalXp;
    }
  }
}
