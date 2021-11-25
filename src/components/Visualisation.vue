<template>
  <div>
    <b-jumbotron header="Graphs">
      <b-btn variant="dark" to="/">Home</b-btn>
    </b-jumbotron>
    <div class="container">
      <div id="user-info">
        {{ info }}
      </div>
      <div class="columned">
        <LineChart :chart-data="lineData"></LineChart>
      </div>
      <div class="columned">
        <BarChart :chart-data="barData"></BarChart>
      </div>
      <div class="columned">
        <RadarChart :chart-data="radarData"></RadarChart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import RadarChart from "./charts/RadarChart";
import axios from "axios";

export default {
  name: 'visualisation',
  components: { LineChart, BarChart, RadarChart },
  data() {
    return {
      lineData: {},
      radarData: {},
      barData: {},
      info: "",
    }
  },
  mounted() {
    this.getProductData();
    this.fillData();
  },
  methods: {
    getProductData() {
      axios.get(`http://localhost:5000/api/${this.$route.params.store}/${this.$route.params.id}`, {
        headers: {
            "Content-Type": "application/json",
        }})
      .then(response => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
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
      this.barData = {
        labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }
        ]
      };
      this.radarData = {
        labels: [
          'Eating',
          'Drinking',
          'Sleeping',
          'Designing',
          'Coding'
        ],
        datasets: [{
          label: 'This Product',
          data: [65, 59, 90, 81, 56],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Alternative Product',
          data: [28, 48, 40, 19, 96],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style scoped>
  .small {
    max-width: 600px;
    margin: 150px auto;
  }

  .container{
    column-count: 1;
  }
  .columned{
    column-count: 3;
    column-gap: auto;
  }
</style>