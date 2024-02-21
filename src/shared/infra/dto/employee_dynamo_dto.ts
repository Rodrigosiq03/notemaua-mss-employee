/* eslint-disable @typescript-eslint/no-explicit-any */
import { Employee } from '../../domain/entities/employee'
import { ROLE } from '../../domain/enums/role_enum'

type EmployeeDynamoDTOProps = {
  email: string
  password: string
  name: string
  role?: ROLE
}

export class EmployeeDynamoDTO {
  private email: string
  private password: string
  private name: string
  private role?: ROLE

  constructor (props: EmployeeDynamoDTOProps) {
    this.email = props.email
    this.password = props.password
    this.name = props.name
    this.role = props.role || ROLE.EMPLOYEE
  }

  static fromEntity(employee: Employee): EmployeeDynamoDTO {
    return new EmployeeDynamoDTO({
      email: employee.email,
      password: employee.password,
      name: employee.name
    })
  }

  toDynamo() {
    return {
      'entity': 'employee',
      'email': this.email,
      'password': this.password,
      'name': this.name,
      'role': this.role
    }
  }

  static fromDynamo(employeeData: any) {
    const email = employeeData['email'] && employeeData['email']['S'] ? employeeData['email']['S'] : undefined
    const password = employeeData['password'] && employeeData['password']['S'] ? employeeData['password']['S'] : undefined
    const name = employeeData['name'] && employeeData['name']['S'] ? employeeData['name']['S'] : undefined
    const role = employeeData['role'] && employeeData['role']['S'] ? employeeData['role']['S'] : undefined
    return new EmployeeDynamoDTO({
      email,
      password,
      name,
      role: role as ROLE
    })
  }

  toEntity() {
    return new Employee({
      email: this.email,
      password: this.password,
      name: this.name
    })
  }
}