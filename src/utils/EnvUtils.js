import "dotenv/config";

/**
 * A helper function for environment variables that checks for them
 * @param {String} key The name of the environment variable
 * @returns The environment variable or null
 */
export function getEnv(key) {
    return process.env[key];
}
