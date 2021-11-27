<template>
  <div>
    
   
    <b-jumbotron header-level="5" > 
    
      
      <template #lead>
        <h2> {{product.name}} </h2> <br>
        Product rating: {{product.score}}% <br>
        Grade : {{getScore()}} <br>
        {{getAdvice()}} <br>
        If you would like to see a break down of figures that create the rating 
        they can be viewed in graphs.
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
    getScore(){
      if (this.product.score<50){
        return "D"
      }else if (this.product.score<60){
        return "C"
      }else if (this.product.score<70){
        return "B"
      }else{
        return "A"
      }
    },
    getAdvice(){
      if(this.getScore()=="A"){
        return "This product has an A rating meaning it is already sustainable, you can look at alternatives and miht find something better!"
      }else if (this.getScore()=="B"){
        return "This product has an B rating meaning it is pretty sustainable, you can look at alternatives and might find something better!"
      }else if (this.getScore()=="C"){
        return "This product has an C rating meaning it is not very sustainable, you can look at alternatives to find something better!"
      }else if (this.getScore()=="D"){
        return "This product has an D rating meaning it is not at all sustainable, you can look at alternatives and  find something better!"
      }
    }
  }
};
</script>

<style scoped>
</style>
