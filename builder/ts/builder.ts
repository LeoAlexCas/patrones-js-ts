//Con TS: interface de builder
interface IpersonBuilder {
    name: string;
    lastName: string;
    age: number;
    country: string;
    city: string;
    hobbies: string[];

    setName(name: string): IpersonBuilder;
    setLastName(lastName: string): IpersonBuilder;
    setAge(age: number): IpersonBuilder;
    setCountry(country: string): IpersonBuilder;
    setCity(city: string): IpersonBuilder;
    setHobby(hobby: string): IpersonBuilder;
    build(): Person;
};

//Clase Person que no es del patron
class Person {
    constructor(
        private name: string,
        private lastName: string,
        private age: number,
        private country: string,
        private city: string,
        private hobbies: string[]
    ) {};

    getFullName(): string {
        return `${this.name} ${this.lastName}`;
    };
};

//Clase Builder
class NormalPersonBuilder implements IpersonBuilder {
    name: string;
    lastName: string;
    age: number;
    country: string;
    city: string;
    hobbies: string[];

    constructor() {
        this.name = '';
        this.lastName = '';
        this.age = 0;
        this.country = '';
        this.city = '';
        this.hobbies = [];
    };

    reset(): void {
        this.name = '';
        this.lastName = '';
        this.age = 0;
        this.country = '';
        this.city = '';
        this.hobbies = [];
    };

    setName(name: string): IpersonBuilder {
      this.name = name;
      return this;  
    };

    setLastName(lastName: string): IpersonBuilder {
        this.lastName = lastName;
        return this;
    };

    setAge(age: number): IpersonBuilder {
        this.age = age;
        return this;
    };

    setCountry(country: string): IpersonBuilder {
        this.country = country;
        return this;
    };

    setCity(city: string): IpersonBuilder {
        this.city = city;
        return this;
    };

    setHobby(hobby: string): IpersonBuilder {
        this.hobbies.push(hobby);
        return this;
    };

    build(): Person {
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

//Director con TS
class PersonDirector {
    constructor(private personBuilder: IpersonBuilder) {};

    setPersonBuilder(personBuilder: IpersonBuilder) {
        this.personBuilder = personBuilder;
    };

    createSimplePerson(name: string, lastName: string) {
        this.personBuilder 
                        .setName(name)
                        .setLastName(lastName)
    };
};

//Creacion con builder directo
const personBuilder: NormalPersonBuilder = new NormalPersonBuilder();
const pedro = personBuilder
                        .setName('Pedro')
                        .setLastName('Perez')
                        .setAge(23)
                        .setHobby('jurgol')
                        .build()

console.log(pedro); 
//Person {
//     name: 'Pedro',
//     lastName: 'Perez',
//     age: 23,
//     country: '',
//     city: '',
//     hobbies: [ 'jurgol' ]
// }
  
//Creacion a traves del director
const director = new PersonDirector(personBuilder);
director.createSimplePerson('Juan', 'Valdez');
const juanValdez = personBuilder.build();
console.log(juanValdez);
// Person {
//     name: 'Juan',
//     lastName: 'Valdez',
//     age: 0,
//     country: '',
//     city: '',
//     hobbies: []
// }


