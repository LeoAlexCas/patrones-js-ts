/*Util para frontend, genera objetos que pueden suscribirse a eventos que seran notificados y cambiaran comportamiento
*/
//Sujeto que se suscribe, desuscribe y se notifica
class Subject {
    constructor() {
        this.observers = []
    };

    subscribe(observer) {
        this.observers.push(observer);
    };

    unsubscribe(observer) {
        this.observers = this.observers.filter((el) => el !== observer);
    };

    notify(data) {
        this.observers.forEach((el => el.refresh(data)));
    };
};

//Clase observadora especial para esta clase que recibe una funcion, esta se usa en el refresh
class Observer {
    constructor(fn) {
        this.fn = fn;
    };

    refresh(data) {
        this.fn(data);
    };
};

//Inicializa sujeto y observer con una funcion para el regfresh que haga console.log
const s = new Subject();
const o1 = new Observer((data) => {
    console.log(data);
});  
const o2 = new Observer((data) => {
    console.log(data.toLowerCase());
});

//Se suscribe al observer inicializado o1 y se hace el notify que ejecuta la funcion y hace console log de ese string
s.subscribe(o1);
//Se pueden entregar multiples Observers al subject y todos pueden procesar la info de manera distinta
s.subscribe(o2);
s.notify('ESTA ES LA DATA') // console log de el string y del string en minusculas

console.log('============= Ejemplo de notificacion con data entregada por teclado =======================');
console.log('Ingresa data y presiona enter ===================');
const stdin = process.openStdin();
stdin.addListener("data", (data) => {
    s.notify(data.toString());
}) // console.log del string que ingreses y del string que ingreses en minuscula