<template>
  <v-list-item
    :href="item.href"
    :rel="item.href ? 'nofollow' : undefined"
    :target="item.href ? '_blank' : undefined"
    :to="item.to"
    active-class="primary white--text"
    link
    class="aside-list-item py-1"
    :class="{'hide-on-mobile': item.hideOnMobile}"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list-item-icon v-if="item.icon" class="align-self-center">
      <component v-if="item.icon" :is="item.icon" :icon="item.icon" />
    </v-list-item-icon>

    <v-list-item-content v-if="item.title">
      <v-list-item-title v-text="item.title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import IconAdmin from '../icons/IconAdmin'
  import IconHandbook from '../icons/IconHandbook'
  import IconKitchen from '../icons/IconKitchen'
  import IconLights from '../icons/IconLights'
  import IconMarketing from '../icons/IconMarketing'
  import IconOrders from '../icons/IconOrders'
  import IconSettings from '../icons/IconSettings'
  import IconStatistics from '../icons/IconStatistics'
  import IconWarehouse from '../icons/IconWarehouse'

  export default {
    name: 'DefaultListItem',
    components: {
      IconAdmin,
      IconHandbook,
      IconKitchen,
      IconLights,
      IconMarketing,
      IconOrders,
      IconSettings,
      IconStatistics,
      IconWarehouse,
    },
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>

<style lang="scss" scoped>
  //noinspection ALL
  .aside-list-item {
    padding: 0 28px;
    height: 73px;
    width: 100%;
    justify-content: left;
    border-radius: 0;
    background-color: transparent !important;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #191919 !important;

      .v-list-item__title {
        color: $color-primary;
      }

      svg {
        ::v-deep {
          @include fill-svg($color-primary);
        }
      }
    }

    &.v-list-item--active {
      background-color: #191919 !important;

      .v-list-item__title {
        color: $color-primary;
      }
    }

    .v-list-item__icon {
      margin: 0 40px 0 0;
      height: 100%;
    }

    svg {
      height: 100%;
      width: 50px;

      ::v-deep {
        @include fill-svg(#ffffff);
      }
    }

    .v-list-item__title {
      font-size: 24px;
      text-align: left;
      flex: 1;
      transition: color 0.2s ease;
    }
  }
</style>
