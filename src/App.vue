<template>
  <!-- <<<<<<<<<<< DOM ELs OnClick EVENT LISTENER -->
  <div 
    class="app"  
    @click.capture="$store.commit('SET_CLICKED_ELEMENT_CLASS', $event.target.className)"
    :style="{'overflow': modalActive}"
    
  >   <!-- <<<<<<<<<<< MODAL Wind -->
    <div class="app___ui-modal-window">
      <ui-modal-wind></ui-modal-wind> 
    </div>
    <!-- <<<<<<<<<<< LOADER -->
    <div class="app__loader-block">
      <ui-loader v-if="IS_LOADER"></ui-loader>
    </div>
    
    <header>
      <!-- <<<<<<<<<<< TITLE RAW -->
      <div class="app__title flex-wrapper">
        <ui-main-icon :size="100"></ui-main-icon>
        <h1>{{ title }}</h1>
      </div>

      <div class="header flex-wrapper">
        <nav class="header__nav-menu nav-menu">
          <div class="nav-menu__button">
            <ui-menu-button
              :linkTo="'products'"
              :title="'products'"
              :data="false"
              :status="true"
            ></ui-menu-button>
          </div>
        
          <div class="nav-menu__button">
            <ui-menu-button
              :linkTo="'cart'"
              :title="'cart'"
              :data="CART_PRODS_QT > 0 ? CART_PRODS_QT : false"
              :status="CART_PRODS_QT > 0"
            ></ui-menu-button>
          </div>
        
          <div class="nav-menu__button">
            <ui-menu-button
              :linkTo="'order'"
              :title="'order'"
              :data="ORDER.length > 0 ? ORDER.length : false"
              :status="ORDER.length > 0"
            ></ui-menu-button>
          </div>
          <div class="nav-menu__button database-icon-wrapper">
            <ui-database-icon
              class="database-icon"
              :size="60"
            ></ui-database-icon>
          </div>
        </nav>
        <hr class="hr1 header__hr1">
      </div>

    </header>

    <main>
      <div class="main-wrapper">
        <router-view></router-view>
      </div>
      <!-- <div class="main-wrapper">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div> -->      
    </main>

    <footer>
      <div class="footer">
        <hr class="hr3 footer__hr">
        <p class="footer__text">All rights reserved ®</p>
      </div>
    </footer>

  </div>
</template>

<script>
import uiMenuButton from '@/components/UI/ui-menu-button.vue'
import uiModalWind from '@/components/UI/ui-modal-wind.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'app',
  components:{ uiMenuButton, uiModalWind },
  data () {
    return {
      title: 'sport clothes mock shop',
      isMobile: false
    }
  },
  mixins: [console],
  methods: {
    ...mapActions (['GET_PRODS_FM_SERVER', 'SET_MOBILE'])
  },
  computed: {
    ...mapGetters(['CART_PRODS_QT', 'ORDER', 'IS_LOADER', 'MODAL']),
    showQt () { return this.CART_PRODS_QT > 0 },
    modalActive() { return this.MODAL.isBaseActive ? 'hidden' : 'auto' }
  },
  watch: {
    isMobile (val) { this.SET_MOBILE(val) }
  },
  beforeMount() {
    let screen = window.innerWidth
    if (screen < 768) { this.isMobile = true }
  },
  // beforeMount() {
  //   this.GET_PRODS_FM_SERVER()
  // },
  mounted () {
    this.GET_PRODS_FM_SERVER()

    this.$nextTick(window.addEventListener('resize', () => {
      window.innerWidth < 768 ? this.isMobile = true : this.isMobile = false
    }))
  },
  onBeforeUnmount () {
    window.removeEventListener('resize')
  }
}
</script>

<style lang="scss" scoped>

@import '../src/styles/variables';

.app {
  z-index: 0;
  padding: 0 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scrollbar-width: thin;
  header {
    z-index: 10;
    flex: 0 1 auto;
  }
  main {
    flex: 1 1 auto;
    margin-bottom: 2rem;
  }
  footer {
    flex: 0 1 auto;
    .footer{
      &__text {
        text-align: center;
        margin-bottom: 1rem;
      }
    }

  }
  &__loader-block {
    $loader : 5rem;
    position: absolute;
    width: $loader;
    height: $loader;
    right: 3rem;
    top: 3rem;
    @media (max-width: 980px) {
      top: 3rem
    }
    @media (max-width: 580px) {
      top: 10rem
    }
  }
  &__title {
    position: relative;
    justify-content: center;
    margin: 0 0 2rem 0;
    img {
      height: 3rem;
      @media (max-width: 580px) {
        height: 4rem;
      }
    }
    h1 {
      margin-left: 1rem;
      @media (max-width: 580px) {
        font-size: 2rem;
        line-height: 4rem;
      }
    }
    // &__notice-wrapper {
    // }
  }

  .header {
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    @media (max-width: 580px) {
      justify-content: center;
    }

    &__nav-menu,
    .nav-menu {
      flex: 0 1 fit-content;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      @media (max-width: 580px) {
        flex-direction: column;
        justify-content: center;
        align-content: center;
      }
      .database-icon-wrapper {
        position: relative;
      }
      // .database-icon-wrapper::before {
      //   position: absolute;
      //   content: '';
      //   width: 71px;
      //   height: 80px;
      //   border-radius: 50%;
      //   top: -10px;
      //   left: -12px;
      //   background-color: yellow;
      //   z-index: -1;
      // }
    }
    &__hr1 {
      flex: 1 1 35%;
      @media (max-width: 580px) {
        flex-basis: 100%;
      }
    }
  }

}
</style>
