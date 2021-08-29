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

/*
  GetEntitlementIntegration:
    Type: AWS::ApiGatewayV2::Integration
    Properties:
      ApiId: !Ref UserEntitlementApi
      Description: HTTP proxy integration for get entitlement lambda
      IntegrationType: AWS_PROXY
      IntegrationUri: !GetAtt GetEntitlementFunction.Arn
      PayloadFormatVersion: 2.0
      ResponseParameters:
        "200":
          ResponseParameters:
            - Source: "$response.body.httpStatus"
              Destination: "overwrite:statuscode"
*/
const makeIntegration = (apiname, functionName) => {
  return {
    Type: "AWS::ApiGatewayV2::Integration",
    Properties: {
      ApiId: { Ref: apiname },
      IntegrationType: "AWS_PROXY",
      IntegrationUri: {
        "Fn::GetAtt": [functionName, "Arn"],
      },
      PayloadFormatVersion: "2.0",
    },
  };
};

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

export { makeHTTPApi, makeRoute, makeIntegration };
