export class DuplicateUserError extends Error {
    public readonly name = 'DuplicateUserError'

    constructor() {
        super('User Duplicate')
    }
}