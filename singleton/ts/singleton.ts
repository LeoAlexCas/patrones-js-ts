class SingletonTs {
    //Se puede hacer private para que no sea posible sobreescribir la instancia desde fuera
    private static instance: SingletonTs;
    private random: number;

    //constructor privado, por lo que solo un metodo estatico podria crear o llamar una instancia
    private constructor() {
        this.random = Math.random();
    };

    //metodo estatico que creara la instancia
    public static getInstance(): SingletonTs {
        if(!this.instance) {
            this.instance = new SingletonTs();
        };

        return this.instance;
    };

    public info() {
        return this.random;
    };
};

const single: SingletonTs = SingletonTs.getInstance();
const single2: SingletonTs = SingletonTs.getInstance();

console.log(single.info());
console.log(single.info());