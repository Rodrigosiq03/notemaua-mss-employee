import { Employee } from '../../domain/entities/employee'
import { IEmployeeRepository } from '../../domain/repositories/employee_repository_interface'
import { InvalidPasswordError } from '../../helpers/errors/login_errors'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'

export class EmployeeRepositoryMock implements IEmployeeRepository {
  private employees: Employee[] = [
    new Employee({
      email: 'admin@maua.br',
      name: 'Admin',
      password: '$2a$08$v9krjLq9tIl7MBQqoVIE8.pXqEXLMONGG5hcBWpds2LL.sjwWC24O',
    }),
    new Employee({
      email: 'admin2@maua.br',
      name: 'Admin2',
      password: 'Admin2_123$',
    }),
  ]

  getEmployee(email: string): Employee {
    const employee = this.employees.find((employee) => employee.email === email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    return employee
  }

  async createEmployee(employee: Employee): Promise<Employee> {
    this.employees.push(employee)
    return Promise.resolve(employee)
  }

  async login(email: string): Promise<Employee> {
    const employee = this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    return Promise.resolve(employee)
  }

  async forgotPassword(email: string): Promise<Employee> {
    const employee = this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    return Promise.resolve(employee)
  }

  async updateEmployee(
    email: string,
    newPassword?: string,
    newName?: string,
  ): Promise<Employee> {
    const employee = this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    if (newPassword) {
      employee.setPassword = newPassword
    }

    if (newName) {
      employee.setName = newName
    }

    return Promise.resolve(employee)
  }

  async confirmForgotPassword(
    email: string,
    newPassword: string,
  ): Promise<Employee> {
    const employee = this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    employee.setPassword = newPassword

    return Promise.resolve(employee)
  }

  async deleteEmployee(email: string): Promise<Employee> {
    const employee = this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    this.employees = this.employees.filter(
      (employee) => employee.email !== email,
    )

    return Promise.resolve(employee)
  }

  async updatePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<Employee> {
    const employee = this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    if (employee.password !== oldPassword) {
      throw new InvalidPasswordError()
    }

    employee.setPassword = newPassword

    return Promise.resolve(employee)
  }
}
