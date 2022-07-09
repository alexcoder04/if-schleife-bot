import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";


const combine = winston.format.combine;
const timestamp = winston.format.timestamp;
const label = winston.format.label;
const printf = winston.format.printf;

/**
 * A logger class used for all Loggers in the project to ensure predictable and 
 * usable logging to the console, latest.txt and a .log file for each day
 */
export class Logger {
    #lg;
    transport = new DailyRotateFile({
        filename: "./logs/%DATE%.log",
        datePattern: "YYYY-MM-DD",
    });
    constructor(name = String, loggingLevel = "info") {
        this.name = name; //name displayed for the logger
        this.transport.setMaxListeners(0);
        this.#lg = winston.createLogger({
            level: loggingLevel, //the logging level (default is info) [error, warn, help, data, info, debug, prompt, http, verbose, input, silly]
            transports: [
                new winston.transports.File({ filename: "./logs/latest.txt", level: "info", options: { flags: "w" }}),
                new winston.transports.Console(),
                this.transport
            ],
            format: combine(
                label({ label: this.name}),
                timestamp({
                    format: "HH:mm:ss"
                }),
                printf(({ level, message, label, timestamp }) => {
                    return `[${timestamp}] - ${label} - [${level.toUpperCase()}]: ${message}`;
                })
            ),
        });
    }

    debug(message="") {
        this.#lg.debug(message);
    }

    warn(message="") {
        this.#lg.warn(message);
    }

    info(message="") {
        this.#lg.info(message);
    }

    error(message="") {
        this.#lg.error(message);
    }

    log(message="") {
        this.#lg.log(message);
    }

    getLogger() {
        return this.#lg;
    }

}

/**
 * General error logger for all uncaughtExceptions "./logs/error.log" resets after each run
 * 
 */
winston.createLogger({
    level: "error",
    transports: [
        new winston.transports.File({ filename: "./logs/error.log", level: "error", handleExceptions: true, options: { flags: "w" } })
    ],
    format: combine(
        label({ label: "ERROR"}),
        timestamp({
            format: "HH:mm:ss"
        }),
        printf(({ level, message, label, timestamp }) => {
            console.error(message);
            return `[${timestamp}] - ${label} - [${level.toUpperCase()}]: ${message}`;
        })
    )
});