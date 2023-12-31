import sinon from "sinon"
import { describe, it, expect } from "@jest/globals";
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { BikeNotFoundError } from "./errors/bike-not-found-error"
import { UnavailableBikeError } from "./errors/unavailable-bike-error"
import { UserNotFoundError } from "./errors/user-not-found-error"
//Criados
import { UserNotRemoved } from "./errors/user-not-removed";
import { DuplicateUserError } from "./errors/duplicate-user";
import { UserNotAutentacateError } from "./errors/user-not-autenticate";

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const newYork = new Location(40.753056, -73.983056)
        expect(() => {
            app.moveBikeTo('fake-id', newYork)
        }).toThrow(BikeNotFoundError)
    })

    it('should correctly handle a bike rent', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })

    it('should throw unavailable bike when trying to rent with an unavailable bike', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(() => {
            app.rentBike(bike.id, user.email)
        }).toThrow(UnavailableBikeError)
    })

    it('should throw user not found error when user is not found', () => {
        const app = new App()
        expect(() => {
            app.findUser('fake@mail.com')
        }).toThrow(UserNotFoundError)
    })

    //Testa se o usuário foi removido

    it('should correctly remove a user', async () => {
        const app = new App();
        const user = new User('Jose', 'jose@mail.com', '1234');
        await app.registerUser(user);

        // Verifique se o usuário foi registrado com sucesso
        expect(app.findUser(user.email)).toEqual(user);

        // Remova o usuário
        app.removeUser(user.email);

        // Verifique se o usuário foi removido (deve lançar uma exceção UserNotFoundError)
        expect(() => {
            app.findUser(user.email);
        }).toThrow(UserNotFoundError);
    });

    //Testa se o usuário já foi cadastrado

    it('should throw UserNotRemoved when user removal fails', () => {
        const app = new App();

        // Tente remover um usuário que não existe
        expect(() => {
            app.removeUser('nonexistent@mail.com');
        }).toThrow(UserNotRemoved);
    });
    it('should throw DuplicateUserError when trying to register a duplicate user', async () => {
        const app = new App();
        const user = new User('Jose', 'jose@mail.com', '1234');

        // Registra o usuário pela primeira vez (deve ser bem-sucedido)
        await app.registerUser(user);

    // Tenta registrar o mesmo usuário novamente (deve lançar DuplicateUserError)
        expect(() => {
            app.registerUser(user);
            }).toThrow(DuplicateUserError);
        });
    
        it('should throw UserNotAutentacateError when authentication fails', async () => {
            const app = new App();
            const userEmail = 'jose@mail.com';
            const password = '1234';
    
            // Tente autenticar um usuário que não existe (deve lançar UserNotAutentacateError)
            expect(() => {
                app.authenticate(userEmail, password);
            }).toThrow(UserNotAutentacateError);
    
            // Registre o usuário
            const user = new User('Jose', userEmail, password);
            await app.registerUser(user);
    
            // Tente autenticar com uma senha incorreta (deve lançar UserNotAutentacateError)
            expect(() => {
                app.authenticate(userEmail, 'senha_incorreta');
            }).toThrow(UserNotAutentacateError);
    
            // Tente autenticar com a senha correta (deve ser bem-sucedido)
            const authenticated = await app.authenticate(userEmail, password);
            expect(authenticated).toBeTruthy();
        });
    });