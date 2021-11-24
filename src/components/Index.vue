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
      <b-button class="ml-2" variant="success" to="visualisation">
        <b-icon icon="graph-up"></b-icon>
        View Graphs
      </b-button>
    </b-jumbotron>

    <b-form-group
      horizontal
      :label-cols="4"
      description="Let us know your name."
      label="Enter your name"
    >
      <b-form-input v-model.trim="name"></b-form-input>
    </b-form-group>

    <b-alert variant="success" :show="showAlert">Hello, {{ name }}.</b-alert>
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
