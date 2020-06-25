const Datastore = require('nedb-promises');
const users = new Datastore({filename: `${process.env.DB_PATH}/users.db`, autoload: true});
users.ensureIndex({fieldName: 'tgId', unique: true });

module.exports = {
    users,
}
