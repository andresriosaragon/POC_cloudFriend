const cf = require("@mapbox/cloudfriend");

const lambda = new cf.shortcuts.Lambda({
  LogicalName: "MyLambda",
  Code: {
    S3Bucket: "andres-mycode3",
    S3Key: "packages",
  },
  handler: "packages/index.main",
  DependsOn: "Bucket",
});

module.exports = { lambda };
