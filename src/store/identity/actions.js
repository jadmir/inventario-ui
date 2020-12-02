import { SessionStorage } from 'quasar'

const getIdentity = ({ commit, state }) => {
  if (state.identity) return
  if (!SessionStorage.has('identity')) return
  const identity = SessionStorage.getItem('identity')
  commit('identity_update', identity)
}

const getToken = ({ commit, state }) => {
  if (state.token) return
  if (!SessionStorage.has('token')) return
  const token = SessionStorage.getItem('token')
  commit('token_update', token)
}

const getIsLogged = ({ commit }) => {
  const logged = !SessionStorage.isEmpty()
  commit('islogged_update', logged)
}

export default {
  getIdentity,
  getToken,
  getIsLogged
}
