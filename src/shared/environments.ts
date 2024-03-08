import { STAGE } from './domain/enums/stage_enum'
import { IEmployeeRepository } from './domain/repositories/employee_repository_interface'
import { EmployeeRepositoryDynamo } from './infra/repositories/employee_repository_dynamo'
import { EmployeeRepositoryMock } from './infra/repositories/employee_repository_mock'
import envs from '../..'

export class Environments {
  stage: STAGE = STAGE.TEST
  s3BucketName: string = ''
  region: string = ''
  endpointUrl: string = ''
  dynamoTableName: string = ''
  dynamoPartitionKey: string = ''
  dynamoSortKey: string = ''
  cloudFrontGetUserPresenterDistributionDomain: string = ''
  mssName: string = ''

  configureLocal() {
    console.log('envs.STAGE - [ENVIRONMENTS - { CONFIGURE LOCAL }] - ', envs.STAGE)
    envs.STAGE = envs.STAGE || 'TEST'
  }

  loadEnvs() {
    if (!envs.STAGE) {
      this.configureLocal()
    }

    
    this.stage = envs.STAGE as STAGE

    console.log('process.env.STAGE - [CHEGOU NO LOAD_ENVS] - ', envs.STAGE)
    console.log('envs.DYNAMOTABLENAME - [CHEGOU NO LOAD_ENVS] - ', envs.DYNAMO_TABLE_NAME)
    console.log('envs.ENDPOINT_URL - [CHEGOU NO LOAD_ENVS] - ', envs.ENDPOINT_URL)
    console.log('envs.REGION - [CHEGOU NO LOAD_ENVS] - ', envs.REGION)
    console.log('this.stage - [CHEGOU NO LOAD_ENVS] - ', this.stage)
    console.log('this.DYNAMOTABLENAME - [CHEGOU NO LOAD_ENVS] - ', this.dynamoTableName)
    this.mssName = envs.MSS_NAME as string

    if (this.stage === STAGE.TEST) {
      this.s3BucketName = 'bucket-test'
      this.region = 'sa-east-1'
      this.endpointUrl = 'http://localhost:8000'
      this.dynamoTableName = 'UserMssTemplateTable'
      this.dynamoPartitionKey = 'PK'
      this.dynamoSortKey = 'SK'
      this.cloudFrontGetUserPresenterDistributionDomain = 'https://d3q9q9q9q9q9q9.cloudfront.net'
    } else {
      this.s3BucketName = envs.S3_BUCKET_NAME as string
      this.region = envs.REGION as string
      this.endpointUrl = envs.ENDPOINT_URL as string
      this.dynamoTableName = envs.DYNAMO_TABLE_NAME as string
      this.dynamoPartitionKey = envs.DYNAMO_PARTITION_KEY as string
      this.dynamoSortKey = envs.DYNAMO_SORT_KEY as string
      this.cloudFrontGetUserPresenterDistributionDomain = envs.CLOUD_FRONT_DISTRIBUTION_DOMAIN as string
    }
  }

  static getEmployeeRepo(): IEmployeeRepository {
    if (Environments.getEnvs().stage === STAGE.TEST) {
      return new EmployeeRepositoryMock()
    }  else if (Environments.getEnvs().stage === STAGE.DEV || Environments.getEnvs().stage === STAGE.PROD) {
      return new EmployeeRepositoryDynamo()
    } else {
      throw new Error('Invalid STAGE')
    }
  }

  static getEnvs() {
    const envs = new Environments()
    envs.loadEnvs()
    return envs
  }
}
