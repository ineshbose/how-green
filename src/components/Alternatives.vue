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
            <b-card-title> Alternatives </b-card-title>
            <b-card-sub-title> For {{ product.name }} </b-card-sub-title>
          </b-col>
        </b-row>

        <b-list-group class="py-2">
          <b-list-group-item
            v-for="alternative in product.alternatives"
            :key="alternative.id"
            :variant="getVariant(alternative.score)"
            icon="star-fill"
            class="d-flex justify-content-between align-items-center"
          >
            <b-avatar
              rounded
              class="mr-2"
              v-if="alternative.img"
              :src="alternative.img"
              :variant="getVariant(alternative.score)"
            >
            </b-avatar>
            {{ alternative.name }}
            <b-badge :variant="getVariant(alternative.score)" class="m-2">
              {{ alternative.score }}%
            </b-badge>
            <b-button
              target="_blank"
              :variant="`outline-${getVariant(alternative.score)}`"
              :href="`https://www.tesco.com/groceries/en-GB/products/${alternative.id}`"
            >
              <b-icon icon="box-arrow-up-right" alt="View product"></b-icon>
            </b-button>
          </b-list-group-item>
        </b-list-group>
        <b-row class="text-center py-2" no-gutters>
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
              variant="outline-info"
              @click="$router.push({ name: 'product-vis' })"
            >
              <b-icon icon="graph-up"></b-icon>
              View Graphs
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-body class="text-center m-5" v-else>
        <div class="py-2" v-for="i in [1, 2, 3, 4, 5]" :key="i">
          <b-skeleton></b-skeleton>
          <b-skeleton type="button"></b-skeleton>
        </div>
      </b-card-body>
    </b-card>
  </b-overlay>
</template>



<script>
import { getProduct } from "../app/api";

export default {
  name: "alternatives",
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
  methods: {
    getAlternativeData() {
      this.alternativesProducts = [this.product.name].concat(
        this.product.alternatives.map((alternative) => alternative.name)
      );
    },
    getVariant(score) {
      var scoreVariant = "";
      if (score > 80) {
        scoreVariant = "success";
      } else if (score > 60) {
        scoreVariant = "info";
      } else if (score > 40) {
        scoreVariant = "warning";
      } else {
        scoreVariant = "danger";
      }
      return scoreVariant;
    },
  },
};
</script>

<style scoped>
</style>
