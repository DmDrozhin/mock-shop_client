<template>
  <div class="ui-text-info">
    <span 
      v-if="label1" 
      class="ui-text-info__label1"
      :style="{ 'line-height': lindeHeight + 'rem' }"
    >
      {{ label1 }}
    </span>
    <span
      v-if="num"
      class="ui-text-info__num"
      :style="{'font-size': fontSz + 'rem'}">{{ num }}
    </span>
    <span 
      v-if="label2" 
      class="ui-text-info__label2"
      :style="{ 'line-height': lindeHeight + 'rem' }"
    >
      {{ label2 }}
    </span>
  </div>
</template>

<script>
// API >>>>>>>>>>>
// :num="Number | 'String'"
// :fontSz="1.5"
// :label1="'text1'"
// :label2="'text2'"
export default {
  name: 'ui-text-info',
  props: { 
    num: { type: Number | String, default: 0, },
    fontSz: { type: Number, default: 1.5 },
    label1: { type: String, default: '' },
    label2: { type: String, default: '' },
  },
  computed: {
    lindeHeight() { return this.fontSz * 1.3 }
  },
}
</script>

<style scoped>
.ui-text-info {
  display: flex;
  align-items: center;
  min-width: 100%;
  gap: 0.5rem;
}
.ui-text-info__label1 {
  color: rgb(53, 53, 53);
  font-weight: normal;
  text-align: left;
}
.ui-text-info__label2 {
  color: rgb(53, 53, 53);
  font-weight: normal;
  text-align: left;
}
.ui-text-info__num {
  color: rgb(16, 108, 112);
  font-weight: 600;
}
</style>