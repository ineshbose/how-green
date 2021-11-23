<template>
<div>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="./img/logo.png" alt="" width="40" height="40" class="d-inline-block align-text-top">
        How Green?
      </a>
    </div>
  </nav>  
<!-- 
<div class="container">
  <div class="row">
    <div class="col-sm-4">
      <h3>Column 1</h3>
      <p>Lorem ipsum dolor..</p>
    </div>
    <div class="col-sm-4">
      <h3>Column 2</h3>
      <p>Lorem ipsum dolor..</p>
    </div>
    <div class="col-sm-4">
      <h3>Column 3</h3>
      <p>Lorem ipsum dolor..</p>
    </div>
  </div>
</div>
</div>
-->
 
  <div>
    
    <b-jumbotron lead="Product Name">
      <p>For more information visit our website</p>
      <div class="d-grid gap-2">
        
          <div class="col-sm-3"><b-btn class="btn btn-primary" variant="primary" href="https://how-green.herokuapp.com/">More Info</b-btn></div>
          <div class="col-md-6 col-sm-5"><b-btn class="btn btn-primary" variant="success" to="visualisation" >View Graphs</b-btn></div>
        
      </div>
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
</div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data() {
    return {
      name: ''
    }
  },
  computed: {
    showAlert() {
      return this.name.length > 4;
    },
  },
}
</script>

<style scoped>

</style>
