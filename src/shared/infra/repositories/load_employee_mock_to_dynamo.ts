/* eslint-disable @typescript-eslint/no-unused-vars */
import * as AWS from 'aws-sdk'
import path from 'path'

import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { DynamoDBClient, waitUntilTableExists, ListTablesCommand, CreateTableCommand } from '@aws-sdk/client-dynamodb'

import { Environments } from '../../environments'
import { EmployeeRepositoryMock } from './employee_repository_mock'
import { EmployeeRepositoryDynamo } from './employee_repository_dynamo'
import { config } from 'dotenv'
import { hash } from 'bcryptjs'
import { Employee } from '../../domain/entities/employee'
import { ROLE } from '../../domain/enums/role_enum'
import envs from '../../../..'
// config({ path: path.resolve(__dirname, '../../../../.env.local') })

async function setupDynamoTable(): Promise<void> {
  const dynamoTableName = envs.DYNAMO_TABLE_NAME
  if (!dynamoTableName) throw new Error('DYNAMO_TABLE_NAME is undefined')
  console.log('dynamoTableName - [SETUP_DYNAMO_TABLE] - ', dynamoTableName)
  // const endpointUrl = 'http://localhost:8000'
  // JS SDK v3 does not support global configuration.
  // Codemod has attempted to pass values to each service client in this file.
  // You may need to update clients outside of this file, if they use global config.
  // AWS.config.update({ region: 'sa-east-1' })

  console.log('Setting up DynamoDB table...')

  const dynamoClient = new DynamoDBClient({
    // endpoint: envs.ENDPOINT_URl,
    region: 'sa-east-1',
  })
  console.log('DynamoDB client created')

  const tables = (await dynamoClient.send(new ListTablesCommand({}))).TableNames || []

  if (!tables.includes(dynamoTableName)) {
    console.log('Creating table...')
    await dynamoClient.send(
      new CreateTableCommand({
        TableName: dynamoTableName,
        AttributeDefinitions: [
          { AttributeName: 'PK', AttributeType: 'S' },
          { AttributeName: 'SK', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'PK', KeyType: 'HASH' },
          { AttributeName: 'SK', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      })
    )

    console.log('Waiting for table to be created...')

    // Adicione um atraso aqui antes de verificar se a tabela existe.
    await new Promise(resolve => setTimeout(resolve, 10000)) // Ajuste o tempo conforme necessário.

    await waitUntilTableExists({
      client: dynamoClient,
      maxWaitTime: 200,
    }, { TableName: dynamoTableName })

    console.log(`Table ${envs.DYNAMO_TABLE_NAME} created!`)
  } else {
    console.log('Table already exists!')
  }
}

async function loadMockToLocalDynamo() {
  const mock = new EmployeeRepositoryMock()
  const dynamoRepo = new EmployeeRepositoryDynamo()
  
  console.log('Loading mock to local DynamoDB...')
  
  const employee = mock.getEmployee('admin@maua.br')

  const hashPwd = await hash('Teste123$', 6)

  const newEmp = new Employee({
    email: 'rodrigo@maua.br',
    name: 'Rodrigo',
    password: '$2a$06$o.y.8Z/lwRR1Wf7OwC/WfOa2OsZ0eED/OGtkmUEhxzEGGEbNHGQEi',
    role: ROLE.EMPLOYEE 
  })

  console.log(`Loading employee ${newEmp.email} | ${newEmp.name} to dynamoDB...`)
  await dynamoRepo.createEmployee(newEmp)
  
}

async function loadMockToRealDynamo() {
  const mock = new EmployeeRepositoryMock()
  const dynamoRepo = new EmployeeRepositoryDynamo()
  
  console.log('Loading mock to real DynamoDB...')
  const employee = mock.getEmployee('admin@maua.br')

  const newEmp = new Employee({
    email: '23.00335-9@maua.br',
    name: 'Luca',
    password: '$2a$06$o.y.8Z/lwRR1Wf7OwC/WfOa2OsZ0eED/OGtkmUEhxzEGGEbNHGQEi',
    role: ROLE.EMPLOYEE 
  })

  
  console.log(`Loading employee ${newEmp.email} | ${newEmp.name} to dynamoDB...`)
  await dynamoRepo.createEmployee(newEmp)  

  console.log(`${newEmp.email} loaded to real DynamoDB`)
  
}


if (require.main === module) {
  (async () => {
    await setupDynamoTable()
    // await loadMockToLocalDynamo()
    await loadMockToRealDynamo()
  })()
} else {
  (async () => {
    await setupDynamoTable()
    // await loadMockToLocalDynamo()
    await loadMockToRealDynamo()
  })()
}