<template>
  <svg 
    class="ui-cross-cancel-icon"
    :width="size" 
    :height="size"
    :fill="color" 
    :viewBox="viewBox" 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    :stroke="color" 
    transform="rotate(0)">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.128"></g><g id="SVGRepo_iconCarrier"> <title></title> <path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path> </g></svg>
</template>

<script>
export default {
  name: 'ui-cross-cancel-icon',
  props: {
    size: { type: Number, default: 25, required: true },
    color: { type: String, default: '#d86f6f' },
    viewBox: { type: String, default: '0 0 32 32' },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
