import { it, expect, describe,  } from 'vitest'
import { ConfirmForgotPasswordViewmodel } from '../../../../src/modules/confirm_forgot_password/app/confirm_forgot_password_viewmodel'

describe('Assert Confirm forgot password viewmodel is correct at all', () => {
  it('Assert the viewmodel is correct at all', () => {
    const firstAccessViewmodel = new ConfirmForgotPasswordViewmodel().toJSON()

    expect(firstAccessViewmodel).toEqual({
      'message': 'Password updated successfully. You can now login.'
    })
  })
})