import { createConnection, getConnectionOptions } from "typeorm";
import MyNamingStrategy from "./MyNamingStrategy";

if (!process.env.TYPEORM_URL) {
  throw new Error("Environment variable TYPEORM_URL is missing");
}

const NODE_ENV = process.env.NODE_ENV || "development";
const IS_TEST = NODE_ENV === "test";
const IS_DEV = NODE_ENV === "development";

// const entities = IS_TEST
//   ? "src/database/entities/*.ts"
//   : "dist/database/entities/*.js";

module.exports = {
  type: "postgres",
  url: process.env.TYPEORM_URL
  //  entities: [entities],
  //  migrations: ["dist/database/migration/*.js"],
  //  cli: { migrationsDir: "src/database/migration" },
  //  synchronize: false,
  //  logging: IS_DEV
};

getConnectionOptions().then(connectionOptions => {
  return createConnection(
    Object.assign(connectionOptions, {
      namingStrategy: new MyNamingStrategy()
    })
  );
});
