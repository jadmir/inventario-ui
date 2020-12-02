<template>
  <q-page class="login flex flex-center" style="background-color:#c1c1c1;">
    <div class="container text-center">
      <div class="Logo"></div>
      <!-- <h4 style="color: black;">Login</h4> -->
      <q-input
        outlined
        dense
        v-model.trim="usuario.nombre_user"
        label="Usuario"
        class="q-pa-sm"
      />
      <q-input
        outlined
        dense
        type="password"
        v-model.trim="usuario.pass_user"
        label="Contraseña"
        class="q-pa-sm"
        @keypress.enter="login"
      />
      <q-btn color="primary" label="Iniciar Sesión" @click="login" />
    </div>
  </q-page>
</template>

<script>
import MixinInit from '../mixin/MixinInit'

export default {
  name: 'Login',
  mixins: [MixinInit],
  data() {
    return {
      usuario: {
        nombre_user: '',
        pass_user: ''
      }
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.isLogged) {
        next({
          path: '/inicio'
        })
      }
    })
  },

  methods: {
    async login() {
      console.log('logeado', this.usuario)
      try {
        const { status, data } = await this.$axios.post('v1/auth/login', {
          ...this.usuario
        })

        console.log(status, data)
        if (status === 200) {
          const { user, token } = data
          this.$q.sessionStorage.set('identity', user)
          this.$q.sessionStorage.set('token', token)

          this.$store.commit('identity/token_update', token)
          this.$store.commit('identity/identity_update', user)
          this.$store.commit('identity/islogged_update', true)
          this.$router.replace({
            name: 'Inicio'
          })
        }
      } catch (error) {}
      // const res = await this.usuario.login()
      // if (!res) return

      // // this.init__();
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .container {
    background-color: white;
    border-radius: 15px;
    max-width: 400px;
    width: 90vw;
    padding: 20px;
    h4 {
      text-align: center;
    }
  }
}

.Logo {
  width: 250px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('https://docplayer.es/docs-images/107/176744668/images/1-0.jpg');
  margin: 1em auto;
  background-position: center;
}

.Footer {
  /* color: white; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2em;
  letter-spacing: 0.1rem;

  img {
    margin: 0 1em;
    width: 90px;
  }
}
</style>
