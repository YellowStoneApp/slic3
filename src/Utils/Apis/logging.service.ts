import logdna from '@logdna/logger';
import { datadogLogs } from '@datadog/browser-logs';

//const key = process.env.REACT_APP_DATA_DOG_INGESTION_KEY;
const key = 'pub9fa5848296ad7c22222201297f7a12de';
datadogLogs.init({
    clientToken: key ?? '',
    site: 'datadoghq.com',
    service: 'MoreThanTheThought',
    forwardErrorsToLogs: true,
    sampleRate: 100,
});

// todo get client ip address for logs.
const options: logdna.ConstructorOptions = {
    app: 'SLIC3',
    sendUserAgent: true,
};

const logToConsole = true;

const logger = logdna.createLogger(process.env.REACT_APP_LOG_DNA_INGESTION_KEY ?? '', options);

const info = (message: any) => {
    datadogLogs.logger.info(message);
    toConsole(message);
};

const error = (message: any) => {
    datadogLogs.logger.error(message);
    toConsole(message);
};

const warn = (message: any) => {
    datadogLogs.logger.warn(message);
    toConsole(message);
};

const debug = (message: any) => {
    datadogLogs.logger.debug(message);
    toConsole(message);
};

/**
 * Shouldn't be necessary to call this in normal operation only really on shutdown. I'm not sure how this applies in normal operation on the web.
 * In the background this module should be periodically writing log message in aggregate to the server.
 */
const flush = () => {
    logger.flush();
};

export const logService = {
    debug,
    info,
    warn,
    error,
    flush, // this maybe shouldn't be here...
};

const toConsole = (message: any) => {
    if (logToConsole) {
        console.log(message);
    }
};
