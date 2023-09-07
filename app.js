const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
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

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
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
    healPlayer() {
      this.currentRound++;
      const healValue = Math.floor(Math.random() * (20 - 8)) + 8;
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
  },
});

app.mount("#game");
