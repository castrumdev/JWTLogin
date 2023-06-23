//importing modules
const { Sequelize, DataTypes } = require('sequelize')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
//const sequelize = new Sequelize(`oregon-postgres.render.com`, { dialect: "postgres" })
const sequelize = new Sequelize(`postgres://chatreplay_user:g8xuYcnUluVpPwb7yTOGxHRAhb0SJtgT@dpg-ci9i2gh8g3ne2ejvdct0-a/chatreplay?ssl=true`, { dialect: "postgres" })

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.users = require('./userModel')(sequelize, DataTypes)

//exporting the module
module.exports = db