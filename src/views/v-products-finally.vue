<template>
  <div class="v-products-finally finally">
    <div class="finally__wrapper">

      <div class="finally__container">
      
        <div class="finally__header">
          <h2 class="finally__title">{{ title }}</h2>
          <div class="finally__time"><h4>{{ time }}</h4></div>
        </div>

        <div class="finally__body">
          <div class="finally__message">
            <p>Замовлення - або відправлено - resp.status === 201, або не відправлено</p>
            <p>Надалі повертаємось до вибору товарів або пропонуємо upsales</p>
          </div>
          <div class="finally__server-resp" v-if="GET_SERVER_RESP">
            <h3>Поточна відповідь відправки: <span>{{ GET_SERVER_RESP }}</span></h3>
          </div>
        </div>
      
      </div>

      <div class="finally__footer">
        <h3>Some footer part</h3>
      </div>

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

<style scoped>
@import '@/styles/variables.scss';
.v-products-finally,
.finally {
  background-color: #ffffffc1;
  height: 100%;
  /* border: 2px solid teal; */
  padding: 2rem 1rem;

}
.finally__wrapper {
  /* border: 2px solid hotpink; */
  height: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
.finally__container {

}
.finally__header {

}
.finally__title {
  margin-bottom: 2rem;
}
.finally__section {
}
.finally__time {
  text-align: left;
  margin-bottom: 4rem;
}
.finally__message p {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 4rem;
}
.finally__server-resp h3 span {
  color: cornflowerblue;
  text-decoration: wavy;
  font-size: 1.5rem;
  margin-left: 1rem;
}
.finally__footer {

}

</style>