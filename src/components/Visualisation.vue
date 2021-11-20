<template>
  <div>
    <b-jumbotron header="Graphs">
      <b-btn variant="dark" to="/">Home</b-btn>
    </b-jumbotron>

    <LineChart :chart-data="lineData"></LineChart>
  </div>
</template>

<script>
import LineChart from "./charts/LineChart";

export default {
  name: 'visualisation',
  components: { LineChart },
  data() {
    return {
      lineData: null,
    }
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.lineData = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: 'Data Two',
            backgroundColor: '#00f233',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style scoped>

</style>
