<template>
  <div class="drawer-links-component">
    <v-list expand nav v-bind="$attrs" v-on="$listeners" class="aside-list">
      <template v-for="(item, i) in items">
        <default-list-group
          v-if="item.items"
          :key="`group-${i}`"
          :item="item"
        />

        <default-list-item
          v-else
          :key="`item-${i}`"
          :item="item"
          v-show="userCanAccessToRoute(item.to)"
          :class="{'hide-on-mobile': item.hideOnMobile}"
        />
      </template>
    </v-list>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Links',
    components: {
      DefaultListGroup: () => import('./ListGroup'),
      DefaultListItem: () => import('./ListItem'),
    },
    computed: {
      ...mapState({
        user: state => state.auth.initialState.user || {},
      }),
    },
    methods: {
      userCanAccessToRoute (route) {
        if (route === '/entities') {
          if (this.user && this.user.role && this.user.role.id === 1) {
            return true
          }
          return false
        }
        return true
      },
    },
    data () {
      return {
        items: [
          { title: 'Заказы', icon: 'icon-orders', to: '/orders' },
          // { title: 'Кухня', icon: 'icon-kitchen', to: '/kitchen' },
          { title: 'Администратор', icon: 'icon-cash-register', to: '/administrator' },
          { title: 'Склад', icon: 'icon-boxes', to: '/sklad', hideOnMobile: true },
          { title: 'Статистика', icon: 'icon-statistics', to: '/stat', hideOnMobile: true },
          { title: 'Маркетинг', icon: 'icon-bullhorn', to: '/', hideOnMobile: true },
          // { title: 'Светофор', icon: 'icon-lights', to: '/svetofor' },
          {
            title: 'Справочники',
            icon: 'icon-handbook',
            to: '/entities',
            hideOnMobile: true,
          },
          {
            title: 'Настройки',
            icon: 'icon-settings',
            hideOnMobile: true,
            // items: [
            // { title: 'Настройки филиалов', to: '/settings/branches' },
            // ],
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
.drawer-links-component {
  margin-bottom: 40px;

  .aside-list {
    padding: 0 !important;
  }

  @include media-lg {
    .hide-on-mobile {
      display: none !important;
    }
  }
}
</style>
