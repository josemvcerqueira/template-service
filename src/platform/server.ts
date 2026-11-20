export type JsonHandler = () => unknown;
export type Routes = Record<`GET /${string}`, JsonHandler>;
export type JsonServer = { port: number; stop: () => Promise<void> };

/** A JSON-only HTTP server built from a route table. Features return data; this module owns the wire. */
export function serveJson(routes: Routes, port: number): JsonServer {
  const server = Bun.serve({
    port,
    fetch(request) {
      const handler = routes[`GET ${new URL(request.url).pathname}` as keyof Routes];
      if (request.method !== "GET" || handler === undefined) {
        return new Response(null, { status: 404 });
      }
      return Response.json(handler());
    },
  });
  return { port: server.port ?? port, stop: () => server.stop() };
}
