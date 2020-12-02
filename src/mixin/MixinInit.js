import { mapState, mapActions } from 'vuex'

import api from 'src/utils/api'

import GxDate from 'src/utils/date'

export default {
  created() {
    this.init__()
  },

  computed: {
    ...mapState({
      identity: state => state.identity.identity,
      token: state => state.identity.token,
      isLogged: state => state.identity.isLogged
    }),

    URL() {
      return process.env.VUE_APP_SERVER
    }
  },

  methods: {
    ...mapActions({
      getIdentity: 'identity/getIdentity',
      getToken: 'identity/getToken',
      getIsLogged: 'identity/getIsLogged'
    }),

    init__: function() {
      this.getIdentity()
      this.getToken()
      this.getIsLogged()

      this.$axios.defaults.headers.common = {
        token: this.token
      }
      api.defaults.headers.common = {
        token: this.token
      }
    },

    /**
     * Obtiene la fecha del día
     */
    getToday: function() {
      const d = new GxDate()

      return d.getFechaActual()
    },

    /**
     * Obtiene el primer dia del mes
     */
    getFirstDay: function() {
      const d = new GxDate()

      return d.getFirstDay()
    }
  }
}
