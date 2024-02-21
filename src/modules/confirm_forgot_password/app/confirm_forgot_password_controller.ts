/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { ForbiddenAction, NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { BadRequest, Forbidden, InternalServerError, NotFound, OK } from '../../../shared/helpers/external_interfaces/http_codes'
import { ConfirmForgotPasswordUsecase } from './confirm_forgot_password_usecase'
import { ConfirmForgotPasswordViewmodel } from './confirm_forgot_password_viewmodel'

export class ConfirmForgotPasswordController  {
  constructor(private usecase: ConfirmForgotPasswordUsecase) {}

  async handle(request: IRequest) {
    try {
      if (request.data.email === undefined || request.data.email === null) {
        throw new MissingParameters('email')
      }
      if (typeof request.data.email !== 'string') {
        throw new WrongTypeParameters('email', 'string', typeof request.data.email)
      }
      if (request.data.password === undefined || request.data.password === null) {
        throw new MissingParameters('password')
      }
      if (typeof request.data.password !== 'string') {
        throw new WrongTypeParameters('password', 'string', typeof request.data.password)
      }
      if (request.data.createdAt === undefined || request.data.createdAt === null) {
        throw new MissingParameters('createdAt')
      }
      if (typeof request.data.createdAt !== 'number') {
        throw new WrongTypeParameters('createdAt', 'number', typeof request.data.createdAt)
      }

      await this.usecase.execute(request.data.email, request.data.password, request.data.createdAt)

      const viewmodel = new ConfirmForgotPasswordViewmodel()

      const response = new OK(viewmodel.toJSON())

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