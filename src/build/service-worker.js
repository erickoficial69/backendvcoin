importScripts("/precache-manifest.25832e2e10ce89b4f810a891e83f3e19.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerNavigationRoute('/index.html')

workbox.routing.registerRoute(/^https?.*/,
    new workbox.strategies.NetworkFirst(),'GET')
