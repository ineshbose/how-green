<template>
  <b-navbar variant="light">
    <b-navbar-brand to="/">
      <img
        :src="logo"
        alt="How Green Logo"
        width="40"
        height="40"
        class="d-inline-block align-top"
      />
      How Green?
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
import logo from "../assets/img/logo.png";

export default {
  name: "navbar",
  components: {},
  data() {
    return {
      logo: logo,
    };
  },
};
</script>

<style scoped>
</style>
