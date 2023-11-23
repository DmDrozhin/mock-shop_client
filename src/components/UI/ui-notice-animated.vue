<template>
  <div class="v-transition-notice notice-block">
    <div class="notice-block__wrapper">
      <transition-group name="v-trans" class="notice-block__group" tag="div">
        <div class="notice a-active" v-for="current in toShowArr" :key="current.ID">
          <div class="notice__prod-name">{{ current.prodName }}/ {{ current.ID }}</div>
          <div class="notice__msg-block flex-wrapper">
            <div class="notice__icon-1">
              <i class="material-icons">{{ current.msgIcon1 }}</i>
            </div>
            <div class="notice__txt">
              <p>{{ current.msgTxt }}</p>
            </div>
            <div class="notice__icon-2">
              <i class="material-icons">{{ current.msgIcon2 }}</i>
            </div>
          </div>
          <div v-if="current.isButtonActive" class="notice__buttons-wrapper flex-wrapper">
            <button class="button btn" @click="clicked(true, current.ID)">
              <div class="button__btn-content-wrapper">
                <div class="button__icon">
                  <i class="material-icons">{{ current.btnYesIcon }}</i>
                </div>
                <div class="button__txt">
                  {{ current.btnYesTxt }}
                </div>
              </div>
            </button>
            <button class="button btn" @click="clicked(false, current.ID)">
              <div class="button__btn-content-wrapper">
                <div class="button__icon">
                  <i class="material-icons">{{ current.btnNoIcon }}</i>
                </div>
                <div class="button__txt">
                  {{ current.btnNoTxt }}
                </div>
              </div>
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'ui-notice-animated',
  data () {
    return {
      toShow: false,
      toShowArr: [],
      freezeWindow: false,

      NOTICE_ARCHIVE_ADD_CART: {
        ID: '',
        msgIcon1: 'add_shopping_cart',
        msgIcon2: 'check',
        msgTxt: 'Додано у кошик',
        isButtonActive: false,
        btnYesIcon: 'check_circle_outline',
        btnYesTxt: 'Так',
        btnNoIcon: 'not_interested',
        btnNoTxt: 'Ні',
        prodName: '',
        userResp: '', // Not in use
        showTime: 1500,
      },

      NOTICE_CART_ADD_ORDER: {
        ID: '',
        msgIcon1: 'playlist_add_check',
        msgIcon2: 'question_mark',
        msgTxt: 'Оформити вибрані товари',
        isButtonActive: true,
        btnYesIcon: 'check_circle_outline',
        btnYesTxt: 'Так',
        btnNoIcon: 'not_interested',
        btnNoTxt: 'Ні',
        prodName: '', // Not in use
        userResp: '', // Not in use
        showTime: '', // Not in use
      },

      NOTICE_CART_DELETE_PRODUCT: {
        ID: '',
        msgIcon1: 'remove_shopping_cart',
        msgIcon2: 'check',
        msgTxt: 'Видалено з кошика',
        isButtonActive: false,
        btnYesIcon: 'check_circle_outline',
        btnYesTxt: 'Так',
        btnNoIcon: 'not_interested',
        btnNoTxt: 'Ні',
        prodName: '', // Not in use
        userResp: '', // Not in use
        showTime: 1500
      },

      NOTICE_ORDER_ADD_SERVER: {
        ID: '',
        msgIcon1: 'shopping_bag',
        msgIcon2: 'question_mark',
        msgTxt: 'Відправити замовлення',
        isButtonActive: true,
        btnYesIcon: 'check_circle_outline',
        btnYesTxt: 'Так',
        btnNoIcon: 'not_interested',
        btnNoTxt: 'Ні',
        prodName: '', // Not in use
        userResp: '', // Not in use
        showTime: '', // Not in use
      }
    }
  },

  computed: {
    ...mapGetters([
      'CURRENT_NOTICE'
    ])
  },
  watch: {
    'CURRENT_NOTICE' (notice) {
      if (notice.hasOwnProperty('NOTICE_ARCHIVE_ADD_CART')) {
        const current = {...this.NOTICE_ARCHIVE_ADD_CART}
        const prodInfo = Object.entries(notice)[1]
        current.prodName = `${prodInfo[0]} - ${prodInfo[1]} шт.`
        current.ID = Object.values(notice)[0]
        this.toShowArr.unshift(current)
        this.toShow = true
        this.hideNotice(current.showTime)
      }
      if (notice.hasOwnProperty('NOTICE_CART_DELETE_PRODUCT')) {
        const current = {...this.NOTICE_CART_DELETE_PRODUCT}
        const prodInfo = Object.entries(notice)[1]
        current.prodName = `${prodInfo[0]} - ${prodInfo[1]} шт.`
        current.ID = Object.values(notice)[0]
        this.toShowArr.unshift(current)
        this.toShow = true
        this.hideNotice(current.showTime)
      }
      if (notice.hasOwnProperty('NOTICE_CART_ADD_ORDER')) {
        const current = {...this.NOTICE_CART_ADD_ORDER}
        current.ID = Object.values(notice)[0]
        this.toShowArr.unshift(current)
        this.ADD_WINDOW_FREEZE_STATUS(true)
      }
      if (notice.hasOwnProperty('NOTICE_ORDER_ADD_SERVER')) {
        const current = {...this.NOTICE_ORDER_ADD_SERVER}
        current.ID = Object.values(notice)[0]
        this.toShowArr.unshift(current)
        this.ADD_WINDOW_FREEZE_STATUS(true)
      }
      if (notice.hasOwnProperty('NOTICE_HIDE')) {
        this.deleteNotice(notice['NOTICE_HIDE'])
      }
    }
  },
  methods: {
    ...mapActions([
      'ADD_CURRENT_NOTICE_RESP', 'ADD_WINDOW_FREEZE_STATUS'
    ]),

    hideNotice (delay) {
      setTimeout(() => {this.toShowArr.pop()}, delay)
    },

    clicked (val, ID) {
      const resp = {[ID]: val}
      this.ADD_CURRENT_NOTICE_RESP(resp)
    },

    deleteNotice (ID) {
      if (this.toShowArr[0].ID === ID) {
        console.log('DELETE NOTICE ID MATCHED >', ID, '***', this.toShowArr[0].ID)
        this.ADD_WINDOW_FREEZE_STATUS(false)
        this.toShowArr = []
      } else {
        console.log('DELETE NOTICE DID,NT MATCH >', ID, '***', this.toShowArr[0].ID)
        throw new Error("Error >>> Delete USER resp notice")
      }
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.notice-block {
  position: fixed;
  right: 0;
  top: 1rem;
  z-index: 99;
  pointer-events: all;
  cursor: pointer;
  // &__wrapper {
  // }
  &__group {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    .notice {
      background-color: $green-btn;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 2px;
      padding: 1rem 4rem 1rem 2rem;
      border-radius: $large-radius 0 0 $large-radius;
      &__prod-name {
        text-align: center;
        font-size: 1rem;
        margin-bottom: .5rem;
      }
      // &__msg-block {
      //   margin-bottom: 1rem;
      // }
      &__icon-1 {
        margin-right:.6rem;
        i { color: #fff; }
      }
      &__txt {
        font-size: 1.5rem;
      }
      &__icon-2 {
        margin-left: .6rem;
        i { color: #fff; }
      }
      // <<<<<<<<<< BUTTONS SECTION >>>>>>>>>>>
      &__buttons-wrapper {
        margin-top: 1rem;
        .button {
          margin: 1rem 0 0 0;
          justify-content: space-evenly;
          display: block;
          margin: 0 auto;
          border: 1px solid #fff;
          // width: 5rem;
          &:hover{
            outline: 2px solid #fff;
          // transition: all ease 100ms;
          }
          &__btn-content-wrapper {
            width: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          &__icon {
            flex: 0 1 auto;
            margin: 0 .6rem 0 0;
            i {
              color: #fff;
              width: 1.4rem;
            }
          }
          &__txt {
            flex: 0 1 auto;
            text-transform: uppercase;
            color: #fff;
          }
        }
      }
    }
  }
}
.v-trans {
  &-enter,
  &-leave-to {
  opacity: .3;
  transform: translate(100%);
  }
  &-enter-active,
  &-leave-active {
    transition: all .5s ease;
  }
  &-enter-to,
  &-leave {
    opacity: 1;
    transform: translate(0);
  }
  &-move {
    transition: transform .3s ease;
  }
}

</style>