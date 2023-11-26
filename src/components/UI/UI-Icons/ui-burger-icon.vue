<template>
  <svg
    class="ui-burger-icon"
    :fill="color" 
    :height="size"
    :width="size"
    :viewBox="viewBox" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    transform="rotate(0)">
    <g 
      id="SVGRepo_bgCarrier" 
      stroke-width="0"
    ></g>
    <g 
      id="SVGRepo_tracerCarrier" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier"><title>icn/menu</title><path d="M2 3h12a1 1 0 0 1 0 2H2a1 1 0 1 1 0-2zm0 4h12a1 1 0 0 1 0 2H2a1 1 0 1 1 0-2zm0 4h12a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2z" id="a"></path></g></svg>
</template>

<script>
// API
// :vieBox="'0 0 16 16'"
// :size="25"
// :color="'#5cc436'"
export default {
  name: 'ui-burger-icon',
  props: {
    viewBox: { type: String, default: '0 0 16 16' },
    size: { type: Number, default: 25 },
    color: { type: String, default: '#5cc436' },
  }
}
</script>
