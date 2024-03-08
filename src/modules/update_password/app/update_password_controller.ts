/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import {
  BadRequest,
  InternalServerError,
  NotFound,
  OK,
  Unauthorized,
} from '../../../shared/helpers/external_interfaces/http_codes'
import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import {
  ForbiddenAction,
  NoItemsFound,
} from '../../../shared/helpers/errors/usecase_errors'
import { UpdatePasswordUsecase } from './update_password_usecase'
import { UpdatePasswordViewmodel } from './update_password_viewmodel'

export class UpdatePasswordController {
  constructor(private usecase: UpdatePasswordUsecase) {}

  async handle(request: IRequest) {
    try {
      if (!request.data.email) {
        throw new MissingParameters('email')
      }
      if (typeof request.data.email !== 'string') {
        throw new WrongTypeParameters(
          'email',
          'string',
          typeof request.data.email,
        )
      }
      if (!request.data.oldPassword) {
        throw new MissingParameters('oldPassword')
      }
      if (typeof request.data.oldPassword !== 'string') {
        throw new WrongTypeParameters(
          'oldPassword',
          'string',
          typeof request.data.oldPassword,
        )
      }
      if (!request.data.newPassword) {
        throw new MissingParameters('newPassword')
      }
      if (typeof request.data.newPassword !== 'string') {
        throw new WrongTypeParameters(
          'newPassword',
          'string',
          typeof request.data.newPassword,
        )
      }

      await this.usecase.execute(
        request.data.email,
        request.data.oldPassword,
        request.data.newPassword,
      )

      const viewmodel = new UpdatePasswordViewmodel()
      const response = new OK(viewmodel.toJSON())

      return response
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message)
      }
      if (
        error instanceof MissingParameters ||
        error instanceof WrongTypeParameters ||
        error instanceof EntityError
      ) {
        return new BadRequest(error.message)
      }
      if (error instanceof ForbiddenAction) {
        return new Unauthorized(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
