// RentNotFoundError.ts

export class RentNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RentNotFoundError';
  }
}
