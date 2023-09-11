import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto';
import bcrypt from 'bcrypt';


export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        const Find_User =  this.users.find(user => user.email === email)
        if (!Find_User) {
            throw new Error("User not found.");
        }
        return Find_User
    }

    findBike (id:string): Bike{
        return this.bikes.find(bike => bike.id === id)
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    //registro da bike
    registerBike(bike: Bike ): void {
        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
    }

    //remoção do usuário
    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }

    //Aluga uma Bik
    rentBike(bikeId: string, userEmail:string) : void {
        const bike = this.findBike(bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        if (!bike.available){
            throw new Error("Unavailable bike.")
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const newRent = new Rent(user, bike, new Date())
        bike.available = false
        this.rents.push(newRent)
    }


    // Cadastre o usuário com senha criptografada
    registerUserWithPassword(user: User, password: string): void {
        // Verifique se o usuário já existe pelo email
        if (this.users.some(existingUser => existingUser.email === user.email)) {
            throw new Error('Duplicate user.');
        }

        // Gere um salt para a criptografia
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);

        // Hash da senha do usuário
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Defina o hash da senha no objeto do usuário
        user.id = crypto.randomUUID();
        user.password = hashedPassword;

        // Adicione o usuário ao array
        this.users.push(user);
    }

    // Autenticar o usuário
    authenticateUser(userId: string, password: string): boolean {
        const user = this.users.find(u => u.id === userId);

        if (!user) {
            return false; // Usuário não encontrado
        }

        // Verifique se a senha fornecida coincide com o hash armazenado
        return bcrypt.compareSync(password, user.password);
    }

    //Retornar a bike (faz a procura de uma bike pelo seu nome)

    returnBike(bikeId: string, userEmail:string):number{
        const today = new Date()
        const rent = this.rents.find(rent => rent.bike.id === bikeId && rent.user.email === userEmail && !rent.end)
        if (!rent) {
            throw new Error('Rent not found')
        }
        rent.end = today
        rent.bike.available = true
        const hours = diffHours(rent.end, rent.start)
        return hours * rent.bike.rate
    }
}


    function diffHours (dt2: Date, dt1: Date){
        var diff = (dt2.getTime() -  dt1.getTime()) / 1000
        diff /= (60*60)
        return Math.abs(diff)    
    }
}