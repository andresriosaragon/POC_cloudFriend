import { SYSTEM_NAME, LAYER_NAME, GROUP_NAME } from "./constants";

const allowEffects = {
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
    Resource: ["*"],
  },
};

const makeRoleStatements = (effects) => {
  const effectStatement = effects.map((effect) => ({
    Effect: "Allow",
    ...allowEffects[effect],
  }));
  return effectStatement;
};

const makeSnsRole = (resourse, effects) => ({
  Type: "AWS::IAM::Role",
  Properties: {
    RoleName: `${SYSTEM_NAME}-${LAYER_NAME}-${GROUP_NAME}-${resourse}-Role`,
    Path: "/",
    Policies: [
      {
        PolicyName: `${SYSTEM_NAME}-${LAYER_NAME}-${GROUP_NAME}-Sns-Policy`,
        PolicyDocument: {
          Version: "2012-10-17",
          Statement: makeRoleStatements(effects),
        },
      },
    ],
    AssumeRolePolicyDocument: {
      Version: "2012-10-17",
      Statement: {
        Effect: "Allow",
        Principal: {
          Service: ["lambda.amazonaws.com"],
          Action: ["sts:AssumeRole"],
        },
      },
    },
  },
});

export { makeSnsRole };
