const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup')

const {mainMenuSceneLocale} = require('../botConstants');

const Datastore = require('nedb-promises'), users = new Datastore(`${process.env.DB_PATH}/users.db`);

const mainMenuScene = new Scene('mainMenu')
mainMenuScene.enter((ctx) => ctx.reply(mainMenuSceneLocale.main, Markup.inlineKeyboard([
    [Markup.callbackButton('Мои станции', 'list')],
    [Markup.callbackButton('Добавить станцию', 'add'),
    Markup.callbackButton('Удалить станцию', 'list')],
    [Markup.callbackButton('Включить мониторинг', 'on'),
    Markup.callbackButton('Выключить мониторинг', 'off')]
    ]).extra()
));
mainMenuScene.action('list', (ctx) => ctx.scene.enter('listStations'));
mainMenuScene.action('add', (ctx) => ctx.scene.enter('addStation'));
mainMenuScene.action('on', (ctx) => {
    users.update({tgId: ctx.chat.id}, {active: true})
});
mainMenuScene.action('off', (ctx) => {
    users.update({tgId: ctx.chat.id}, {active: false})
});

module.exports = {
    mainMenuScene,
};
