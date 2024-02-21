import { expect, describe, it } from 'vitest'
import { Employee } from '../../../../src/shared/domain/entities/employee'

describe('[Employee Entity]', () => {
  it('Assert that the employee entity is valid', () => {
    const employee = new Employee({
      email: 'admin@maua.br',
      password: 'Admin123$',
      name: 'Admin'
    })

    expect(employee).toBeDefined()
    expect(employee.email).toBe('admin@maua.br')
    expect(employee.password).toBe('Admin123$')
    expect(employee.name).toBe('Admin')
    expect(employee.role).toBe('EMPLOYEE')
  })
  it('Assert that the employee entity has invalid email', () => {
    expect(() => {
      new Employee({
        email: 'admin',
        password: 'Admin123$',
        name: 'Admin'
      })}).toThrowError('Field props.email is not valid')
  })
  it('Assert that the employee entity has invalid name', () => {
    expect(() => {
      new Employee({
        email: 'admin@maua.br',
        password: 'Admin123$',
        name: ''
      })}).toThrowError('Field props.name is not valid')
  })
  it('Assert that the employee entity has invalid password', () => {
    expect(() => {
      new Employee({
        email: 'admin@maua.br',
        password: 'admin',
        name: 'Admin'
      })}).toThrowError('Field props.password is not valid')
  })
})