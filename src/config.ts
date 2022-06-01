const dotenv = require('dotenv');

const actualEnv = process.env.env || 'local';

dotenv.config();

interface envConfigOptions {
    [key: string]: any;
};

const envConfig: envConfigOptions = {
    local: {
        port: process.env.PORT,
        host: process.env.host,
        databaseUri: process.env.databaseUri,
        privateKey: process.env.privateKey,
        saltWorkFactor: process.env.saltWorkFactor,
        accessTokenTtl: process.env.accessTokenTtl,
        refreshTokenTtl: process.env.refreshTokenTtl,
    },
    prod: {
        port: process.env.PORT,
        host: process.env.host,
        databaseUri: process.env.databaseUri,
        privateKey: process.env.privateKey,
        saltWorkFactor: process.env.saltWorkFactor,
        accessTokenTtl: process.env.accessTokenTtl,
        refreshTokenTtl: process.env.refreshTokenTtl,
    },
};

const getEnv = () => actualEnv;

const getEnvConfig = () => envConfig[actualEnv];

export default { getEnv, getEnvConfig}