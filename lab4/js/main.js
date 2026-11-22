/* --- 1. Справочник цен: обычный объект, пары «название напитка — цена» --- */
const DRINK_PRICES = {
    'Эспрессо': 120,
    'Американо': 140,
    'Капучино': 180,
    'Латте': 190,
    'Флэт уайт': 210,
    'Раф «Солёная карамель»': 240,
};

/* --- 2. Класс заказа (чертёж, по которому создаются объекты) --- */
class CoffeeOrder {

    /* Конструктор: выполняется в момент new CoffeeOrder(...)
       и заполняет новый объект данными. this — «этот самый объект». */
    constructor(name, phone, email, drink, quantity, delivery, comment) {
        this.number    = Math.floor(Math.random() * 900) + 100; 
        this.name      = name;                                  
        this.phone     = phone;                                 
        this.email     = email;                                 
        this.drink     = drink;                                
        this.quantity  = Number(quantity);                      
        this.delivery  = delivery;                            
        this.comment   = comment;                              
        this.createdAt = new Date().toLocaleString('ru-RU');   
        this.totalPrice = (DRINK_PRICES[drink] || 0) * this.quantity; 
    }

    /* Метод форматированного вывода на консоль */
    printToConsole() {
        const line = '='.repeat(46); 

        console.log(line);
        console.log('  ЗАКАЗ №' + this.number + '  |  ' + this.createdAt);
        console.log(line);
        console.log('  Имя:             ' + this.name);
        console.log('  Телефон:         ' + this.phone);
        console.log('  E-mail:          ' + this.email);
        console.log('  Напиток:         ' + this.drink);
        console.log('  Количество:      ' + this.quantity + ' шт.');
        console.log('  Получение:       ' + this.delivery);
        console.log('  Комментарий:     ' + (this.comment || '—'));
        console.log(line);
        console.log('  ИТОГО К ОПЛАТЕ:  ' + this.totalPrice + ' руб.');
        console.log(line);

        console.table(this);
    }
}

/* --- 3. Ловим момент отправки формы --- */
const orderForm    = document.querySelector('#order-form');  
const successBlock = document.querySelector('#order-success'); 

orderForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const data = new FormData(orderForm);


    const order = new CoffeeOrder(
        data.get('name'),      
        data.get('phone'),    
        data.get('email'),    
        data.get('drink'),     
        data.get('quantity'), 
        data.get('delivery'),  
        data.get('comment')    
    );
    order.printToConsole();    
    successBlock.hidden = false; 
    orderForm.reset();           
});
