import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json"
};

function send(res, status, value) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(value));
}

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  if (url.pathname === "/__preview/website-lead" && req.method === "POST") {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 4 * 1024 * 1024) {
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        if (!payload || typeof payload !== "object" || payload.consent !== true || !payload.name || !payload.phone) {
          send(res, 422, { ok: false });
          return;
        }
        // Local UI check only: do not log, store, or forward any submitted data.
        send(res, 200, { ok: true, preview: true });
      } catch {
        send(res, 400, { ok: false });
      }
    });
    return;
  }
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }
  if (pathname.endsWith("/")) pathname += "index.html";
  const normalized = normalize(pathname).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]+/, "");
  const filePath = resolve(join(root, normalized));
  if (!filePath.startsWith(resolve(root) + "\\")) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  res.writeHead(200, {
    "Content-Type": mime[extname(filePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600"
  });
  if (req.method === "HEAD") res.end();
  else createReadStream(filePath).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write("Локальный предпросмотр: http://127.0.0.1:" + port + "/\n");
  process.stdout.write("Формы работают в режиме предпросмотра: данные не отправляются в CRM и не сохраняются.\n");
});
