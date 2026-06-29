const express = require('express')
const routes = express.Router()
const getController = require("../controllers/getController")

routes.get('/', getController.getUsers)
routes.delete('/delete/:id', getController.deleteUsers)
routes.post('/update', getController.updateUsers)
routes.post('/create', getController.insertUsers)
module.exports = routes