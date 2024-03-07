import { describe, it, expect } from 'vitest'
import { UpdatePasswordUsecase } from '../../../src/modules/update_password/update_password_usecase'
import { EntityError } from '../../../src/shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../../src/shared/helpers/errors/usecase_errors'
import { EmployeeRepositoryMock } from '../../../src/shared/infra/repositories/employee_repository_mock'

describe('Assert Update Password usecase is correct', () => {
  it('Should throw EntityError when email is invalid', async () => {
    const repo = new EmployeeRepositoryMock()
    const usecase = new UpdatePasswordUsecase(repo)

    const executeFunction = async () =>
      await usecase.execute('invalidemail.com', 'oldPassword', 'newPassword')
    expect(executeFunction).toThrowError(EntityError)
  })

  it('Should throw EntityError when oldPassword is invalid', async () => {
    const repo = new EmployeeRepositoryMock()
    const usecase = new UpdatePasswordUsecase(repo)

    const executeFunction = async () =>
      await usecase.execute('user@example.com', '', 'newPassword')
    expect(executeFunction).toThrowError(EntityError)
  })

  it('Should throw EntityError when newPassword is invalid', async () => {
    const repo = new EmployeeRepositoryMock()
    const usecase = new UpdatePasswordUsecase(repo)

    const executeFunction = async () =>
      await usecase.execute('user@example.com', 'Admin2_123$', '')
    expect(executeFunction).toThrowError(EntityError)
  })

  it('Should throw NoItemsFound when user is not found', async () => {
    const repo = new EmployeeRepositoryMock()
    const usecase = new UpdatePasswordUsecase(repo)

    const executeFunction = async () =>
      await usecase.execute(
        'admin@example.com',
        'Admin2_123$',
        'newPassword',
      )
    expect(executeFunction).toThrowError(NoItemsFound)
  })

  it('Should update password when all parameters are valid', async () => {
    const repo = new EmployeeRepositoryMock()
    const usecase = new UpdatePasswordUsecase(repo)

    const updatedUser = await usecase.execute(
      'admin2@maua.br',
      'Admin2_123$',
      'newPassword1$',
    )

    expect(updatedUser.password).toBe('newPassword')
  })
})
