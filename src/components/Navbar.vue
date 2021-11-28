<template>
  <b-navbar variant="hgreen">
    <b-navbar-brand to="/" class="text-white">
      <img
        :src="logo"
        alt="How Green Logo"
        height="30"
        class="d-inline-block align-top"
      />
      How Green?
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
import logo from "../assets/img/logo.svg";

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
