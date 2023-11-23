import axios from "axios"
import localDB from '@/assets/mock-DB/local-db.js'

export  default {
  // API ACTIONS ****************************************************************
  GET_PRODS_FM_SERVER({commit}, actions) {
    commit('SET_LOADER', true)
    return axios.get('http://localhost:3001/products')
    .then(resp => { 
      commit('SET_SERVER_RESP', resp)
      if (resp.statusText === 'OK') {
        console.log('...taking json from server')
        commit('SET_PRODS_TO_STATE', resp.data)
        return resp.data
      }
    })
    .then(commit('SET_LOADER', false))
    .catch((err) => {
      console.error('POST request error: ', err)
      console.log('... ERROR with SERVER / retreiving PRODs locally')
      commit('SET_PRODS_TO_STATE', localDB)
      return localDB
    })
  },


  SEND_ORDER_TO_SERVER({ commit }, customer, ordNum) {
    const order = this.getters.PURCHASE
    const toSend = {}
    toSend[ordNum] = order
    toSend.customer = customer
    return axios.post('http://localhost:3002/orders', toSend, {
        headers: { 'Content-Type': 'application/json' },
        maxRedirects: 0,
        // timeout: 5000
      })
    .then((resp) => {
      commit('SET_SERVER_RESP', resp)
      if (resp.status === 201) { commit('CLEAR_PURCHASE') }
    })
    .then(commit('SET_LOADER', false))
    .catch((err) => {
      commit('SET_SERVER_RESP', err)
      console.error('POST request error: ', err) 
    })
  }
}