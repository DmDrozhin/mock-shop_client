<template>
  <div 
    class="ui-modal-wind modal" 
  >
    <transition name="fade">
      <div        
        class="modal__background"
        v-if="MODAL.isBaseActive"

        :class="{ 'frozen-background': MODAL.isFrozenBg }"
      >
      </div>
    </transition>

    <transition name="prompt">
      <div 
        v-if="MODAL.isModalActive" 
        class="modal__slide-wind"
      >
        <ui-modal-wind-item
          :title="MODAL.title"
          :message="MODAL.message"
          :data="MODAL.data"
          :prompt="MODAL.prompt"
          @response="handleResponse($event)"
        ></ui-modal-wind-item>
      </div>
    </transition>
    
  </div>
</template>

<script>
// Readme:
// API GETTER 'MODAL' OBJ {
//    id: // message id
//    isBaseActive: true, // toggle activation of background
//    isFrozenBg: false, // makes background block wind events
//    isModalActive: true, // toggle side sliding window
//    result: true / false // result of modal prompt
//    title: 't-shirt 1',
//    message: 'для чоловіків / артикль Т1' / розмір М,
//    data: 2500986,
//    prompt: 'Додати до кошику?',
//    page: current page name => this.$route.name,
//    'remove-mode': true / false whether add prod or cancel it and remove
// }
import { mapGetters, mapActions } from 'vuex'
import uiModalWindItem from '@/components/UI/ui-modal-wind-item.vue'
export default {
  components: { uiModalWindItem },
  name: 'ui-modal-wind',
  data() {
    return {}
  },
  watch: {
  },
  computed: {
    ...mapGetters(['MODAL'])
  },
  methods: {
    ...mapActions(['SET_MODAL_WINDOW']),

    handleResponse(val) {
      let data = structuredClone(this.MODAL)
      data.result = val
      data.isModalActive = false
      data.isBaseActive = false
      data.isFrozenBg = false
      this.SET_MODAL_WINDOW(data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/styles/styles.scss';
.ui-modal-wind, .modal {
  &__background {
    z-index: 80;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #00000023;
  }
  &__slide-wind {
    z-index: 90;
    position: fixed;
    pointer-events: auto;
    top: 0;
    right: 0;
    height: 100vh;
    width: 30%;
    background-color: #0000007d;
    @include media('max', 'lg') {
      width: 40%;
    }
    @include media('max', 'md') {
      width: 50%;
    }
    @include media('max', 'sm') {
      width: 100%;
    }
  }
}
// ADD STYLES
.frozen-background {
  scrollbar-gutter: stable;
  pointer-events: auto;
  z-index: 80;
  background-color: #00000081;
  scroll-behavior: smooth;
}

/* TRANSITION BACK-GROUND */
.fade-enter-active {
	transition: opacity .3s ease;
}
.fade-leave-active {
	transition: opacity .3s ease;
}
.fade-enter, .fade-bg-leave-to {
	opacity: 0;
}

/* TRANSITION MODAL */
.prompt-enter-active {
  transition: transform 0.5s ease;
}
.prompt-leave-active  {
  transition: transform 0.5s ease;
}
.prompt-enter, .prompt-leave-to {
  transform: scale(0);
  /* transform: translate(30vw); */
}
</style>
