/** Milliseconds since the epoch. Product code reads time here so tests can fix it. */
export function now(): number {
  return Date.now();
}

/** Seconds since this process started. */
export function uptimeSeconds(): number {
  return process.uptime();
}
