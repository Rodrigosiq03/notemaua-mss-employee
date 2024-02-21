import { describe, expect, it } from 'vitest'
import { EmployeeRepositoryMock } from '../../../../src/shared/infra/repositories/employee_repository_mock'
import { LoginUsecase } from '../../../../src/modules/login/app/login_usecase' 
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'

describe('Assert Login usecase is correct at all', () => {
  const repo = new EmployeeRepositoryMock()
  const usecase = new LoginUsecase(repo)

  it('Should login a user correctly', async () => {

    const employee = await usecase.execute('admin@maua.br', 'Admin_123$')

    expect(employee.props).toEqual({
      name: 'Admin',
      email: 'admin@maua.br',
      role: ROLE.EMPLOYEE,
      password: '$2a$08$v9krjLq9tIl7MBQqoVIE8.pXqEXLMONGG5hcBWpds2LL.sjwWC24O'
    })
  })
  it('Should login a user correctly', async () => {

    const employee = await usecase.execute('admin@maua.br', 'Admin_123$')

    expect(employee.props).toEqual({
      name: 'Admin',
      email: 'admin@maua.br',
      role: ROLE.EMPLOYEE,
      password: '$2a$08$v9krjLq9tIl7MBQqoVIE8.pXqEXLMONGG5hcBWpds2LL.sjwWC24O'
    })
  })
  it('Should not login a user with wrong password', async () => {
    try {
      await usecase.execute('admin@maua.br', 'senhaerradaaqui')
    } catch (error) {
      expect(error).toEqual(new Error('Password does not match'))
      expect(error.message).toEqual('Password does not match')
    }
  })
    
})