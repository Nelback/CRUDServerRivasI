const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const PORT = 3000
const loginRoute = require("./src/routes/loginRoute")
const getRoutes = require("./src/routes/getRoutes")
const cors = require("cors")
app.use(cors({origin:"https://crud-client-rivas.vercel.app", methods:['GET', 'POST', 'DELETE', 'PUT'], credentials:true,}))
app.use(cookieParser())
app.use(express.json())
app.set('trust proxy', 1);



app.use("/api", loginRoute)
app.use('/users', getRoutes)

app.listen(PORT, () => {
    console.log(`Servidor prendido y abierto en: http://localhost:${PORT}`)
})

