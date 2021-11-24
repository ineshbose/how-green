<template>
  <div id="app" class="bg-gradient-light">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../sass/main";

#app {
  padding: 5px 10px;
  margin: 0;
  min-height: 100vh;
}
</style>
