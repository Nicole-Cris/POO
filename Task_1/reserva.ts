import { Cliente } from './cliente'
import { Bicicleta } from './bike'

export class Reservation {
    private bike: Bicicleta;
    private customer: Cliente;
    private Qtde_dias_Alugados: number;
    private Date: Date; //dia que a bike foi alugada

    constructor(bike: Bicicleta, customer: Cliente, DiasAlugados: number) {
        this.bike = bike;
        this.customer = customer;
        this.Qtde_dias_Alugados = DiasAlugados;
        this.Date = new Date();
        
    }

    getTotalCost(): number {
        return this.bike.rent(this.Qtde_dias_Alugados);
    }

    getDate(): Date {
        return this.Date;
    }
}