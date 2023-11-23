<template>
  <div class="ui-size-selector">
    <div class="label-txt">Розмір:</div>
      <div class="input-block">
        <select 
        :value="currentSize" 
        v-model="currentSize"
        @change="changeSize()">
          <!-- <option disabled value="?">?</option> -->
          <option 
            v-for="item in options" 
            :key="item.id" 
            :value="item">
            {{ item }}
          </option>
        </select>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ui-size-selector',
  data () {
    return {
      currentSize: ''
    }
  },
  props: {
    options: { type: Array, default: () => [] }
  },
  computed: {
    filteredSize() { return this.$store.state.productsCurrentSize }
  },
  watch: {
    filteredSize(sz) {
      if (sz) { 
        this.currentSize = sz
        this.$emit('changeSize', sz)
      }
    }
  },

  methods: {
    changeSize () {
      this.$emit('changeSize', this.currentSize)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.ui-size-selector {
  display: flex;
  justify-content: flex-end;
  gap: .6rem;
  align-items: center;
  & .label-txt {
    flex: 0 1 4rem;
    line-height: 2rem;
    text-align: end;
    background-color: $semi-trans-bgrnd;
  }
  .input-block {
    & select {
      border: unset;
      width: 3.5rem;
      padding: 0.75rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      text-transform: uppercase;
      /* Arrow */
      appearance: none;
      background-image: url('@/assets/images/decr_arrow.svg');
      background-repeat: no-repeat;
      background-position: right .5rem top 55%;
      background-size: 1.2rem auto;
        &:focus {
        outline: none;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>