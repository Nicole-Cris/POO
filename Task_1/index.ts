import { Cliente } from './cliente'
import { Bicicleta } from './bike'
import { Reservation } from './reserva'

//Cadastro
const bike1 = new Bicicleta(1, "Mountain Bike", 10);
const cliente1 = new Cliente("Alice", "490.091.892-67");
const reserva1 = new Reservation(bike1, cliente1, 3);

//Exibição do cadastro
console.log(bike1.modelBike);
console.log(`Bicicleta Disponível? ${bike1.getEstaDisponivel()}`);
console.log(cliente1);
console.log(`Data da reserva: ${reserva1.getDate()}`);
console.log(`Custo total: R$ ${reserva1.getTotalCost()}`);



