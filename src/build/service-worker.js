importScripts("./precache-manifest.c6f93f372fb9e61b053b2cb25881f263.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerNavigationRoute('/index.html')

workbox.routing.registerRoute(/^https?.*/,
    new workbox.strategies.NetworkFirst(),'GET')
