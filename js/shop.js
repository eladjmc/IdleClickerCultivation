export default class Shop {
  selectors = {
    upgradesButtons: {
      spiritStonesUpgradeButton: document.querySelector(
        ".upgrade_spirit_stones_button"
      ),
      autoClickerUpgradeButton: document.querySelector(
        ".level_up_auto_clicker_button"
      ),
      talentUpgradeButton: document.querySelector(".upgrade_talent_button"),
    },
    cultivationTechniquesButtons: {
      mortalScroll: document.querySelector(".mortal_grade_scroll_button"),
      earthScroll: document.querySelector(".earth_grade_scroll_button"),
      havenScroll: document.querySelector(".haven_grade_scroll_button"),
      divineScroll: document.querySelector(".divine_grade_scroll_button"),
    },
    magicTreasuresButtons: {
      flyingSwordBuyButton: document.querySelector(".flying_sword_buy_button"),
      berserkPillBuyButton: document.querySelector(".berserk_Pill_buy_button"),
      frenzyPotionBuyButton: document.querySelector(".flying_sword_buy_button"),
    },
  };

  itemList = {
    autoClicker: {
      price: 2000,
      level: 0,
      dmg: 0.3,
      explanationL1: "Passively damage the enemy for a certain % of your power",
      explanationL2: "every second - DPS next level: ",
    },
    spiritStonesUpgrade: {
      price: 500,
      level: 0,
      multiplier: 1,
      explanationL1: "10% increase in the amount of spirit Stones you can get,",
      explanationL2: "by selling materials for higher than market prices",
    },
    flyingSword: {
      price: 200000,
      owned: false,
      multiplier: 2,
      explanationL1: "The flying sword is a dao treasure every cultivator ",
      explanationL2: "dreams about it will double your power output",
    },
    berserkPill: {
      price: 20000,
      active: false,
      multiplier: 2,
      duration: 300000,
      explanationL1: "By consuming this pill you will gain double your",
      explanationL2: " power for a set amount of time - 5min",
    },
    frenzyPotion: {
      price: 20000,
      active: false,
      multiplier: 2,
      duration: 300000,
      explanationL1: "By consuming this pill you will gain double your",
      explanationL2: "passive dmg speed for a set amount of time - 5min",
    },
    mortalScroll: {
      price: 1000,
      owned: false,
      multiplier: 2,
      explanationL1: "A scroll containing knowledge of a cultivation technique",
      explanationL2:
        "How ever it is the lowest grade - 2x gain cultivation base",
    },
    earthScroll: {
      price: 10000,
      owned: false,
      multiplier: 3,
      explanationL1: "A scroll containing knowledge of a cultivation technique",
      explanationL2: "How ever it is a middle grade - 3x gain cultivation base",
    },
    havenScroll: {
      price: 100000,
      owned: false,
      multiplier: 5,
      explanationL1: "A scroll containing knowledge of a cultivation technique",
      explanationL2:
        "A high grade cultivation technique - 5x gain cultivation base",
    },
    divineScroll: {
      price: 1000000,
      owned: false,
      multiplier: 10,
      explanationL1: "A scroll that record a mighty cultivation technique",
      explanationL2:
        "The strongest, Divine-grade technique - 5x gain cultivation base",
    },
  };

  constructor(player) {
    this.player = player;
    this.clickBuyMortalScroll();
    this.clickUpgradeAutoClicker();
    this.clickUpgradeSpiritStones();
  }

  clickUpgradeAutoClicker() {
    this.selectors.upgradesButtons.autoClickerUpgradeButton.addEventListener(
      "click",
      () => {
        if (this.itemList.autoClicker.price <= this.player.spiritStones) {
          this.player.spiritStones -= this.itemList.autoClicker.price;
          this.player.isAutoAttacking = true;
          this.itemList.autoClicker.level++;
          this.itemList.autoClicker.price = Math.pow(
            this.itemList.autoClicker.price,
            1.2
          );

          if (this.itemList.autoClicker.level > 1) {
            this.itemList.autoClicker.dmg += 0.3;
          }
          this.player.autoClickerDmg = this.itemList.autoClicker.dmg;
          this.player.clearInterface();
        }
      }
    );
  }

  disableScrollsButtons() {
    const scrolls = Object.keys(this.selectors.cultivationTechniquesButtons);
    scrolls.forEach((scroll) => {
      if (scroll !== "mortalScroll") {
        this.selectors.cultivationTechniquesButtons[scroll].disabled = true;
      }
    });
  }

  buySpiritStoneUpgrade() {
    if (this.player.spiritStones >= this.itemList.spiritStonesUpgrade.price) {
      this.player.spiritStones -= this.itemList.spiritStonesUpgrade.price;
      this.itemList.spiritStonesUpgrade.price =
        this.itemList.spiritStonesUpgrade.price * 1.8;
      this.itemList.spiritStonesUpgrade.multiplier *= 1.1;
      this.player.spiritStonesMultiplier =
        this.itemList.spiritStonesUpgrade.multiplier;
      this.itemList.spiritStonesUpgrade.level++;
      this.player.clearInterface();
    }
  }

  clickBuyFlyingSword(){
    //TODO
  }

  buyMortalTechnique(scrollName) {
    if (this.itemList[scrollName].owned) {
      return;
    }
    if (this.itemList[scrollName].price <= this.player.spiritStones) {
      this.itemList[scrollName].owned = true;
      this.player.spiritStones -= this.itemList[scrollName].price;
      this.player.itemCultivationXpMultiplier *=
        this.itemList[scrollName].multiplier;
      this.selectors.cultivationTechniquesButtons[scrollName].innerHTML = "X";
      this.selectors.cultivationTechniquesButtons[scrollName].disabled = true;
      this.selectors.cultivationTechniquesButtons[scrollName].style.color =
        "rgb(253, 75, 253)";
      this.selectors.cultivationTechniquesButtons[
        scrollName
      ].style.backgroundColor = "rgb(29, 9, 29)";
      this.player.clearInterface();
      return;
    }
  }
  clickBuyMortalScroll() {
    this.selectors.cultivationTechniquesButtons.mortalScroll.addEventListener(
      "click",
      () => {
        this.buyMortalTechnique("mortalScroll");
        if (this.itemList["mortalScroll"].owned) {
          this.selectors.cultivationTechniquesButtons.earthScroll.disabled = false;
          this.clickBuyEarthScroll();
        }
      }
    );
  }
  clickBuyEarthScroll() {
    this.selectors.cultivationTechniquesButtons.earthScroll.addEventListener(
      "click",
      () => {
        this.buyMortalTechnique("earthScroll");
        if (this.itemList["earthScroll"].owned) {
          this.selectors.cultivationTechniquesButtons.havenScroll.disabled = false;
          this.clickBuyHavenScroll();
        }
      }
    );
  }
  clickBuyHavenScroll() {
    this.selectors.cultivationTechniquesButtons.havenScroll.addEventListener(
      "click",
      () => {
        this.buyMortalTechnique("havenScroll");
        if (this.itemList["havenScroll"].owned) {
          this.selectors.cultivationTechniquesButtons.divineScroll.disabled = false;
          this.clickBuyDivineScroll();
        }
      }
    );
  }
  clickBuyDivineScroll() {
    this.selectors.cultivationTechniquesButtons.divineScroll.addEventListener(
      "click",
      () => {
        this.buyMortalTechnique("divineScroll");
      }
    );
  }
  clickUpgradeSpiritStones() {
    this.selectors.upgradesButtons.spiritStonesUpgradeButton.addEventListener(
      "click",
      () => {
        this.buySpiritStoneUpgrade();
      }
    );
  }
  // clickBuyFlyingSword(){
  //   this.selectors.magicTreasuresButtons.flyingSwordBuyButton.addEventListener("click",()=>{
  //     this.clickBuyFlyingSword();
  //   });
  // }
}
