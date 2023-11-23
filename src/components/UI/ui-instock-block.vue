<template>
  <div class="ui-instock-block">
    <ui-instock-block-item 
      class="ui-instock-block-item"
      tag="div"
      v-for="it in instockArr"
      :key="it.sz"
      :instockEl="it"
    >
    </ui-instock-block-item>
  </div>
</template>

<script>
import uiInstockBlockItem from '@/components/UI/ui-instock-block-item.vue'
export default {
  components: { uiInstockBlockItem },
  name: 'ui-instock-block',
  data() {
    return {
    }
  },
  props: { 
    available: {type: Array, default: () => [] }
  },
  computed: {
    instockArr() {
      let arr = []
      this.available.forEach(el => {
        const intEl = Object.entries(el)[0]
        arr.push({sz: intEl[0], qt: intEl[1]})
      })
      return arr
    }
  }
}
</script>

<style scoped>
.ui-instock-block {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>