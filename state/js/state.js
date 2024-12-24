//STATE: Clases que pueden compartir informacion entre sus clases concretas y estas pueden modificar el estado inicial
class DocumentContext {
    
    constructor() {
        //Estado inicial el blanco
        this.context = '';
        this.state = new BlankState();
    };

    setState(state) {
        this.state = state;
    };

    //Metodo que ocupara la clase asignada al estado para escribir y definir un nuevo estado
    write(text) {
        this.state.write(this, text);
    };
};

//Clase que representa estado en blanco
class BlankState {
    write(documentContext, text) {
        documentContext.content = text;
        documentContext.setState(new WithContentState());
    };
};


class WithContentState {
    //Clase write de clase que representa un state que ya tiene contenido
    write(documentContext, text) {
        documentContext.content = `${documentContext.content} ${text}`
    };
};

class ApprovedState {
    write(documentContext, text) {
        console.log('Documento aprobado no modificable');
    };
};


const doc = new DocumentContext();
console.log(doc.state); //BlankState {}

doc.write('duck');
console.log(doc.content); //duck
console.log(doc.state); //WithContentState {}
doc.write('also');
doc.write('other duck');
console.log(doc.content); //duck also other duck

//Para alcanzar el estado final debemos usar el metodo setState para modiciarlo al estado aprobado
doc.setState(new ApprovedState());
console.error(doc.state); //ApprovedState {}
doc.write('other duck'); //Documento aprobado no modificable

//Con esto tambien se puede sacar el estado aprobado y pasarlo a un estado anterior
doc.setState(new WithContentState());
doc.write('more info');
console.log(doc.content); //duck also other duck more info