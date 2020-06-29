// const Datastore = require('nedb-promises');
// const users = new Datastore({filename: `${process.env.DB_PATH}/users.db`, autoload: true});

const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const store = new Datastore({filename: `${process.env.DB_PATH}/users.db`, autoload: true})
const users = nedbPromise.fromInstance(store)
users.ensureIndex({fieldName: 'tgId', unique: true });

module.exports = {
    store,
    users,
}
