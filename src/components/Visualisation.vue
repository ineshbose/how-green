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
        <b-col class="mx-auto">
          <!-- <BarChart :chart-data="barData"></BarChart> -->
          <b-row class="mx-auto">
            <b-button size="sm" v-on:click="currentBarGraph = 'metricOne'">C02 Emissions (Shipping)</b-button>
            <b-button size="sm" v-on:click="currentBarGraph = 'metricTwo'">C02 Emissions (Production)</b-button>
            <b-button size="sm" v-on:click="currentBarGraph = 'metricThree'">Energy Consumption (Shipping)</b-button>
            <b-button size="sm" v-on:click="currentBarGraph = 'metricFour'">Energy Consumption (Production)</b-button>
            <b-button size="sm" v-on:click="currentBarGraph = 'metricFive'">Waste</b-button>
          </b-row>
          <b-row class="mx-auto">
            <div v-if="currentBarGraph=='metricOne'">
              <BarChart :chart-data="barData1"></BarChart>
            </div>
            <div v-if="currentBarGraph=='metricTwo'">
              <BarChart :chart-data="barData2"></BarChart>
            </div>
            <div v-if="currentBarGraph=='metricThree'">
              <BarChart :chart-data="barData3"></BarChart>
            </div>
            <div v-if="currentBarGraph=='metricFour'">
              <BarChart :chart-data="barData4"></BarChart>
            </div>
            <div v-if="currentBarGraph=='metricFive'">
              <BarChart :chart-data="barData5"></BarChart>
            </div>
          </b-row>
        </b-col>
        <b-col class="mx-auto">
          <b-row>
            <b-button size="sm" v-on:click="currentRadarGraph = 'alternativeOne'">Alternative 1</b-button>
            <b-button size="sm" v-on:click="currentRadarGraph = 'alternativeTwo'">Alternative 2</b-button>
            <b-button size="sm" v-on:click="currentRadarGraph = 'alternativeThree'">Alternative 3</b-button>
            <b-button size="sm" v-on:click="currentRadarGraph = 'alternativeFour'">Alternative 4</b-button>
            <b-button size="sm" v-on:click="currentRadarGraph = 'alternativeFive'">Alternative 5</b-button>
          </b-row>
          <b-row>
            <div v-if="currentRadarGraph=='alternativeOne'">
              <RadarChart :chart-data="radarData1"></RadarChart>
            </div>
            <div v-if="currentRadarGraph=='alternativeTwo'">
              <RadarChart :chart-data="radarData2"></RadarChart>
            </div>
            <div v-if="currentRadarGraph=='alternativeThree'">
              <RadarChart :chart-data="radarData3"></RadarChart>
            </div>
            <div v-if="currentRadarGraph=='alternativeFour'">
              <RadarChart :chart-data="radarData4"></RadarChart>
            </div>
            <div v-if="currentRadarGraph=='alternativeFive'">
              <RadarChart :chart-data="radarData5"></RadarChart>
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
      currentRadarGraph: "alternativeOne",
      currentBarGraph: "metricOne",
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
      this.barData1 = this.getBarData("co2", "shipping", "C02 Emissions during Shipping");
      this.barData2 = this.getBarData("co2", "production", "C02 Emissions during Production");
      this.barData3 = this.getBarData("energy", "shipping", "Energy Consumption during Shipping");
      this.barData4 = this.getBarData("energy", "production", "Energy Consumption during Production");
      this.barData5 = this.getBarData("waste", "waste", "Waste Produced");

      this.radarData1 = this.getRadarData(0);
      this.radarData2 = this.getRadarData(1);
      this.radarData3 = this.getRadarData(2);
      this.radarData4 = this.getRadarData(3);
      this.radarData5 = this.getRadarData(4);
    },
    getRandomBorderColor() {
      const r = () => Math.floor(256 * Math.random());

      return `rgba(${r()}, ${r()}, ${r()}, 0.5)`;
    },
    getRandomColor() {
      const r = () => Math.floor(256 * Math.random());

      return `rgb(${r()}, ${r()}, ${r()})`;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getBarData(key1, key2, dataLabel){
      return {
        labels: [this.product.name].concat(this.product.alternatives.map((alternative) => (alternative.name))), // [this.product.name, this.product.alternatives[0].name, this.product.alternatives[1].name, this.product.alternatives[2].name, this.product.alternatives[3].name, this.product.alternatives[4].name],
        datasets: [
          {
            label: dataLabel + " - Product vs Alternatives" ,
            data: [this.product[key1][key2]].concat(this.product.alternatives.map((alternative) => (alternative[key1][key2]))), //[this.product.co2.shipping, this.product.alternatives[0].co2.shipping, this.product.alternatives[1].co2.shipping, this.product.alternatives[2].co2.shipping, this.product.alternatives[3].co2.shipping, this.product.alternatives[4].co2.shipping],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ].concat(this.product.alternatives.map(() => (this.getRandomBorderColor()))),
            borderColor: [
              'rgb(255, 99, 132)'
            ].concat(this.product.alternatives.map(() => (this.getRandomColor()))),
            // backgroundColor: [
            //   'rgba(255, 99, 132, 0.2)',
            //   'rgba(255, 159, 64, 0.2)',
            //   'rgba(255, 205, 86, 0.2)',
            //   'rgba(75, 192, 192, 0.2)',
            //   'rgba(54, 162, 235, 0.2)',
            //   'rgba(153, 102, 255, 0.2)',
            //   'rgba(201, 203, 207, 0.2)'
            // ],
            // borderColor: [
            //   'rgb(255, 99, 132)',
            //   'rgb(255, 159, 64)',
            //   'rgb(255, 205, 86)',
            //   'rgb(75, 192, 192)',
            //   'rgb(54, 162, 235)',
            //   'rgb(153, 102, 255)',
            //   'rgb(201, 203, 207)'
            // ],
            borderWidth: 1
          }
        ]
      };
    },
    getRadarData(index){
      return {
        labels: [
          'C02 Emitted in Production',
          'C02 Emitted in Shipping',
          'Energy Consumption in Production',
          'Energy Consumption in Shipping',
          'Waste'
        ],
        datasets: [{
          label: this.product.name,
          data: [this.product.co2.production, this.product.co2.shipping, this.product.energy.production, this.product.energy.shipping, this.product.waste.waste],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: this.product.alternatives[index].name,
          data: [this.product.alternatives[index].co2.production, this.product.alternatives[index].co2.shipping, this.product.alternatives[index].energy.production, this.product.alternatives[index].energy.shipping, this.product.alternatives[index].waste.waste],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
    }
  }
}
</script>

<style scoped>
</style>