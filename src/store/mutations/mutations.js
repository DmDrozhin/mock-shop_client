export default {
  SET_PRODS_TO_STATE: (state, prods) => {
    prods.map(el => {
      // el.pickedSize = ''
      el.prodSize = ''
      el.cartId = 0
      el.cartQt = 0
      el.cartSum = 0
      el.isInCart = false
      el.id = Math.floor((1 + Math.random()) * 0x10000)
      el.orderTime = ''
    })
    state.products = [...prods]
    
    let sizeList = ['all']
    prods[0].available.forEach(el => sizeList.push(Object.keys(el)[0]))
    state.productsSizeList = sizeList
  },

  ADD_TO_CART: (state, prod) => state.cart.push(prod),

  // TO CART MUTATIONS

  UPDATE_CART_ITEM: (state, prod) => {
    state.cart.map(it => {
      if (it.cartId === prod.cartId) {
        it.cartQt = prod.cartQt
        it.cartSum = prod.cartSum
      }
    })
  },
  DELETE_FROM_CART: (state, idx) => {
    const trgID = state.cart.findIndex(it => it.cartId === idx)
    state.cart.splice(trgID, 1)
  },

  // ORDER MUTATIONS

  MOVE_CART_TO_ORDER: (state) => {
    const cart = [] = [...state.cart]
    const prods = state.products
    const order = state.order
    let counter = 0
    // Update the 'products' with products quantity info
    cart.forEach(it => {
      const idx = prods.findIndex(el => el.id === it.id) // correct
      // let trg = Object.values(prods[idx].available.find(el => el[it.prodSize]))[0] // Qt
      prods[idx].available.map(el => {
        if (el[it.prodSize]) el[it.prodSize] -= it.cartQt
        else return el
      })  
      console.log('... added to ORDER ', ++counter)
    })
    // Searching existed in 'order' products and adding new ones
    cart.forEach(it => {
      const prod = order.find(el => el.id === it.id && el.prodSize === it.prodSize) // correct
      if (prod) {
        prod.cartQt += it.cartQt
        prod.cartSum += it.cartSum
      } else order.push(it)
    })
    state.cart = []
  },


  CANCEL_ORDER: (state) => {
    const order = [] = [...state.order]
    const prods = state.products
    const cart = state.cart
    order.forEach(it => {
      const idx = prods.findIndex(el => el.id === it.id) // correct
      prods[idx].available.map(el => {
        if (el[it.prodSize]) el[it.prodSize] += it.cartQt
        else return el
      })  
      console.log('... moved back from ORDER to CART')
    })
    // Searching existed in 'cart' products and adding canceled from 'order'
    order.forEach(it => {
      const prod = cart.find(el => el.id === it.id && el.prodSize === it.prodSize) // correct
      if (prod) {
        prod.cartQt += it.cartQt
        prod.cartSum += it.cartSum
      } else cart.push(it)
    })
    state.order = []
  },

  SET_SERVER_RESP: (state, val) => state.serverResp = val,

  CLEAR_PURCHASE: (state) => state.purchase = [],

  // OTHER MUTATIONS
  
  SET_MOBILE_MODE: (state, val) => state.isMobile = val,

  SET_LOADER: (state, val) => state.isLoaderActive = val,

  SET_CLICKED_ELEMENT_CLASS: (state, val) => state.clickedDOMElement = val,

  SET_SELECTED_SIZE: (state, val) => state.selectedSize = val,

  // MODAL WINDOW

  SET_MODAL_WINDOW: (state, val) => state.modal = val,

}