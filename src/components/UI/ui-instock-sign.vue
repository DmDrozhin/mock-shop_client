<template>
  <div 
    class="ui-instock-sign"
    v-show="status"
    :style="{ 'border-color': borderColor, 'color': textColor }"
  >
    <ui-check-on-icon
      class="ui-instock-sign-icon"
      :size=iconSize
    ></ui-check-on-icon>

    <div class="ui-instock-sign-txt">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-instock-sign',
  props: {
    status: { type: Boolean, default: true, required: true },
    label: { type: String, default: '' },
    iconSize: { type: Number, default: 25 }
  },
  data() {
    return {
    }
  },
  computed: {
    // signTXT() { return this.status ? "в наявності" : "відсутній" },
    borderColor() { return this.status ? '#329c26' : '#474444' },
    textColor() { return (this.status ? '#329c26' : '#474444') }
  },
}
</script>

<style>
.ui-instock-sign {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  min-width: 100%;
  min-height: 100%;
  /* padding: 0.4rem; */
  gap: 0.1rem;
}
.ui-instock-sign-icon {
  padding: 0;
}
.ui-instock-sign-txt {
  flex-basis: auto;
  font-size: 1rem;
  font-weight: 600;
  flex-grow: 1;
  text-align: center;
}
</style>