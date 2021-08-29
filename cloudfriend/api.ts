const SystemName = "system";

const makeHTTPApi = (name) => {
  return {
    Type: "AWS::ApiGatewayV2::Api",
    Properties: {
      Name: `${SystemName}-${name}`,
      ProtocolType: "HTTP",
    },
  };
};
/*
  GetEntitlementRoute:
    Type: AWS::ApiGatewayV2::Route
    Properties:
      ApiId: !Ref UserEntitlementApi
      RouteKey: "GET /entitlement"
      Target: !Join
        - /
        - - integrations
          - !Ref GetEntitlementIntegration
*/
const makeRoute = (apiName) => {
  return {
    Type: "AWS::ApiGatewayV2::Route",
    Properties: {
      ApiId: { Ref: apiName },
      ProtocolType: "HTTP",
      RouteKey: "GET /entitlement",
      Target: {
        "Fn::Join": [
          "/",
          ["integrations", { Ref: "GetEntitlementIntegration" }],
        ],
      },
    },
  };
};

export { makeHTTPApi, makeRoute };
