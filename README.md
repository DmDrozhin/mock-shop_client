# 2023-11-23_mock-shop_client

Vue2
Vue router
Vuex
Axios

Приложение работает в паре с mock-shop__server-side - серверная часть.
С помощью Axios Get забирает массив объектов товаров. Если серверная часть не активна, то источником служит локальная копия массива товаров.
Объект товара добавляются необходимые свойства для дальнейшей работы. Товары отображаются на главной странице - галерея товаров.
Товары фильтруются по наличию выбранного размера в верхнем правом углу (custom select).
На карточке товара, в правом верхнем углу выведена информация о товаре: является ли товар постоянно в наличии на складе, а также таблица
с остатками на складе в соответствии с размерами товаров. В селекторе размеров, в опциях доступны только размеры, которые в наличии.
По умолчанию кнопка "переместить в корзину" не активна и становиться доступной после выбора размера товара.
Если товар с идентичным артиклем уже находится в "корзине", кнопка сообщает что товар уже в "корзине" и находится в не актином режиме.
Кнопки навигации, сверху страницы, позволяют перемещаться между галереей товаров, "корзиной" товаров и страницей оформления заказа в том случае если
в "корзине" товаров и / или на странице заказа есть перемещенные туда данные.
В корзине товара есть возможность выбрать количество товаров для покупки. На этапе выбора количества для заказа в корзине товаров, этот выбор не 
регистрируется в объекте товара. Калькуляция происходит после перемещения товара на страницу заказа, а также обратно из страницы заказа
на страницу "корзина" товаров. В состоянии, когда товар находится на странице заказа, его все еще можно выбрать на главной странице, галерее товаров
при этом, количество доступных товаров отражает разницу между исходным количеством и количеством, находящимся на странице заказа.
При любом действии т.е. добавление товара на страницу "корзина" товаров или страница заказа, а также в обратном направлении, появляется модальное
окно для подтверждения пользователем выбранного действия или отказ от выбранного действия.
Предусмотрены кнопки удаления всех товаров из страницы заказа, т.е. отмена заказа. При этом выбранные товары возвращаются на страницу "корзина" заказов.
В "корзине" товаров есть возможность удалять товары индивидуально, по выбранному наименованию и размеру. 
При это кнопка "переместить в корзину, в галерее, возвращается в активное состояние.
После подтверждения заказа на странице заказа, данные с заказом отправляются с помощью Axios Post в серверную часть приложения для дальнейшей
обработки и отправки почтового сообщения менеджеру о получении нового заказа.
При удачной оправке, пользователь продолжает взаимодействие с товарами с учетом уже заказанного количества товаров, т.е. доступным остатком.
//
The application works in tandem with mock-shop__server-side - server-side.
With the help of Axios Get it fetches an array of goods objects. If the server-side is not active, the source is a local copy of the goods array.
The necessary properties for further work are added to the goods object. The goods are displayed on the main page - the gallery of goods.
Goods are filtered by availability of the selected size in the upper right corner (custom select).
On the product card, in the upper right corner displayed information about the product: whether the product is constantly available in stock, as well as the table
table with the remaining stock according to the size of the product. In the size selector, only sizes that are in stock are available in the options.
By default, the "move to cart" button is not active and becomes available after selecting the size of the product.
If the product with the identical article is already in the "cart", the button informs that the product is already in the "cart" and is in inactive mode.
Navigation buttons at the top of the page allow you to move between the gallery of goods, "shopping cart" and checkout page in case that
there are data moved there in the "shopping cart" and / or on the order page.
In the shopping cart you can select the quantity of goods for purchase. At the stage of selecting the quantity for the order in the shopping cart, this selection is not registered in the product object. 
is not registered in the product object. Calculation takes place after moving the item to the order page, as well as back from the order page
to the "shopping cart" page. In the state when an item is on the order page, it can still be selected on the main page, product gallery
and the number of available items reflects the difference between the original quantity and the quantity on the order page.
At any action, i.e. adding a product to the "shopping cart" page or order page, as well as in the opposite direction, a modal window appears for the user to confirm the selected action.
window for the user to confirm the selected action or reject the selected action.
There are buttons for deleting all products from the order page, i.e. canceling the order. In this case, the selected products are returned to the "cart" page.
In the "cart" of goods there is a possibility to delete goods individually, by the selected name and size. 
The "move to cart" button in the gallery returns to the active state.
After confirming the order on the order page, the order data is sent with the help of Axios Post to the server part of the application for further processing and sending a mail message to the manager.
processing and sending a mail message to the manager about receiving a new order.
In case of successful ordering, the user continues interacting with the goods taking into account the already ordered quantity of goods, i.e. the available balance.

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
