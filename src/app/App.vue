<template>
  <div id="app" class="bg-gradient-light">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
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
  max-width: 100vh;
}
</style>
