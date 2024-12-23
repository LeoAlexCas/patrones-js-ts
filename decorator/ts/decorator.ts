interface Icomponent {
    getDetail(): string;
};

class ProductComponent implements Icomponent {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    };

    public getDetail(): string {
        return `${this.name}`;
    };
};

//El decorador prinicpal (componentDecorator) es abstracto porque no se supone que nunca se haga una instancia, si no que se use por los decoradores concretos
abstract class ProductDecorator implements Icomponent {
    protected component: Icomponent;
    constructor(component: Icomponent) {
        this.component = component;
    };

    public getDetail(): string {
        return this.component.getDetail();
    };
};

//Decorador concreto 1
class CommercialInfoDecorator extends ProductDecorator {
    private tradename: string;
    private brand: string;

    constructor(component: Icomponent, tradename: string, brand: string) {
        super(component);
        this.tradename = tradename;
        this.brand = brand;
    };

    public getDetail(): string {
        return `${super.getDetail()}, brand: ${this.brand}, tradename: ${this.tradename}`;
    };
};

//Ejecucion decorador concreto1
const productComponent = new ProductComponent('Beer');
const commercialInfoProduct = new CommercialInfoDecorator(productComponent, 'Marca Beer', 'BeerLaMarca');
console.log(commercialInfoProduct.getDetail());

//Decorador concreto 2
class StoreProductDecorator extends ProductDecorator {
    private price: string;
    constructor(component: Icomponent, price: string) {  
        super(component);
        this.price = price;
    };

    public getDetail(): string {
        return `${super.getDetail()}, Price: ${this.price}`
    };
};

//Ejecucion decorador concreto2
//Usamos el productCompoenent de la ejecucion anterior ya creado
const productComponent1 = new StoreProductDecorator(productComponent, '1234242');
console.log(productComponent1.getDetail()); // Beer, Price: 1234242

//Usamos el commercialInfoProduct de la ejecucion anterior ya creado
const storedComponent = new StoreProductDecorator(commercialInfoProduct, '12334345');
console.log(storedComponent.getDetail()); // Beer, brand: BeerLaMarca, tradename: Marca Beer, Price: 12334345
