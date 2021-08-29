const makeHTTPApi = () => {
  return {
    Type: "AWS::ApiGatewayV2::Api",
    Properties: {
      Name: { "Fn::Sub": "${SystemName}-Http-api" },
      ProtocolType: "HTTP",
    },
  };
};

export { makeHTTPApi };
