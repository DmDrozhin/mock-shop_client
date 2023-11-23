<template>
  <svg 
    class="ui-arrow-filled-icon" 
    :width="size" 
    :height="size" 
    :viewBox="viewBox"
    :fill="color"
    xmlns="http://www.w3.org/2000/svg" 
    :transform="direction"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M12.2048 7.29258L18.1189 15.7412C18.49 16.2715 18.1107 17 17.4635 17L6.53652 17C5.88931 17 5.50998 16.2715 5.88114 15.7412L11.7952 7.29258C11.8947 7.1504 12.1053 7.1504 12.2048 7.29258Z"
        :fill="color">
      </path>
    </g>
  </svg>

</template>

<script>
export default {
  name: 'ui-arrow-filled-icon',
  props: {
    direction: { type: String, default: 'rotate(0)', required: true },
    size: { type: Number, default: 25, required: true },
    color: { type: String, default: '#1eb314' },
    viewBox: { type: String, default: '0 -5 24 24' },
  }
}
// viewBox="0 -5 24 24" -5 moves up / down by 'Y' axial
</script>

<style scoped>
/* svg {
  z-index: 1;
} */
</style>
