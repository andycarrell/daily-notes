// Satisfies typescript - mark file as a module
import {} from ".";
declare const self: ServiceWorkerGlobalScope;

// declare const self: typeof globalThis;

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

function cacheResponse(request: Request, response: Response) {
  // Create a copy of the response
  const copy = response.clone();
  // Open cache and save
  return caches.open("app").then((cache) => {
    return cache.put(request, copy);
  });
}

function isNetworkFirst(request: Request) {
  return (
    request.headers.get("Accept").includes("text/html") ||
    request.headers.get("Accept").includes("application/json") ||
    request.url.endsWith(".html") ||
    request.url.endsWith("site.webmanifest")
  );
}

function isOfflineFirst(request: Request) {
  return (
    request.headers.get("Accept").includes("image") ||
    request.headers.get("Accept").includes("text/css") ||
    request.headers.get("Accept").includes("text/javascript") ||
    request.url.endsWith(".css") ||
    request.url.endsWith(".png") ||
    request.url.endsWith(".js")
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

  if (isNetworkFirst(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          event.waitUntil(cacheResponse(request, response));

          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  if (isOfflineFirst(request)) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(request).then((response) => {
          event.waitUntil(cacheResponse(request, response));

          return response;
        });
      })
    );
    return;
  }
});
