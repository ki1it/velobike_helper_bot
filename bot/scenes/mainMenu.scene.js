const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');

const {mainMenuSceneLocale} = require('../botConstants');

const mainMenuScene = new Scene('mainMenu')
mainMenuScene.enter((ctx) => ctx.reply(mainMenuSceneLocale.main, Markup.inlineKeyboard([
    [Markup.callbackButton('Мои станции', 'list')],
    [Markup.callbackButton('Добавить станцию', 'add'),
    Markup.callbackButton('Удалить станцию', 'delete')],
    [Markup.callbackButton('Включить мониторинг', 'on'),
    Markup.callbackButton('Выключить мониторинг', 'off')]
    ]).extra()
));
mainMenuScene.action('list', (ctx) => ctx.scene.enter('listStations'));
mainMenuScene.action('add', (ctx) => ctx.scene.enter('addStation'));
mainMenuScene.action('delete', (ctx => ctx.scene.enter('deleteStation')));
mainMenuScene.action('on', (ctx => ctx.store.monitorOn(ctx)));

mainMenuScene.action('off', (ctx => ctx.store.monitorOff(ctx)));

module.exports = {
    mainMenuScene,
};
