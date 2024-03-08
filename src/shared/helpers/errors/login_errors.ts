import { BaseError } from './base_error'

export class PasswordDoesNotMatchError extends BaseError {
  constructor() {
    super('Password does not match')
  }
}

export class InvalidPasswordError extends BaseError {
  constructor() {
    super('Invalid password')
  }
}