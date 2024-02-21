export class LoginViewmodel {
  private token: string

  constructor(token: string) {
    this.token = token
  }

  toJSON() {
    return {
      token: this.token,
      message: 'Employee logged in successfully'
    }
  }
}