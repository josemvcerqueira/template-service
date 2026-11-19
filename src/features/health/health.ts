import { formatCents } from "@/lib/cents";
import { uptimeSeconds } from "@/platform/clock";

export type Health = { status: "ok"; uptimeSeconds: number; sample: string };

/** The health payload served at GET /health. */
export function readHealth(): Health {
  return { status: "ok", uptimeSeconds: uptimeSeconds(), sample: formatCents(100) };
}
