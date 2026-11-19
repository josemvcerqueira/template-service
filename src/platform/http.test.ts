import type { AddressInfo } from "node:net";
import { afterAll, describe, expect, it } from "vitest";
import { z } from "zod";
import { fetchJson } from "@/platform/http";
import { serveJson } from "@/platform/server";

const server = await serveJson({ "GET /price": () => ({ cents: 1234 }) }, 0);
const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
afterAll(() => server.close());

describe("serveJson and fetchJson", () => {
  it("round-trips a validated payload", async () => {
    await expect(
      fetchJson(`${base}/price`, z.object({ cents: z.number().int() })),
    ).resolves.toEqual({ cents: 1234 });
  });

  it("rejects a payload that fails its schema", async () => {
    await expect(fetchJson(`${base}/price`, z.object({ cents: z.string() }))).rejects.toThrow();
  });

  it("rejects unknown routes", async () => {
    await expect(fetchJson(`${base}/nope`, z.unknown())).rejects.toThrow("404");
  });
});
