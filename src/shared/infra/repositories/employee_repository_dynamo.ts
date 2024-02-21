/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoItemsFound } from '../../helpers/errors/usecase_errors'
import { DynamoDatasource } from '../external/dynamo/datasources/dynamo_datasource'
import { EntityError } from '../../helpers/errors/domain_errors'
import { Environments } from '../../../shared/environments'
import { IEmployeeRepository } from '../../domain/repositories/employee_repository_interface'
import { Employee } from '../../domain/entities/employee'
import { EmployeeDynamoDTO } from '../dto/employee_dynamo_dto'
import { hash } from 'bcryptjs'

export class EmployeeRepositoryDynamo implements IEmployeeRepository {

  static partitionKeyFormat(email: string): string {
    return `employee#${email}`
  }

  static sortKeyFormat(email: string): string {
    return `#${email}`
  }

  constructor(private dynamo: DynamoDatasource = new DynamoDatasource(
    Environments.getEnvs().dynamoTableName, 
    Environments.getEnvs().dynamoPartitionKey, 
    Environments.getEnvs().region, undefined, undefined, Environments.getEnvs().endpointUrl, Environments.getEnvs().dynamoSortKey
  )) {}

  async getEmployee(email: string): Promise<Employee> {
    console.log('Environments.getEnvs().dynamoTableName - [GET_USER_REPO_DYNAMO] - ', Environments.getEnvs().dynamoTableName)
    const resp = await this.dynamo.getItem(EmployeeRepositoryDynamo.partitionKeyFormat(email), EmployeeRepositoryDynamo.sortKeyFormat(email))

    if (!resp['Item']) {
      throw new NoItemsFound('email')
    }

    const employeeDto = EmployeeDynamoDTO.fromDynamo(resp['Item'])

    return Promise.resolve(employeeDto.toEntity())
  }
  async createEmployee(employee: Employee): Promise<Employee> {
    const employeeDto = EmployeeDynamoDTO.fromEntity(employee)
    await this.dynamo.putItem(employeeDto.toDynamo(), EmployeeRepositoryDynamo.partitionKeyFormat(employee.email), EmployeeRepositoryDynamo.sortKeyFormat(employee.email))

    

    return Promise.resolve(employee)
  }
  async updateEmployee(email: string, newPassword?: string, newName?: string): Promise<Employee> {
    const itemsToUpdate: Record<string, any> = {}
    let hashedPassword = ''
    if (newPassword) {
      hashedPassword = await hash(newPassword, 6)
    }

    switch (true) {
      case newName !== undefined && newPassword !== undefined:
        itemsToUpdate['password'] = hashedPassword
        itemsToUpdate['name'] = newName
        break
      case newName !== undefined:
        itemsToUpdate['name'] = newName
        break
      case newPassword !== undefined:
        itemsToUpdate['password'] = hashedPassword
        break
      default:
        throw new EntityError('newName or newPassword')
    }

    const resp = await this.dynamo.updateItem(EmployeeRepositoryDynamo.partitionKeyFormat(email), EmployeeRepositoryDynamo.sortKeyFormat(email), itemsToUpdate)

    const employeeDto = EmployeeDynamoDTO.fromDynamo(resp['Attributes'])

    return Promise.resolve(employeeDto.toEntity())
  }
  async deleteEmployee(email: string): Promise<Employee> {
    const employee = await this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    await this.dynamo.deleteItem(EmployeeRepositoryDynamo.partitionKeyFormat(email), EmployeeRepositoryDynamo.sortKeyFormat(email))

    return Promise.resolve(employee)
  }
  
  async login(email: string): Promise<Employee> {
    const employee = await this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    return Promise.resolve(employee)
  }
  
  async forgotPassword(email: string): Promise<Employee> {
    const employee = await this.getEmployee(email)
  
    if (!employee) {
      throw new NoItemsFound('email')
    }
  
    return Promise.resolve(employee)
    
  }

  async confirmForgotPassword(email: string, newPassword: string): Promise<Employee> {
    const employee = await this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    employee.setPassword = await hash(newPassword, 6)

    await this.updateEmployee(email, newPassword)

    return Promise.resolve(employee)
  }
}