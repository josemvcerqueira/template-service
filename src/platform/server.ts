import { createServer, type Server } from "node:http";

export type JsonHandler = () => unknown;
export type Routes = Record<`GET /${string}`, JsonHandler>;

/** A JSON-only HTTP server built from a route table. Features return data; this module owns the wire. */
export function serveJson(routes: Routes, port: number): Promise<Server> {
  const server = createServer((request, response) => {
    const handler = routes[`GET ${request.url ?? "/"}` as keyof Routes];
    if (request.method !== "GET" || handler === undefined) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(handler()));
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}
