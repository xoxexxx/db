// импортируем sequelize
const {Sequelize} = require('sequelize') 

// экспортируем объект
// пользователь под которым мы будем подключаться, пароль и т.д
// уст. postgresql -> открываем pgAdmin и создаем базу данных
// возвращаемся в переменное окружение .env
module.exports = new Sequelize(
    // передаем из .env
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
            //   SQL
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        
    }
)
// -> index.js

