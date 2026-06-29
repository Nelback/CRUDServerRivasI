const express = require("express")
const router = express.Router()
const loginController = require("../controllers/loginController")

router.get('/', (req,res) => {
    res.send("bienvenido")
})

router.post('/login', loginController.loginUser)
router.get('/validate', loginController.validateUser)
router.get('/logout', loginController.logout)

module.exports = router
