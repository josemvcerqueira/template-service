import { z } from "zod";

const Env = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export type Env = z.infer<typeof Env>;

/** The environment, parsed once at boot. Import this instead of reading process.env. */
export const env: Env = Env.parse(process.env);
