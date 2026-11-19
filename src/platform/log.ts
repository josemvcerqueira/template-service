type Level = "debug" | "info" | "warn" | "error";
type Fields = Record<string, unknown>;

/** Structured JSON logs on stdout. The only module that may touch console. */
export const log = {
  debug: (message: string, fields: Fields = {}) => write("debug", message, fields),
  info: (message: string, fields: Fields = {}) => write("info", message, fields),
  warn: (message: string, fields: Fields = {}) => write("warn", message, fields),
  error: (message: string, fields: Fields = {}) => write("error", message, fields),
};

function write(level: Level, message: string, fields: Fields): void {
  console.log(JSON.stringify({ level, message, time: new Date().toISOString(), ...fields }));
}
