export default class Monster {
  constructor(hp) {
    this.hp = hp;
    this.maxHp = hp;
    this.battleXpReward = 0;
    this.spiritStonesReward = hp * 0.01;
  }
  setBattleXPreward(increasedBy) {
    this.battleXpReward += increasedBy * 0.5;
  }

  receiveDmg(dmgAmount) {
    if (this.hp <= dmgAmount) {
      this.hp = 0;
      return 0;
    }
    this.hp -= dmgAmount;
    return Math.round(this.hp * 100) / 100;
  }

  isDead() {
    if (this.hp === 0) {
      return true;
    }
    return false;
  }
  calcHpPercentageLeft() {
    if (this.hp <= 0) {
      return 0;
    }
    return Math.round(((this.hp * 100) / this.maxHp) * 100) / 100;
  }
}
