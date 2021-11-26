<template>
  <div>
    <b-jumbotron header=" Why should you use How Green?" header-level="5">
      <template #lead>
      We believe, consumers should have a right to know the effect their products
       have on the environment.   <br>
       We created How Green so that you can find more sustainable options for your 
       favourite products. <br>
       We show you the data we use to calculate a products sustainability score,
        so don’t trust us, trust the data! <br>
      
      <h3> Shop using How Green at supported stores</h3>
      <b-button variant="primary" href="https://www.tesco.com/">
        <b-icon icon="shop-window"></b-icon>
        Tesco
      </b-button>
      <b-button variant="primary" href="https://www.sainsburys.co.uk/">
        <b-icon icon="shop-window"></b-icon>
        Sainsbury's
      </b-button>
      </template>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      name: "",
    };
  },
  computed: {
    showAlert() {
      return this.name.length > 4;
    },
  },
};
</script>

<style scoped>
</style>
