import { getArn } from "./getArn";
import {
  AWS_REGION,
  AWS_ACCOUNT,
  SERVICE_NAME,
  SYSTEM_NAME,
  LAYER_NAME,
  GROUP_NAME,
} from "./constants";

const DEFAULT_LAMBDA_OPTIONS = { MemorySize: 128, Timeout: 180 };

const makeLambda = (functionName, Code, options = DEFAULT_LAMBDA_OPTIONS) => ({
  [functionName]: {
    Type: "AWS::Lambda::Function",
    Properties: {
      Code,
      Role: `${getArn("role", {
        resourceName: `${SYSTEM_NAME}-${LAYER_NAME}-${GROUP_NAME}-Lambda-Role`,
      })}`,
      Environment: {
        Variables: {
          TABLE_NAME: "UserEntitlementDdbTable",
          VIMEO_URL: "VIMEO_URL",
        },
      },
      Runtime: "nodejs14.x",
      ...options,
    },
  },
});

export { makeLambda };
