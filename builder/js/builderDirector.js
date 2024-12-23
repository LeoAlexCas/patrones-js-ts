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

//El director que contendra las directrices de builder, basicamente son bases de creacion usando el builder
class PersonDirector {
    constructor(personBuilder) {
        this.setBuilder(personBuilder);
    };

    setBuilder(builder) {
        this.personBuilder = builder;
    };

    //Este creara ejecutara los metodos con estos datos, como se ejecutan con referencia al person builder, estos datos que se agregan
    //con los metodos persistiran en el objeto externo. Por lo mismo se ejecuta el reset antes de empezar, por si no tiene reset por defecto
    //y cada metodo tiene una plantilla distinta, si no se resetea se juntarian todos los datos
    createCompletePersonJuan() {
        this.personBuilder.reset();
        this.personBuilder
                        .setName('Juan')
                        .setLastName('Perez')
                        .setAge(30)
                        .setCountry('USA')
                        .setCity('NY')
                        .addHobby('jurgol')
    };

    
    createSimplePersonJuan() {
        this.personBuilder.reset();
        this.personBuilder
                        .setName('Juan')
                        .setLastName('Perez')
    };
};

//llamamos al builder
const builder = new PersonBuilder();

//llamamos al director que ya tiene las plantillas y le pasamos el builder
const director = new PersonDirector(builder);
director.createCompletePersonJuan();

//Ya que el director ya ejecuto sobre el builder los metodos de llenado, solo queda ejecutar el build 
const juanCreated = builder.build()
console.log(juanCreated);


