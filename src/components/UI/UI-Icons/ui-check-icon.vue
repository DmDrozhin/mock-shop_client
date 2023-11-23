<template>
  <svg
    class="ui-check-icon"
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier"> 
      <path d="M4 12.6111L8.92308 17.5L20 6.5" 
        :stroke="color" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round">
      </path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'ui-check-icon',
  props: {
    size: { type: Number, default: 25, required: true },
    color: { type: String, default: '#1eb314' }
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
