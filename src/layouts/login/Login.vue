<template>
  <div>
    <v-container fluid>
      <router-view :key="$route.path" />
    </v-container>
  </div>
</template>

<script>
  import mixinSnackbarMessage from '@/mixins/snackbar-message'

  export default {
    name: 'LoginView',
    mixins: [mixinSnackbarMessage],
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
