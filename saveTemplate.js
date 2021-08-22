const fs = require("fs");
const { merge } = require("@mapbox/cloudfriend");
const { lambda } = require("./src/lambda/simpleLambda");
const myTemplate = {};

const Resources = {
  Bucket: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: "andres-mycode3",
    },
  },
};
const templateData = merge(myTemplate, { Resources }, lambda);

const data = JSON.stringify(templateData, null, 2);
fs.writeFileSync("cloudformation.json", data);
