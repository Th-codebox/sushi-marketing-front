<template>
  <div class="logout">
    <p>Выход</p>
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  }
</script>
