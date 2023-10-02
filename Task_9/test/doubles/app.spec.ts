it('should throw RentNotFoundError when trying to return a non-existing rent', async () => {
  const app = new App(userRepo, bikeRepo, rentRepo);
  const user = new User('Jose', 'jose@mail.com', '1234');
  await app.registerUser(user);
  const bike = new Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
  await app.registerBike(bike);
  
  // Tente retornar a bicicleta antes de alugá-la
  await expect(app.returnBike(bike.id, user.email)).rejects.toThrow(RentNotFoundError);
});
