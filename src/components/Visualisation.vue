<template>
  <div>
    <b-jumbotron header="Graphs">
      <b-button class="ml-2" variant="success" @click="$router.push({ name: 'product-page'} )">
        <b-icon icon="arrow-left-square"></b-icon>Product Overview</b-button>
        <b-button variant="dark" to="/"><b-icon icon="house-fill"></b-icon>Home</b-button> 
    </b-jumbotron>
    <b-container fluid v-if="product">
      <b-row>
        {{ info }}
      </b-row>
      <!-- <b-row cols="3">
        <LineChart :chart-data="lineData"></LineChart>
      </b-row> -->
      <b-row>
        <BarChart :chart-data="barData"></BarChart>
      </b-row>
      <!-- <b-row cols="3">
        <RadarChart :chart-data="radarData"></RadarChart>
      </b-row> -->
    </b-container>
    <b-spinner v-else variant="success" label="loading"></b-spinner>
  </div>
</template>

<script>
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import RadarChart from "./charts/RadarChart";
import axios from "axios";

export default {
  name: 'visualisation',
  components: {
    // LineChart,
    BarChart,
    // RadarChart
  },
  data() {
    return {
      barData: {},
      lineData: {},
      radarData: {},
      product: null,
      info: "",
    }
  },
  async mounted() {
    await this.getProductData();
    this.fillData();
  },
  methods: {
    async getProductData() {
      const response = await axios.get(`http://localhost:5000/api/${this.$route.params.store}/${this.$route.params.id}`);
      this.product = response.data;
    },
    fillData() {
      // this.lineData = {
      //   labels: [this.getRandomInt(), this.getRandomInt()],
      //   datasets: [
      //     {
      //       label: this.product.name,
      //       backgroundColor: '#f87979',
      //       data: [this.getRandomInt(), this.getRandomInt()],
      //     },
      //     {
      //       label: 'Data Two',
      //       backgroundColor: '#00f233',
      //       data: [this.getRandomInt(), this.getRandomInt()],
      //     },
      //   ],
      // };
      this.barData = {
        labels: [this.product.name].concat(this.product.alternatives.map((alternative) => (alternative.name))), // [this.product.name, this.product.alternatives[0].name, this.product.alternatives[1].name, this.product.alternatives[2].name, this.product.alternatives[3].name, this.product.alternatives[4].name],
        datasets: [
          {
            label: "C02 Emission - Product vs Alternatives" ,
            data: [this.product.co2.shipping].concat(this.product.alternatives.map((alternative) => (alternative.co2.shipping))), //[this.product.co2.shipping, this.product.alternatives[0].co2.shipping, this.product.alternatives[1].co2.shipping, this.product.alternatives[2].co2.shipping, this.product.alternatives[3].co2.shipping, this.product.alternatives[4].co2.shipping],
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
      // this.radarData = {
      //   labels: [
      //     'Eating',
      //     'Drinking',
      //     'Sleeping',
      //     'Designing',
      //     'Coding'
      //   ],
      //   datasets: [{
      //     label: 'This Product',
      //     data: [65, 59, 90, 81, 56],
      //     fill: true,
      //     backgroundColor: 'rgba(255, 99, 132, 0.2)',
      //     borderColor: 'rgb(255, 99, 132)',
      //     pointBackgroundColor: 'rgb(255, 99, 132)',
      //     pointBorderColor: '#fff',
      //     pointHoverBackgroundColor: '#fff',
      //     pointHoverBorderColor: 'rgb(255, 99, 132)'
      //   }, {
      //     label: 'Alternative Product',
      //     data: [28, 48, 40, 19, 96],
      //     fill: true,
      //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
      //     borderColor: 'rgb(54, 162, 235)',
      //     pointBackgroundColor: 'rgb(54, 162, 235)',
      //     pointBorderColor: '#fff',
      //     pointHoverBackgroundColor: '#fff',
      //     pointHoverBorderColor: 'rgb(54, 162, 235)'
      //   }]
      // };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style scoped>
</style>