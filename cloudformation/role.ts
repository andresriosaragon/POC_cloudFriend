import { SYSTEM_NAME, LAYER_NAME, GROUP_NAME } from "./constants";

const allowEffects = (effect, resourceArn) => {
  const effects = {
    logs: {
      Action: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
      ],
      Resource: ["arn:aws:logs:*:*:*"],
    },
    sqs: {
      Action: ["sqs:*"],
      Resource: [`arn:${resourceArn}`],
    },
  };
  return effects[effect];
};

const makeRoleStatements = (effects, resourceArn) => {
  const effectStatement = effects.map((effect) => {
    const allowedEffects = allowEffects(effect, resourceArn);
    return { Effect: "Allow", ...allowedEffects };
  });
  return effectStatement;
};

const makePolicy = ({ policyName, effects, resourceArn }) => {
  return {
    PolicyName: `${SYSTEM_NAME}-${LAYER_NAME}-${GROUP_NAME}-${policyName}`,
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: makeRoleStatements(effects, resourceArn),
    },
  };
};

const makeRole = (resource, effects, service, resourceArn, policy) => ({
  Type: "AWS::IAM::Role",
  Properties: {
    RoleName: `${SYSTEM_NAME}-${LAYER_NAME}-${GROUP_NAME}-${resource}-Role`,
    Path: "/",
    Policies: [makePolicy(policy)],
    AssumeRolePolicyDocument: {
      Version: "2012-10-17",
      Statement: {
        Effect: "Allow",
        Principal: {
          Service: [`${service}.amazonaws.com`],
          Action: ["sts:AssumeRole"],
        },
      },
    },
  },
});

export { makeRole };
