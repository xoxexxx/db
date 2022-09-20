// npm init -y - инициальизируем
// npm install express pg pg-hstore sequelize cors dotenv - устанавливаем зависимости .json,
// -- pg и sequelize - модули, cors - чтоб обращаться с браузера к серверу, dotenv - задавать переменное окружение
// -- express (фреймворк в качестве системы управления БД)
// npm install -D nodemon автоматически перезапускать сервер при изменении

// package.json - пишим -скрипт- чтоб запускать сервер в режиме разработки 
// "dev": "nodemon index.js"
// npm i express-fileupload
// npm i uuid 

// создание структуры приложения
require('dotenv').config() // импортируем модуль чтоб считывался файл .env
const express = require("express");

const sequelize = require('./db') // экспортируем sequelize

// импортируем соззданные модели
const models = require('./models/models')

//корс
const cors = require('cors')

//импортируем router
const router = require('./routes/index')

// импорт middleware
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

// file upload
const fileupload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5000 // получаем порт из переменного окружения

const app = express(); // вызываем функцию -> запуск приложения

//настроим корс чтоб отправлять запросы с бразуера
app.use(cors())
app.use(express.json()) // для того чтоб приложение могло парсить json
// 1 парам - URL, 2 - сам Router
app.use('/api', router)
// для загрузки файлов
app.use(fileupload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
// ошибки
app.use(errorHandler)
// метод get (получить) 1парам - URL, 2- запрос ответ(колбек)
// app.get('/', (req, res) => {
//     res.status(200).json( {message: 'WORKING!'})
// })

// функция для подключение к БД
const start = async () => {
    try {
//подключение к БД
        await sequelize.authenticate()
// функция сверяет сост базы данных со схемой данных 
        await sequelize.sync()

// какой порт должен прослушивать наш сервер, 2парам-  колбек отработает при успешном запуске сервера
        app.listen(PORT, () => console.log(`START ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}



start()









// npm run dev - запуск сервера

// -> конфигурируем подключение к базе данных - bd.js

// авторизация 
// npm i jsonwebtoken bcrypt