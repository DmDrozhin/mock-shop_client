export  default {
  // ACTIONS COMMON ****************************************************************
  ADD_TO_CART({commit, getters}, prod) {
    const cart = getters.CART
    // double check for ident of prods in cart
    const sameID = cart.find(el => el.id === prod.id && el.prodSize === prod.prodSize)
    if (cart.length === 0) commit('ADD_TO_CART', prod)
    else if (!sameID) commit('ADD_TO_CART', prod)
  },
  DELETE_FROM_CART({commit}, idx) {
    commit('DELETE_FROM_CART', idx)
  },
  UPDATE_CART({commit}, item) {
    commit('UPDATE_CART_ITEM', item)
  },
  MOVE_CART_TO_ORDER({commit}) {
    commit('MOVE_CART_TO_ORDER')
  },
  CANCEL_ORDER({commit}) {
    commit('CANCEL_ORDER')
  },
  TO_PROCESS_ORDER({commit}) {
    commit('PROCESS_ORDER')
  },
  // ADD_CURRENT_NOTICE({commit}, notice) {
  //   commit('SET_CURRENT_NOTICE', notice)
  // },
  // ADD_CURRENT_NOTICE_RESP({commit}, val) {
  //   commit('SET_CURRENT_NOTICE_RESP', val)
  // },
  // ADD_WINDOW_FREEZE_STATUS({commit}, val) {
  //   commit('SET_FEEZE_STATUS', val)
  // },
  SET_SCREEN({commit}, val) {
    commit('SET_SCREEN_SIZE', val)
  },

  SET_SELECTED_SIZE({commit}, val) {
    commit('SET_SELECTED_SIZE', val)
  },
  MOVE_CART_TO_ORDER({commit}, val) {
    commit('MOVE_CART_TO_ORDER', val)
  },

  SET_MODAL_WINDOW({commit}, val) {
    commit('SET_MODAL_WINDOW', val)
  },

  // CLEAR_MODAL_WINDOW({commit}, val) {
  //   commit('CLEAR_MODAL_WINDOW', val)
  // }
}


