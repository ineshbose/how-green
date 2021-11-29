<template>
  <b-overlay
    :show="!product"
    spinner-variant="hgreen"
    class="w-50 mx-auto mt-5"
    variant="transparent"
  >
    <b-card border-variant="success">
      <b-card-body v-if="product">
        <b-row>
          <b-col>
            <b-card-title> Graphs </b-card-title>
            <b-card-sub-title> For {{ product.name }} </b-card-sub-title>
          </b-col>
        </b-row>

        <b-row class="py-4" align-content="center">
          <b-col md="3" align-self="center">
            <b-button-group size="sm" vertical>
              <b-button
                v-for="(type, idx) in [
                  'CO2 Emissions (Shipping)',
                  'CO2 Emissions (Production)',
                  'Energy Consumption (Shipping)',
                  'Energy Consumption (Production)',
                  'Waste',
                ]"
                :variant="currentBarGraph === idx ? `primary` : `outline-primary`"
                :key="idx"
                block
                @click="
                  () => {
                    currentBarGraph = idx;
                  }
                "
              >
                {{ type }}
              </b-button>
            </b-button-group>
          </b-col>
          <b-col align-self="center">
            <BarChart :chart-data="barData[currentBarGraph]"></BarChart>
          </b-col>
        </b-row>

        <b-row class="py-4" align-content="center">
          <b-col align-self="center">
            <RadarChart :chart-data="radarData[currentRadarGraph]"></RadarChart>
          </b-col>
          <b-col md="3" align-self="center">
            <b-button-group size="sm" vertical>
              <b-button
                v-for="(alternative, idx) in product.alternatives"
                :variant="currentRadarGraph === idx ? getVariant(alternative.score) : `outline-${getVariant(alternative.score)}`"
                :key="idx"
                block
                @click="
                  () => {
                    currentRadarGraph = idx;
                  }
                "
                v-b-tooltip="
                  `${alternative.name} (Score ${alternative.score}%)`
                "
              >
                Alternative {{ idx + 1 }}
              </b-button>
            </b-button-group>
          </b-col>
        </b-row>

        <b-row class="text-center py-4" no-gutters>
          <b-col md>
            <b-button
              variant="outline-secondary"
              @click="$router.push({ name: 'product-page' })"
            >
              <b-icon icon="arrow-left-square"></b-icon>
              View Overview
            </b-button>
          </b-col>
          <b-col md>
            <b-button
              variant="outline-primary"
              @click="$router.push({ name: 'product-alt' })"
            >
              <b-icon icon="info-circle"></b-icon>
              View Alternatives
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>

      <b-card-body class="text-center m-5" v-else>
        <b-row>
          <b-col md="3">
            <b-row class="py-1" v-for="i in [1,2,3,4,5]" :key="i">
              <b-skeleton type="button"></b-skeleton>
            </b-row>
          </b-col>

          <b-col class="py-1">
            <b-skeleton></b-skeleton>
            <b-skeleton-img></b-skeleton-img>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </b-overlay>
</template>

<script>
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import RadarChart from "./charts/RadarChart";
import { getProduct } from "../app/api";

export default {
  name: "visualisation",
  components: {
    // LineChart,
    BarChart,
    RadarChart,
  },
  data() {
    return {
      barData: [],
      radarData: [],
      product: null,
      currentRadarGraph: 0,
      currentBarGraph: 0,
    };
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
      this.barData = [
        this.getBarData("co2", "shipping", "C02 Emissions during Shipping"),
        this.getBarData("co2", "production", "C02 Emissions during Production"),
        this.getBarData(
          "energy",
          "shipping",
          "Energy Consumption during Shipping"
        ),
        this.getBarData(
          "energy",
          "production",
          "Energy Consumption during Production"
        ),
        this.getBarData("waste", "waste", "Waste Produced"),
      ];

      this.radarData = this.product.alternatives.map((alternative) =>
        this.getRadarData(alternative)
      );
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
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    getBarData(key1, key2, dataLabel) {
      return {
        labels: [this.product.name].concat(
          this.product.alternatives.map((alternative) => alternative.name)
        ), // [this.product.name, this.product.alternatives[0].name, this.product.alternatives[1].name, this.product.alternatives[2].name, this.product.alternatives[3].name, this.product.alternatives[4].name],
        datasets: [
          {
            label: `${dataLabel} - Product vs Alternatives`,
            data: [this.product[key1][key2] || this.product[key1]].concat(
              this.product.alternatives.map(
                (alternative) => (alternative[key1][key2] || alternative[key1])
              )
            ), //[this.product.co2.shipping, this.product.alternatives[0].co2.shipping, this.product.alternatives[1].co2.shipping, this.product.alternatives[2].co2.shipping, this.product.alternatives[3].co2.shipping, this.product.alternatives[4].co2.shipping],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"].concat(
              this.product.alternatives.map(() => this.getRandomBorderColor())
            ),
            borderColor: ["rgb(255, 99, 132)"].concat(
              this.product.alternatives.map(() => this.getRandomColor())
            ),
            borderWidth: 1,
          },
        ],
      };
    },
    getRadarData(alternative) {
      return {
        labels: [
          "C02 Emitted in Production",
          "C02 Emitted in Shipping",
          "Energy Consumption in Production",
          "Energy Consumption in Shipping",
          "Waste",
        ],
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.co2.production,
              this.product.co2.shipping,
              this.product.energy.production,
              this.product.energy.shipping,
              this.product.waste,
            ],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
          {
            label: alternative.name,
            data: [
              alternative.co2.production,
              alternative.co2.shipping,
              alternative.energy.production,
              alternative.energy.shipping,
              alternative.waste,
            ],
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
</style>