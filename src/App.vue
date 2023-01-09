<template>
  <v-fade-transition mode="out-in">
    <v-app>
      <custom-snackbar />
      <component :is="layout" />
    </v-app>
  </v-fade-transition>
</template>

<script>
  import '@/styles/overrides.scss'
  import colors from 'vuetify/lib/util/colors'
  import CustomSnackbar from '@/components/snackbar/snackbar'
  import mixinSnackbarMessage from '@/mixins/snackbar-message'

  const defaultLayout = 'default-view'

  export default {
    name: 'App',
    mixins: [mixinSnackbarMessage],
    components: {
      DefaultView: () => import('./layouts/default/View'),
      LoginLayout: () => import('./layouts/login/Login'),
      CustomSnackbar,
    },
    metaInfo: {
      title: 'F.A.K.T CRM',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    primary: {
      base: colors.orange.base,
      darken: colors.orange.darken2,
    },
    data () {
      return {
        showIncomingCall: false,
        showIncomingRequest: false,
        showReplenishmentModal: false,
        showButtonOrder: false,
        callEvent: {},
      }
    },
    computed: {
      layout () {
        return this.$route.meta.layout || defaultLayout
      },
    },
  }
</script>

<style lang="scss">
  body {
    margin: 0;
  }
</style>
