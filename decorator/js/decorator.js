//DECORADOR: Patron que permite crear clases que envuelvan a otras agregando funcionalidades adicionales a la clase envuelta, incluidos otros decoradores
//Sirve para envolver con nuevas funcionalidades clases incluso ya decoradas, separando responsabilidades, ya que para modificar algun comportameinto, basta con modificar un decorador

//componente
class ProductComponent {
    constructor(name) {
        this.name = name;
    };

    getDetail() {
        return this.name;
    };
};


//decorador - El envoltorio
class ProductDecorator {
    //El constructor recibira un objeto del tipo del componente
    constructor(productComponent) {
        this.productComponent = productComponent;
    };

    getDetail() {
        return this.productComponent.getDetail();
    };
};

//Clase especifica decoradora, envuelve al decorador principal que envuelve a la clase componente
//decorador 1
class ComercialInfoDecorator extends ProductDecorator {
    constructor(component, tradename, brand) {
        super(component);
        this.tradename = tradename;
        this.brand = brand;
    };

    getDetail() {
        //La clase decoradora que extiende del decorador principal, llamara al metodo de la clase decoradora principal, pero puede agregar algo mas
        return `${this.brand} ${this.tradename} ${super.getDetail()}`;
    };
};

class PriceProductDecorator extends ProductDecorator {
    constructor(component, price) {
        super(component);
        this.price = price
    };

    getDetail() {
        return `${super.getDetail()} ${this.price}`;
    };
}

// //Ejecucion
// //Funcionamiento central con decorador principal
// const productComponent = new ProductComponent('Beer');
// console.log(productComponent.getDetail()); //'Beer'

// //Funcionamiento con clase especifica decoradora
// const comercialProductComponent = new ComercialInfoDecorator(productComponent, 'nombre comercial', 'Marca');
// console.log(comercialProductComponent.getDetail()); //'Marca Beer'

// //Funcionamiento con otro decorador
// const priceProduct = new PriceProductDecorator(productComponent, '123414123');
// console.log(priceProduct.getDetail()); //'Beer 123414123'


//Funcionamiento de un decorador sobre otro
const producto = new ProductComponent('Pan');
const productoComercial = new ComercialInfoDecorator(producto, 'nombre comercial', 'Marca');
console.log(productoComercial.getDetail()); //'Marca nombre comercial Pan'

//Funcionamiento con 2 decoradores, se va pasando el componente decorado al siguiente decorador
const productoConPrecio = new PriceProductDecorator(productoComercial, '131432');
console.log(productoConPrecio.getDetail()); //'Marca nombre comercial Pan 131432'