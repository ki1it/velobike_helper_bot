const Datastore = require('nedb')
const users = new Datastore({filename: `${process.env.DB_PATH}/users.db`, autoload: true});
const data = new Datastore({filename: `${process.env.DB_PATH}/data.db`, autoload: true});
data.ensureIndex({ fieldName: 'Id', unique: true });
users.ensureIndex({fieldName: 'tgId', unique: true });
data.persistence.stopAutocompaction(60000);
