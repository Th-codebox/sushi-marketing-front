<template>
  <div>
    <v-header v-if="!isUnautorizedPage" />
    <v-aside v-if="!isUnautorizedPage" />
    <v-container fluid>
      <router-view :key="$route.path" />
    </v-container>
  </div>
</template>

<script>
  import vHeader from '@/components/header/Header'
  import vAside from '@/components/aside/Aside'
  import mixinSnackbarMessage from '@/mixins/snackbar-message'

  export default {
    name: 'DefaultView',
    mixins: [mixinSnackbarMessage],
    components: {
      vHeader,
      vAside,
    },
    computed: {
      isUnautorizedPage () {
        return this.$route.name === 'Вход' || this.$route.name === 'Регистрация'
      },
    },
    methods: {
      getFilials () {
        const params = {
          limit: 100000,
          offset: 0,
          page: 1,
        }
        this.$store.dispatch('branches/fetchBranches', params)
          .then(res => {
            if (res.code === 200) {
              //
            } else {
              this.showErrorMessage(res.response.data.message)
            }
          })
      },
    },
    mounted () {
      if (this.$router.currentRoute.path !== '/login') {
        this.getFilials()
      }
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .v-main {
      transition: none !important;
      padding-top: 0 !important;
    }

    @include media-lg {
      .v-main {
        padding-top: 20px !important;

        .container {
          padding: 0 5px;
        }
      }
    }
  }
</style>
