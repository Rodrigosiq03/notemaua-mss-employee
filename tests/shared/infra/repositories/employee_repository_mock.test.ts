import { describe, it, expect } from 'vitest'
import { EmployeeRepositoryMock } from '../../../../src/shared/infra/repositories/employee_repository_mock'
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors'
import { InvalidPasswordError } from '../../../../src/shared/helpers/errors/login_errors'

describe('[EmployeeRepositoryMock]', () => {
  const repo = new EmployeeRepositoryMock()

  it('Should return a specific employee', () => {
    const employee = repo.getEmployee('admin@maua.br')

    expect(employee.email).toBe('admin@maua.br')
    expect(employee.name).toBe('Admin')
  })

  it('Should not return a specific employee', () => {
    expect(() => repo.getEmployee('')).toThrowError(NoItemsFound)
  })

  it('Should throw InvalidPasswordError when old password does not match', () => {
    expect(() =>
      repo.updatePassword('admin2@maua.br', 'Admin2_123$$', 'newPassword2#1'),
    ).toThrowError(InvalidPasswordError)
  })
})