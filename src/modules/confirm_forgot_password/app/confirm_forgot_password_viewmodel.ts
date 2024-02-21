export class ConfirmForgotPasswordViewmodel {
  toJSON() {
    return {
      'message': 'Password updated successfully. You can now login.'
    }
  }
}