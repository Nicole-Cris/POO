import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('mountain bike', 'mountain', 
    123, 500, 100.5, 'desc', 5, [])

const bike2 = new Bike('street bike', 'street', 
    123, 500, 100.5, 'street', 6, [])
const user = new User('Maria', 'maria@mail.com', '1234')
const user2 = new User('Maria Clara', 'maria@mail.com', '3123')
const user3 = new User('Maria Cecilia', 'cecilia@mail.com', '3156')

const today = new Date()
const tomorrow = new Date() 
tomorrow.setDate(tomorrow.getDate() + 1)
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const sevenDaysFromToday = new Date()
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)

const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)



const app = new App()

app.registerUser(user)
app.registerUser(user3)
app.registerBike(bike)
app.registerBike(bike2)

//aluguel 1
const a = app.rentBike(bike, user, today, twoDaysFromToday)
//aluguel 2
const b = app.rentBike(bike2, user3, sevenDaysFromToday, twoDaysFromToday)

// Para listar todos os usuários
const allUsers = app.listUsers();

// Para listar todas as reservas
const allRents = app.listRents();

// Para listar todas as bicicletas
const allBikes = app.listBikes();

// Crie um usuário e registre-o com uma senha criptografada
const user5 = new User('John Doe', 'john@example.com', '1234567')

const password = "mySecretPassword"; // Substitua pela outra senha do usuário
app.registerUserWithPassword(user5, password);

// Tente autenticar o usuário com as credenciais fornecidas
const userId = user5.id;
const enteredPassword = "Senha Incorreta"; // Caso a senha esteja incorreta
const isAuthenticated = app.authenticateUser(userId, enteredPassword);

if (isAuthenticated) {
    console.log("Usuário autenticado com sucesso.");
} else {
    console.log("Falha na Autenticação. Verifique suas credenciais.");
}

//outputs
console.log(app.findUser('maria@mail.com'))
console.log(app.returnBike('mountain bike'))
console.log(app.findUser('cecilia@mail.com'))
console.log(a)
console.log(b)

console.log(allBikes)
console.log(allRents)
console.log(allUsers)













