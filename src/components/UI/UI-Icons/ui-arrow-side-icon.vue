<template>
  <svg 
    class="ui-arrow-side-icon" 
    :width="size" 
    :height="size" 
    :viewBox="viewBox" 
    version="1.1"
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" 
    :fill="color"
    stroke="#0be05c">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <title>chevron-right</title>
      <desc>Created with Sketch Beta.</desc>
      <defs> </defs>
      <g id="Page-1" stroke="none" stroke-width="1" :fill="color" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-473.000000, -1195.000000)" :fill="color">
          <path
            d="M486.717,1206.22 L474.71,1195.28 C474.316,1194.89 473.678,1194.89 473.283,1195.28 C472.89,1195.67 472.89,1196.31 473.283,1196.7 L484.566,1206.98 L473.283,1217.27 C472.89,1217.66 472.89,1218.29 473.283,1218.69 C473.678,1219.08 474.316,1219.08 474.71,1218.69 L486.717,1207.75 C486.927,1207.54 487.017,1207.26 487.003,1206.98 C487.017,1206.71 486.927,1206.43 486.717,1206.22"
            id="chevron-right" sketch:type="MSShapeGroup"> </path>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
// API
// :direction="'rotate(0)'"
// :size="25"
// :color="'#1eb314'"
// :viewBox="'0 0 24.00 24.00'"
export default {
  name: 'ui-arrow-side-icon',
  props: {
    direction: { type: String, default: 'rotate(0)', required: true },
    size: { type: Number, default: 25, required: true },
    color: { type: String, default: '#1eb314' },
    viewBox: { type: String, default: '0 0 24.00 24.00' },
  }
}
// viewBox="0 -5 24 24" -5 moves up / down by 'Y' axial
</script>

<style scoped>/* svg {
  z-index: 1;
} */</style>
