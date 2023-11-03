import 'server-only';
import winston from 'winston';

export interface LogEnvVar {
  APP_NAME: string;
  LOG_LEVEL: LogLevel;
  LOG_TRANSPORTS: LogTransportConfig[];
}

export type LogTransportConfig =
  | LogTransportConsoleConfig
  | LogTransportFileConfig
  | LogTransportHttpConfig
  | LogTransportStreamConfig;

export interface LogTransportConsoleConfig {
  logTransport: 'console';
  logOptions?: winston.transports.ConsoleTransportOptions;
}

export interface LogTransportFileConfig {
  logTransport: 'file';
  logOptions: winston.transports.FileTransportOptions;
}

export interface LogTransportHttpConfig {
  logTransport: 'http';
  logOptions: winston.transports.HttpTransportOptions;
}

export interface LogTransportStreamConfig {
  logTransport: 'stream';
  logOptions: winston.transports.StreamTransportOptions;
}

/**
 * RFC 5424 log levels
 *
 * @see https://datatracker.ietf.org/doc/html/rfc5424
 */
export const logLevels = {
  // system is unusable
  emerg: 0,

  // action must be taken immediately
  alert: 1,

  // critical conditions
  crit: 2,

  // error conditions
  error: 3,

  // warning conditions
  warn: 4,

  // normal but significant condition
  notice: 5,

  // normal but significant condition
  info: 6,

  // debug-level messages
  debug: 7,
};

export type LogLevel = keyof typeof logLevels;

const env = getEnvVar();

const transports = env.LOG_TRANSPORTS.map(transportFactory);

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: winston.format.json(),
  defaultMeta: {
    service: process.env.APP_NAME,
    environment: process.env.NODE_ENV,
  },
  transports,
  exceptionHandlers: transports,
  rejectionHandlers: transports,
  exitOnError: false,
});

function transportFactory(config: LogTransportConfig): winston.transport {
  const transports = {
    console: winston.transports.Console,
    file: winston.transports.File,
    http: winston.transports.Http,
    stream: winston.transports.Stream,
  } as const;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new transports[config.logTransport](config.logOptions);
}

function getEnvVar(): LogEnvVar {
  const env: LogEnvVar = {
    APP_NAME: 'Coffass',
    LOG_LEVEL: 'debug',
    LOG_TRANSPORTS: [{ logTransport: 'console' }],
  };

  if (process.env.APP_NAME) {
    env.APP_NAME = process.env.APP_NAME as string;
  }

  if (process.env.LOG_LEVEL) {
    if (!Object.keys(logLevels).includes(process.env.LOG_LEVEL as string)) {
      throw new Error(`Invalid log level: ${process.env.LOG_LEVEL}`);
    }
    env.LOG_LEVEL = process.env.LOG_LEVEL as LogLevel;
  }

  if (process.env.LOG_TRANSPORTS) {
    env.LOG_TRANSPORTS = JSON.parse(process.env.LOG_TRANSPORTS as string);
  }

  return env;
}
