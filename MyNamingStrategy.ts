require("dotenv").config();

import { DefaultNamingStrategy } from "typeorm/naming-strategy/DefaultNamingStrategy";
import { snakeCase } from "typeorm/util/StringUtils";

export default class MyNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName + "s");
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ): string {
    return snakeCase(
      embeddedPrefixes.concat(customName ? customName : propertyName).join("_")
    );
  }
}
