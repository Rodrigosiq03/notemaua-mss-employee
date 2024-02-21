/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { LoginUsecase } from './login_usecase'
import { LoginViewmodel } from './login_viewmodel'
import jsonwebtoken from 'jsonwebtoken'
import envs from '../../../../index'
import { BadRequest, InternalServerError, NotFound, OK } from '../../../shared/helpers/external_interfaces/http_codes'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { PasswordDoesNotMatchError } from '../../../shared/helpers/errors/login_errors'

export class LoginController {
  constructor(private usecase: LoginUsecase) {}

  async handle(request: IRequest) {
    try {
      if (request.data.email === undefined) {
        throw new MissingParameters('email')
      }
      if (typeof request.data.email !== 'string') {
        throw new WrongTypeParameters('email', 'string', typeof request.data.email)
      }
      if (request.data.password === undefined) {
        throw new MissingParameters('password')
      }
      if (typeof request.data.password !== 'string') {
        throw new WrongTypeParameters('password', 'string', typeof request.data.password)
      }

      const employee = await this.usecase.execute(request.data.email, request.data.password)

      const jwtSecret = envs.JWT_SECRET

      const token = jsonwebtoken.sign({ role: employee.role}, jwtSecret, 
        {
          expiresIn: '24h'
        })

      const viewmodel = new LoginViewmodel(token)

      const response = new OK(viewmodel.toJSON())

      return response
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message)
      }
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof PasswordDoesNotMatchError) {
        return new BadRequest(error.message)
      }
      if (error instanceof EntityError) {
        return new BadRequest(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}