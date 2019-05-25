import Dexie from 'dexie';

var db = new Dexie('questionsDB');

db.version(1).stores({
    data: 'id, coordinates, date, questions',
});

export default db;
