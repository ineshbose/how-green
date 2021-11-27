<template>
  <div>
    
   
    <b-jumbotron header-level="5" > 
    
      
      <template #lead>
        Product Name: {{product.name}} <br>
        Product rating: {{getRandomInt()}}% <br>
   
      </template>

      <b-button class="ml-2" variant="success" @click="$router.push({ name: 'product-alt'} )">
        <b-icon icon="info-circle"></b-icon>
        Alternative Products
      </b-button>
      <b-button class="ml-2" variant="success" @click="$router.push({ name: 'product-vis'} )">
        <b-icon icon="graph-up"></b-icon>
        View Graphs
      </b-button>
    </b-jumbotron>
    <!--<b-spinner v-else variant="success" label="loading"></b-spinner>-->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "product",
  components: {},
  data() {
    return {
       product: null,
       alternativesProducts : null,
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
    getAlternativeData() {
      this.alternativesProducts = [this.product.name].concat(this.product.alternatives.map((alternative) => (alternative.name)));
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
  }
};
</script>

<style scoped>
</style>
