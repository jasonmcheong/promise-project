/*
 ** TODO: Clear the data from IDB database when response gets sent
 */

/*
 ** Attempting to clear the data in sendQuestions currently
 */
function sendQuestions() {
    var db = indexedDB.open('questionsDB', 1);

    db.onupgradeneeded = function(event) {
        if (!this.result.objectStoreNames.contains('data')) {
            let objectStore = this.result.createObjectStore('data', { keyPath: 'id' });
            objectStore.createIndex('id', 'id', { unique: true });
            objectStore.createIndex('coordinates', 'coordinates', { unique: false });
            objectStore.createIndex('date', 'date', { unique: false });
            objectStore.createIndex('questions', 'questions', { unique: false });
            objectStore.createIndex('language', 'language', { unique: false });
        }
    };

    // When a connection is present, POST questionsDB data to AWS
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
                        language: res.language,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => console.log(response))
                    .catch(err => {
                        throw err;
                    });
            });
        };
    };

    db.onerror = function(err) {
        throw err;
    };
}

function sendForm() {
    var db = indexedDB.open('formDB');

    db.onupgradeneeded = function(event) {
        if (!this.result.objectStoreNames.contains('data')) {
            let objectStore = this.result.createObjectStore('data', { keyPath: 'id' });
            objectStore.createIndex('id', 'id', { unique: true });
            objectStore.createIndex('coordinates', 'coordinates', { unique: false });
            objectStore.createIndex('date', 'date', { unique: false });
            objectStore.createIndex('form', 'form', { unique: false });
            objectStore.createIndex('language', 'language', { unique: false });
        }
    };

    // When a connection is present, POST questionsDB data to AWS
    db.onsuccess = function(event) {
        this.result
            .transaction('data', 'readwrite')
            .objectStore('data')
            .getAll().onsuccess = function(event) {
            event.target.result.forEach(res => {
                fetch('https://ldljqdsel3.execute-api.us-west-2.amazonaws.com/v1/form', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: res.id,
                        coordinates: res.coordinates,
                        date: res.date,
                        form: res.form,
                        language: res.language,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => console.log(response))
                    .catch(err => {
                        throw err;
                    });
            });
        };
    };

    db.onerror = function(err) {
        throw err;
    };
}

function sendQuestionsAdditional() {
    var db = indexedDB.open('questionsAdditionalDB');

    db.onupgradeneeded = function(event) {
        if (!this.result.objectStoreNames.contains('data')) {
            let objectStore = this.result.createObjectStore('data', { keyPath: 'id' });
            objectStore.createIndex('id', 'id', { unique: true });
            objectStore.createIndex('coordinates', 'coordinates', { unique: false });
            objectStore.createIndex('date', 'date', { unique: false });
            objectStore.createIndex('questions', 'questions', { unique: false });
            objectStore.createIndex('language', 'language', { unique: false });
        }
    };

    // When a connection is present, POST questionsDB data to AWS
    db.onsuccess = function(event) {
        this.result
            .transaction('data', 'readwrite')
            .objectStore('data')
            .getAll().onsuccess = function(event) {
            event.target.result.forEach(res => {
                fetch('https://ldljqdsel3.execute-api.us-west-2.amazonaws.com/v1/questions-additional', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: res.id,
                        coordinates: res.coordinates,
                        date: res.date,
                        questions: res.questions,
                        language: res.language,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => console.log(response))
                    .catch(err => {
                        throw err;
                    });
            });
        };
    };

    db.onerror = function(err) {
        throw err;
    };
}

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

// Call Sync Event
self.addEventListener('sync', function(e) {
    if (e.tag === 'sendQuestions') {
        e.waitUntil(sendQuestions());
    }
    if (e.tag === 'sendForm') {
        e.waitUntil(sendForm());
    }
    if (e.tag === 'sendQuestionsAdditional') {
        e.waitUntil(sendQuestionsAdditional());
    }
});
