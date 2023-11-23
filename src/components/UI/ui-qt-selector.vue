<template>
  <div class="v-qt-selector">
    <div class="qt-label">
      <div class="qt-label__txt" v-if="!isWarnActive">Кількість:</div>
      <div class="qt-label__alert" v-else>Не вірне число:</div>
    </div>
    <div class="qt-block">
      <button class="qt-block__up-arr" @click="incrQt()" 
        :disabled="inStockQt <= inpQt">
      </button>
      <input type="number"
        class="qt-block__input"
        v-model="inpQt"
        min="1"
        :max="inStockQt"
        :class="{ 'qt-block__warn-qt': !isInStock }">
      <button class="qt-block__down-arr" @click="decrQt()" :disabled="inpQt <= 1"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-qt-selector',
  data () {
    return {
      inpQt: 0,
      isWarnActive: false
    }
  },
  props: {
    isInStock: {type: Boolean, default: true},
    inStockQt: {type: Number, default: 0},
    currQt: {type: Number, default: 0}
  },

  watch: {
    inpQt (curr, prev) {
      // this.validate(curr)
      let qt = [curr, prev]
      this.$emit('updateQt', qt)
    },
    currQt (qt) {
      if (this.inpQt !== this.currQt) {
        this.inpQt = qt
      }
    },
    isWarnActive (warn) {
      this.$emit('changeWarn', warn)
    }
  },
  methods: {
    validate (curr, prev) {
      // if (curr < 1 || curr === undefined || curr > this.inStockQt) {
      if (curr < 1 && curr === undefined && curr > this.inStockQt) {
        this.isWarnActive = true
      } else this.isWarnActive = false
      if (curr > this.inStockQt) {
        setTimeout(() => {this.inpQt = this.inStockQt}, 3000)
      }
    },
    incrQt () { return this.inpQt++ },
    decrQt () { if (this.inpQt > 1) { return this.inpQt-- } }
  },

  mounted () {
    this.inpQt = this.currQt
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
  .v-qt-selector {
    display: flex;
    justify-content: flex-end;
    gap: .6rem;
    align-items: center;
    .qt-label {
      &__txt {
        flex: 0 1 5rem;
        text-align: end;
        line-height: 2rem;
        padding: 0 0 0 .3rem;
        background-color: $semi-trans-bgrnd;
      }
      &__alert {
        width: 3rem;
        color: $warn-txt;
        line-height: 1.4;
        background-color: $semi-trans-bgrnd;
      }
    }
    .qt-block {
      &__up-arr {
        @include up-arr-btn;
        margin: 0 auto .1rem auto;
        &:hover {
          cursor: pointer;
        }
      }
      &__input {
        border: unset;
        margin: 0 auto 0 auto;        
        width: 3rem;
        padding: 0.75rem;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, 0.1);
        appearance: none;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        &:focus {
          appearance: none;
          outline: none;
        }
        &:hover {
          appearance: none;
          outline: none;
        }
      }
      &__warn-qt {
        background-color: rgb(255, 237, 237);
      }
      &__down-arr {
        @include down-arr-btn;
        margin: .1rem auto 0 auto;
        &:hover {
          cursor: pointer;
        }     
      }
    }
  }
</style>
