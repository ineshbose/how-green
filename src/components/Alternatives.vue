<template>
  <div>
    <h3>Alternative Products</h3>

    <b-button
      class="ml-2"
      variant="success"
      @click="$router.push({ name: 'product-page' })"
    >
      <b-icon icon="arrow-left-square"></b-icon>
      Product Overview
    </b-button>

    <div class="mt-4" v-for="alternative in product.alternatives" :key="alternative.id">
      <b-card
        :img-src="alternative.img"
        img-left
        class="mb-3"
      >
        <b-card-text>
          <b-card-title>{{ alternative.name }}</b-card-title>
          Product percentage: {{ alternative.score }}% <br />
          <b-button target="_blank" variant="primary" :href="`https://www.tesco.com/groceries/en-GB/products/${alternative.id}`">
            <b-icon icon="shop-window"></b-icon>
            View Product
          </b-button>
        </b-card-text>
      </b-card>
    </div>
  </div>
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
  },
};
</script>

<style scoped>
</style>
