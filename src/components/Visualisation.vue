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
        <b-col>
          <BarChart :chart-data="barData"></BarChart>
        </b-col>
        <b-col>
          <b-row>
            <b-button size="sm" v-on:click="currentGraph = 'alternativeOne'">Alternative 1</b-button>
            <b-button size="sm" v-on:click="currentGraph = 'alternativeTwo'">Alternative 2</b-button>
            <b-button size="sm" v-on:click="currentGraph = 'alternativeThree'">Alternative 3</b-button>
            <b-button size="sm" v-on:click="currentGraph = 'alternativeFour'">Alternative 4</b-button>
          </b-row>
          <b-row>
            <div v-if="currentGraph=='alternativeOne'">
              <RadarChart :chart-data="radarData1"></RadarChart>
            </div>
            <div v-if="currentGraph=='alternativeTwo'">
              <RadarChart :chart-data="radarData2"></RadarChart>
            </div>
            <div v-if="currentGraph=='alternativeThree'">
              <RadarChart :chart-data="radarData3"></RadarChart>
            </div>
            <div v-if="currentGraph=='alternativeFour'">
              <RadarChart :chart-data="radarData4"></RadarChart>
            </div>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-spinner v-else variant="success" label="loading"></b-spinner>
  </div>
</template>

<script>
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import RadarChart from "./charts/RadarChart";
import { getProduct } from "../app/api";
import axios from "axios";

export default {
  name: 'visualisation',
  components: {
    // LineChart,
    BarChart,
    RadarChart
  },
  data() {
    return {
      barData: {},
      lineData: {},
      radarData1: {},
      radarData2: {},
      product: null,
      currentGraph: "alternativeOne",
      info: "",
    }
  },
  async mounted() {
    this.product = await getProduct(
      this.$route.params.store,
      this.$route.params.id
    );
    this.fillData();
  },
  methods: {
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
      this.radarData1 = {
        labels: [
          'C02 Emitted in Production',
          'C02 Emitted in Shipping',
          'Energy Consumption in Production',
          'Energy Consumption in Shipping',
          'Waste'
        ],
        datasets: [{
          label: this.product.name,
          data: [this.product.co2.production, this.product.co2.shipping, this.product.energy.production, this.product.energy.shipping, this.product.waste],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: this.product.alternatives[0].name,
          data: [this.product.alternatives[0].co2.production, this.product.alternatives[0].co2.shipping, this.product.alternatives[0].energy.production, this.product.alternatives[0].energy.shipping, this.product.alternatives[0].waste],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
      this.radarData2 = {
        labels: [
          'C02 Emitted in Production',
          'C02 Emitted in Shipping',
          'Energy Consumption in Production',
          'Energy Consumption in Shipping',
          'Waste'
        ],
        datasets: [{
          label: this.product.name,
          data: [this.product.co2.production, this.product.co2.shipping, this.product.energy.production, this.product.energy.shipping, this.product.waste],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: this.product.alternatives[1].name,
          data: [this.product.alternatives[1].co2.production, this.product.alternatives[1].co2.shipping, this.product.alternatives[1].energy.production, this.product.alternatives[1].energy.shipping, this.product.alternatives[1].waste],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
      this.radarData3 = {
        labels: [
          'C02 Emitted in Production',
          'C02 Emitted in Shipping',
          'Energy Consumption in Production',
          'Energy Consumption in Shipping',
          'Waste'
        ],
        datasets: [{
          label: this.product.name,
          data: [this.product.co2.production, this.product.co2.shipping, this.product.energy.production, this.product.energy.shipping, this.product.waste],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: this.product.alternatives[2].name,
          data: [this.product.alternatives[2].co2.production, this.product.alternatives[2].co2.shipping, this.product.alternatives[2].energy.production, this.product.alternatives[2].energy.shipping, this.product.alternatives[2].waste],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
      this.radarData4 = {
        labels: [
          'C02 Emitted in Production',
          'C02 Emitted in Shipping',
          'Energy Consumption in Production',
          'Energy Consumption in Shipping',
          'Waste'
        ],
        datasets: [{
          label: this.product.name,
          data: [this.product.co2.production, this.product.co2.shipping, this.product.energy.production, this.product.energy.shipping, this.product.waste],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: this.product.alternatives[3].name,
          data: [this.product.alternatives[3].co2.production, this.product.alternatives[3].co2.shipping, this.product.alternatives[3].energy.production, this.product.alternatives[3].energy.shipping, this.product.alternatives[3].waste],
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
</style>