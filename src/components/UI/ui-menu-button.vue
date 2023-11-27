<template>
  <div class="nav-menu__button nav-btn">
      <router-link
        class="nav-btn__link"
        :active-class="'active'"
        :class="{ 'inactive': !status }"
        :to="{ name: linkTo }"
      >
        <div class="nav-btn__title-wrapper">
          <div class="nav-btn__title">
            {{ title }}
          </div>
          <div 
            class="nav-btn__data"
            v-if="data"
          >
            / {{ data }}
          </div>
        </div>
      </router-link>
      <div class="nav-btn__icon-wrapper">
        <ui-arrow-side-icon
          class="nav-btn__icon"
          :direction="arrDirection"
          :size="size"
          :color="color"
          :viewBox="viewBox"
        ></ui-arrow-side-icon>
      </div>
  </div>
</template>

<script>
// API
// :linkTo="{ name: 'home' }"
// :title="'home'"
// :data="5"
// :status="true"
// :isArrowRight="true"
export default {
  name: 'ui-menu-button',
  data () {
    return {
      size: 25,
      color: '#1eb314',
      viewBox: '0 0 24.00 24.00',
    }
  },

  props: {
    linkTo: { type: String, default: () => { name: 'home' } },
    title: { type: String, default: 'button' },
    data: { type: Number | Boolean, default: false},
    status: { type: Boolean, default: true },
    isMobile: { type: Boolean, default: true }
  },
  computed: {
    arrDirection() { return this.isMobile ? 'rotate(-90)' : 'rotate(180)' }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
.nav-menu__button, .nav-btn {  
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  &__link {
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    background-color: $green-btn;
    border-radius: $base-radius;
    height: 3rem;
    width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    @include media('max', 'md') {
      height: 4rem;
      width: 20rem;
    }
  }
  &__title {
    @include media('max', 'md') {
      font-size: 2rem;
    }
  }
  &__link:hover::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 5px;
    background: $green-btn;
  }
  .active::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 5px;
    background: $green-btn;
  }
  .inactive {
    background-color: $grey-txt;
    pointer-events: none;
  }
  .inactive:hover {
    content: '';
    display: block;
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 5px;
    background: $grey-txt;
  }
  &__title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0rem 1rem;
  }
  // &__title {
  //   font-size: 1.2rem;
  // }
  // &__data {
  //   font-size: 1.2rem;
  // }
  // &__icon-wrapper {

  // }
  // &__icon {

  // }
}

</style>
