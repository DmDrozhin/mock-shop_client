<template>
  <div class="ui-price-info">
    <span 
      v-if="label" 
      class="ui-price-info__label"
    >
      {{ label }}
    </span>
    <span
      class="ui-price-info__num"
      :style="{'font-size': fontSz + 'rem'}"
    >
      {{ price | toAccFormat }}
    </span>
    <span class="ui-price-info__txt"> грн.</span>
  </div>
</template>

<script>
// API >>>>>>>>>>>
// :price="Number"
// :fontSz="1.5"
// :label="'text'"
export default {
  name: 'ui-price-info',
  props: { 
    price: { type: Number, default: 0, },
    fontSz: { type: Number, default: 14 },
    label: { type: String, default: '' },
    direction: { type: String, default: 'column'} // could be raw
  },
}
</script>

<style>
.ui-price-info {
  display: flex;
  flex-direction: column;
  color: rgb(16, 108, 112);
  font-weight: 600;
  min-width: 100%;
}
.ui-price-info__label {
  color: rgb(53, 53, 53);
  font-weight: normal;
  margin-bottom: -0.3rem;
  text-align: right;
}
.ui-price-info__num {
  margin-bottom: -0.6rem;
  text-align: right;
}
.ui-price-info__txt {
  color: rgb(53, 53, 53);
  text-align: right;
}
</style>