const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup')

const {mainMenuSceneLocale} = require('../botConstants');

const mainMenuScene = new Scene('mainMenu')
mainMenuScene.enter((ctx) => ctx.reply(mainMenuSceneLocale, Markup.inlineKeyboard([
    Markup.callbackButton('Мои станции', 'list'),
    Markup.callbackButton('Добавить станцию', 'add'),
    Markup.callbackButton('Удалить станцию', 'list'),
    Markup.callbackButton('Включить мониторинг', 'on'),
    Markup.callbackButton('Выключить мониторинг', 'off')
])))
mainMenuScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'))

module.exports = {
    mainMenuScene,
};
