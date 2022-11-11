// Satisfies typescript - mark file as a module
import {} from ".";
declare const self: ServiceWorkerGlobalScope;

// A simple, no-op service worker that takes immediate control.
// https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776
// self.addEventListener("install", () => {
//   // Skip over the "waiting" lifecycle state, to ensure that our
//   // new service worker is activated immediately, even if there's
//   // another tab open controlled by our older service worker code.
//   self.skipWaiting();
// });

// Core assets
const coreAssets = ["/index.html", "/index.js", "/site.webmanifest"];

async function saveCache(request: Request, response: Response) {
  // Create a copy of the response
  const copy = response.clone();

  // Open cache and save
  const cache = await caches.open("app");
  await cache.put(request, copy);

  return response;
}

async function revalidateCache(request: Request) {
  try {
    const response = await fetch(request);
    await saveCache(request, response);
  } catch (error: unknown) {
    let message = `Failed to revalidate cache for request.url ${request.url}`;
    if (error instanceof Error && "message" in error) {
      message = `${message}, ${error.message}`;
    }
    console.error(message);
  }
}

function shouldCacheAsset(request: Request) {
  const byUrl = (s: string) => request.url.endsWith(s);
  const byHeader = (s: string) => request.headers.get("Accept").includes(s);

  return (
    // html
    byUrl(".html") ||
    byHeader("text/html") ||
    // css
    byUrl(".css") ||
    byHeader("text/css") ||
    // js
    byUrl(".js") ||
    byHeader("text/javascript") ||
    // images
    byUrl(".png") ||
    byUrl(".jpg") ||
    byHeader("image") ||
    // site.webmanifest
    byUrl("site.webmanifest")
  );
}

self.addEventListener("install", (event) => {
  // Cache core assets
  event.waitUntil(
    caches.open("app").then((cache) => {
      for (const asset of coreAssets) {
        cache.add(new Request(asset));
      }
      return cache;
    })
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Bug fix
  // https://stackoverflow.com/a/49719964
  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }

  // stale-while-revalidate
  if (shouldCacheAsset(request)) {
    event.respondWith(
      caches.match(request).then((cacheResponse: Response | undefined) => {
        if (cacheResponse) {
          revalidateCache(request);

          return cacheResponse;
        }

        return fetch(request).then((fetchResponse) => {
          event.waitUntil(saveCache(request, fetchResponse));

          return fetchResponse;
        });
      })
    );
    return;
  }
});
