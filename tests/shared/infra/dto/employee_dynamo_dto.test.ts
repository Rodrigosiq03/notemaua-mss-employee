import { describe, it, expect } from 'vitest'
import { EmployeeRepositoryMock } from '../../../../src/shared/infra/repositories/employee_repository_mock'
import { EmployeeDynamoDTO } from '../../../../src/shared/infra/dto/employee_dynamo_dto'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'

describe('Assert Employee Dynamo DTO is correct at all', () => {
  const repo = new EmployeeRepositoryMock()

  it('Should get employee dto correctly', async () => {
    const employee = repo.getEmployee('admin@maua.br')
    const expectedDto = new EmployeeDynamoDTO({
      name: employee?.name,
      email: employee?.email,
      role: employee?.role as ROLE,
      password: employee?.password
    })

    const fromEntity = EmployeeDynamoDTO.fromEntity(employee)

    expect(fromEntity).toEqual(expectedDto)
  })
  it('Should get a to dynamo dto correctly', async () => {
    const employee = await repo.getEmployee('admin@maua.br')
    const employeeDto = new EmployeeDynamoDTO({
      name: employee?.name,
      email: employee?.email,
      role: employee?.role as ROLE,
      password: employee?.password
    })
    const employeeDynamo = employeeDto.toDynamo()
    const expectedDynamo = {
      'entity': 'employee',
      'name': employee?.name,
      'email': employee?.email,
      'role': employee?.role,
      'password': employee?.password
    }

    expect(employeeDynamo).toEqual(expectedDynamo)
  })
  it('Should get a correctly user from dynamo dto', async () => {
    const dynamo_dict = {'Item': {'email': { 'S': 'admin@maua.br'},
      'name': { 'S': 'Admin'},
      'SK': { 'S': '#admin@maua.br'},
      'role': { 'S': 'EMPLOYEE'},
      'PK': { 'S': 'employee#admin@maua.br' },
      'entity': { 'S': 'employee' },
      'password': { 'S': '$2a$08$v9krjLq9tIl7MBQqoVIE8.pXqEXLMONGG5hcBWpds2LL.sjwWC24O'}},
    'ResponseMetadata': {'RequestId': 'aa6a5e5e-943f-4452-8c1f-4e5441ee6042',
      'HTTPStatusCode': 200,
      'HTTPHeaders': {'date': 'Fri, 16 Dec 2022 15:40:29 GMT',
        'content-type': 'application/x-amz-json-1.0',
        'x-amz-crc32': '3909675734',
        'x-amzn-requestid': 'aa6a5e5e-943f-4452-8c1f-4e5441ee6042',
        'content-length': '174',
        'server': 'Jetty(9.4.48.v20220622)'},
      'RetryAttempts': 0}}
    
    const employee = EmployeeDynamoDTO.fromDynamo(dynamo_dict['Item'])
    const expectedEmployee = new EmployeeDynamoDTO({
      name: 'Admin',
      email: 'admin@maua.br',
      role: ROLE.EMPLOYEE,
      password: '$2a$08$v9krjLq9tIl7MBQqoVIE8.pXqEXLMONGG5hcBWpds2LL.sjwWC24O'
    })

    expect(employee).toEqual(expectedEmployee)
  })
  it('Should get a correctly to entity', async () => {
    const employeeRepo = await repo.getEmployee('admin@maua.br')
    const employeeDto = new EmployeeDynamoDTO({
      name: employeeRepo?.name,
      email: employeeRepo?.email,
      role: employeeRepo?.role as ROLE,
      password: employeeRepo?.password
    }) 

    const employee = employeeDto.toEntity()

    expect(employee).toEqual(employeeRepo)
  })
  it('Should get a correctly from dynamo to entity', async () => {
    const dynamo_item = {'Item': {'email': { 'S': 'admin@maua.br'},
      'name': { 'S': 'Admin'},
      'SK': { 'S': '#admin@maua.br'},
      'role': { 'S': 'EMPLOYEE'},
      'PK': { 'S': 'employee#admin@maua.br' },
      'entity': { 'S': 'employee' },
      'password': { 'S': '$2a$08$v9krjLq9tIl7MBQqoVIE8.pXqEXLMONGG5hcBWpds2LL.sjwWC24O'},}
    }

    const employeeDto = EmployeeDynamoDTO.fromDynamo(dynamo_item['Item'])
    const employee = employeeDto.toEntity()

    const employeeRepo = await repo.getEmployee('admin@maua.br')

    expect(employee).toEqual(employeeRepo)
  })
  it('Should get a correctly from entity to dynamo', async () => {
    const employeeRepo = await repo.getEmployee('admin@maua.br')
    const employeeDto = EmployeeDynamoDTO.fromEntity(employeeRepo)
    const employeeDynamo = employeeDto.toDynamo()
    const expectedDynamo = {
      'entity': 'employee',
      'name': employeeDynamo?.name,
      'email': employeeDynamo?.email,
      'role': employeeDynamo?.role,
      'password': employeeDynamo?.password
    }

    expect(employeeDynamo).toEqual(expectedDynamo)
  })
})
