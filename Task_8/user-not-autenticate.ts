export class UserNotAutentacateError extends Error {
    public readonly name = 'UserNotAutenticateError'

    constructor() {
        super('User Not Autenticate')
    }
}