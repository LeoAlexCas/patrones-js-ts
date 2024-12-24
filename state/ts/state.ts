interface Istate {
    next(ticket: Ticket): number | null;
    add(ticket: Ticket, quantity: number): void;
};

class Ticket {
    private state: Istate;
    quantity: number;
    readonly limit: number;
    private number: number;

    constructor(limit: number) {
        this.limit = limit;
        this.quantity = 0;
        this.number = 0;
        this.state = new EmptyState();
    };

    //Getters y Setters para los datos
    get _number(): number {
        return this.number++;
    };

    set _state(state: Istate) {
        this.state = state;
    };

    get _state(): Istate {
        return this.state;
    };

    //metodos que usan los metodos del state
    next(): number | null {
        return this.state.next(this);
    };

    add(quantity: number): void {
        this.state.add(this, quantity);
    };
};


//Estado vacio
class EmptyState implements Istate {
    next(ticket: Ticket): number | null {
        return null;
    };

    add(ticket: Ticket, quantity: number): void {
        if(quantity < ticket.limit) {
            ticket.quantity = quantity;
            ticket._state = new WithDataState();
        } else if(quantity === ticket.limit) {
            ticket.quantity = quantity;
            ticket._state = new FullState();
        };
    };
};

//Estado con data
class WithDataState implements Istate {
    next(ticket: Ticket): number | null {
        ticket.quantity--;
        if(ticket.quantity <= 0) {
            ticket._state = new EmptyState();
        };

        return ticket._number;
    };

    add(ticket: Ticket, quantity: number): void {
        if((ticket.quantity + quantity) < ticket.limit) {
            ticket.quantity += quantity;
        } else if((ticket.quantity + quantity) === ticket.limit) {
            ticket.quantity += quantity;
        };
    };
};

class FullState implements Istate {
    next(ticket: Ticket): number | null {
        ticket.quantity--;
        if(ticket.quantity <= 0) {
            ticket._state = new EmptyState();
        }else {
            ticket._state = new WithDataState();
        };

        return ticket._number;
    };

    add(ticket: Ticket, quantity: number): void {
        console.log('ticket lleno');
    }
};

//Ejecucion:
const ticket = new Ticket(5);
console.log(ticket._state); //EmptyState {}
console.log(ticket.next()); //null

ticket.add(5);
console.log(ticket._state); //FullState {}
console.log(ticket.next()); //0