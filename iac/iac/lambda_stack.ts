/* eslint-disable @typescript-eslint/no-explicit-any */
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Resource, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { Duration } from 'aws-cdk-lib'
import * as path from 'path'

export class LambdaStack extends Construct {
  functionsThatNeedDynamoPermissions: lambda.Function[] = []
  lambdaLayer: lambda.LayerVersion

  loginFunction: lambda.Function
  forgotPasswordFunction: lambda.Function
  confirmForgotPasswordFunction: lambda.Function

  createLambdaApiGatewayIntegration(moduleName: string, method: string, mssStudentApiResource: Resource, environmentVariables: Record<string, any>) {
    const modifiedModuleName = moduleName.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    
    const moduleNameWithoutEmployee = moduleName.replace('_employee', '')

    const lambdaFunction = new NodejsFunction(this, modifiedModuleName, {
      functionName: `${modifiedModuleName}`,
      entry: path.join(__dirname, `../../src/modules/${moduleNameWithoutEmployee}/app/${moduleNameWithoutEmployee}_presenter.ts`),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      layers: [this.lambdaLayer],
      environment: environmentVariables,
      timeout: Duration.seconds(15),
      memorySize: 512
    })

    mssStudentApiResource.addResource(moduleName.toLowerCase().replace(/_/g,'-')).addMethod(method, new LambdaIntegration(lambdaFunction))
    
    return lambdaFunction
  }

  constructor(scope: Construct, apiGatewayResource: Resource, environmentVariables: Record<string, any>) {
    super(scope, 'NotemauaMssEmployeeAuthLambdaStack')

    this.lambdaLayer = new lambda.LayerVersion(this, 'NotemauaEmployeeAuthLayer', {
      code: lambda.Code.fromAsset('./shared'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
    })

    this.loginFunction = this.createLambdaApiGatewayIntegration('login_employee', 'POST', apiGatewayResource, environmentVariables)
    this.forgotPasswordFunction = this.createLambdaApiGatewayIntegration('forgot_password_employee', 'POST', apiGatewayResource, environmentVariables)
    this.confirmForgotPasswordFunction = this.createLambdaApiGatewayIntegration('confirm_forgot_password_employee', 'POST', apiGatewayResource, environmentVariables)

    this.functionsThatNeedDynamoPermissions = [
      this.loginFunction, 
      this.forgotPasswordFunction, 
      this.confirmForgotPasswordFunction, 
    ]
  }
}