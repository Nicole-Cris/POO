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
    rentBike(bike: Bike, user: User, startDate: Date, endDate: Date): void {
        // Verifique se a bike e o usuário existem
        const selectedBike = this.bikes.find(b => b === bike);
        const selectedUser = this.findUser(user.email);

        if (!selectedBike || !selectedUser) {
            throw new Error("Bike or user not found.");
        }

        // Filtrar os aluguéis relacionados à bike
        const bikeRents = this.rents.filter(rent => rent.bike === bike);

        // Verificar se as datas do novo aluguel se sobrepõem com aluguéis existentes
        if (Rent.canRent(bikeRents, startDate, endDate)) {
            // Crie um novo aluguel e adicione-o ao array de aluguéis
            const newRent = Rent.create(this.rents, bike, user, startDate, endDate);
            this.rents.push(newRent);

        } else {
            throw new Error('Overlapping dates.');
        }


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

    returnBike(NameBike: string): Bike {
        return this.bikes.find(Bike => Bike.name === NameBike)
    }

    // Método para listar todos os usuários cadastrados
    listUsers(): User[] {
        return this.users;
    }

    // Método para listar todas as reservas cadastradas
    listRents(): Rent[] {
        return this.rents;
    }

    // Método para listar todas as bicicletas cadastradas
    listBikes(): Bike[] {
        return this.bikes;
    }


}