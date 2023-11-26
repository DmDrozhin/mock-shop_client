<template>
  <!-- <<<<<<<<<<< DOM ELs OnClick EVENT LISTENER -->
  <div 
    class="app"  
    @click.capture="$store.commit('SET_CLICKED_ELEMENT_CLASS', $event.target.className)"
    :style="{'overflow': modalActive}"
    
  >   <!-- <<<<<<<<<<< MODAL Wind -->
    <ui-modal-wind></ui-modal-wind>
    <!-- <<<<<<<<<<< LOADER -->
    <div class="app__loader-block">
      <ui-loader v-if="IS_LOADER"></ui-loader>
    </div>
    
    <header>
      <!-- <<<<<<<<<<< TITLE RAW -->
      <div class="app__title title flex-wrapper">
        <ui-main-icon 
          :size="mainIcon.size"
          :viewBox="mainIcon.viewBox"
          class="title__main-icon"
        ></ui-main-icon>
        <h1 class="title__text">{{ title }}</h1>
      </div>

      <div class="app__header header flex-wrapper">
        <div 
          class="header__nav-burger"
          v-if="isMobile"
        >
          <ui-nav-burger
            class="header__ui-nav-burger"
            :isActive="flagNAV"
            :size="60"
            :color="'#fff'"
            :viewBox="'0 0 16 16'"
            @clickBurger="(toggleNAV())"
          ></ui-nav-burger>
        </div>
        <div class="header__nav-menu-wrapper">
          <transition name="nav-menu">
            <nav 
              class="header__nav-menu nav-menu"
              v-if="flagNAV"
            >
              <div class="nav-menu__button">
                <ui-menu-button
                  :linkTo="'products'"
                  :title="'products'"
                  :data="false"
                  :status="true"
                  :isMobile="isMobile"
                ></ui-menu-button>
              </div>
            
              <div class="nav-menu__button">
                <ui-menu-button
                  :linkTo="'cart'"
                  :title="'cart'"
                  :data="CART_PRODS_QT > 0 ? CART_PRODS_QT : false"
                  :status="CART_PRODS_QT > 0"
                  :isMobile="isMobile"
                ></ui-menu-button>
              </div>
            
              <div class="nav-menu__button">
                <ui-menu-button
                  :linkTo="'order'"
                  :title="'order'"
                  :data="ORDER.length > 0 ? ORDER.length : false"
                  :status="ORDER.length > 0"
                  :isMobile="isMobile"
                ></ui-menu-button>
              </div>
              <div class="nav-menu__button nav-menu__nav-icon nav-icon">
                <ui-database-icon
                  class="nav-icon__icon"
                  :size="60"
                ></ui-database-icon>
              </div>
            </nav>
          </transition>
          <hr class="hr1 header__hr1">
        </div>

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
import uiNavBurger from '@/components/UI/ui-nav-burger.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'app',
  components:{ uiMenuButton, uiModalWind, uiNavBurger },
  data () {
    return {
      title: 'sport clothes mock shop',
      screen: '',
      mainIcon: { size: 120, viewBox: '0 0 1024 1024' },
      flagNAV: false
    }
  },
  mixins: [console],
  methods: {
    ...mapActions (['GET_PRODS_FM_SERVER', 'SET_SCREEN']),

    toggleNAV() { this.flagNAV = !this.flagNAV }
  },
  computed: {
    ...mapGetters(['CART_PRODS_QT', 'ORDER', 'IS_LOADER', 'MODAL', 'SCREEN']),
    showQt () { return this.CART_PRODS_QT > 0 },
    modalActive() { return this.MODAL.isBaseActive ? 'hidden' : 'auto' },
    isMobile() { return this.SCREEN === 'sm' || this.SCREEN === 'md' ? true : false },
    // isTablet() { return this.SCREEN === 'lg' ? true : false },
    // isDeskTop() { return this.SCREEN === 'xl' || this.SCREEN === 'xxl' ? true : false },
    
  },
  watch: {
    SCREEN(scr) {
      if (scr === 'sm' || scr === 'md') {
        this.mainIcon.size = 100
        this.mainIcon.viewBox = '100 100 850 850'
      }
    },
    isMobile(val) { !val ? this.flagNAV = true : this.flagNAV = false }
  },

  mounted () {
    this.GET_PRODS_FM_SERVER()

    this.$nextTick(window.addEventListener('resize', () => {
      this.SET_SCREEN(window.innerWidth)
    }))
  },

  onBeforeUnmount () {
    window.removeEventListener('resize')
  }
}
</script>

<style lang="scss" scoped>

@import '../src/styles/styles.scss';
.app {
  z-index: 0;
  padding: 0 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scrollbar-gutter: stable;
  &__loader-block {
    $loader-size: 5rem;
    position: absolute;
    width: $loader-size;
    height: $loader-size;
    right: 3rem;
    top: 3rem;
  }
  &__title, .title {
    position: relative;
    justify-content: space-between;
    margin: 1rem 0;
    gap: 1rem;
    // &__main-icon {}
    &__text {
      flex: 1 0 auto;
    }

    @include media('max', 'lg') {
      &__text {
        font-size: 2.5rem;
        letter-spacing: 1.8px;
      }
    }
    @include media('max', 'md') {
      margin-bottom: 5rem;
      flex-direction: column;
      gap: 0.5rem;
      // &__main-icon {}
      &__text {        
        // font-size: 1.6rem;
        // letter-spacing: 1.4px;
        align-self: center;
        // align-self: flex-end;

      }
    }
    @include media('max', 'sm') {
      &__text {
        font-size: 2.2rem;
        letter-spacing: 1.2px;
        text-wrap: pretty;
      }
    }
  }
  &__header, .header {
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    &__nav-menu-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }
    @include media('max', 'md') {
      justify-content: center;
    }
    &__nav-burger {
      position: absolute;
      top: 1rem;
      right: 1rem;
    } 
    @include media('min', 'md') {
      display: block;
    }
    &__nav-menu,
    .nav-menu {
      flex: 0 1 fit-content;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      @include media('max', 'md') {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }
      // &__button {

      // }
      &__nav-icon, .nav-icon {
        position: relative;
        &::before {
          position: absolute;
          content: '';
          width: 71px;
          height: 80px;
          border-radius: 50%;
          top: -10px;
          left: -12px;
          background-color: rgb(255, 255, 255);
          z-index: -1;
        }
      }
    }
    &__hr1 {
      flex: 0 1 auto;
      @include media('max', 'lg') {
        display: none;
      }
    }
  }
  .main-wrapper {
    transition: all 0.5s ease;
  }
// GENERAL BLOCKS
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
  // MEDIA REQUESTS
  
  
}

// TRANSITION

// NAV MENU
.nav-menu-enter-active {
  transition: transform 0.5s ease, opacity 0.5s ease-in;
}
.nav-menu-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease-out;
}
// CORRECT CLASS FOR ENTER IS "enter" !!!!! Vue 2
.nav-menu-enter,
.nav-menu-leave-to {
  opacity: 0;
  transform: translateY(-5rem);
}


// MAIN WRAPPER


</style>
