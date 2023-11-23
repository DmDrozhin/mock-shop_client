<template>
  <svg
    class="ui-star-icon"
    :fill="color" 
    :width="size" 
    :height="size" 
    viewBox="0 0 32 32" 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <title>star</title>
      <path
        d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z">
      </path>
    </g>
  </svg>
  
</template>

<script>
export default {
  name: 'ui-star-icon',
  props: {
    size: { type: Number, default: 25, required: true },
    color: { type: String, default: '#367f06' }
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
