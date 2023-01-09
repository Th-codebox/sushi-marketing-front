<template>
  <v-app>
    <v-main>
      <div class="page index">
        <h1 class="text-h1">
          Маркетинг
        </h1>
        <v-chart :data="chartLine.data" />
        <v-chart :data="chartPie" type="Pie" />
        <span>test</span>
      </div>
    </v-main>
  </v-app>
</template>

<script>
  import VChart from '@/components/chart'

  export default {
    name: 'IndexPage',
    components: {
      VChart,
    },
    data () {
      return {
        chartLine: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            legendNames: ['Blue pill', 'Red pill', 'Purple pill'],
            series: [
              { data: [112, 9, 7, 8, 5] },
              { data: [22, 1, 3.5, 7, 3] },
              { data: [1, 3, 4, 5, 6] },
            ],
          },
        },
        chartPie: {
          legendNames: ['test1', 'test2', 'test3'],
          series: [20, 30, 40],
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  .page.index {
    h1 {
      margin: 20px 0 40px 0;
    }
  }
</style>
