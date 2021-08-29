import { writeFileSync } from "fs";
import { makeLambda } from "./lambda";
import { makeHTTPApi } from "./api";
import { stringify } from "yaml";

// const merged = cf.merge(queue); dsads
const lambda = makeLambda("myFunction", "build/myFunction");
const httpApi = makeHTTPApi();
const data = stringify(httpApi);
const data2 = stringify(lambda);
console.log(JSON.stringify(httpApi, null, 2));

writeFileSync("cloudformation.yml", data);
writeFileSync("cloudformation2.yml", data2);

// console.log(queue);
