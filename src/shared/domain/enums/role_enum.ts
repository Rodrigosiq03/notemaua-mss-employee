export enum ROLE {
  STUDENT = 'STUDENT',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN'
}

export function toEnum(value: string): ROLE {
  switch (value) {
    case 'STUDENT':
      return ROLE.STUDENT
    case 'EMPLOYEE':
      return ROLE.EMPLOYEE
    case 'ADMIN':
      return ROLE.ADMIN
    default:
      throw new Error('Invalid value')
  }
}