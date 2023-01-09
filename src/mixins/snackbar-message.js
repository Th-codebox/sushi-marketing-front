export default {
  methods: {
    showErrorMessage (text) {
      this.$store.commit('app/setSnackbar', {
        value: true,
        text,
        color: 'red',
      })
    },
    showSuccessMessage (text) {
      this.$store.commit('app/setSnackbar', {
        value: true,
        text,
        color: 'green',
      })
    },
  },
}
