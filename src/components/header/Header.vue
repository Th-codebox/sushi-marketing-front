<template>
  <div class="app-bar-component">
    <div class="mobile-menu-section d-flex j-between a-center">
      <v-btn @click="toggleAside" class="button-menu ml-2 pa-0" color="#f1f3f6" icon elevation="2">
        <font-awesome-icon size="2x" icon="bars" />
      </v-btn>
      <v-select
        v-model="selectedBranch"
        :items="userFilials"
        item-text="name"
        item-value="id"
        label="Филиал"
        hide-details="auto"
        class="bar-select bar-select-mobile"
        background-color="#F1F3F6"
        return-object
        flat
        solo
      >
        <template slot="prepend-inner">
          <font-awesome-icon color="#FF9100" icon="plus" />
        </template>
      </v-select>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-ripple class="profile-select d-md-none" v-bind="attrs" v-on="on">
            <v-avatar
              v-if="!user || !user.image"
              color="#FF9100"
              class="menu-avatar mr-2"
              size="30"
            >
              <font-awesome-icon color="#ffffff" icon="user" />
            </v-avatar>
            <v-avatar v-else color="#FF9100" class="mr-2" size="50">
              <img :src="user.image" alt="user-avatar" />
            </v-avatar>
          </div>
        </template>
        <v-list>
          <v-list-item @click="logout" link>
            <v-list-item-title>Выход</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn @click="toggleHeader" class="button-menu mr-2 pa-0" color="#f1f3f6" icon elevation="2">
        <font-awesome-icon v-if="!showHeader" size="2x" icon="ellipsis-v" />
        <font-awesome-icon v-if="showHeader" size="2x" icon="times" />
      </v-btn>
    </div>

    <div v-show="showHeader" class="mobile-wrapper"></div>
    <v-app-bar
      v-show="showHeader"
      id="default-app-bar"
      app
      absolute
      class="v-bar--underline"
      color="transparent"
      :clipped-left="$vuetify.rtl"
      :clipped-right="!$vuetify.rtl"
      height="87"
      flat
    >
      <v-btn class="bar-button button-notifications text-normalize" height="73" depressed>
        <font-awesome-icon color="#FF9100" icon="bell" />
        Уведомления
      </v-btn>

      <v-select
        v-model="selectedBranch"
        :items="userFilials"
        item-text="name"
        item-value="id"
        label="Филиал"
        hide-details="auto"
        class="bar-select select-filials"
        background-color="#F1F3F6"
        height="73"
        return-object
        flat
        solo
      >
        <template slot="prepend-inner">
          <font-awesome-icon color="#FF9100" icon="plus" />
        </template>
      </v-select>

      <div class="datepicker-section" :class="{'hidden': !isOrdersPage}" v-outside="closeDatepicker">
        <v-btn
          :disabled="!isOrdersPage"
          @click="showDatepicker = !showDatepicker"
          class="bar-button button-datepicker bar-button--history text-normalize"
          height="73"
          depressed
        >
          <font-awesome-icon color="#FF9100" icon="calendar-alt" />
          <span class="d-flex font-weight-light flex-column text-left">
            Заказы за
            <span class="font-weight-medium">{{ orderDate }}</span>
          </span>
        </v-btn>
        <div class="datepicker">
          <v-date-picker
            v-show="showDatepicker && isOrdersPage"
            v-model="orderDate"
            :first-day-of-week="1"
            elevation="1"
            no-title
            locale="ru"
          />
        </div>
      </div>

      <v-btn depressed class="bar-button button-calls text-normalize" height="73">
        <font-awesome-icon color="#FF9100" icon="phone-alt" />
        Звонки
      </v-btn>

      <v-text-field
        v-model="search"
        :disabled="!isOrdersPage"
        :class="{'hidden': !isOrdersPage}"
        label="Поиск"
        hide-details="auto"
        class="bar-text-field text-field-search"
        flat
        solo
        height="73"
      >
        <template slot="append">
          <font-awesome-icon color="#FF9100" icon="search" />
        </template>
      </v-text-field>

      <v-sheet
        class="bar-sheet sheet-orders-count d-flex a-center flex-shrink-0"
        height="73"
        width="auto"
      >
        <div class="d-flex flex-column">
          <span class="d-block count">{{ getOrdersCount }}</span>
          <span>выполнено</span>
        </div>
      </v-sheet>

      <v-sheet
        class="bar-sheet sheet-total d-flex a-center flex-shrink-0"
        height="73px"
        width="auto"
      >
        <div class="d-flex flex-column">
          <span class="d-block count"> {{ getTotalProceed }} </span>
          <span>выручка за день</span>
        </div>
      </v-sheet>

      <v-menu class="menu-desktop" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-ripple class="profile-select" v-bind="attrs" v-on="on">
            <v-avatar
              v-if="!user || !user.image"
              color="#FF9100"
              class="menu-avatar mr-2"
              size="50"
            >
              <font-awesome-icon color="#ffffff" icon="user" />
            </v-avatar>
            <v-avatar v-else color="#FF9100" class="mr-2" size="50">
              <img :src="user.image" alt="user-avatar" />
            </v-avatar>
            {{ getUserName }}
          </div>
        </template>
        <v-list>
          <v-list-item @click="logout" link>
            <v-list-item-title>Выход</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import Vue from 'vue'
  import outside from '@/directives/outside'

  Vue.use(outside)

  export default {
    name: 'Header',
    data () {
      return {
        showHeader: false,
        isOrdersPage: false,
        showDatepicker: false,
        adminInfoTimeout: null,
        searchTimeout: null,
      }
    },
    watch: {
      '$route' () {
        this.showDatepicker = false
      },
      ordersFilterDate () {
      },
    },
    computed: {
      ...mapGetters({
        filters: 'orders/getOrderFilters',
        localStorageBranch: 'branches/getLocalStorageBranch',
      }),
      ...mapState({
        ordersSearchString: state => state.orders.ordersSearchString,
        ordersFilterDate: state => state.orders.ordersFilterDate,
        adminInfo: state => state.admin.adminInfo,
        user: state => state.auth.user || {},
        userFilials: state => state.auth.userFilials,
        showMainAside: state => state.app.showMainAside,
      }),
      search: {
        get () {
          return this.ordersSearchString
        },
        set (value) {
          clearTimeout(this.searchTimeout)
          this.searchTimeout = setTimeout(() => {
            this.$store.commit('orders/setOrdersSearchString', value)
          }, 1000)
        },
      },
      orderDate: {
        get () {
          return this.ordersFilterDate
        },
        set (value) {
          this.$store.commit('orders/setFilterDate', value)
        },
      },
      getOrdersCount () {
        return this.adminInfo.totalOrder ? this.$options.filters.currency(this.adminInfo.totalOrder) : '0'
      },
      getTotalProceed () {
        return this.adminInfo.totalProceed ? this.$options.filters.currency(this.adminInfo.totalProceed) + ' ₽' : '0 ₽'
      },
      selectedBranch: {
        get () {
          return this.localStorageBranch
        },
        set (value) {
          if (value.id !== this.selectedBranch.id) {
            this.$store.commit('branches/setCurrentBranch', value)
            window.location.reload()
          }
        },
      },
      getUserName () {
        return this.user ? this.user.name : '–'
      },
    },
    methods: {
      toggleHeader () {
        this.showHeader = !this.showHeader
      },
      toggleAside () {
        this.$store.commit('app/toggleAside', !this.showMainAside)
      },
      checkWindowWidth () {
        this.showHeader = window.innerWidth > 1024
      },
      getAdminInfo () {
        const params = {
          date: this.ordersFilterDate,
          filialId: this.selectedBranch.id,
        }
        this.$store.dispatch('admin/fetchAdminShortInfo', params)
          .then(() => {
            this.isLoading = false
          })
      },
      logout () {
        this.$store.dispatch('auth/logout').then(() => {
          window.location.href = '/login'
        })
      },
      checkOrdersPage () {
        this.isOrdersPage = this.$router.currentRoute.path === '/orders'
      },
      closeDatepicker () {
        this.showDatepicker = false
      },
    },
    mounted () {
      window.addEventListener('resize', this.checkWindowWidth)
      this.checkWindowWidth()
      this.getAdminInfo()
      clearInterval(this.adminInfoTimeout)
      this.adminInfoTimeout = setInterval(() => {
        this.getAdminInfo()
      }, 20000)
      this.checkOrdersPage()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.checkWindowWidth)
      clearInterval(this.adminInfoTimeout)
      clearInterval(this.searchTimeout)
      this.search = ''
    },
  }
</script>

<style lang="scss" scoped>
.app-bar-component {
  .hidden {
    display: none;
    opacity: 0;
  }
  .mobile-wrapper {
    display: none;
  }
  .v-bar--underline {
    ::v-deep {
      .v-toolbar__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .bar-button {
    height: 50px;
    font-size: 16px;
    background-color: $color-secondary !important;
    margin-right: 20px;
    border-radius: 5px;

    svg {
      margin-right: 15px;
    }
  }

  .bar-select {
    height: 73px;
    margin-right: 20px;
    max-width: 258px;
    border-radius: 5px;

    svg {
      margin-right: 12px;
    }
  }

  .profile-select {
    display: flex;
    align-items: center;
  }

  .bar-text-field {
    height: 73px;
    margin-right: 56px;
    border-radius: 5px;

    &::v-deep {
      .v-input__slot {
        background-color: $color-secondary !important;
        height: 50px;
      }

      label {
        color: #c4cdd9 !important;
      }
    }
  }

  .bar-sheet {
    background-color: $color-secondary;
    padding: 12px;
    border-radius: 5px;
    margin-right: 20px;

    span {
      font-size: 11px;
      line-height: 1;
    }

    .count {
      font-size: 24px;
      line-height: 29px;
    }
  }
  .datepicker-section {
    position: relative;
    z-index: 1;
    .datepicker {
      position: absolute;
      left: 0;
      top: 100%;
    }
  }
  .button-menu {
    display: none;
  }

  .mobile-menu-section {
    .menu-avatar {
      display: none;
    }
  }

  @include media-md {
    .v-bar--underline {
      ::v-deep {
        .v-toolbar__content {
          padding: 20px 5px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          height: 100% !important;
          overflow-y: auto;
        }
      }
    }
  }

  @include media-lg {
    font-size: 14px;
    position: relative;
    z-index: 1;
    .v-bar--underline {
      position: absolute;
      top: 73px;
      overflow: hidden;
      height: calc(100vh - 73px) !important;
      ::v-deep {
        .v-toolbar__content {
          padding: 20px 5px;
          display: block;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: flex-start;
          height: 100% !important;
          overflow-y: auto;
        }
      }
    }
    .mobile-wrapper {
      display: block;
      position: fixed;
      left: 0;
      top: 73px;
      width: 100%;
      height: calc(100vh - 73px);
      background-color: #fafafa;
      z-index: 1;
    }
    .profile-select {
      display: none;
    }
    .button-menu {
      display: block;
      margin-top: 0;
      @include fill-svg(#333333);
    }
    .select-filials {
      margin-right: 0;
      font-size: 14px;
      max-width: 100%;
      display: none;
    }
    .datepicker-section {
      width: 100%;
      margin-bottom: 10px;
    }
    .button-datepicker {
      margin-right: 5px;
      width: 100%;
    }
    .button-notifications {
      display: none;
      margin-bottom: 10px;
      width: 100%;
    }
    .button-calls {
      display: none;
      margin-bottom: 10px;
      width: 100%;
    }
    .text-field-search {
      display: none;
      margin-right: 0;
      width: 100%;
      margin-bottom: 10px;
    }
    .sheet-orders-count {
      margin-right: 5px;
      margin-bottom: 10px;
    }
    .sheet-total {
      margin-right: 5px;
      margin-bottom: 10px;
    }

    .mobile-menu-section {
      padding-top: 12px;
      .profile-select {
        display: block;
      }
      .menu-avatar {
        display: block;
        width: 20px;
      }
      .bar-select-mobile {
        margin: 0 10px 0 10px;
        height: auto;
      }
    }
  }
}
</style>
