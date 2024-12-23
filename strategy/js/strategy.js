//Strategy - Patron de COMPORTAMIENTO
//Podremos tener comportamientos distintos en un objeto y poder agregar nuevos sin modificar
//El comportamiento inicial
//El CONTEXT o clase contexto es el objeto central que va a unificar todo
//Esto sirve para evitar tener switch o ifs dentro de los metodos segun un parametro porque podemos operar distinto segun la estrategia

class SalesContext {
    
    constructor(strategy) {
        this.strategy = strategy;
    };

    calculate(ammount) {
        //Este metodo asume que la estrategia, una clase, tendra un metodo calculate que 
        //dependera de cada objeto distinto
        return this.strategy.calculate(ammount);
    };

    //Este metodo serviria para que un objeto que tenga un contexto con estrategia instanciado
    //Pueda cambiar la estrategia
    setStrategy(strategy) {
        this.strategy = strategy;
    };
};

//Estrategia 1
class RegularSalesStrategy {
    constructor(tax) {
        this.tax = tax;
    };

    calculate(ammount) {
        console.log('REGULAR STRATEGY');
        return ammount + (ammount * this.tax);
    };
};

const sale = new SalesContext(new RegularSalesStrategy(2));
console.log(sale.calculate(34));

//Tambien puede ser asi si necesitamos tener la estrategia almacenada
const taxStrat = new RegularSalesStrategy(4);
const sale2 = new SalesContext(taxStrat);
console.log(sale2.calculate(55));

//Estrategia 2
class DiscountSalesStrategy {
    constructor(tax, discount) {
        this.tax = tax;
        this.discount = discount;
    };

    calculate(ammount) {
        console.log('DISCOUNT STRATEGY');
        return ammount + (ammount * this.tax) - (ammount * this.discount);
    };
};

const discStrat = new DiscountSalesStrategy(3, 0.50);
const sale3 = new SalesContext(discStrat);

console.log(sale3.calculate(35000));

//Estrategia 3
class ForeignSaleStrategy {
    constructor() {
    };

    dollarPrice() {
        return 20;
    };

    calculate(ammount) {
        console.log('FOREGIN STRATEGY');
        return ammount * this.dollarPrice();
    };
};

const forStrat = new ForeignSaleStrategy();
const sale4 = new SalesContext(forStrat);
console.log(sale4.calculate(30000));
 