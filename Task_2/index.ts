import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('mountain bike', 'mountain', 
    123, 500, 100.5, 'desc', 5, [])
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
app.registerBike(bike)
app.registerUser(user3)

//aluguel 1
const a = app.rentBike(bike, user, today, twoDaysFromToday)
//aluguel 2
const b = app.rentBike(bike, user3, tomorrow, twoDaysFromToday)

//outputs
console.log(app.findUser('maria@mail.com'))
console.log(app.returnBike('mountain bike'))
console.log(app.findUser('cecilia@mail.com'))
console.log(a)
console.log(b)












