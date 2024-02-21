import { it, expect, describe,  } from 'vitest'
import { ForgotPasswordViewmodel } from '../../../../src/modules/forgot_password/app/forgot_password_viewmodel'

describe('Assert First access viewmodel is correct at all', () => {
  it('Assert the viewmodel is correct at all', () => {
    const firstAccessViewmodel = new ForgotPasswordViewmodel().toJSON()

    expect(firstAccessViewmodel).toEqual({
      'message': 'A code has been sent to your email. Please check it.'
    })
  })
})