<template>
  <q-page class="flex flex-center">
    <h3>BIENVENIDO</h3>
  </q-page>
</template>

<script>
import MixinInit from '../mixin/MixinInit'
export default {
  name: 'PageIndex',

  mixins: [MixinInit],

  methods: {
    update() {
      window.location.reload(true)
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (!vm.isLogged) {
        next({
          path: '/'
        })
      }
    })
  }
}
</script>
