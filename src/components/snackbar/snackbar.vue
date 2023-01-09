<template>
  <div class="snackbar-component">
    <v-snackbar
      v-model="computedVisibility"
      transition="scale-transition"
      top
      :color="snackbarColor"
      :timeout="snackbarTimeout"
    >
      <span>{{ snackbarText }}</span>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'CustomSnackbar',
    computed: {
      ...mapState({
        showSnackbar: (state) => state.app.showSnackbar,
        snackbarText: (state) => state.app.snackbarText,
        snackbarColor: (state) => state.app.snackbarColor,
        snackbarTimeout: (state) => state.app.snackbarTimeout,
      }),
      computedVisibility: {
        get () {
          return this.showSnackbar
        },
        set (value) {
          this.$store.commit('app/setSnackbar', {
            value,
            text: '',
          })
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  //
</style>
