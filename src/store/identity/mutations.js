// eslint-disable-next-line
const identity_update = (state, payload) => {
  state.identity = payload
}

// eslint-disable-next-line
const token_update = (state, payload) => {
  state.token = payload
}

// eslint-disable-next-line
const islogged_update = (state, payload) => {
  state.isLogged = payload
}

// eslint-disable-next-line
const centorno_update = (state, payload) => {
  state.centorno = payload
}

// eslint-disable-next-line
const ntipcamb_update = (state, payload) => {
  state.ntipcamb = payload
}

// eslint-disable-next-line
const nvaligv__update = (state, payload) => {
  state.nvaligv_ = payload
}

export default {
  identity_update,
  token_update,
  islogged_update,
  centorno_update,
  ntipcamb_update,
  nvaligv__update
}
