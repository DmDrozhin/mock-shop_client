import Vue from 'vue'
import Vuex from 'vuex'
import actionsCommon from '@/store/actions/actions'
import actionsApi from '@/store/actions/actions-api'
import getters from '@/store/getters/getters'
import mutations from '@/store/mutations/mutations'

const actions = {...actionsCommon, ...actionsApi}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productsSizeList: [],
    selectedSize: 'all', //'all', 's', 'm', 'l', 'xl'
    
    cart: [],
    order: [],
    purchase: [],
    serverResp: '',

    screen: '',
    isLoaderActive: false,

    clickedDOMElement: '',

    modal: {
      id: undefined,
      isBaseActive: false,
      isFrozenBg: false,
      isModalActive: false,
      result: undefined,
      title: 'some title',
      message: 'some message',
      data: '',
      prompt: 'Do you?',
      page: undefined,
      'remove-mode': undefined
    }
  },
  getters,
  mutations,
  actions
})
