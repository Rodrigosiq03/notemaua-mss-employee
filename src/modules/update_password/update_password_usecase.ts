import { IEmployeeRepository } from '../../shared/domain/repositories/employee_repository_interface'
import { EntityError } from '../../shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../shared/helpers/errors/usecase_errors'
import { Employee } from '../../shared/domain/entities/employee'

export class UpdatePasswordUsecase {
  constructor(private repo: IEmployeeRepository) {}

  async execute(email: string, oldPassword: string, newPassword: string) {
    if (!Employee.validateEmail(email)) {
      throw new EntityError('email')
    }
    if (!Employee.validatePassword(oldPassword)) {
      throw new EntityError('oldPassword')
    }
    if (!Employee.validatePassword(newPassword)) {
      throw new EntityError('newPassword')
    }

    const updatedUser = await this.repo.updatePassword(
      email,
      oldPassword,
      newPassword,
    )

    if (!updatedUser) {
      throw new NoItemsFound('User')
    }

    return updatedUser
  }
}
