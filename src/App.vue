<template>
  <!-- <<<<<<<<<<< DOM ELs OnClick EVENT LISTENER -->
  <div 
    class="app"  
    @click.capture="$store.commit('SET_CLICKED_ELEMENT_CLASS', $event.target.className)"
    :style="{'overflow': modalActive}"
    
  >   <!-- <<<<<<<<<<< MODAL Wind -->
    <ui-modal-wind></ui-modal-wind>
    <!-- <<<<<<<<<<< MAIN ICON -->
    <ui-main-icon 
        :size="mainIcon.size"
        :viewBox="mainIcon.viewBox"
        class="app__main-icon"
    ></ui-main-icon>
    <!-- <<<<<<<<<<< LOADER -->
    <div class="app__loader-block">
      <ui-loader v-if="IS_LOADER"></ui-loader>
    </div>
        <!-- <<<<<<<<<<< BURGER -->
    <div 
      class="app__nav-burger"
      v-if="isMobile"
    >
      <ui-nav-burger
        class="app__ui-nav-burger"
        :isActive="flagNAV"
        :size="60"
        :color="'#fff'"
        :viewBox="'0 0 16 16'"
        @clickBurger="(toggleNAV())"
      ></ui-nav-burger>
    </div>
    
    <header>
      <!-- <<<<<<<<<<< TITLE RAW -->
      <h1 class="app__title">{{ title }}</h1>

      <div class="app__header header flex-wrapper">
        <div class="header__nav-menu-wrapper">
          <transition name="nav-menu">
            <nav 
              class="header__nav-menu nav-menu"
              v-if="flagNAV"
            >
              <div 
                class="nav-menu__btn-wrapper btn-comp-ui"
                @click="toggleNAV()"
              >
                <ui-menu-button
                  class="btn-comp-ui__ui-btn"
                  :linkTo="'products'"
                  :title="'products'"
                  :data="false"
                  :status="true"
                  :isMobile="isMobile"
                ></ui-menu-button>
              </div>
            
              <div 
                class="nav-menu__btn-wrapper btn-comp-ui"
                @click="toggleNAV()"
              >
                <ui-menu-button
                  class="btn-comp-ui__ui-btn"
                  :linkTo="'cart'"
                  :title="'cart'"
                  :data="CART_PRODS_QT > 0 ? CART_PRODS_QT : false"
                  :status="CART_PRODS_QT > 0"
                  :isMobile="isMobile"
                ></ui-menu-button>
              </div>
            
              <div 
                class="nav-menu__btn-wrapper btn-comp-ui"
                @click="toggleNAV()"
              >
                <ui-menu-button
                  class="btn-comp-ui__ui-btn"
                  :linkTo="'order'"
                  :title="'order'"
                  :data="ORDER.length > 0 ? ORDER.length : false"
                  :status="ORDER.length > 0"
                  :isMobile="isMobile"
                  @click="toggleNAV()"
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

    <main class="main">
      <router-view class="main__view"></router-view>
        <!-- <keep-alive>
          <router-view></router-view>
        </keep-alive> -->
    </main>

    <footer class="footer">
      <hr class="hr3 footer__hr">
      <p class="footer__text">All rights reserved ®</p>
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
      flagNAV: false,
    }
  },

  methods: {
    ...mapActions (['GET_PRODS_FM_SERVER', 'SET_SCREEN']),

    toggleNAV() { if (this.isMobile) this.flagNAV = !this.flagNAV },
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
    this.SET_SCREEN(window.innerWidth)
  },

  onBeforeUnmount () {
    window.removeEventListener('resize')
  }
}
</script>

<style lang="scss" scoped>

@import '../src/styles/styles.scss';
.app {
  padding: 0 1rem;
  height: inherit;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scrollbar-gutter: stable;
  position: relative;
  @include media('max', 'md') {
    padding: 0;
  }
  &__main-icon {
    position: absolute;
    top: 3rem;
    left: 3rem;
    @include media('max', 'md') {
      top: 1rem;
      left: 1rem;
    }
    @include media('max', 'sm') {
      left: 1rem;
      top: 0rem;
    }
  }
  &__title {
    position: relative;
    margin: 5rem 10rem;
    @include media('max', 'sm') {
      margin: 9rem 5rem 7rem 5rem;
    }
  }
  &__loader-block {
    $loader-size: 5rem;
    position: absolute;
    width: $loader-size;
    height: $loader-size;
    right: 3rem;
    top: 3rem;
    @include media('max', 'md') {
      right: 3rem;
      top: 8rem;
    }
    @include media('max', 'sm') {
      right: 1rem;
      top: 8.5rem;
    }
  }
  &__nav-burger {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
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
      // &__button {}
      &__nav-icon, .nav-icon {
        margin-left: 1rem;;
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
  .main {
    // height: 100%;
    &__view {
      height: 100%;
      padding-top: 3rem;
    }
  }
// GENERAL STRUCTURE
  header {
    // z-index: 10;
    flex: 0 1 auto;
  }
  main {
    flex: 1 1 auto;
    margin-bottom: 2rem;
    // border: 5px solid navy;
  }
  footer, 
  .footer {
    flex: 0 1 auto;
    // &__hr {}
    &__text {
      text-align: center;
      margin-bottom: 1rem;
      color: #000000;
      font-weight: 600;
      font-size: 1.3rem;
    }
  }  
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
