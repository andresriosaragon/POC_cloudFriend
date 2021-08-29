import { writeFileSync } from "fs";
import { stringify } from "yaml";

import { makeLambda } from "./lambda";
import { makeHTTPApi, makeRoute, makeIntegration } from "./api";

// const merged = cf.merge(queue); dsads
const lambda = makeLambda("myFunction", "build/myFunction");
const httpApi = makeHTTPApi("myApi");
const Myendpoint = makeRoute("myApi");
const Myintegration = makeIntegration("myApi", "myFunction");
const api = stringify(httpApi);
/*
AWSTemplateFormatVersion: "2010-09-09"
Description: Resources for user entitlement service

Parameters:
  SystemName:
    Description: System Name
    Type: String
  LayerName:
    Description: Name of the Layer
    Type: String
  GroupName:
    Description: Service name
    Type: String
*/
const data = {
  AWSTemplateFormatVersion: "2010-09-09",
  Description: "Resources for user entitlement service",
  Parameters: {
    SystemName: {
      Type: "String",
      Default: "system",
    },
  },
  Resources: {
    MyApi: httpApi,
    myFunction: lambda.function,
    myFunctionRole: lambda.role,
    Myendpoint,
    Myintegration,
  },
};
const data2 = stringify(data);
console.log(JSON.stringify(httpApi, null, 2));

writeFileSync("cloudformation.yml", data2);
// writeFileSync("cloudformation2.yml", data2);

// console.log(queue);
