const mainMenuSceneLocale = {
    main: 'Главное меню',
};

const helpLocale = {
    help: 'С помощью этого бота ты можешь отслеживать загруженность станций Московского велопроката. \n' +
        'Доступные команды:\n' +
        '/add \n' +
        '/delete \n' +
        '/list \n' +
        '/menu \n' +
        '/on \n' +
        '/off \n',
};

const listLocale = {
    list: 'Ваши избранные станции: ',
    emptyList: 'У вас нет избранных станций '
}

const addLocale = {
    add: 'Введите номер станции, которую хотите добавить',
    added: 'Станция добавлена',
    incorrect: 'Номер станции не распознан',
    already: 'Такая станция уже есть'
}

const deleteLocale = {
    delete: 'Введите номер станции, которую хотите удалить',
    deleted: 'Станция удалена',
    incorrect: 'Номер станции не распознан',
    already: 'Эта станция не в вашем избранном'
}
const monitoringLocale = {
    on: 'Мониторинг станций включен',
    off: 'Мониторинг станций выключен',
}

module.exports = {
    mainMenuSceneLocale,
    helpLocale,
    listLocale,
    addLocale,
    deleteLocale,
    monitoringLocale,
};
