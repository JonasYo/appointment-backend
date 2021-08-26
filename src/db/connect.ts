import mongoose from "mongoose";
import log from "../logger";

import * as config from "../config";
const { databaseUri } = config.getEnvConfig();

function connect() {
  return mongoose.connect(databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;
