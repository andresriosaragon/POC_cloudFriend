import { writeFileSync } from "fs";
import { makeLambda } from "./lambda";
import { makeHTTPApi } from "./api";
import { stringify } from "yaml";

// const merged = cf.merge(queue); dsads
const lambda = makeLambda("myFunction", "build/myFunction");
const httpApi = makeHTTPApi();
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
  },
};
const data2 = stringify(data);
console.log(JSON.stringify(httpApi, null, 2));

writeFileSync("cloudformation.yml", data2);
// writeFileSync("cloudformation2.yml", data2);

// console.log(queue);
