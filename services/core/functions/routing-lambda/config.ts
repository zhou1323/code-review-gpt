import { EventBus } from "aws-cdk-lib/aws-events";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

import { buildResourceName, commonLambdaProps } from "../../helpers";

type RoutingLambdaProps = {
  eventBus: EventBus;
};

export class RoutingLambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: RoutingLambdaProps) {
    super(scope, id, {
      ...commonLambdaProps,
      functionName: buildResourceName(id),
      entry: join(__dirname, "index.ts"),
      environment: {
        EVENT_BUS_NAME: props.eventBus.eventBusName,
      },
    });

    // Grant permissions
    props.eventBus.grantPutEventsTo(this);
  }
}