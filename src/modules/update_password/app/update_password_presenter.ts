/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Environments } from '../../../shared/environments'
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { UpdatePasswordController } from './update_password_controller'
import { UpdatePasswordUsecase } from './update_password_usecase'

const repo = Environments.getEmployeeRepo()
const usecase = new UpdatePasswordUsecase(repo)
const controller = new UpdatePasswordController(usecase)

export async function updatePasswordPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const response = await controller.handle(httpRequest)
  const httpResponse = new LambdaHttpResponse(
    response?.body,
    response?.statusCode,
    response?.headers,
  )

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await updatePasswordPresenter(event)
  return response
}
