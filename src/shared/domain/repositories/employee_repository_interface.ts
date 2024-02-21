import { Employee } from '../entities/employee'

export interface IEmployeeRepository {
  login(email: string): Promise<Employee>
  createEmployee(employee: Employee): Promise<Employee>
  updateEmployee(email: string, newPassword?: string, newName?: string): Promise<Employee>
  deleteEmployee(email: string): Promise<Employee>
  forgotPassword(email: string): Promise<Employee>
  confirmForgotPassword(email: string, newPassword: string): Promise<Employee>
}