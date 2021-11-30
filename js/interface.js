export default class Interface {
  selectors = {
    lineOneText: document.querySelector(".interface_text_line_1"),
    lineTwoText: document.querySelector(".interface_text_line_2"),
    lineThreeText: document.querySelector(".interface_text_line_3"),
    lineFourText: document.querySelector(".interface_text_line_4"),
    acknowledgmentButton: document.querySelector(".acknowledged_button"),
  };
  constructor(player, battleSystem) {
    this.player = player;
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
    this.selectors.lineOneText.innerHTML = "Talent grade: " + TalentLevelName;
    this.selectors.lineTwoText.innerHTML =
    "Price to upgrade: " + TalentPrice.toFixed(1) + " SpiritStones.";
  }
  listeners() {
    this.player.selectors.header.upgradeTalentButton.addEventListener(
      "mouseover",
      () => {
        this.hoverTalentUpgradeButton();
      }
      );
      this.player.selectors.header.upgradeTalentButton.addEventListener(
        "mouseout",()=>{
          if (this.player.isBreakthroughNeeded()) {
            return;
          }
          this.resetInterface();
        });
        this.selectors.acknowledgmentButton.addEventListener("click",()=>{
          this.selectors.acknowledgmentButton.style.opacity="0";
          this.selectors.acknowledgmentButton.disabled=true;
          this.resetInterface();
        });
      }
    }
    