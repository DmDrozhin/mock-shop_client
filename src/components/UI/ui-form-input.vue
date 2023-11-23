<template>
  <div class="ui-form-input wrapper input">
    <div class="input__icon">
      <i class="material-icons">{{ icon }}</i>
    </div>
    <input      
      class="input__input"
      :type="type" 
      :placeholder="placeholder" 
      :value="value"
      :required= required
      @change="handleInp($event.target.value)"
    >
    <div 
      class="input__cursor">
    </div>
  </div>
</template>

<script>
// API
// :icon="'alternate_email'"
// :type="'text'"
// :placeholder="'placeholder'"
// :value="value"
// :required="false"
// @submit="value = $event"

export default {
  name: 'ui-form-input',
  data() {
    return {}
  },
  props: {
    icon: { type: String, default: 'alternate_email' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: 'placeholder' },
    value: { type: String, default: 'value' },
    required: { type: Boolean, default: false }
  },
  methods: {
    handleInp(val) {
      this.$emit('handleInput', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.ui-form-input, .wrapper, .input {
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  &__icon {

  }
  &__input {
    padding: 0.5rem 1rem;
    border-radius: $base-radius;
    border: 1.5px solid $green-btn;
    flex-grow: 1;
    &:focus {
      outline: none;
      border: 1.5px solid $green-btn;
    }
    &:focus ~ .input__cursor {
      position: absolute;
      display: block;
      top: 0;
      right: -2px;
      width: 10px;
      height: 100%;
      background-color: $green-btn;
    }
    &:required {
      &:focus ~ .input__cursor {
        position: absolute;
        display: block;
        top: 0;
        right: -2px;
        width: 10px;
        height: 100%;
        background-color: $warn-txt;
      }
    }
  }

}
</style>