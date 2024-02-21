import { Employee } from '../../../shared/domain/entities/employee'
import { IEmployeeRepository } from '../../../shared/domain/repositories/employee_repository_interface'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'

export class ForgotPasswordUsecase {
  constructor(private repo: IEmployeeRepository) {}

  async execute(email: string) {
    if (!Employee.validateEmail(email)) {
      throw new EntityError('email')
    }
    
    const user = this.repo.forgotPassword(email)

    return user
  }
}