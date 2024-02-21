/* eslint-disable @typescript-eslint/no-explicit-any */
import envs from '../../../..'
import { STAGE } from '../../../shared/domain/enums/stage_enum'
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { ForbiddenAction, NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { BadRequest, Forbidden, InternalServerError, NotFound, OK } from '../../../shared/helpers/external_interfaces/http_codes'
import { generateCode } from '../../../shared/services/generate_code_forgot_password'
import { sendForgotPasswordMail } from '../../../shared/services/send_mail'
import { ForgotPasswordUsecase } from './forgot_password_usecase'
import { ForgotPasswordViewmodel } from './forgot_password_viewmodel'

export class ForgotPasswordController  {
  constructor(private usecase: ForgotPasswordUsecase) {}

  async handle(request: IRequest) {
    try {
      if (request.data.email === undefined || request.data.email === null) {
        throw new MissingParameters('email')
      }
      if (typeof request.data.email !== 'string') {
        throw new WrongTypeParameters('email', 'string', typeof request.data.email)
      }

      const employee = await this.usecase.execute(request.data.email)

      if (envs.STAGE === STAGE.DEV || envs.STAGE === STAGE.PROD) {
        const code = generateCode()
        await sendForgotPasswordMail(employee.email, code)
      }

      const viewmodel = new ForgotPasswordViewmodel()

      const response = new OK(viewmodel.toJSON())

      response.headers = {
        'createdAt': new Date().getTime()
      }

      return response
    }
    catch (error: any) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message)
      }
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof EntityError) {
        return new BadRequest(error.message)
      }
      if (error instanceof ForbiddenAction) {
        return new Forbidden(error.message as any)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }

  
}