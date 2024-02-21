import { Employee } from '../../../shared/domain/entities/employee'
import { IEmployeeRepository } from '../../../shared/domain/repositories/employee_repository_interface'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'

export class ConfirmForgotPasswordUsecase {
  constructor(private repo: IEmployeeRepository) {}

  async execute(email: string, newPassword: string, createdAt: number) {
    if (!Employee.validateEmail(email)) {
      throw new EntityError('email')
    }
    if (!Employee.validatePassword(newPassword)) {
      throw new EntityError('newPassword')
    }

    const timestampNow = new Date().getTime()

    if (timestampNow - createdAt > 600000) {
      throw new EntityError('token')
    }

    const updatedUser = await this.repo.confirmForgotPassword(email, newPassword)

    return updatedUser
  }
}