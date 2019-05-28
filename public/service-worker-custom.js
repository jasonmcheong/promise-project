// IndexedDB
// ** IndexedDB version is v10 **
let request = indexedDB.open('questionsDB', 10);

request.onerror = function(error) {
    console.log(`Request error: ${error}`);
};

request.onsuccess = function(e) {
    console.log(`Successful`);

    var db = e.target.result;
    var transaction = db.transaction(['data']);
    var objectStore = transaction.objectStore('data');

    objectStore.getAll().onsuccess = function(e) {
        e.target.result.forEach(res => {
            console.log(res.id);
        });
    };
};

// Service Worker
const cacheName = 'v1';

// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');

    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone();

                // Open cache
                caches.open(cacheName).then(cache => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch(err => caches.match(e.request).then(res => res))
    );
});
