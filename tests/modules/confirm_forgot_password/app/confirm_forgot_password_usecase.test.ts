import { describe, it, expect } from 'vitest'
import { EmployeeRepositoryMock } from '../../../../src/shared/infra/repositories/employee_repository_mock' 
import { ConfirmForgotPasswordUsecase } from '../../../../src/modules/confirm_forgot_password/app/confirm_forgot_password_usecase'
import { Employee } from '../../../../src/shared/domain/entities/employee'

describe('Assert Confirm Forgot Password Usecase is correct at all', () => {
  it('Should confirm forgot password correctly', async () => {
    const repo = new EmployeeRepositoryMock()
    const usecase = new ConfirmForgotPasswordUsecase(repo)
    const employee = await usecase.execute('admin@maua.br', 'Senhanovaqui123$', new Date().getTime())

    expect(employee.name).toEqual('Admin')
    expect(employee).toBeInstanceOf(Employee)
  })
  
})