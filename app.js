const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },

  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    useSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },

  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = Math.floor(Math.random() * (12 - 5)) + 5;
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      console.log(this.currentRound);
    },
    attackPlayer() {
      const attackValue = Math.floor(Math.random() * (15 - 8)) + 8;
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      const attackValue = Math.floor(Math.random() * (25 - 10)) + 10;
      this.monsterHealth -= attackValue;
      this.attackMonster();
    },
  },
});

app.mount("#game");
