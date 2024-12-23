/*FUNCIONES DE PRIMER ORDEN Y ORDEN SUPERIOR
/* Una funcion de primer orden es toda funcion que pueda ser tratada como una variable
*/
function sum(a, b) {
    return a + b;
};

//Se guarda la funcion en una variable
const fSum = sum;
const res = fSum(3, 4);
console.log(res);

/* Una funcion de primer orden superior es toda funcion que puede recibir parametros funciones.
*/
function operation(fn, a, b) {
    console.log('init');
    const result = fn(a, b);
    console.log(result);
};

operation(sum, 3, 4)

/* Una arrow funcion es una manera de abreviar una funcion anonima
*/
//funcion anonima
// const fA = function() {
//     console.log('funcion anonima');
// };
// fA();

const fA = () => {
    console.log('Funcion anonima con flecha');
};
fA();

//ejemplo de uso con funcion de primer orden superior (?)
operation((a, b) => a * b, 3, 5);
operation((a, b) => {
    const rel = a + b;
    return rel * 2;
}, 3, 5);

/* Los metodos de los Arrays en JS en su mayoria son funciones de primer orden superior,
Por ejemplo un foreach
*/

const names = ['adasfa', 'fasdas', 'asfafasd']
names.forEach((name) => console.log(name));

//Algunos de estos, como el foreach, metodos son inmutables asi que no cambiaran el array original
names.forEach((name) => name.toLocaleUpperCase());
//con un map se puede hacer un nuevo array
const upperNames = names.map((name) => {
    return name.toUpperCase()
});

console.log(names);
console.log(upperNames);

//otros como el sort no son inmutables y si cambia el array
names.sort();
console.log(names);

/*Esto es hasta por ahi eso si, con un foreach puedes cambiar elementos de objetos que vengan en un array, esto es porque no puede mutar elementos primitivos
Pero en el caso de un array de objetos esta trabajando con referencia a los objetos
*/
const objects = [{
    acc: 12331,
    name: 'cuenta 1'
},
{
    acc: 134142331,
    name: 'cuenta 2'
}
];

objects.forEach((el) => {
    el.name = el.name.toUpperCase();
})

console.log('==============')
console.log(objects) //Los nombres si vienen en upper aca

/*Metodo Reduce de los arrays, por X motivo
*/
const numbers = [5,4,7,1,10];
/*Reduce recibe 2 parametros un callback y un valor que sera el valor inicial de la acumulacion.
*El call back tiene 2 parametros, el acumulado y el elemento individual que se esta recorriendo (acc y number)
*El acmuluado se refiere a una variable donde se va guardando el valor que va quedando despues de cada iteracion por cada elemento del array
*dentro del callback se realiza la operacion, en este caso es una suma pero podria ser cualquier cosa, incluso la ejecucion de una funcion, ya que 
*lo que aca es un array de numeros, podria ser un array de funciones
*/
const total = numbers.reduce((acc, number) => {
    return acc + number;
}, 0);

console.log(total);


/*Clases y POO
*/

class Drink {
    constructor(name) {
        this.name = name;
    };
    
    info() {
        return this.name;
    };
};

//Crea una clase con una funcion
function Drink2(name) {
    this.name = name;
    this.info = () => {
        return this.name;
    };
};

/*Herencia
*/

class Beer extends Drink {
    constructor(name, alcohol) {
        //Super solo llama al constructor de la clase padre y le entrega algun valor que necesite
        super(name);
        this.alcohol = alcohol;
    };

    //Puedo sobreescribir los metodos del padre si quiero
    info() {
        return "Hello"
    }
};

const beer1 = new Beer('Kunstman', true);
console.log(beer1.info())