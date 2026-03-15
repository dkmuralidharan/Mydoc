const CACHE='digisafevault-v2';
const MJ='{\n  "name": "DigiSafe Vault \\u2013 India Document Safe",\n  "short_name": "DigiSafe Vault",\n  "description": "India\'s trusted digital document safe. Store Aadhaar, PAN, Passport & 34 documents securely. AES-256 encrypted, fully offline.",\n  "start_url": "./",\n  "scope": "./",\n  "display": "standalone",\n  "orientation": "portrait-primary",\n  "background_color": "#0f2d78",\n  "theme_color": "#1a3fa0",\n  "categories": [\n    "productivity",\n    "utilities",\n    "lifestyle"\n  ],\n  "lang": "en-IN",\n  "dir": "ltr",\n  "icons": [\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-72.png",\n      "sizes": "72x72",\n      "type": "image/png",\n      "purpose": "any"\n    },\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-96.png",\n      "sizes": "96x96",\n      "type": "image/png",\n      "purpose": "any"\n    },\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-128.png",\n      "sizes": "128x128",\n      "type": "image/png",\n      "purpose": "any"\n    },\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-144.png",\n      "sizes": "144x144",\n      "type": "image/png",\n      "purpose": "any"\n    },\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-152.png",\n      "sizes": "152x152",\n      "type": "image/png",\n      "purpose": "any"\n    },\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-192.png",\n      "sizes": "192x192",\n      "type": "image/png",\n      "purpose": "any"\n    },\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-192.png",\n      "sizes": "192x192",\n      "type": "image/png",\n      "purpose": "maskable"\n    },\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-384.png",\n      "sizes": "384x384",\n      "type": "image/png",\n      "purpose": "any"\n    },\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-512.png",\n      "sizes": "512x512",\n      "type": "image/png",\n      "purpose": "any"\n    },\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-512.png",\n      "sizes": "512x512",\n      "type": "image/png",\n      "purpose": "maskable"\n    }\n  ],\n  "shortcuts": [\n    {\n      "name": "Open DigiSafe Vault",\n      "short_name": "DigiSafe Vault",\n      "url": "./",\n      "icons": [\n        {\n          "src": "https://dkmuralidharan.github.io/Mydoc/icon-192.png",\n          "sizes": "192x192",\n          "type": "image/png"\n        }\n      ]\n    }\n  ],\n  "screenshots": [\n    {\n      "src": "https://dkmuralidharan.github.io/Mydoc/icon-512.png",\n      "sizes": "512x512",\n      "type": "image/png",\n      "form_factor": "narrow",\n      "label": "DigiSafe Vault Home Screen"\n    }\n  ],\n  "prefer_related_applications": false,\n  "related_applications": []\n}';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.add(self.registration.scope).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=e.request.url;
  if(u.includes('manifest.json')){
    e.respondWith(new Response(MJ,{headers:{'Content-Type':'application/manifest+json','Cache-Control':'no-cache'}}));
    return;
  }
  if(e.request.method!=='GET'||!u.startsWith('http'))return;
  e.respondWith(caches.match(e.request).then(c=>{
    if(c)return c;
    return fetch(e.request).then(r=>{
      if(r&&r.ok){const cl=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,cl));}
      return r;
    }).catch(()=>caches.match(self.registration.scope));
  }));
});
self.addEventListener('message',e=>{if(e.data==='skipWaiting')self.skipWaiting();});
