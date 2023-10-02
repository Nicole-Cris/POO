import { RentNotFoundError } from "./errors/rent-not-found-error";

// ...

export class App {
  // ...

  async returnBike(bikeId: string, userEmail: string): Promise<number> {
    // Verifique se existe um aluguel correspondente à bicicleta e ao usuário
    const rent = await this.rentRepo.findRent(bikeId, userEmail);

    if (!rent) {
      throw new RentNotFoundError("Rent not found for the given bike and user");
    }

    // Calcule o valor do aluguel e faça outras operações necessárias
    // ...

    return rentAmount;
  }

  // ...
}
Agora, você pode criar um teste para garantir que a exceção RentNotFoundError seja lançada quando um aluguel não for encontrado. Aqui está como você pode fazer isso:
javascript
Copy code
// app.test.ts

import { RentNotFoundError } from "../src/errors/rent-not-found-error";

// ...

it('should throw RentNotFoundError when trying to return a non-existing rent', async () => {
  const app = new App(userRepo, bikeRepo, rentRepo);
  const user = new User('Jose', 'jose@mail.com', '1234');
  await app.registerUser(user);
  const bike = new Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
  await app.registerBike(bike);
  
  // Tente retornar a bicicleta antes de alugá-la
  await expect(app.returnBike(bike.id, user.email)).rejects.toThrow(RentNotFoundError);
});
Com essas alterações, seu código agora deve lançar a exceção RentNotFoundError no método returnBike quando um aluguel não for encontrado, e o teste correspondente deve passar com sucesso. Certifique-se de adaptar o código às suas classes e estrutura de projeto existentes, se necessário.





