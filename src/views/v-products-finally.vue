<template>
  <div class="v-products-finally finally">

    <div class="finally__header">
      <h2 class="finally__title">{{ title }}</h2>
      <div class="finally__time"><h4>{{ time }}</h4></div>
    </div>

    <div class="finally__section">
      <div class="finally__message">
        <p>Замовлення - або відправлено - resp.status === 201, або не відправлено</p>
        <p>Надалі повертаємось до вибору товарів або пропонуємо upsales</p>
      </div>
      <div class="finally__server-resp">
        <h3>Поточна відповідь відправки:
          <p v-if="GET_SERVER_RESP">{{ GET_SERVER_RESP }}</p>
        </h3>
      </div>
    </div>
    
    <div class="finally__footer">
      <h3>Some footer part</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export  default {
  name: 'v-products-finally',
  
  data () {
    return {
      title: 'Фінішна сторінка',
    }
  },
  computed: {
    ...mapGetters(['GET_SERVER_RESP']),
    time () { return new Date().toLocaleString() },
    currentPage() {return this.$route.name},
    parentHeight() {return this.$parent.$el.offsetHeight }

  },

  watch: {},

  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.v-products-finally,
.finally {
  background-color: #ffffffc1;
  // border: 2px solid gold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  &__header {
    flex: 0 1 auto;
    // background-color: #a9e7a5;
  }
  &__title {
    margin-bottom: 2rem;
  }
  &__time {
    text-align: left;
    margin-bottom: 4rem;
  }
  &__section {
    flex: 1 1 auto;
    // background-color: #ccc;
  }
  &__message p {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 4rem;
  }
  &__server-resp > h3 > p {
    color: cornflowerblue;
    text-decoration: wavy;
    font-size: 1.5rem;
    margin-left: 1rem;
    border: 1px solid rgb(78, 78, 78);
    margin-bottom: 1rem;
  }
  &__footer {
    /* flex: 0 1 auto; */
    // background-color: #66a3e8;
    flex: 0 1 auto;
  }
}

</style>