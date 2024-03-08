import { describe, it, expect } from 'vitest'
import { UpdatePasswordViewmodel } from '../../../src/modules/update_password/app/update_password_viewmodel'

describe('Assert Update Password viewmodel is correct', () => {
  it('Should return correct message when toJSON method is called', () => {
    const updatePasswordViewmodel = new UpdatePasswordViewmodel()

    const result = updatePasswordViewmodel.toJSON()

    expect(result).toEqual({
      message: 'Password updated successfully.'
    })
  })
})
