const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();


const Datastore = require('nedb-promises'), users = new Datastore({filename: `${process.env.BOT_PATH}/users.db`, autoload: true});
const data = new Datastore({filename: `${process.env.BOT_PATH}/data.db`, autoload: true});
data.ensureIndex({ fieldName: 'Id', unique: true });
require('./cron')

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием, то есть "Hello World!")
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = match[1]; // Получаем текст после /echo
    bot.sendMessage(fromId, resp);
});

bot.onText(/\/list/, function onList(msg) {
    bot.sendGame(msg.chat.id, gameName);
});

bot.onText(/\/add/, function onList(msg) {
    bot.sendGame(msg.chat.id, gameName);
});

bot.onText(/\/delete/, function onList(msg) {
    bot.sendGame(msg.chat.id, gameName);
});

// Простая команда без параметров
bot.on('message', function (msg) {
    var chatId = msg.chat.id; // Берем ID чата (не отправителя)
    // Фотография может быть: путь к файлу, поток (stream) или параметр file_id
    var photo = 'cats.png'; // в папке с ботом должен быть файл "cats.png"
    bot.sendPhoto(chatId, photo, { caption: 'Милые котята' });
});
