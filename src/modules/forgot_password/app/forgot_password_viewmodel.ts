export class ForgotPasswordViewmodel {
  toJSON() {
    return {
      'message': 'A code has been sent to your email. Please check it.'
    }
  }
}