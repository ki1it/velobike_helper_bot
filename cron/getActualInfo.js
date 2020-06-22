const axios = require('axios');
require('dotenv').config();
const Datastore = require('nedb-promises'), data = new Datastore(`${process.env.DB_PATH}/data.db`);


async function getActualInfo() {
    const info = await axios.get('https://velobike.ru/ajax/parkings');
    await data.remove({}, { multi: true });
    await data.insert(info.data.Items);
}

module.exports = {
    getActualInfo,
};
