export default {
  // MAIN ARRAY WITH PRODUCTS
  PRODUCTS: (state) => state.products,
  PRODUCTS_SIZE_LIST: (state) => state.productsSizeList,
  PRODUCTS_SELECTED_SIZE: (state) => state.selectedSize,

  PRODUCTS_FILTERED_ARR: (state) => {
    const sz = state.selectedSize
    // console.log(zs)
    if (sz === 'all') return state.products
    else return state.products.filter(prod => prod.available.find(obj => obj[sz] > 0))
  },

  // for some reasons this getter doesn't work, looks like comp 'product-filters' can't wait so much
  // PRODUCTS_LIST_OF_SIZES: (state) => {
  //   let source = state.products[0].available
  //   if (source) {
  //     let arr = [...source]
  //     //arr.map(el => Object.keys(el)[0])
  //     const res = arr.map(el => Object.keys(el)[0])
  //     res.unshift('all')
  //     return res
  //   }
  // },

  // CART GETTERS
  CART: (state) => state.cart,
  CART_PRODS_QT: (state) => state.cart.length,
  CART_SUM: (state) => {
    const cart = state.cart
    let sum = 0
    cart.forEach(el => sum += el.cartSum)
    return sum
  },

  CART_QT: (state) => {
    let qt = 0
    state.cart.forEach(it => {
      it.cartQt > 0 ? qt += Number(it.cartQt) : qt += Number(it.prodQt)
    })
    return qt > 0 ? qt : 0
  },

  // ORDER GETTERS
  ORDER: (state) => state.order,
  ORDER_SUM: (state) => {
    let sum = 0
    state.order.forEach(it => sum += it.cartSum)
    return sum
  },
  ORDER_QT: (state) => {
    let qt = 0
    state.order.forEach(it => qt += +it.cartQt)
    return qt
  },

  PURCHASE: (state) => state.purchase,
  
  GET_SERVER_RESP: (state) => state.serverResp,

  SCREEN: (state) => {
    const scr = state.screen
    // if (scr >= 320 && scr < 480) return 'mobile-1'
    if (scr <= 576) return 'sm'
    if (scr > 576 && scr <= 768) return 'md'
    if (scr > 768 && scr <= 992) return 'lg'
    if (scr > 992 && scr <= 1280 ) return 'xl'
    if (scr > 1280) return 'xxl'
  },

  IS_LOADER: (state) => state.isLoaderActive,

  CLICKED_DOM_ELEMENT: (state) => state.clickedDOMElement,

  MODAL: (state) => state.modal,

  MODAL_IF_MODE: (state) => (id, mode) => {
    const mod = state.modal
    if (Number(mod.id) === Number(id) && mod["remove-mode"] === mode && mod.result) return true
    else return false
  }
}