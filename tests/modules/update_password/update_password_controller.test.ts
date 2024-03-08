import { describe, it, expect } from 'vitest'
import { IRequest } from '../../../src/shared/helpers/external_interfaces/external_interface'
import { UpdatePasswordController } from '../../../src/modules/update_password/app/update_password_controller'
import { UpdatePasswordUsecase } from '../../../src/modules/update_password/app/update_password_usecase'
import { EmployeeRepositoryMock } from '../../../src/shared/infra/repositories/employee_repository_mock'
import { BadRequest, OK } from '../../../src/shared/helpers/external_interfaces/http_codes'

describe('UpdatePasswordController', () => {
  it('Should return OK response when all parameters are valid', async () => {
    // Arrange
    const request: IRequest = {
      data: {
        email: 'admin2@maua.br',
        oldPassword: 'Admin2_123$',
        newPassword: 'Adminzada3_1234$',
      },
    }

    const usecase = new UpdatePasswordUsecase(new EmployeeRepositoryMock())
    const controller = new UpdatePasswordController(usecase)

    // Act
    const response = await controller.handle(request)

    // Assert
    expect(response).toBeInstanceOf(OK)
  })

  it('Should return BadRequest response when email is missing', async () => {
    // Arrange
    const request: IRequest = {
      data: {
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
      },
    }

    const usecase = new UpdatePasswordUsecase(new EmployeeRepositoryMock())
    const controller = new UpdatePasswordController(usecase)

    // Act
    const response = await controller.handle(request)

    // Assert
    expect(response).toBeInstanceOf(BadRequest)
  })

})
