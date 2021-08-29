import { AWS_REGION, AWS_ACCOUNT } from "./constants";
const getArn = (type, params) => {
  const arns = {
    role: `arn:aws:iam::${AWS_ACCOUNT}:role/${params.resourceName}`,
    sqs: `arn:aws:sqs:${AWS_REGION}:${AWS_ACCOUNT}:${params.resourceName}`,
    s3: `arn:aws:s3:::${params.resourceName}`,
    sns: `arn:aws:sns:${AWS_REGION}:${AWS_ACCOUNT}:${params.resourceName}`,
  };
  return arns[type];
};

export { getArn };
