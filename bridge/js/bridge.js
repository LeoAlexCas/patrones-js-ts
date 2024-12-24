//BRIDGE: ESTRUCTURAL - puente que separa una implementacion de una clase que hace uso de la implementacion.
//Una interfaz va a definir la abstraccion y la otra la implimentacion - La implementacion se vera muy parecida a strategy.

//Usando buffer porque la implementacion de la clase usaba atob o btob y aca no estamos usando window
const { Buffer } = require('buffer');

//Clase de abstraccion
class EncoderTextAbstraction {
    constructor(encoder) {
        this.encoder = encoder;
    };

    encode(str) {
        return this.encoder.encode(str);
    };

    decode(str) {
        return this.encoder.decode(str);
    };
};


class Bas64EncoderImplementor {
    encode(str) {
        const buffer = Buffer.from(str);
        return buffer.toString('base64');
    };

    decode(str) {
        const buffer = Buffer.from(str, 'base64');
        return buffer.toString('utf-8');
    };
};

//Implementacion de ejemplo, porque esto no es un encoder xd
class UpperCaseEncodeImplementor {
    encode(str) {
        return str.toUpperCase();
    };

    decode(str) {
        return str.toLowerCase();
    };
};

class HTMLEncoderImplementor {
    encode(str) {
        return str.split('.').reduce((acc, el) => {
            return acc + `<p>${el.trim()}</p>`
        }, '');
    };

    decode(str) {
        return str.split('</p>').reduce((acc, el) => {
            return el !== '' ? acc + el.replace('<p>', '') + '. ' : acc + '';
        }, '')
    };
};

const encoder1 = new EncoderTextAbstraction(new Bas64EncoderImplementor());
console.log(encoder1.encode('duck')); //ZHVjaw==
console.log(encoder1.decode('ZHVjaw==')); //duck

const encoder2 = new EncoderTextAbstraction(new HTMLEncoderImplementor());
console.log(encoder2.encode('Texto de ejemplo. Separado por puntos. Para prueba')); //<p>Texto de ejemplo</p><p>Separado por puntos</p><p>Para prueba</p>
console.log(encoder2.decode('<p>Texto de ejemplo</p><p>Separado por puntos</p><p>Para prueba</p>')); //Texto de ejemplo. Separado por puntos. Para prueba. 