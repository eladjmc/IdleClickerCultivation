export default class Interface {
  selectors = {
    lineOneText: document.querySelector(".interface_text_line_1"),
    lineTwoText: document.querySelector(".interface_text_line_2"),
    lineThreeText: document.querySelector(".interface_text_line_3"),
    lineFourText: document.querySelector(".interface_text_line_4"),
    acknowledgmentButton: document.querySelector(".acknowledged_button"),
  };
  constructor(player, battleSystem, shop) {
    this.player = player;
    this.shop = shop;
    this.battleSystem = battleSystem;
    this.resetInterface();
    this.listeners();
  }

  resetInterface() {
    this.selectors.lineOneText.innerHTML = "";
    this.selectors.lineTwoText.innerHTML = "";
    this.selectors.lineThreeText.innerHTML = "";
    this.selectors.lineFourText.innerHTML = "";
  }
  hoverTalentUpgradeButton() {
    if (this.player.isBreakthroughNeeded()) {
      return;
    }
    this.resetInterface();
    const TalentPrice = this.player.calcTalentUpgradePrice();
    const TalentLevelName = this.player.getTalentLevelName();
    this.selectors.lineOneText.innerHTML =
      "Talent can determine how much energy you can absorb through ";
    this.selectors.lineTwoText.innerHTML = "cultivation.";
    this.selectors.lineThreeText.innerHTML =
      "Current talent grade: " + TalentLevelName;
    this.selectors.lineFourText.innerHTML =
      "Upgrade cost: " + this.player.displayFixedNumber(TalentPrice);
  }

  hoverAutoClickerUpgradeButton() {
    if (this.player.isBreakthroughNeeded()) {
      return;
    }
    this.resetInterface();
    const upgradePrice = this.shop.itemList.autoClicker.price;
    this.selectors.lineOneText.innerHTML =
      this.shop.itemList.autoClicker.explanationL1;
    this.selectors.lineTwoText.innerHTML =
      this.shop.itemList.autoClicker.explanationL2 +
      this.player.displayFixedNumber(this.shop.itemList.autoClicker.dmg * 100) +
      "%";
    this.selectors.lineThreeText.innerHTML =
      "Current level: " + this.shop.itemList.autoClicker.level;
    this.selectors.lineFourText.innerHTML =
      "Upgrade cost: " + this.player.displayFixedNumber(upgradePrice);
  }

  listeners() {
    this.shopListeners();
    this.selectors.acknowledgmentButton.addEventListener("click", () => {
      this.selectors.acknowledgmentButton.style.opacity = "0";
      this.selectors.acknowledgmentButton.disabled = true;
      this.resetInterface();
    });
  }
  shopListeners() {
    //talent hover
    this.shop.selectors.upgradesButtons.talentUpgradeButton.addEventListener(
      "mouseover",
      () => {
        this.hoverTalentUpgradeButton();
      }
    );
    //talent out from hover
    this.shop.selectors.upgradesButtons.talentUpgradeButton.addEventListener(
      "mouseout",
      () => {
        if (this.player.isBreakthroughNeeded()) {
          return;
        }
        this.resetInterface();
      }
    );
    //AutoClicker hover
    this.shop.selectors.upgradesButtons.autoClickerUpgradeButton.addEventListener(
      "mouseover",
      () => {
        this.hoverAutoClickerUpgradeButton();
      }
    );
    //AutoClicker out from hover
    this.shop.selectors.upgradesButtons.autoClickerUpgradeButton.addEventListener(
      "mouseout",
      () => {
        if (this.player.isBreakthroughNeeded()) {
          return;
        }
        this.resetInterface();
      }
    );
    //scrolls hovers
    const scrolls = Object.keys(
      this.shop.selectors.cultivationTechniquesButtons
    );
    scrolls.forEach((scroll) => {
      this.shop.selectors.cultivationTechniquesButtons[scroll].addEventListener(
        "mouseover",
        () => {
          this.hoverScrollsButtons(scroll);
        }
      );
    });
    //scrolls out from hover
    scrolls.forEach((scroll) => {
      this.shop.selectors.cultivationTechniquesButtons[scroll].addEventListener(
        "mouseout",
        () => {
          if (this.player.isBreakthroughNeeded()) {
            return;
          }
          this.resetInterface();
        }
      );
    });
    //upgrade spiritStones hover
    this.shop.selectors.upgradesButtons.spiritStonesUpgradeButton.addEventListener(
      "mouseover",
      () => {
        this.hoverSpiritStonesUpgrade();
      }
    );
    //upgrade SpiritStones out from hover
    this.shop.selectors.upgradesButtons.spiritStonesUpgradeButton.addEventListener(
      "mouseout",
      () => {
        if (this.player.isBreakthroughNeeded()) {
          return;
        }
        this.resetInterface();
      }
    );
    // buy flying sword hover
  }

  hoverScrollsButtons(scroll) {
    if (this.player.isBreakthroughNeeded()) {
      return;
    }
    const lastPurchasedScroll = this.findLastPurchasedScroll(scroll);
    if (lastPurchasedScroll) {
      const line1 = this.shop.itemList[scroll].explanationL1;
      const line2 = this.shop.itemList[scroll].explanationL2;
      this.selectors.lineOneText.innerHTML = line1;
      this.selectors.lineTwoText.innerHTML = line2;
      const buyScrollPrice = this.shop.itemList[scroll].price;
      this.selectors.lineFourText.innerHTML =
        "Scroll cost: " + this.player.displayFixedNumber(buyScrollPrice);
    } else {
      this.selectors.lineOneText.innerHTML =
        "Requirements: Buying the previous scroll";
    }
  }
  findLastPurchasedScroll(currentScroll) {
    var canBuyFlag = false;
    const scrolls = Object.keys(
      this.shop.selectors.cultivationTechniquesButtons
    );
    scrolls.forEach((scroll, index) => {
      if (scroll === currentScroll) {
        if (index === 0) {
          canBuyFlag = true;
        } else if (this.shop.itemList[scrolls[index - 1]].owned === true) {
          canBuyFlag = true;
        }
      }
    });
    return canBuyFlag;
  }
  hoverSpiritStonesUpgrade() {
    this.selectors.lineOneText.innerHTML =
      this.shop.itemList.spiritStonesUpgrade.explanationL1;
    this.selectors.lineTwoText.innerHTML =
      this.shop.itemList.spiritStonesUpgrade.explanationL2;
    this.selectors.lineThreeText.innerHTML =
      "Current level: " + this.shop.itemList.spiritStonesUpgrade.level;
    this.selectors.lineFourText.innerHTML =
      "Upgrade Price: " +
      this.player.displayFixedNumber(
        this.shop.itemList.spiritStonesUpgrade.price
      );
  }
}
