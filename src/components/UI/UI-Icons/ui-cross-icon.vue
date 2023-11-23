<template>
  <svg 
    class="ui-cross-icon" 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
      <path d="M19 5L4.99998 19M5.00001 5L19 19" 
        :stroke="color" 
        stroke-width="1.5" 
        stroke-linecap="round" 
        stroke-linejoin="round">
      </path> 
    </g>
  </svg>
</template>

<script>
export default {
  name: 'ui-cross-icon',
  props: {
    size: { type: Number, default: 25, required: true },
    color: { type: String, default: '#ccc' }
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
