//Clases en TS

export class Drink {
    constructor(private name: string) {}

    info(): string {
        return this.name;
    };
};

const drink = new Drink('bibia');
console.log(drink.info());

//Herencia TS

export class Beer extends Drink {
    constructor(
        name: string,
        private alcohol: boolean
        ) {
        super(name)
    };

    hasAlcohol(): boolean {
        return this.alcohol;
    }; 
};

const beer1 = new Beer('Escupo', true);
console.log(beer1.hasAlcohol())
console.log(beer1.info())


//Interfaces en TS

interface Iproduct {
    price: number;
    getPrice(): string;
};

export class Product implements Iproduct {
    constructor(public readonly price: number) {};

    getPrice(): string {
        return this.price.toString();
    }
} 