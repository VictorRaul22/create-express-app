import * as winston from "winston";

import { envs } from "@/config/envs";
import "winston-daily-rotate-file";
const { combine, timestamp, colorize } = winston.format;

function transportsDynamic() {
  const transportsArr: any = [];
  if (envs.ENVIRONMENT === "development" || envs.LOG_CONSOLE === true) {
    transportsArr.push(
      new winston.transports.Console({
        format: combine(
          colorize(),
          timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
          }),
          winston.format.printf(
            (info) => `[${info.timestamp}] ${info.level} ${info.message}`
          )
        ),
      })
    );
  }

  transportsArr.push(
    new winston.transports.DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    })
  );
  transportsArr.push(
    new winston.transports.DailyRotateFile({
      level: "error",
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    })
  );

  return transportsArr;
}
export const logger = winston.createLogger({
  level: "debug",
  format: combine(
    timestamp({
      format: "MM-DD-YYYY HH:mm:ss",
    }),
    winston.format.json()
  ),
  transports: transportsDynamic(),
});
