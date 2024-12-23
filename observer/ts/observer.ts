//Al igual que con strategy, en TS se estableceran las interfaces que garanticen que se cumplan los contratos para las clases del patron
//Se usaran genericos para establecer los tipos que recibiran los metodos tanto del observer como del subject
interface Iobserver<T> {
    refresh(value: T): void;
};

interface Isubject<T> {
    observers: Iobserver<T>[];
    subscribe(observer: Iobserver<T>): void;
    unsubscribe(observer: Iobserver<T>): void;
    notify(value: T): void;
};

class Subject<T> implements Isubject<T> {
    observers: Iobserver<T>[];
    constructor() {
        this.observers = [];
    }; 

    subscribe(observer: Iobserver<T>): void {
        this.observers.push(observer);  
    };

    unsubscribe(observer: Iobserver<T>): void {
        this.observers = this.observers.filter(el => el !== observer); 
    };

    notify(value: T): void {
        this.observers.forEach(el => {
            el.refresh(value);
        })
    };
};

class Observer<T> implements Iobserver<T> {
    private fn: (value: T) => void;
    constructor(fn: (value: T) => void) {
        this.fn = fn;
    };

    refresh(value: T): void {
        this.fn(value);
    };
};

const subject = new Subject<number>();
const obs = new Observer<number>((n) => {
    console.log(n) 
});

subject.subscribe(obs);
subject.notify(304243);