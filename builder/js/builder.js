// BUILDER: patron creacional que nos permite crear nuevos objetos. Ideal para clases con constructores muy grandes

//clase ejemplo con contructor complejo
class Person {
    constructor(name, lastName, age, country, city, hobbies) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.country = country;
        this.city = city;
        this.hobbies = hobbies;
    };

    getFullName() {
        return `${this.name} ${this.lastName}`;
    };
};

//La clase builder
class PersonBuilder {
    constructor() {
        this.reset();
    };

    reset() {
        this.name = '';
        this.lastName = '';
        this.age = 0;
        this.country = '';
        this.city = '';
        this.hobbies = [];
    };

    setName(name) {
        this.name = name;
        return this;
    };

    setLastName(lastName) {
        this.lastName = lastName;
        return this;
    };

    setAge(age) {
        this.age = age;
        return this;
    };

    setCountry(country) {
        this.country = country;
        return this;
    };

    setCity(city) {
        this.city = city;
        return this;
    };

    addHobby(hobby) {
        this.hobbies.push(hobby)
        return this;
    };    

    //metodo que construye el objeto con la clase que elegimos
    build() {
        const person = new Person(
            this.name,
            this.lastName,
            this.age,
            this.country,
            this.city,
            this.hobbies,
        );

        this.reset();
        return person;
    };
};

//Instanciando el builder, ahora tenemos una clase que crea objetos pudiendo encadenar los metodos, porque todos retornan this.
const builder = new PersonBuilder();

//Creando persona con datos, encadenando los metodos que agregan los datos que queremos
const personaNueva = builder.setName('Juan')
                            .setLastName('Perez')
                            .addHobby('Jurgol')
                            .setAge(30)
                            .build();

console.log(personaNueva);
//Como lo que el builder creo es un objeto de clase person, podemos llamar su metodo tambien
console.log(personaNueva.getFullName());