<template>
  <div class="chart-component">
    <chartist
      ratio="ct-major-second"
      :type="type"
      :data="data"
      :options="computedOptions"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import Legend from 'chartist-plugin-legend'
  Vue.use(require('vue-chartist'))

  export default {
    name: 'VChart',
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      type: {
        type: String,
        default: 'Line',
      },
      options: {
        type: Object,
        default: null,
      },
    },
    data () {
      return {
        //
      }
    },
    computed: {
      computedOptions () {
        const isPie = this.type.toLowerCase() === 'pie'
        const options = {
          axisX: {
            offset: isPie ? 0 : 15,
            showGrid: false,
          },
          axisY: {
            offset: isPie ? 0 : 30,
          },
          low: 0,
          high: 1000,
          width: '100%',
          height: '300px',
          chartPadding: isPie ? {} : {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
          plugins: [
            Legend({
              position: 'top',
              legendNames: [...this.data.legendNames || []],
            }),
          ],
        }
        if (this.options) {
          return {
            ...options,
            ...this.options,
          }
        }
        return options
      },
    },
  }
</script>

<style lang="scss" scoped>
  .chart-component {
    ::v-deep {
      $colors: #d70206, #f05b4f, #f4c63d, #d17905, #453d3f, #59922b, #0544d3, #6b0392, #f05b4f, #dda458, #eacf7d, #86797d, #b2c326, #6188e2, #a748ca;

      @each $color in $colors {
        $i: index($colors, $color) - 1;
        .ct-series-#{$i} {
          color: $color;
          &::before {
            background-color: $color;
            border-color: $color;
          }
          &.inactive:before {
            background-color: transparent;
          }
        }
      }

      .ct-legend {
        list-style-type: none;
        display: flex;
        justify-content: center;
        margin-bottom: 16px !important;
        user-select: none;
        li {
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 24px;
          line-height: 1;
          &:not(:first-child) {
            margin-left: 14px;
          }
          &:before {
            content: '';
            width: 18px;
            height: 18px;
            margin-right: 5px;
            border: 1px solid;
            border-radius: 3px;
          }
        }
      }

      .ct-major-second:before {
        content: none;
      }
      .ct-major-second>svg {
        position: static;
      }
    }
  }
</style>
