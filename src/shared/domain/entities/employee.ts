import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { ROLE } from '../enums/role_enum'

export type EmployeeProps = {
  email: string;
  password: string;
  name: string;
  role?: ROLE
}

export class Employee {
  constructor(public props: EmployeeProps) {
    if (!Employee.validateEmail(props.email)) {
      throw new EntityError('props.email')
    }
    this.props.email = props.email

    if (!Employee.validatePassword(props.password)) {
      throw new EntityError('props.password')
    }
    this.props.password = props.password

    if (!Employee.validateName(props.name)) {
      throw new EntityError('props.name')
    }
    this.props.name = props.name

    this.props.role = props.role || ROLE.EMPLOYEE
  }

  get email() {
    return this.props.email
  }

  set setEmail(email: string) {
    if (!Employee.validateEmail(email)) {
      throw new EntityError('props.email')
    }
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  set setPassword(password: string) {
    if (!Employee.validatePassword(password)) {
      throw new EntityError('props.password')
    }
    this.props.password = password
  }

  get name() {
    return this.props.name
  }

  set setName(name: string) {
    if (!Employee.validateName(name)) {
      throw new EntityError('props.name')
    }
    this.props.name = name
  }

  get role() {
    return this.props.role
  }

  static validateEmail(email: string): boolean {
    const regexp = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$)'

    if (email == null) {
      return false
    }
    if (typeof(email) != 'string') {
      return false
    }
    if (!email.match(regexp)) {
      return false
    }
    return true
  }

  static validateName(name: string): boolean {
    if (name == null) {
      return false
    } 
    if (typeof(name) != 'string') {
      return false
    } 
    if (name.length < 3) {
      return false
    }
    return true
  }

  static validatePassword(password?: string): boolean {
    const regexp = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'

    if (password == null || password == undefined) {
      return false
    } 
    if (typeof(password) != 'string') {
      return false
    } 
    if (password.length < 6) {
      return false
    } 
    if (!password.match(regexp)) {
      return false
    }
    return true
  }

}