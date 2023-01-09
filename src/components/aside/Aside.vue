<template>
  <div class="navigation-drawer-component">
    <v-navigation-drawer
      v-model="show"
      :mobile-breakpoint="1024"
      id="default-drawer"
      dark
      :right="$vuetify.rtl"
      mini-variant-width="80"
      app
      width="326"
    >
      <perfect-scrollbar :options="{ suppressScrollX: true }">
        <div class="logo-section">
          <router-link to="/orders">
            <img src="/img/logo_white.svg" class="drawer_header" alt="logo" />
          </router-link>
        </div>

        <div class="clocks-section">
          <clocks />
        </div>

        <div class="new-order-section">
          <v-btn class="button-new-order text-normalize" to="/new-order">
            <font-awesome-icon icon="plus" />
            Новый заказ
          </v-btn>
        </div>

        <links />
        <!-- <default-account-settings />-->
        <!-- <v-divider class="mx-3 mb-2" />-->
        <!-- <default-list :items="items" />-->
      </perfect-scrollbar>
      <div class="navigation-drawer-component-powered">
        <img src="/img/designedby.svg" alt="">
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Clocks from './Clocks'
  import Links from './links/Links'

  export default {
    name: 'DefaultDrawer',
    data () {
      return {
        drawer: true,
      }
    },
    components: {
      Clocks,
      Links,
    },
    computed: {
      ...mapState({
        showMainAside: state => state.app.showMainAside,
      }),
      show: {
        get () {
          return this.showMainAside
        },
        set (value) {
          this.$store.commit('app/toggleAside', value)
        },
      },
    },
    mounted () {
      this.$nextTick(() => {
        this.show = window.innerWidth > 1024
      })
    },
  }
</script>

<style lang="less">
  .navigation-drawer-component {
    .v-list-item {
      margin-bottom: 8px;
    }

    .v-navigation-drawer__content {
      height: 100% !important;
    }

    .theme--dark.v-navigation-drawer {
      background-color: #040404;
    }

    .v-list-item::before,
    .v-list-item::after {
      display: none;
    }

    .v-list-group__header__prepend-icon,
    .v-list-item__icon {
      margin-top: 12px;
      margin-bottom: 12px;
      margin-left: 4px;
    }

    &.v-navigation-drawer--mini-variant {
      .v-list-item {
        justify-content: flex-start !important;
      }
    }

    &-powered {
      padding: 20px 27px 30px 27px;

      img {
        max-width: 100%;
        width: 173px;
        height: auto;
      }
    }

    .ps {
      height: calc(100% - 93px);
    }

    .v-navigation-drawer__content {
      height: auto;
      overflow-y: hidden;
    }
  }
</style>

<style lang="scss" scoped>
  //noinspection ALL
  .navigation-drawer-component {
    .logo-section {
      padding-left: 18px;
      padding-top: 18px;
      margin-bottom: 25px;
    }

    .new-order-section {
      padding: 0 23px;

      .button-new-order {
        height: 65px !important;
        width: 100%;
        background-color: $color-primary !important;
        border-radius: 100px;
        font-weight: normal;
        font-size: 24px;
        margin-bottom: 37px;

        svg {
          height: 16px;
          margin-right: 16px;
        }
      }
    }

    @include media-lg {
      .new-order-section {
        display: none;
      }
    }
  }
</style>
