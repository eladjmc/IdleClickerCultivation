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
    this.selectors.lineOneText.innerHTML ="Talent can determine how much energy you can absorb through ";
    this.selectors.lineTwoText.innerHTML ="cultivation.";
    this.selectors.lineThreeText.innerHTML = "Current talent grade: " + TalentLevelName;
    this.selectors.lineFourText.innerHTML =
      "Upgrade cost: " +
      this.player.displayFixedNumber(TalentPrice);
  }

  hoverAutoClickerUpgradeButton(){
    if (this.player.isBreakthroughNeeded()) {
      return;
    }
    this.resetInterface();
    const upgradePrice = this.shop.itemList.autoClicker.price;
    this.selectors.lineOneText.innerHTML =this.shop.itemList.autoClicker.explanationL1;
    this.selectors.lineTwoText.innerHTML =this.shop.itemList.autoClicker.explanationL2+(this.shop.itemList.autoClicker.dmg*100)+"%";
    this.selectors.lineThreeText.innerHTML = "Current level: " + this.shop.itemList.autoClicker.level;
    this.selectors.lineFourText.innerHTML =
      "Upgrade cost: " +
      this.player.displayFixedNumber(upgradePrice);
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
      this.shop.selectors.upgradesButtons.autoClickerUpgradeButton.addEventListener("mouseover",
      () => {
        this.hoverAutoClickerUpgradeButton();
      }
    );
    //AutoClicker out from hover
      this.shop.selectors.upgradesButtons.autoClickerUpgradeButton.addEventListener("mouseout",
      () => {
        if (this.player.isBreakthroughNeeded()) {
          return;
        }
        this.resetInterface();
      }
    );
  }
}
