import { it, expect, describe,  } from 'vitest'
import { EmployeeRepositoryMock } from '../../../../src/shared/infra/repositories/employee_repository_mock'
import { ConfirmForgotPasswordUsecase } from '../../../../src/modules/confirm_forgot_password/app/confirm_forgot_password_usecase'
import { ConfirmForgotPasswordController } from '../../../../src/modules/confirm_forgot_password/app/confirm_forgot_password_controller'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('Assert Confirm forgot password controller is correct at all', () => {
  const repo = new EmployeeRepositoryMock()
  const usecase = new ConfirmForgotPasswordUsecase(repo)
  const controller = new ConfirmForgotPasswordController(usecase)

  it('Assert Confirm forgot password controller is correct when creating', async () => {

    const request = new HttpRequest(undefined, { createdAt: new Date().getTime() }, { email: 'admin@maua.br', password: 'Testandosenhanova123$' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body['message']).toEqual('Password updated successfully. You can now login.')

  })
  it('Assert Confirm forgot password controller is not correct when not pass email', async () => {
    const request = new HttpRequest(undefined, { createdAt: new Date().getTime() }, { password: 'Testandosenhanova123$' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field email is missing')
  })
  it('Assert Confirm forgot password controller is not correct when not pass password', async () => {
    const request = new HttpRequest(undefined, { createdAt: new Date().getTime() }, { email: 'admin@maua.br' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field password is missing')
  })
  it('Assert Confirm forgot password controller is not correct when not pass createdAt', async () => {
    const request = new HttpRequest(undefined, {}, { email: 'admin@maua.br', password: 'Testandosenhanova123$' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field createdAt is missing')
  })
  it('Assert Confirm forgot password controller is not correct when pass email with wrong type', async () => {
    const request = new HttpRequest(undefined, { createdAt: new Date().getTime() }, { email: 10, password: 'Testandosenhanova123$' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field email isn\'t in the right type.\n Received: number.\n Expected: string.')
  })
  it('Assert Confirm forgot password controller is not correct when pass password with wrong type', async () => {
    const request = new HttpRequest(undefined, { createdAt: new Date().getTime() }, { email: 'admin@maua.br', password: 10 })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field password isn\'t in the right type.\n Received: number.\n Expected: string.')
  })
  it('Assert Confirm forgot password controller is not correct when pass createdAt with wrong type', async () => {
    const request = new HttpRequest(undefined, { createdAt: '' }, { email: 'admin@maua.br', password: 'Testandosenhanova123$' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field createdAt isn\'t in the right type.\n Received: string.\n Expected: number.')
  })
  it('Assert Confirm forgot password controller is not correct when pass a not found email value', async () => {
    const request = new HttpRequest(undefined, { createdAt: new Date().getTime() }, { email: '22.00680-0@maua.br', password: 'Testandosenhanova123$' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toBe('No items found for email')
  })
  it('Assert Confirm forgot password controller is not correct when createdAt pass 10 minutes', async () => {
    const request = new HttpRequest(undefined, { createdAt: 1704074148000 }, { email: 'admin@maua.br', password: 'Testandosenhanova123$' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field token is not valid')
  })
})