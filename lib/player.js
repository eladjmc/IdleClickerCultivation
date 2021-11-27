export default class Player {
  constructor() {
    this.hp = 50;
    this.xp = 0;
    this.fightXp = 0;
    this.level = 25;
    this.realm = 33;
    this.spiritStones = 0;
    this.talent = 43;
  }

  getRealmName = () => {
    var realmNameString = ["Apprentice", "Warrior", "Master", "King", "Emperor", "God"];

    if (this.realm > 50) {
      return realmNameString[5];
    }

    return realmNameString[Math.floor(this.realm / 10)];
  };

  getTalentLevelName() {
    var talentNameString = ["Worst", "Bad", "Poor", "Decent", "Good", "High", "Extreme"];
    if (this.talent >= 70) return "Extreme - 9";
    return talentNameString[Math.floor(this.talent / 10)] + "-" + this.talent % 10;
  }

  displayChanges() {
    //xp
    //fightXp
    document.querySelector(".player_level_number").innerHTML = " " + this.level;
    document.querySelector(".realm_name").innerHTML = " " + this.getRealmName() + "-";
    document.querySelector(".realm_level_number").innerHTML = "  " + this.realm % 10;

    if (this.realm > 59) {
      document.querySelector(".realm_level_number").innerHTML = "  " + "S";
    }

    document.querySelector(".talent_level").innerHTML = this.getTalentLevelName();
    document.querySelector(".spirit_Stones_amount").innerHTML = " " + this.spiritStones;
  }

}