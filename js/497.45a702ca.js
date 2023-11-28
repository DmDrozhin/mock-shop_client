"use strict";(self["webpackChunk_2023_11_23_mock_shop_client"]=self["webpackChunk_2023_11_23_mock_shop_client"]||[]).push([[497],{1497:function(t,a,e){e.r(a),e.d(a,{default:function(){return C}});var s=function(){var t=this,a=t._self._c;return a("div",{staticClass:"v-products-cart cart"},[a("h2",{staticClass:"cart__title"},[t._v(t._s(t.title))]),a("div",{staticClass:"cart__items"},t._l(t.CART,(function(e,s){return a("cartItem",{key:s,attrs:{prodData:e,idx:s},on:{updateCart:function(a){return t.updateCart(a)},deleteItem:function(a){return t.deleteItem(a)}}})})),1),t.CART_PRODS_QT?a("div",{staticClass:"cart__summary summary"},[a("div",{staticClass:"summary__part1 part1"},[a("ui-text-info",{staticClass:"part1__prod-qt",attrs:{num:t.CART_PRODS_QT,fontSz:1.5,label1:"Товарів:",room:1}}),a("ui-text-info",{staticClass:"part1__unit-qt",attrs:{num:t.CART_QT,fontSz:1.5,label1:"Кількість:",label2:"шт.",room:1.5}}),a("ui-price-info",{staticClass:"part1__total-sum",attrs:{price:t.CART_SUM,fontSz:1.8,label:"Сума замовлення:",isVertical:!1,room:8}})],1),a("div",{staticClass:"summary__part2 part2"},[a("ui-order-button",{staticClass:"part2__order-button",attrs:{icon:"shopping_bag",frontIcon:"double_arrow",isActive:t.CART_SUM>0,color:"#329c26"},on:{handlePrompt:function(a){return t.processCart()}}},[t._v("Оформити ")])],1)]):t._e()])},r=[],i=(e(560),e(3429),e(5564),function(){var t=this,a=t._self._c;return a("div",{staticClass:"v-products-cart-item item"},[a("ui-cancel-button",{staticClass:"item__cancel-btn",attrs:{size:30,color:"#d86f6f",viewBox:"0 0 32 32"},on:{cancel:function(a){return t.deleteItem()}}}),a("div",{staticClass:"item__tech-data"},[a("div",{staticClass:"tech-info"},[t._v("ID: "+t._s(t.prodData.id))]),a("div",{staticClass:"tech-info"},[t._v("Qt: "+t._s(t.prodData.prodQt)+"/ "+t._s(t.cartQt))])]),a("div",{staticClass:"item__divider1"},[a("div",{staticClass:"flex-wrapper"},[a("span",{staticClass:"item__prod-id"},[t._v(t._s(t.idx+1)+".")]),a("h3",{staticClass:"item__prod-name"},[t._v(t._s(t.prodData["prod-name"]))])]),a("div",{staticClass:"item__image",style:t.backGroundImage})]),a("div",{staticClass:"item__divider2"},[a("div",{staticClass:"item__prod-info data"},[a("div",{staticClass:"data__gender"},[t._v(t._s(t.prodData.category))]),a("ui-text-info",{staticClass:"data__article",attrs:{num:t.prodData.article,fontSz:1,label1:"Артикль:",isVertical:!1,room:1}}),a("ui-price-info",{staticClass:"data__price",attrs:{price:t.prodData.price,fontSz:1,label:"Ціна:",isVertical:!1,room:4}}),a("ui-text-info",{staticClass:"data__stock",attrs:{num:t.instockQt,fontSz:1,label1:"В наявності:",label2:"од.",isVertical:!1,room:1}}),a("ui-text-info",{staticClass:"data__size",attrs:{num:t.prodData.prodSize.toUpperCase(),fontSz:1.2,label1:"Розмір:",isVertical:!1,room:1}})],1),a("ui-price-info",{staticClass:"item__sum-block",attrs:{price:t.cartSum,fontSz:1.5,label:"Сума:",isVertical:this.$store.state.screen<=910,room:7}})],1),a("div",{staticClass:"item__divider3"},[a("ui-count-picker",{staticClass:"item__qt-selector",attrs:{value:t.cartQt,maxValue:t.instockQt,minValue:1,label:"Кількість:"},on:{clicked:function(a){return t.updateQt(a)}}})],1)],1)}),o=[],c=e(3822),n={name:"v-products-cart-item",data(){return{cartQt:0}},props:{prodData:{type:Object,default:()=>{}},idx:{type:Number,default:0}},computed:{...(0,c.Se)(["SCREEN"]),cartSum(){return this.cartQt*this.prodData.price},backGroundImage(){return{"background-image":"url("+e(990)("./"+this.prodData.image)+")"}},instockArr(){let t=[];return this.prodData.available.forEach((a=>{const e=Object.entries(a)[0];t.push({sz:e[0],qt:e[1]})})),t},instockQt(){return this.instockArr.find((t=>t.sz===this.prodData.prodSize)).qt},isInStock(){return this.instockQt>0}},watch:{},methods:{deleteItem(){this.$emit("deleteItem",this.prodData)},updateQt(t){this.cartQt=this.cartQt+t,this.updateCart()},updateCart(){const t=JSON.parse(JSON.stringify(this.prodData));t.cartQt=this.cartQt,t.cartSum=this.cartSum,this.$emit("updateCart",t)}},mounted(){this.cartQt=this.prodData.cartQt}},_=n,l=e(1001),d=(0,l.Z)(_,i,o,!1,null,"50f126c9",null),u=d.exports,m={name:"v-products-cart",components:{cartItem:u},data(){return{title:"Кошик",noticeBlock:"",msgID:"",modal:{isBaseActive:!0,isFrozenBg:!0,isModalActive:!0,result:void 0,page:this.currentPage},removable:{}}},computed:{...(0,c.Se)(["CART","CART_PRODS_QT","CART_SUM","CART_QT","MODAL_IF_MODE"]),currentPage(){return this.$route.name},approve(){return this.MODAL_IF_MODE(this.msgID,!1)},disapprove(){return this.MODAL_IF_MODE(this.msgID,!0)}},watch:{approve(t){t&&(this.MOVE_CART_TO_ORDER(),this.$router.push({name:"order"}))},disapprove(t){t&&(this.CART_PRODS_QT>1?this.DELETE_FROM_CART(this.removable.cartId):(this.DELETE_FROM_CART(this.removable.cartId),this.$router.push({name:"products"})))}},methods:{...(0,c.nv)(["DELETE_FROM_CART","UPDATE_CART","MOVE_CART_TO_ORDER","SET_MODAL_WINDOW"]),processCart(){const t=structuredClone(this.modal);t.id=this.msgID=Number((Date.now()/100).toFixed().slice(4)),t.title="замовлення",t.message=`На суму: ${this.CART_SUM.toFixed(2)} грн.`,t.data=`Кількість: ${this.CART_QT}`,t.prompt="Перейти до оформлення?",t["remove-mode"]=!1,this.SET_MODAL_WINDOW(t)},updateCart(t){this.UPDATE_CART(t)},deleteItem(t){this.removable=t;const a=structuredClone(this.modal);a.id=this.msgID=Number((Date.now()/100).toFixed().slice(4)),a.title=t["prod-name"],a.message=`Розмір: ${t.prodSize}`,a.data=`Код товару: ${t.article}`,a.prompt="Видалити з кошику?",a["remove-mode"]=!0,this.SET_MODAL_WINDOW(a)}}},p=m,h=(0,l.Z)(p,s,r,!1,null,"d0bc8cce",null),C=h.exports}}]);
//# sourceMappingURL=497.45a702ca.js.map