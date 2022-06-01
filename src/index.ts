import express from "express";
import cors from "cors";
import morgan from "morgan";

import config from "./config";
import log from "./logger";
import connect from "./database/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const { port, host } = config.getEnvConfig();

const PORT = port || 5000;

const app = express();
app.use(morgan('dev'));
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

app.listen(PORT, host, () => {
  log.info(`Server listing at http://${host}:${PORT}`);

  connect();

  routes(app);
});
