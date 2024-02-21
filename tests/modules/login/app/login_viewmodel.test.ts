import { it, expect, describe } from 'vitest'
import { LoginViewmodel } from '../../../../src/modules/login/app/login_viewmodel'
import { hash } from 'bcryptjs'

describe('Assert Get User viewmodel is correct at all', () => {
  it('Assert the viewmodel is correct at all', async () => {
    const token = await hash('Teste123$', 6)

    const loginViewmodel = new LoginViewmodel(token).toJSON()

    expect(loginViewmodel).toEqual({
      'token': token,
      'message': 'Employee logged in successfully'
    })
  })
})