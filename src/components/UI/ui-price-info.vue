<template>
  <div 
    class="ui-price-info"
    :class="{'ui-price-info-inline': !isVertical}"
  >
    <span 
      v-if="label" 
      class="ui-price-info__label"
      :class="{'ui-price-info__label-inline': !isVertical}"
    >
      {{ label }}
    </span>
    <span
      class="ui-price-info__num"
      :class="{'ui-price-info__num-inline': !isVertical}"
      :style="{'font-size': fontSz + 'rem'}"
    >
      {{ price | toAccFormat }}
    </span>
    <span 
      class="ui-price-info__txt"
      :class="{'ui-price-info__txt-inline': !isVertical}"

    > грн.</span>
  </div>
</template>

<script>
// API >>>>>>>>>>>
// :price="Number"
// :fontSz="1.5"
// :label="'text'"
// isVertical="true"
export default {
  name: 'ui-price-info',
  props: { 
    price: { type: Number, default: 0, },
    fontSz: { type: Number, default: 14 },
    label: { type: String, default: '' },
    isVertical: { type: Boolean, default: true} // could be raw
  },
}
</script>

<style scoped>
.ui-price-info {
  display: flex;
  flex-direction: column;
  color: rgb(16, 108, 112);
  font-weight: 600;
  min-width: 100%;
}
.ui-price-info-inline {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
.ui-price-info__label {
  color: rgb(53, 53, 53);
  font-weight: normal;
  margin-bottom: -0.3rem;
  text-align: right;
}
.ui-price-info__label-inline {
  margin-bottom: 0;
}
.ui-price-info__num {
  margin-bottom: -0.6rem;
  text-align: right;
}
.ui-price-info__num-inline {
  margin-bottom: 0rem;
  text-align: center;
}
.ui-price-info__txt {
  color: rgb(53, 53, 53);
  text-align: right;
}
.ui-price-info__txt-inline {
  text-align: left;
}
</style>