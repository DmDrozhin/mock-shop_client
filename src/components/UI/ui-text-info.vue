<template>
  <div 
    class="ui-text-info"
    :class="{'ui-text-info-inline': !isVertical}"
  >
    <div 
      v-if="label1" 
      class="ui-text-info__label1"
      :style="{ 'line-height': lineHeight + 'rem' }"
    >
      {{ label1 }}
    </div>
    <!-- v-if="num" -->
    <div
      class="ui-text-info__num"
      :style="{'font-size': fontSz + 'rem', 'width': room + 'rem'}">{{ num }}
    </div>
    <div 
      v-if="label2" 
      class="ui-text-info__label2"
      :style="{ 'line-height': lineHeight + 'rem' }"
    >
      {{ label2 }}
    </div>
  </div>
</template>

<script>
// API >>>>>>>>>>>
// :num="Number | 'String'"
// :fontSz="1.5"
// :label1="'text1'"
// :label2="'text2'"
// :isVertical="true"
// :room="6"
export default {
  name: 'ui-text-info',
  props: { 
    num: { type: Number|String, default: '' },
    fontSz: { type: Number, default: 1.5 },
    label1: { type: String, default: '' },
    label2: { type: String, default: '' },
    isVertical: { type: Boolean, default: false }, // could be raw
    room: { type: Number, default: 6 },
  },
  computed: {
    lineHeight() { return this.fontSz * 1.3 }
  },
}
</script>

<style scoped>
.ui-text-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* min-width: 100%; */
  gap: 0.5rem;
}
.ui-text-info-inline {
  flex-direction: row;
  /* justify-content: space-between; */
}
.ui-text-info__label1 {
  color: rgb(53, 53, 53);
  text-align: left;
}
.ui-text-info__label2 {
  color: rgb(53, 53, 53);
  text-align: left;
}
.ui-text-info__num {
  color: rgb(16, 108, 112);
  font-weight: 600;
  text-align: right;
}
</style>