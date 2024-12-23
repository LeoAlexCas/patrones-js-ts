//Ejemplo TS implementadores con listas - ordenadas y elementos unicos

//Interfaz de los implementadores
interface iListImplementor {
    elements: number[];

    add(number: number): void;
    getElements(): number[];
};

//Interfaz de la abstraccion
interface IdataAbstractrion {
    implementor: iListImplementor;
    add(number: number): void;
    get(): number[];
    operation(fn: (n: number) => number): number[];
};

//Refined Abstraction
class DataRefinedAbstraction implements IdataAbstractrion {
    implementor: iListImplementor;
    constructor(implementor: iListImplementor) {
        this.implementor = implementor;
    };

    public add(number: number): void {
        this.implementor.add(number);
    };

    public get(): number[] {
        return this.implementor.getElements();
    };

    public operation(fn: (n: number) => number): number[] {
        //la fn que se declara en este caso se usara dentro del map para determinar lo que se quiere en el nuevo array
        return this.implementor.getElements().map(fn);
    };
};


//Implementadores
class OrderedList implements iListImplementor {
    elements: number[] = [];

    public add(number: number): void {
        this.elements.push(number);
        this.elements.sort((a, b) => a - b);
    };

    public getElements(): number[] {
        return this.elements;
    };
};

class UniqueList implements iListImplementor {
    elements: number[] = [];

    public add(number: number): void {
        if(!this.elements.includes(number)) {
            this.elements.push(number);
        } else {
            console.error('Numero ingresado ya existe'); 
        };
    };

    public getElements(): number[] {
        return this.elements;
    };
};

const uniqueData = new DataRefinedAbstraction(new UniqueList());
uniqueData.add(1);
uniqueData.add(2);
uniqueData.add(6);
uniqueData.add(3);
uniqueData.add(1); //Numero ingresado ya existe

console.log(uniqueData.get()); //[ 1, 2, 6, 3 ]

const orderedList = new DataRefinedAbstraction(new OrderedList());
orderedList.add(42);
orderedList.add(43);
orderedList.add(245);
orderedList.add(2);
orderedList.add(4);

console.log(orderedList.get()); //[ 2, 4, 42, 43, 245 ]

const uniqueItems = uniqueData.operation((el) => {
    return el * 2;
});

const orderedModular = orderedList.operation((el) => {
    return el % 2 === 0 ? 0 : 1;

})

console.log(uniqueItems); //[ 2, 4, 12, 6 ]
console.log(orderedModular) //[ 0, 0, 0, 1, 1 ]