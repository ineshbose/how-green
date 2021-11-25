<template>
  <div>
    <!-- <b-container>
      <b-row>
        <b-col sm="4">
          <h3>Column 1</h3>
          <p>Lorem ipsum dolor..</p>
        </b-col>
        <b-col sm="4">
          <h3>Column 2</h3>
          <p>Lorem ipsum dolor..</p>
        </b-col>
        <b-col sm="4">
          <h3>Column 3</h3>
          <p>Lorem ipsum dolor..</p>
        </b-col>
      </b-row>
    </b-container> -->

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
