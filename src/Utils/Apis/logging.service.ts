import logdna from "@logdna/logger";

// todo get client ip address for logs.
const options: logdna.ConstructorOptions = {
  app: "SLIC3",
};

const logToConsole = true;

const logger = logdna.createLogger(
  process.env.REACT_APP_LOG_DNA_INGESTION_KEY ?? "",
  options
);

const info = (message: any) => {
  logger.info(message);
  toConsole(message);
};

const error = (message: any) => {
  logger.error(message);
  toConsole(message);
};

const warn = (message: any) => {
  logger.warn(message);
  toConsole(message);
};

const trace = (message: any) => {
  logger.trace(message);
  toConsole(message);
};

const debug = (message: any) => {
  logger.debug(message);
  toConsole(message);
};

const fatal = (message: any) => {
  logger.fatal(message);
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
  trace,
  debug,
  info,
  warn,
  error,
  fatal,
  flush, // this maybe shouldn't be here...
};

const toConsole = (message: any) => {
  if (logToConsole) {
    console.log(message);
  }
};
