export default class Monster {
  selectors = {monsterPicture:document.querySelector("#monster_pic"),
}
  constructor(hp) {
    this.hp = hp;
    this.maxHp = hp;
    this.battleXpReward = 0;
    this.spiritStonesReward = hp * 0.01;
    this.generateMonsterPicture();
  }
  setBattleXPreward(increasedBy) {
    this.battleXpReward += increasedBy * 0.5;
  }
  generateMonsterPicture(){
    const monsterID = (Math.floor(Math.random() * 11)+1);
    this.selectors.monsterPicture.src="./resources/monsters/monster_"+monsterID+".png"
    this.selectors.monsterPicture.style.opacity="0";
    setTimeout(()=>{
      this.selectors.monsterPicture.style.opacity="1";
    },200);
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
      this.selectors.monsterPicture.style.opacity="0";
      setTimeout(()=>{
        this.selectors.monsterPicture.style.opacity="1";
      },100);
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
