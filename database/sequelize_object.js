const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(`${process.env.DB_DATABASE}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`,{
    host: `${process.env.DB_HOST}`,
    ssl: true,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    },
    
    define: {
        freezeTableName: true,
    }
});
module.exports = {
	sequelize
}