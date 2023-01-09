<template>
  <v-list-group
    color="white"
    :group="group"
    eager
    v-bind="$attrs"
    class="aside-list-group"
  >
    <template v-if="item.icon" v-slot:prependIcon>
      <component v-if="item.icon" :is="item.icon" :icon="item.icon" />
    </template>
    <template v-slot:activator>
      <v-list-item-icon
        v-if="!item.icon"
        class="text-caption text-uppercase text-center align-self-center"
      >
        {{ title }}
      </v-list-item-icon>

      <v-list-item-content v-if="item.title">
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in item.items">
      <default-list-group
        v-if="child.items"
        :key="`sub-group-${i}`"
        :item="child"
      />

      <default-list-item
        v-if="!child.items"
        :key="`child-${i}`"
        :item="child"
      />
    </template>
  </v-list-group>
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
    name: 'DefaultListGroup',

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
      DefaultListItem: () => import('./ListItem'),
    },

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      group () {
        return this.genGroup(this.item.items)
      },
      title () {
        const matches = this.item.title.match(/\b(\w)/g)

        return matches.join('')
      },
    },

    methods: {
      genGroup (items) {
        return items
          .reduce((acc, cur) => {
            if (!cur.to) return acc

            acc.push(cur.items ? this.genGroup(cur.items) : cur.to.slice(1, -1))

            return acc
          }, [])
          .join('|')
      },
    },
  }
</script>

<style lang="scss" scoped>
.aside-list-group {
  svg {
    height: 100%;
    width: 50px;

    ::v-deep {
      @include fill-svg(#ffffff);
    }
  }

  ::v-deep {
    .v-list-group__header__prepend-icon {
      margin: 0 40px 0 0;
      height: 100%;
    }

    .v-list-group__header {
      padding: 0 28px;
      height: 73px;
      width: 100%;
      justify-content: left;
      border-radius: 0;
      background-color: transparent !important;
      transition: background-color 0.2s ease;

      .v-list-item__title {
        font-size: 24px;
        text-align: left;
        flex: 1;
        transition: color 0.2s ease;
      }
    }
  }

  &.v-list-group--active {
    ::v-deep {
      .v-list-group__header {
        background-color: #191919 !important;
      }
    }
  }
}
</style>
