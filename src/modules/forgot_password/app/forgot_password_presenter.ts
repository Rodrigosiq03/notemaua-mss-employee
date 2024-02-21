/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environments } from '../../../shared/environments'
import { LambdaHttpRequest, LambdaHttpResponse } from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { ForgotPasswordController } from './forgot_password_controller'
import { ForgotPasswordUsecase } from './forgot_password_usecase'

const repo = Environments.getEmployeeRepo()
const usecase = new ForgotPasswordUsecase(repo)
const controller = new ForgotPasswordController(usecase)

export async function forgotPasswordPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const response = await controller.handle(httpRequest)
  const httpResponse = new LambdaHttpResponse(response?.body, response?.statusCode, response?.headers)

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await forgotPasswordPresenter(event)
  return response
}