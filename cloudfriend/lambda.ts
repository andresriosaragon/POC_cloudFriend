import { shortcuts } from "@mapbox/cloudfriend";
import { removeNulls } from "./utils";

const makeLambda = (name, code) => {
  const lambda = new shortcuts.Lambda({
    LogicalName: name,
    Code: code,
    Runtime: "nodejs14.x",
  });
  const lambdaFunction = removeNulls(lambda.Resources[name]);
  const role = removeNulls(lambda.Resources[`${name}Role`]);
  return { function: lambdaFunction, role };
};

export { makeLambda };
