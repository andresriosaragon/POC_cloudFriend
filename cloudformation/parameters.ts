import { map, assoc } from "ramda";

const serviceName = "UserEntitlementService";
const required = {
  SystemName: { Description: "System Name" },
  LayerName: { Description: "Name of the Layer" },
  GroupName: { Description: "Service name" },
  Environment: { AllowedValues: ["prod", "test", "dev", "uat"] },
};
const getSsm = (ssmKey: string) => `{{resolve:ssm:${ssmKey}}}`;

const serviceSpecific = {
  VimeoUrl: {},
  VimeoProductId: {},
  VimeoApiKey: {
    Default: getSsm(`${serviceName}-vimeoApiKey`),
  },
  CdsTableName: {
    Default: getSsm("cdsDdbTableUsers"),
  },
};

const basic = { ...required, ...serviceSpecific };

const addStringTypeByDefault = map((obj) =>
  obj.type ? obj : assoc("type", "String", obj)
);

const parameters = addStringTypeByDefault(basic);
export { parameters };
