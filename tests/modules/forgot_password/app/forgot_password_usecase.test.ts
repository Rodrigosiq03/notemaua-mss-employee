import { it, expect, describe } from 'vitest'
import { ForgotPasswordUsecase } from '../../../../src/modules/forgot_password/app/forgot_password_usecase'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'
import { EmployeeRepositoryMock } from '../../../../src/shared/infra/repositories/employee_repository_mock'

describe('Assert Forgot password usecase is correct at all', () => {
  it('Should Forgot password usecase correctly', async () => {
    const repo = new EmployeeRepositoryMock()
    const usecase = new ForgotPasswordUsecase(repo)

    const employee = await usecase.execute('admin@maua.br')

    expect(employee.props).toEqual({
      name: 'Admin',
      email: 'admin@maua.br',
      role: ROLE.EMPLOYEE,
      password: '$2a$08$v9krjLq9tIl7MBQqoVIE8.pXqEXLMONGG5hcBWpds2LL.sjwWC24O',
    })
  })
  
})