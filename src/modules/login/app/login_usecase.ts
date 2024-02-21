import { compare } from 'bcryptjs'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { Employee } from '../../../shared/domain/entities/employee'
import { PasswordDoesNotMatchError } from '../../../shared/helpers/errors/login_errors'
import { IEmployeeRepository } from '../../../shared/domain/repositories/employee_repository_interface'

export class LoginUsecase {
  constructor(private repo: IEmployeeRepository) {}

  async execute(email: string, password: string) {
    if (!Employee.validateEmail(email)) {
      throw new EntityError('email')
    }
    if (!Employee.validatePassword(password)) {
      throw new EntityError('password')
    }

    const employee = await this.repo.login(email)

    console.log('employee - [LOGIN_USECASE] - ', employee)

    const doesPasswordMatches = await compare(password, employee.password)

    if (!doesPasswordMatches) {
      throw new PasswordDoesNotMatchError()
    }

    return employee
  }
}