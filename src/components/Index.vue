<template>
  <b-card class="w-50 mx-auto mt-5 p-md-4">
    <b-card-title title-tag="h1" class="py-2">
      Why should you use How Green?
    </b-card-title>

    <p>
      We believe, consumers should have a right to know the effect their
      products have on the environment.
    </p>
    <p>
      We created How Green so that you can find more sustainable options for
      your favourite products.
    </p>
    <p>
      We show you the data we use to calculate a products sustainability
      score, so don’t trust us, trust the data!
    </p>

    <b-input-group prepend="Search Tesco" class="mt-3">
      <b-form-input
        v-model="searchQuery"
        placeholder="peanut butter..."
      >
      </b-form-input>
      <b-input-group-append>
        <b-button
          variant="outline-success"
          target="_blank"
          :href="`https://www.tesco.com/groceries/en-GB/search?query=${searchQuery || 'peanut butter'}`"
        >
          <b-icon icon="search" alt="Search"></b-icon>
        </b-button>
        <b-button
          variant="info"
          target="_blank"
          href="https://www.tesco.com/"
        >
          <b-icon icon="house-fill" alt="Main site"></b-icon>
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </b-card>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      searchQuery: "",
    };
  },
};
</script>

<style scoped>
</style>
