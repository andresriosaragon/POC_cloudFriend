process.env.SYSTEM_NAME = "LMOD";
process.env.SYSTEM_NAME = "LMOD";
process.env.LAYER_NAME = "Services";
process.env.GROUP_NAME = "UserEntitlement";
process.env.AWS_ACCOUNT = "036480021416";
process.env.AWS_REGION = "us-east-1";
import { makeSnsRole } from "./snsRole";
import { makePolicy } from "./role";
import { makeLambda } from "./lambda";
import { makeS3Bucket } from "./makeS3Bucket";

const lambda = makeLambda("GetEntitlementFunction", "packages/get-entitlement");

const basic = {
  AWSTemplateFormatVersion: "2010-09-09",
};

const resoursces = {
  Resources: {
    // SnsRole: makeSnsRole("sns", ["logs", "sqs"]),
    policy: makePolicy({ policyName: 'Sns-policy', effects:{}, resourceArn }) 
    // SnsRole: makeRole("sns-role", ["logs", "sqs"], "sns"),
    // Bucket: makeS3Bucket("bucketName"),
    ...lambda,
  },
};

export { resoursces, basic };
