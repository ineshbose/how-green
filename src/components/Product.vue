<template>
  <b-overlay
    :show="!product"
    spinner-variant="hgreen"
    class="w-50 mx-auto mt-5"
    variant="transparent"
  >
    <b-card border-variant="success">
      <b-card-body v-if="product">
        <b-row>
          <b-col v-if="product.img" md="3">
            <b-card-img-lazy :src="product.img" fluid rounded></b-card-img-lazy>
          </b-col>
          <b-col>
            <b-card-title>{{ product.name }}</b-card-title>
          </b-col>
        </b-row>
        Product rating: {{ product.score }}% <br />
        Grade : {{ grade }} <br />
        {{ advice }} <br />
        If you would like to see a break down of figures that create the rating
        they can be viewed in graphs.

        <b-button
          class="ml-2"
          variant="success"
          @click="$router.push({ name: 'product-alt' })"
        >
          <b-icon icon="info-circle"></b-icon>
          Alternative Products
        </b-button>
        <b-button
          class="ml-2"
          variant="success"
          @click="$router.push({ name: 'product-vis' })"
        >
          <b-icon icon="graph-up"></b-icon>
          View Graphs
        </b-button>
      </b-card-body>
      <b-card-body class="text-center m-5" v-else>
        <b-skeleton></b-skeleton>
        <div class="my-2">
          <b-skeleton-img></b-skeleton-img>
        </div>
        <b-skeleton type="button"></b-skeleton>
      </b-card-body>
    </b-card>
  </b-overlay>
</template>

<script>
import { getProduct } from "../app/api";

export default {
  name: "product",
  components: {},
  data() {
    return {
      product: null,
      alternativesProducts: null,
      info: "",
    };
  },
  async mounted() {
    this.product = await getProduct(
      this.$route.params.store,
      this.$route.params.id
    );
  },
  computed: {
    grade() {
      var scoreGrade = "";
      if (this.product.score > 80) {
        scoreGrade = "A";
      } else if (this.product.score > 60) {
        scoreGrade = "B";
      } else if (this.product.score > 40) {
        scoreGrade = "C";
      } else {
        scoreGrade = "D";
      }
      return scoreGrade;
    },
    advice() {
      var scoreAdvice = "";
      switch (this.grade) {
        case "A":
          scoreAdvice =
            "This product has an A rating meaning it is already sustainable, you can look at alternatives and might find something better!";
          break;
        case "B":
          scoreAdvice =
            "This product has an B rating meaning it is pretty sustainable, you can look at alternatives and might find something better!";
          break;
        case "C":
          scoreAdvice =
            "This product has an C rating meaning it is not very sustainable, you can look at alternatives to find something better!";
          break;
        case "D":
          scoreAdvice =
            "This product has an D rating meaning it is not at all sustainable, you can look at alternatives and  find something better!";
          break;
      }
      return scoreAdvice;
    },
  },
  methods: {},
};
</script>

<style scoped>
</style>
