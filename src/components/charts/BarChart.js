import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    labels: Array,
    datasets: Object
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart({
      labels: this.labels,
      datasets: this.datasets,
    }, {responsive: true, maintainAspectRatio: false})
  }
}