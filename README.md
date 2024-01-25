# 2023-11-23_mock-shop_client
SDK: Visual Sode
Framewok: Vue2
Mian addons: Vue router, Vuex,
Addons: Axios

# Приложение работает в паре с 'mock-shop__server-side' - серверная часть.
- Истончик данны товаров - массив из объектов товаровю, формат jSON. Если сервер не запучщен, то источником служит локальная копия массива товаров.
- Массив преобразуется для более удобной работы с данными и находится в Vuex state.
- Товары фильтруются по наличию выбранного размера.
- Карточка товара содержит информацию: товар в наличии на складе, таблица с остатками на складе. В опциях выбора доступны только товары которые есть в наличии.
- Кнопка "переместить в корзину" становится активной после выбора размера.
- Если товар с идентичным артиклем уже находится в "корзине", пользователь видидт сообщение - товар уже в "корзине", кнопка - в не актином режиме.
- Кнопки навигации, сверху страницы, позволяют перемещаться между галереей товаров, "корзиной" товаров и страницей оформления заказа в том случае если в "корзине" товаров и / или на странице заказа есть перемещенные туда данные.
- В корзине товара проиходит выбор количество товаров.
- Калькуляция остатков происходит после перемещения товара от "корзина" на страницу заказа и обратно. 
- Действия перемещения товаров сопровождаются, появленнием модальное окно для подтверждения действия.
- При отмене заказа, проиходит переход на на страницу "корзина" заказов с отоброжением отмененых товаров.
- В "корзине" товаров предусмотрена возможность удаления товарав.
- После подтверждения заказа на странице заказа, данные отправляются в серверную часть приложения для дальнейшей обработки и отправки почтового сообщения о новом заказе.
- При удачной оправке, отоброжается уведомление об уждачной отправке и призыв к дальнейшему действию.

# The application works in tandem with 'mock-shop__server-side'.
- The Axios Get request returns an array of objects with product data. In case of error, it reassigns the source from the local copy.
- After processing the array, the products are displayed at the gallery.
- The products can be filtered with sizw select block in the upper right corner.
- Product card contains rinformation: permanently roduct is constantly available in stock, as well as the table
 with the remaining stock according to the size of the product. In the size selector, only sizes that are in stock are available in the options.
- By default, the "move to cart" button is not active and becomes available after selecting the size of the product.
- If the product with the identical article is already in the "cart", the button informs that the product is already in the "cart" and is in inactive mode.
- Navigation buttons at the top of the page allow you to move between the gallery of goods, "shopping cart" and checkout page in case that
there are data moved there in the "shopping cart" and / or on the order page.
- In the shopping cart you can select the quantity of goods for purchase. At the stage of selecting the quantity for the order in the shopping cart, this selection is not registered in the product object. 
is not registered in the product object. Calculation takes place after moving the item to the order page, as well as back from the order page
to the "shopping cart" page. In the state when an item is on the order page, it can still be selected on the main page, product gallery
and the number of available items reflects the difference between the original quantity and the quantity on the order page.
- At any action, i.e. adding a product to the "shopping cart" page or order page, as well as in the opposite direction, a modal window appears for the user to confirm the selected action.
window for the user to confirm the selected action or reject the selected action.
- There are buttons for deleting all products from the order page, i.e. canceling the order. In this case, the selected products are returned to the "cart" page.
- In the "cart" of goods there is a possibility to delete goods individually, by the selected name and size. 
- The "move to cart" button in the gallery returns to the active state.
- After user confirmation, the order data is to be sent with Axios Post request to server for further processing and forwarding to manager.
- In case of successful ordering, the user continues interacting with the goods taking into account the already ordered quantity of goods, i.e. the available balance.

Translated with DeepL.com (free version)




## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
