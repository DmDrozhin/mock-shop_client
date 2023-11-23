<template>
  <svg
    class="ui-arrow-icon"
    fill="#ccc"
    :height="size"
    :width="size"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512.00 512.00"
    xml:space="preserve"
    stroke="#ccc"
    :transform="direction"
    stroke-width="0.00512"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="#CCCCCC"
      stroke-width="2.048"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <g>
            <path
              d="M256,0C114.88,0,0,114.88,0,256s114.88,256,256,256s256-114.88,256-256S397.12,0,256,0z M256,490.667 c-129.387,0-234.667-105.28-234.667-234.667S126.613,21.333,256,21.333S490.667,126.613,490.667,256S385.387,490.667,256,490.667 z"
            ></path>
            <path
              d="M365.76,280.533l-99.093,99.093V107.093c0-5.333-3.84-10.133-9.067-10.88c-6.613-0.96-12.267,4.16-12.267,10.56v272.96 l-99.093-99.2c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827l117.333,117.333 c4.16,4.16,10.88,4.16,15.04,0l117.333-117.333c4.053-4.267,3.947-10.987-0.213-15.04 C376.533,276.587,369.92,276.587,365.76,280.533z"
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'ui-arrow-icon',
  props: {
    direction: { type: String, default: 'rotate(0)', required: true },
    size: { type: Number, default: 25, required: true },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
svg {
  z-index: -1;
}
</style>
