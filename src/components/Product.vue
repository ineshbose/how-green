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
          <b-col v-if="product.img" md="3">
            <b-card-img-lazy :src="product.img" fluid rounded></b-card-img-lazy>
          </b-col>
          <b-col>
            <b-card-title>
              {{ product.name }}
              <b-button
                variant="link"
                class="p-0 m-0"
                target="_blank"
                :href="`https://www.tesco.com/groceries/en-GB/products/${product.id}`"
              >
                <b-icon icon="box-arrow-up-right" alt="View product"></b-icon>
              </b-button>
            </b-card-title>
          </b-col>
        </b-row>

        <b-row class="py-4 text-center">
          <b-col>
            <b-card-sub-title> Product rating </b-card-sub-title>
            <b-card-title> {{ product.score }}% </b-card-title>
          </b-col>
          <b-col>
            <b-card-sub-title> Grade </b-card-sub-title>
            <b-card-title>
              {{ grade }}
            </b-card-title>
          </b-col>
        </b-row>

        <b-row class="text-center">
          <b-col v-if="product.origin">
            <b-card-sub-title> Origin </b-card-sub-title>
            <b-img-lazy
              v-if="product.origin.tld"
              :alt="`${product.origin.name} flag`"
              :src="`https://img.geonames.org/flags/m/${product.origin.tld}.png`"
              class="py-2"
            >
            </b-img-lazy>
            <b-card-title title-tag="h6"> {{ product.origin.name }} </b-card-title>
          </b-col>

          <b-col v-if="product.destination">
            <b-card-sub-title> Destination </b-card-sub-title>
            <b-img-lazy
              v-if="product.destination.tld"
              :alt="`${product.destination.name} flag`"
              :src="`https://img.geonames.org/flags/m/${product.destination.tld}.png`"
              class="py-2"
            >
            </b-img-lazy>
            <b-card-title title-tag="h6"> {{ product.destination.name }} </b-card-title>
          </b-col>
        </b-row>

        <b-row v-if="product.distance" class="text-center pb-4">
          <b-col>
            <b-card-sub-title>
              Distance: {{ product.distance }} km
            </b-card-sub-title>
          </b-col>
        </b-row>

        <b-row class="text-center py-4">
          <b-col v-if="product.co2">
            <b-card-sub-title class="py-2"> CO2 </b-card-sub-title>

            <b-progress
              :max="25.5"
              height="1.5rem"
              v-b-tooltip="`Production: ${product.co2.production} kg`"
            >
              <b-progress-bar
                :value="product.co2.production"
                :variant="getVariant(product.co2.production*100/25.5, true)"
              >
              </b-progress-bar>
            </b-progress>

            <b-progress
              :max="25.5"
              height="1.5rem"
              v-b-tooltip="`Shipping: ${product.co2.shipping} kg`"
            >
              <b-progress-bar
                :value="product.co2.shipping"
                :variant="getVariant(product.co2.shipping*100/25.5, true)"
              >
              </b-progress-bar>
            </b-progress>
          </b-col>

          <b-col v-if="product.energy">
            <b-card-sub-title class="py-2"> Energy </b-card-sub-title>

            <b-progress
              :max="10000"
              height="1.5rem"
              v-b-tooltip="`Production: ${product.energy.production} btu`"
            >
              <b-progress-bar
                :value="product.energy.production"
                :variant="getVariant(product.energy.production/100, true)"
              >
              </b-progress-bar>
            </b-progress>

            <b-progress
              :max="10000"
              height="1.5rem"
              v-b-tooltip="`Shipping: ${product.energy.shipping} btu`"
            >
              <b-progress-bar
                :value="product.energy.shipping"
                :variant="getVariant(product.energy.shipping/100, true)"
              >
              </b-progress-bar>
            </b-progress>
          </b-col>
        </b-row>

        <b-alert show :variant="this.variant">
          {{ advice }}
        </b-alert>

        <!-- <b-row>
          If you would like to see a break down of figures that create the rating
          they can be viewed in graphs.
        </b-row> -->

        <b-row class="text-center py-2" no-gutters>
          <b-col md>
            <b-button
              variant="outline-info"
              @click="$router.push({ name: 'product-vis' })"
            >
              <b-icon icon="graph-up"></b-icon>
              View Graphs
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
        <b-skeleton></b-skeleton>
        <div class="my-2">
          <b-skeleton-img></b-skeleton-img>
        </div>
        <b-skeleton type="button"></b-skeleton>
      </b-card-body>
    </b-card>
  </b-overlay>
</template>

<script>
import { getProduct } from "../app/api";

export default {
  name: "product",
  components: {},
  data() {
    return {
      product: null,
      alternativesProducts: null,
      info: "",
    };
  },
  async mounted() {
    this.product = await getProduct(
      this.$route.params.store,
      this.$route.params.id
    );
  },
  computed: {
    grade() {
      var scoreGrade = "";
      if (this.product.score > 80) {
        scoreGrade = "A";
      } else if (this.product.score > 60) {
        scoreGrade = "B";
      } else if (this.product.score > 40) {
        scoreGrade = "C";
      } else {
        scoreGrade = "D";
      }
      return scoreGrade;
    },
    advice() {
      var scoreAdvice = "";
      switch (this.grade) {
        case "A":
          scoreAdvice =
            "This product has an A rating meaning it is already sustainable, you can look at alternatives and might find something better!";
          break;
        case "B":
          scoreAdvice =
            "This product has an B rating meaning it is pretty sustainable, you can look at alternatives and might find something better!";
          break;
        case "C":
          scoreAdvice =
            "This product has an C rating meaning it is not very sustainable, you can look at alternatives to find something better!";
          break;
        case "D":
          scoreAdvice =
            "This product has an D rating meaning it is not at all sustainable, you can look at alternatives and  find something better!";
          break;
      }
      return scoreAdvice;
    },
    variant() {
      var scoreVariant = "";
      switch (this.grade) {
        case "A":
          scoreVariant = "success";
          break;
        case "B":
          scoreVariant = "info";
          break;
        case "C":
          scoreVariant = "warning";
          break;
        case "D":
          scoreVariant = "danger";
          break;
      }
      return scoreVariant;
    },
  },
  methods: {},
};
</script>

<style scoped>
</style>
