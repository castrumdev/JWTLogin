const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
 const db = require('./Models')
 const userRoutes = require ('./Routes/userRoutes')
 var cron = require('node-cron');

cron.schedule('*/14 * * * *', () => {
  axios.post('https://jwtlogin.onrender.com/api/users/login', {
    email: 'email',
    password: 'password'
  })
    .then(response => {
      console.log('Server is up and running');
      // Faça o que desejar com a resposta do servidor aqui
    })
    .catch(error => {
      console.log('Server is down');
      // Faça o que desejar em caso de erro (servidor inacessível) aqui
    });
});


//setting up your port
const PORT = process.env.PORT || 3080

//assigning the variable app to express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))