<template>
  <div class="ui-modal-wind'">
    <transition name="base">
      <div        
        v-if="MODAL.isBaseActive"
        class="base-wrapper"
        :class="{ 'frozen-background': MODAL.isFrozenBg }"
      >
      </div>
    </transition>
    
    <transition name="modal">
      <div v-if="MODAL.isModalActive" class="modal-slide-wind">
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
// API GETTER 'MODAL' {
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


<style scoped>
body {
  overflow: hidden!important;
}
.ui-modal-wind {
  position: relative;
}
.base-wrapper {
  z-index: 80;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000023;
  overflow: hidden;

}
.modal-slide-wind {
  z-index: 90;
  position: fixed;
  /* position: absolute; */
  pointer-events: auto;
  top: 0;
  right: 0;
  height: 100vh;
  width: 30%;
  background-color: #0000007d;
  /* transform: translateX(0); */
}
.frozen-background {
  pointer-events: auto;
  z-index: 80;
  background-color: #00000081;
  scroll-behavior: smooth;
}
/* TRANSITION BASE */
.base-enter-active {
  transition: opacity 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.base-leave-active {
  transition: opacity 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.base-enter-from,
.base-leave-to {
  opacity: 0;
}
.base-enter-to,
.base-leave-from {
  opacity: 1;
}
/* TRANSITION MODAL */

.modal-enter-active {
  transition: transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.modal-leave-active  {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.modal-enter-from,
.modal-leave-to {
  transform: translateX(100%);

}
.modal-enter-to,
.modal-leave-from {
  transform: translateX(0);
}
/* .modal-move{
  transition: all 1s ease;
}*/
</style>
