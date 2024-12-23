//Singleton - Patron CREACIONAL
//Solo un objeto de la clase en la aplicacion

class Singleton {
    constructor() {
        console.log('Constructor');
        this.random = Math.random();

        if (Singleton.instance) {
            console.log('Ya existe');
            return Singleton.instance;
        };

        console.log('No existe, se crea');
        Singleton.instance = this;
    };

    info() {
        return this.random;
    };
};

const singleton = new Singleton();
const singleton2 = new Singleton();

console.log(singleton.info());
console.log(singleton2.info());


//Ejemplo de un caso mas practico
class WeekDays {
    daysEs = ['Lunes', 'Martes', 'Miercoles'];
    daysEn = ['Monday', 'Tuesday', 'Wensday'];

    constructor(lang) {
        this.lang = lang;

        if (WeekDays.instance) {
            return WeekDays.instance;
        };

        WeekDays.instance = this;
    };

    getDays() {
        return this.lang === 'es' ? this.daysEs : this.daysEn;
    };
};

const week1 = new WeekDays('en');
const week2 = new WeekDays('es'); //Esta configuracion del constructor sera ignorada porque ya se genero una instancia con 'en'

console.log(week1.getDays()); 
console.log(week2.getDays()); //retorna en ingles porque se llamo la primera instancia