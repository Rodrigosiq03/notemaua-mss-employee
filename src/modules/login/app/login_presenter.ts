/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LambdaHttpRequest, LambdaHttpResponse } from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { Environments } from '../../../shared/environments'
import { LoginController } from './login_controller'
import { LoginUsecase } from './login_usecase'

const repo = Environments.getEmployeeRepo()
const usecase = new LoginUsecase(repo)
const controller = new LoginController(usecase)

export async function loginPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const response = await controller.handle(httpRequest)
  const httpResponse = new LambdaHttpResponse(response?.body, response?.statusCode, response?.headers)

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await loginPresenter(event)
  return response
}