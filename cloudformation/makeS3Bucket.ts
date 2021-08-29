const makeS3Bucket = (BucketName) => ({
  Type: "AWS::S3::Bucket",
  Properties: {
    BucketName,
  },
});

export { makeS3Bucket };
