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
          :direction="direction"
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
export default {
  name: 'ui-menu-button',
  data () {
    return {
      direction: "'rotate(0)'",
      size: 25,
      color: '#1eb314',
      viewBox: '0 0 24.00 24.00',
    }
  },

  props: {
    linkTo: { type: String, default: () => { name: 'home' } },
    title: { type: String, default: 'button' },
    data: { type: Number | Boolean, default: false},
    status: { type: Boolean, default: true }
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
  &__title {
    font-size: 1.2rem;
  }
  &__data {
    font-size: 1.2rem;
  }
  &__icon-wrapper {

  }
  &__icon {

  }
}

// .nav-menu__button, .nav-btn {
//   border-radius: $base-radius;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   z-index: 1;
//   margin-bottom: 1rem;
//   a {
//     min-width: 8rem;
//   }
//   @media (max-width: 580px) {
//     align-items: center;
//     flex-direction: column;
//     margin-bottom: .2rem;
//     a {
//       width: 10rem;
//       padding: 1rem;
//       font-size: 1.2rem;
//     }
//   }
//   &__link {

//   }
//   &__title {

//   }
// }
// a {
//   display: block;
//   min-width: 100%;
//   min-height: 100%;
//   text-decoration: none;
//   padding: .8rem 1.5rem;
//   border-radius: .2rem;
//   background-color: forestgreen;
//   color: #fff;
//   text-align: center;
// }
// .a-active {
//   box-shadow: 3px 3px 3px gray;
// }
// .a-inactive {
//   background-color: grey;
//   pointer-events: none;
// }
</style>
