<template>
  <div>
    <h3>Alternative Products </h3>

    <b-button class="ml-2" variant="success" @click="$router.push({ name: 'product-page'} )">
        <b-icon icon="arrow-left-square"></b-icon>
        Product Overview
      </b-button>

     
    

     <div class="mt-4">
    <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-left class="mb-3">
      <b-card-text>
        {{product.alternatives[0].name}} <br>             
        Product percentage: {{getRandomInt()}}% <br>
        <b-button variant="primary" href="#">
        <b-icon icon="shop-window"></b-icon>
        View Product
      </b-button>
      </b-card-text>
    </b-card>
    </div>
    <div class="mt-4">
    <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-left class="mb-3">
      <b-card-text>
        {{product.alternatives[1].name}} <br>             
        Product percentage: {{getRandomInt()}}% <br>
        <b-button variant="primary" href="#">
        <b-icon icon="shop-window"></b-icon>
        View Product
      </b-button>
      </b-card-text>
    </b-card>
    </div>
    <div class="mt-4">
    <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-left class="mb-3">
      <b-card-text>
        Product name <br>             
        Product percentage <br>
        <b-button variant="primary" href="#">
        <b-icon icon="shop-window"></b-icon>
        View Product
      </b-button>
      </b-card-text>
    </b-card>
    </div>
  </div>
</template>



<script>
import axios from "axios";
export default { 
  name: 'alternatives',
  components: { },
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
}
</script>

<style scoped>

</style>
