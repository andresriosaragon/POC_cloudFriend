import { reject, isNil } from "ramda";

const removeNulls = (object) =>
  reject(isNil, {
    ...object,
    Properties: reject(isNil, object.Properties),
  });

export { removeNulls };
