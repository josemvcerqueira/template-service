import { env } from "@/config/env";
import { readHealth } from "@/features/health/health";
import { log } from "@/platform/log";
import { serveJson } from "@/platform/server";

await serveJson({ "GET /health": readHealth }, env.PORT);
log.info("listening", { port: env.PORT });
