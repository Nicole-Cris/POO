export class UserNotRemoved extends Error {
    public readonly name = 'User Not Removed'

    constructor() {
        super('User not Removed')
    }
}