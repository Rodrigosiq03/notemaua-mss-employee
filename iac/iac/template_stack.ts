import { Stack, StackProps } from 'aws-cdk-lib'
import { Cors, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { TemplateDynamoTable } from './template_dynamo_table'
import { LambdaStack } from './lambda_stack'
import env from '../../index'

export class TemplateStack extends Stack {
  constructor(scope: Construct, constructId: string, props?: StackProps) {
    super(scope, constructId, props)

    const restApi = new RestApi(this, 'NotemauaMssEmployeeAuthRESTAPI', {
      restApiName: 'NotemauaMssAuthRESTAPI',
      description: 'This is the REST API for the Notemaua MSS Employee Auth Service.',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowHeaders: ['*']
      }
    })

    const apigatewayResource = restApi.root.addResource('mss-employee', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowHeaders: Cors.DEFAULT_HEADERS
      }
    })

    const dynamoTable = new TemplateDynamoTable(this, 'NotemauaMssEmloyeeAuthDynamoTable')

    const ENVIRONMENT_VARIABLES = {
      'STAGE': env.STAGE,
      'DYNAMO_TABLE_NAME': env.DYNAMO_TABLE_NAME,
      'DYNAMO_PARTITION_KEY': 'PK',
      'DYNAMO_SORT_KEY': 'SK',
      'REGION': env.REGION,
      'ENDPOINT_URL': env.ENDPOINT_URL,
      'MAIL_USER': env.MAIL_USER,
      'MAIL_PASSWORD': env.MAIL_PASSWORD,
      'JWT_SECRET': env.JWT_SECRET,
    }

    const lambdaStack = new LambdaStack(this, apigatewayResource, ENVIRONMENT_VARIABLES)

    dynamoTable.table.grantReadWriteData(lambdaStack.loginFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.forgotPasswordFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.confirmForgotPasswordFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.updatePasswordFunction)

  }
}