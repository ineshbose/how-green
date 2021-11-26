<template>
  <div>
    
   
    <b-jumbotron header="Product Name" header-level="5">
      <template #lead>
        For more information, visit our website.
      </template>

      <b-button variant="primary" href="#">
        <b-icon icon="info-circle"></b-icon>
        More Info
      </b-button>
      <b-button class="ml-2" variant="success" @click="$router.push({ name: 'product-vis'} )">
        <b-icon icon="graph-up"></b-icon>
        View Graphs
      </b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "product",
  components: {},
  data() {
    return {
    };
  },
};
</script>

<style scoped>
</style>
