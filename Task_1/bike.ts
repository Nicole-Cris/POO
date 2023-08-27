export class Bicicleta {
    private id: number;
    private modelo: string;
    private ValorDiario: number;
    private disponibilidade: boolean;

    constructor(id: number, modelo: string, dailyRentalRate: number) {
        this.id = id;
        this.modelo = modelo;
        this.ValorDiario = dailyRentalRate;
        this.disponibilidade = true;
    }

    rent(days: number): number {
        if (!this.disponibilidade) {
            throw new Error(`A bike ${this.id} não está disponível para alugar.`);
        }

        this.disponibilidade = false;
        return days * this.ValorDiario;
    }

    get modelBike(): string {
        return this.modelo
    }

    returnBike() {
        this.disponibilidade = true;
    }

    getEstaDisponivel(): boolean {
        return this.disponibilidade;
    }
}