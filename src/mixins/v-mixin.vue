<script>
export default {
  methods: {
    makeID () {
      return Number((Date.now()/100).toFixed().slice(4))
    },
  }
}
</script>
