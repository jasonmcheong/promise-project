function sendQuestions() {
    return new Promise(function(resolve, reject) {
        var db = indexedDB.open('questionsDB');

        db.onsuccess = function(event) {
            this.result
                .transaction('data', 'readwrite')
                .objectStore('data')
                .getAll().onsuccess = function(event) {
                event.target.result.forEach(res => {
                    fetch('https://ldljqdsel3.execute-api.us-west-2.amazonaws.com/v1/questions', {
                        method: 'POST',
                        body: JSON.stringify({
                            id: res.id,
                            coordinates: res.coordinates,
                            date: res.date,
                            questions: res.questions,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(response => console.log(response))
                        .then(() => resolve())
                        .catch(err => reject(err));
                });
            };
        };

        db.onerror = function(err) {
            reject(err);
        };
    });
}

/* TODO: Figure out why sync is not sending data when going back online;
 *       have to manually sync data from service worker in google chrome dev tools
 */
self.addEventListener('sync', function(e) {
    e.waitUntil(
        sendQuestions()
            .then(() => {
                var db = (indexedDB.open('questionsDB').onsuccess = function(e) {
                    this.result
                        .transaction('data', 'readwrite')
                        .objectStore('data')
                        .clear().onsuccess = function(e) {
                        console.log('data cleared');
                    };
                });
            })
            .catch(err => {
                throw err;
            })
    );
});

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
