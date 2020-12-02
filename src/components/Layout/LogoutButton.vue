<template>
  <q-menu>
    <q-list style="width: 125px; text-align: center;">
      <q-item>
        <q-item-section>
          {{ userName.toUpperCase() }}
        </q-item-section>
      </q-item>

      <q-item
        @click="logout"
        clickable
        v-close-popup
        style="background-color: #ff2222de;"
      >
        <q-item-section
          style="text-align: center;color:#ffffff;display: inline;margin: auto;"
        >
          SALIR <q-icon name="exit_to_app" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: 'LogoutButton',

  props: {
    userName: {
      type: String,
      required: true
    }
  },

  methods: {
    logout() {
      this.$q.sessionStorage.clear()
      window.location.reload(true)
    }
  }
}
</script>
