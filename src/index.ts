import express from "express";
import cors from "cors";

import * as config from "./config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const { port, host } = config.getEnvConfig();

const app = express();
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
