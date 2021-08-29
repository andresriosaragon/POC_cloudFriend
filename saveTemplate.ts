import { stringify } from "yaml";
import { writeFileSync } from "fs";
import { basic, resoursces } from "./cloudformation/basic";

const data = stringify({ ...basic, ...resoursces });
writeFileSync("cloudformation.yml", data);
