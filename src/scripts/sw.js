/* eslint-disable no-restricted-globals */
import CacheHelper from './utils/cache-helper';
import 'regenerator-runtime';

const assetsToCache = [
    './',
    '.manifest/icons/maskable_icon.png',
    '.manifest/icons/maskable_icon_x72.png',
    '.manifest/icons/maskable_icon_x96.png',
    '.manifest/icons/maskable_icon_x128.png',
    '.manifest/icons/maskable_icon_x144.png',
    '.manifest/icons/maskable_icon_x152.png',
    '.manifest/icons/maskable_icon_x192.png',
    '.manifest/icons/maskable_icon_x384.png',
    '.manifest/icons/maskable_icon_x512.png',
    './index.html',
    './icon/cooking-stew-svgrepo-com.svg',
    './app.bundle.js',
    './app.webmanifest',
    './sw.bundle.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(CacheHelper.revalidateCache(event.request));
});
