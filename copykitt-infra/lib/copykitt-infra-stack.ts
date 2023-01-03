import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from 'dotenv'


dotenv.config()


import { LambdaApplication } from 'aws-cdk-lib/aws-codedeploy';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CopykittInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this,"BaseLayer",{
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_7]
    })


    const apiLambda = new lambda.Function(this,"APiFunction",{
      runtime : lambda.Runtime.PYTHON_3_7,
      code: lambda.Code.fromAsset('../app3.9/'),
      handler: "copykitt_api.handler",
      layers:[layer],
      environment:{
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ??"",
      }

    })


    const copyKittApi = new apiGateway.RestApi(this,"RestApi",{
      restApiName: "CopyKitt Tutorial API",


    });

    const LambdaApiIntegration = new apiGateway.LambdaIntegration(apiLambda);
    copyKittApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda)
    });
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CopykittInfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}


