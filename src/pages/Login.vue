<template>
  <div class="login-page">
    <div class="login-page_box">
      <div class="login-page_logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div class="text-h6 mb-2 text-center" v-text="`Вход в систему`" />
      <v-form ref="form" action="#" @submit="login">
        <v-text-field-simplemask
          v-model="phone"
          :options="{
            inputMask: '+#(###)###-##-##',
            outputMask: '###########',
            empty: null,
            applyAfter: false,
            alphanumeric: true,
            lowerCase: false,
          }"
          label="Номер телефона"
          placeholder="+7(000)000-00-00"
          required
        />
        <v-text-field
          v-model="password"
          type="password"
          label="Пароль"
          required
        />
        <div class="text-center">
          <v-btn type="submit" rounded large color="primary" @click.prevent="login" block>
            Войти
          </v-btn>
        </div>
      </v-form>
      <div v-if="load" class="login-page_loading">
        <v-sheet color="green"
                 elevation="5"
                 height="100"
                 rounded
                 width="200"
                 type="success"
                 class="d-flex align-center justify-center"
                 dark
        >
          <span class="font-weight-medium">Вход в аккаунт</span>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script>
  import User from './../models/user'

  export default {
    data () {
      return {
        user: new User('', ''),
        phone: '',
        password: '',
        load: false,
      }
    },
    computed: {
      loggedIn () {
        return this.$store.getters['auth/loggedIn']
      },
    },
    methods: {
      login () {
        if (this.phone && this.password) {
          this.load = true
          const payload = {
            phone: this.phone,
            password: this.password,
          }
          this.$store.dispatch('auth/login', payload)
            .then(() => {
                    // this.$router.push('/orders')
                    console.log(this.$store.getters['auth/loggedIn'])
                    window.location.href = '/'
                  },
                  (error) => {
                    this.load = false
                    this.message = (error.response && error.response.data) || error.message || error.toString()
                  },
            )
        }
      },
    },
    mounted () {
      if (this.loggedIn) {
        this.$router.push({ path: '/orders', name: 'orders' })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login-page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 52, 255, 0.4)), url("/img/bg4.jpg");
    background-position: center center;
    min-height: 100vh;
    margin: -12px;
    background-repeat: no-repeat;
    background-size: cover;

    .primary {
      background-color: #ff9100 !important;
      border-color: #ff9100 !important;
    }

    &_loading {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.75);
      position: absolute;
      top: 0;
      left: 0;
    }

    &_box {
      max-width: calc(100% - 20px);
      width: 400px;
      background-color: #fff;
      padding: 25px 35px;
      border-radius: 10px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
      box-sizing: border-box;
      position: relative;
    }

    &_logo {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 15px;

      img {
        height: 40px;
        width: auto;
      }
    }
  }
</style>
