<template>
  <div class="ui-modal-wind-item note">
    <div class="note__wrapper">
      <div class="note__container container">
        <div class="container__title"
        >{{ title }}</div>
        <div 
          class="container__message" 
          v-if="message"
        >{{ message }}
        </div>
        <div 
          class="container__data" 
          v-if="data"
        >{{ data }}
        </div>
        <div 
          class="container__prompt" 
          v-if="prompt"
        >{{ prompt }}
        </div>
      </div>
      <div class="note__buttons-wrapper buttons" v-if="prompt">
        <ui-order-button
          class="buttons__yes ui-button"
          :isActive="true"
          :frontIcon="false"
          :icon="'thumb_up'"
          :color="'#fff'"
          @handlePrompt="sendResponse(true)"
        >Yes</ui-order-button>
        <ui-order-button
          class="buttons__no ui-button"
          :isActive="true"
          :frontIcon="false"
          :icon="'thumb_down'"
          :color="'#fff'"
          @handlePrompt="sendResponse(false)"
        >No</ui-order-button>
      </div>
    </div>


  </div>
</template>

<script>
import uiOrderButton from './ui-order-button.vue'
// API
// :title="'modal title'"
// :message="'modal message'"
// :data="'modal data'"
// :prompt="'modal prompt'" // prompt | false
// @prompt="handlePrompt($event)" // true | false

export default {
  components: { uiOrderButton },
  name: 'ui-modal-wind-item',
  props: {
    title: { type: String, default: 'title' },
    message: { type: String, default: '' },
    data: { type: String|Number, default: 0 },
    prompt: { type: String, default: '' },
  },
  data() {
    return {}
  },
  methods: {
    sendResponse(resp) {
      this.$emit('response', resp)
    }
  }

}
</script>

<style lang="scss" scoped>
$modal-width: 95%;
$modal-height: 15rem;
$modal-brd-radius: 10px;
.ui-modal-wind-item,
.note {
  position: absolute;
  right: 0;
  top: calc(50% - $modal-height / 2);
  display: flex;
  justify-content: center;
  align-items: center;
  width: $modal-width;
  min-height: $modal-height;
  border: 2px solid #fff;
  border-top-left-radius: $modal-brd-radius;
  border-bottom-left-radius: $modal-brd-radius;
  border-right: none;
  &__wrapper {
    flex: 0 0 auto;
    padding: 1rem;
    width: 100%;
    // border: 1px solid rgb(13, 255, 0);
  }
  &__container, 
  .container {
    flex: 1 0 auto;
    // border: 1px solid red;
    width: 100%;
    color: #fff;
    text-align: center;
    
    // padding: 0.5rem 1rem 1rem 1rem;
    &__title {
      font-size: 2rem;
      line-height: 3rem;
      text-transform: uppercase;
      letter-spacing: 0.5rem;
      font-weight: 600;
    }
    &__message {
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 3rem;
      text-transform: uppercase;
      letter-spacing: 0.3rem;
    }
    &__data {
      font-size: 1.2rem;
      line-height: 2.2rem;
    }
    &__prompt {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
  }

  &__buttons-wrapper,
  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    &__yes {
      flex: 1 1 auto;
    }
    &__no {
      flex: 1 1 auto;
    }
    // .ui-button {
    
    // }
  }
}
</style>