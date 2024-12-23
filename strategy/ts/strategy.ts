/*Esto es fundamental y en JS no se puede hacer, la idea es tener una interface que marque el contrato de como deben ser
*Las estrategias, para evitar que se puedan pasar clases que no implementan esa interface al contexto
*/
interface Istrategy {
    login(user: string, password: string): boolean;
};

class LoginContext {
    private strategy: Istrategy;

    constructor(strategy: Istrategy) {
        this.strategy = strategy;
    };

    setStrategy(strategy: Istrategy) {
        this.strategy = strategy;
    };

    login(user: string, password: string): boolean {
        return this.strategy.login(user, password);
    };
};

class LoginDBStrategy implements Istrategy {
    login(user: string, password: string): boolean {
        return user === 'admin' && password === '123' ? true : false;
    };
};

class LoginServiceStrategy implements Istrategy {
    login(user: string, password: string): boolean {
        return user === 'admin' && password === '123' ? true : false;
    };
};

const auth = new LoginContext(new LoginDBStrategy());
console.log(auth.login('admin', '123')); //implementado correctamente marca true