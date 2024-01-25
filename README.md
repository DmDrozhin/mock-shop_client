# 2023-11-23_mock-shop_client
SDK: Visual Sode
Framewok: Vue2
Mian addons: Vue router, Vuex,
Addons: Axios

# Тест версия - магазин спотривной одежны.
- Приложение работает в паре с 'mock-shop__server-side' - серверная часть.
- Источник данных товаров - массив из объектов, формат JSON. Если сервер не запущен, то источником служит локальная копия массива товаров.
- Массив преобразуется для более удобной работы с данными и находится в Vuex state.
- Товары фильтруются по наличию выбранного размера.
- Карточка товара содержит информацию: товар в наличии на складе, таблица с остатками на складе. В опциях выбора доступны только товары, которые есть в наличии.
- Кнопка «переместить в корзину» становится активной после выбора размера.
- Если товар с идентичным артиклем уже находится в «корзине», пользователь получает сообщение о том, что товар уже находится в «корзине», при этом кнопка находится пассивном режиме.
- Кнопки навигации, сверху страницы, позволяют перемещаться между «галереей» товаров, «корзиной» товаров и страницей «заказа» в том случае если в них содержатся данные.
- В корзине товара происходит выбор количество товаров.
- Калькуляция остатков происходит после перемещения товара из «корзины» на страницу «заказа» и обратно. 
- Действия перемещения товаров сопровождаются, появлением модального окна для подтверждения действий.
- При отмене заказа, происходит переход на страницу «корзины» заказов с отображением отмененных товаров.
- В «корзине» товаров предусмотрена возможность удаления товаров.
- После подтверждения заказа на странице «заказа», данные отправляются в серверную часть приложения для дальнейшей обработки и отправки почтового сообщения о новом заказе.
- При удачной оправке, отображается уведомление об отправке и призыв к дальнейшему действию.
- При не удачной - соответствующее сообщение, товары остаются на странице «заказа»

# Test sportswear store
- The application works in tandem with 'mock-shop__server-side'.
- The source of goods data is an array of objects, JSON format. If the server is not running, the source is a local copy of the goods array.
- The array is converted for more convenient work with data and is located in Vuex state.
- Goods are filtered by availability of the selected size.
- The product card contains information: product in stock, table with stock balances. In the selection options are available only products that are in stock.
- The "move to cart" button becomes active after selecting a size.
- If a product with the identical article is already in the "cart", the user receives a message that the product is already in the "cart", while the button is in passive mode.
- Navigation buttons at the top of the page allow to move between the "gallery" of goods, "cart" of goods and "order" page in case they contain data.
- In the shopping cart you can select the quantity of goods.
- Calculation of balances occurs after moving the goods from the "cart" to the "order" page and back. 
- The actions of moving the goods are accompanied by the appearance of a modal window to confirm the actions.
- When canceling an order, there is a transition to the page of the "cart" of orders with the display of canceled goods.
- In the "cart" of goods there is a possibility to delete goods.
- After order confirmation on the "order" page, the data is sent to the server part of the application for further processing and sending a mail message about the new order.
- In case of successful ordering, a notification about sending and a call for further action is displayed.
- If unsuccessful, the corresponding message is displayed, the goods remain on the "order" page

