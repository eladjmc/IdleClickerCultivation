export default class Player {
  selectors = {
    header: {
      level: document.querySelector(".player_level_number"),
      realmName: document.querySelector(".realm_name"),
      realmSubLevel: document.querySelector(".realm_level_number"),
      talentLevel: document.querySelector(".talent_level"),
      spiritStonesAmount: document.querySelector(".spirit_Stones_amount"),
      upgradeTalentButton: document.querySelector(".upgrade_talent_button"),
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
    interFaceOverWrite: {
      lineOneText: document.querySelector(".interface_text_line_1"),
      lineTwoText: document.querySelector(".interface_text_line_2"),
      lineThreeText: document.querySelector(".interface_text_line_3"),
      lineFourText: document.querySelector(".interface_text_line_4"),
      acknowledgmentButton: document.querySelector(".acknowledged_button"),
    },
  };
  BIG_NUMBER_SYMBOLS = ["", "k", "m", "B", "T", "Q", "P"];

  constructor() {
    this.selectors.interFaceOverWrite.acknowledgmentButton.disabled = true;
    this.xpFloatLastUsedIndex = 0;
    this.xp = 0;
    this.maxXp = 10;
    this.baseCultivationXpGain = 0.1;
    this.fightXp = 0;
    this.maxFightXp = 10;
    this.level = 1;
    this.realm = 1;
    this.spiritStones = 1000000;
    this.talent = 1;
    this.BaseClickPower = 0.5;
    this.itemExtraDmg = 0;
    this.itemExtraCultivationXp = 0;
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
    this.selectors.header.spiritStonesAmount.innerHTML =
      this.displayFixedNumber(this.spiritStones);
  }

  updatePlayerStatusUI() {
    this.selectors.playerStatus.powerNumberDisplay.innerHTML =this.displayFixedNumber(this.calcClickPower())
    this.selectors.playerStatus.exp.innerHTML = this.displayFixedNumber(this.xp);
    this.selectors.playerStatus.maxExp.innerHTML = this.displayFixedNumber(this.maxXp);
    this.selectors.playerStatus.battleExp.innerHTML =
      this.displayFixedNumber(this.fightXp);
    this.selectors.playerStatus.maxBattleExp.innerHTML = this.displayFixedNumber(this.maxFightXp);
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
    this.selectors.playerStatus.breakThroughButton.style.opacity = "1";
    this.setInterfaceOnBrakeThroughExplanation();
  }

  clickedBreakthroughButton() {
    var realmUpgradeFailChance = (this.realm + 1) / 10;
    var randomizeChance = Math.floor(1 + Math.random() * 10);
    if (randomizeChance <= realmUpgradeFailChance) {
      this.xp *= 1 - (this.realm + 1) / 100;
      this.updatePlayerStatusUI();
      this.updateXpBars();
      this.InterfaceDisplayFailToBreakthrough();
      this.selectors.playerStatus.breakThroughButton.style.visibility =
        "hidden";
      this.canCultivate = true;
    } else {
      this.selectors.playerStatus.breakThroughButton.style.visibility =
        "hidden";
      this.advanceRealm();
      this.canCultivate = true;
      this.updateFullUI();
    }
  }
  addClickToBreakthrough() {
    this.selectors.playerStatus.breakThroughButton.addEventListener(
      "click",
      () => {
        this.clearInterface();
        this.clickedBreakthroughButton();
      }
    );
  }
  winBattle(xpReward, SpiritStonesReward) {
    this.rewardsBattleXp(xpReward);
    this.spiritStones += SpiritStonesReward;
    this.updateFullUI();
  }
  rewardsBattleXp(xpReward) {
    const totalXp = xpReward + this.fightXp;
    if (totalXp >= this.maxFightXp) {
      this.fightXp = 0;
      this.level++;
      this.maxFightXp *= 2;
    } else {
      this.fightXp = totalXp;
    }
  }
  clickUpgradeTalentButton() {
    this.selectors.header.upgradeTalentButton.addEventListener("click", () => {
      if (this.spiritStones >= this.calcTalentUpgradePrice()) {
        this.spiritStones -= this.calcTalentUpgradePrice();
        this.talent++;
        this.updateHeaderUI();
      }
    });
  }
  calcTalentUpgradePrice() {
    return Math.pow(this.talent + this.talent / 100, 1.3) * 100;
  }
  isBreakthroughNeeded() {
    return !this.selectors.interFaceOverWrite.acknowledgmentButton.disabled;
  }
  setInterfaceOnBrakeThroughExplanation() {
    this.selectors.interFaceOverWrite.lineOneText.innerHTML =
      "You are at the pick of the " + this.getRealmName() + " realm!";
    this.selectors.interFaceOverWrite.lineTwoText.innerHTML =
      "Try to Breakthrough by pressing the green button";
    this.selectors.interFaceOverWrite.lineThreeText.innerHTML =
      "Your success rate of breaking through is: " + (99 - this.realm) + "%";
    this.selectors.interFaceOverWrite.lineFourText.innerHTML =
      "Failing will disperse " +
      (this.realm + 1) +
      "% of your current cultivation base!";
    this.selectors.interFaceOverWrite.acknowledgmentButton.style.opacity = "1";
    this.selectors.interFaceOverWrite.acknowledgmentButton.disabled = false;
  }
  clearInterface() {
    this.selectors.interFaceOverWrite.lineOneText.innerHTML = "";
    this.selectors.interFaceOverWrite.lineTwoText.innerHTML = "";
    this.selectors.interFaceOverWrite.lineThreeText.innerHTML = "";
    this.selectors.interFaceOverWrite.lineFourText.innerHTML = "";
    this.selectors.interFaceOverWrite.acknowledgmentButton.style.opacity = "0";
    this.selectors.interFaceOverWrite.acknowledgmentButton.disabled = true;
  }
  InterfaceDisplayFailToBreakthrough() {
    this.clearInterface();
    this.selectors.interFaceOverWrite.lineOneText.innerHTML = "Failed";
  }

  displayFixedNumber(number) {
    // what tier? (determines  number symbol)
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a suffix but still fix the number itself
    if (tier == 0){
      return number.toFixed(number.toFixed(1).slice(-1)!=0? 1 :undefined);
     }

    // get suffix and determine scale
    const suffix = this.BIG_NUMBER_SYMBOLS[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    if (scaled.toFixed(2).slice(-1) == "0") {
      if (scaled.toFixed(1).slice(-1) == "0") {
       return scaled.toFixed() + suffix;
      }
      return scaled.toFixed(1) + suffix;
    } else {
      return scaled.toFixed(2) + suffix;
    }
  }
}
