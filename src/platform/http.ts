import type { z } from "zod";

export type FetchJsonOptions = { timeoutMs?: number; init?: RequestInit };

/** Fetches JSON and validates it with a zod schema. Every outbound call has a timeout and a parsed result. */
export async function fetchJson<T>(
  url: string,
  schema: z.ZodType<T>,
  options: FetchJsonOptions = {},
): Promise<T> {
  const response = await fetch(url, {
    ...options.init,
    signal: AbortSignal.timeout(options.timeoutMs ?? 10_000),
  });
  if (!response.ok) {
    throw new Error(`GET ${url} answered ${response.status}`);
  }
  return schema.parse(await response.json());
}
