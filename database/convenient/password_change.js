// DAO
const Sequelize = require('sequelize')
const sequelize = new Sequelize(`online_laundry`, `laundry-online-db-user`, `2NVtfbx4sGdd0TL7gzSlGCrQnl8BO7Ekx1n86zjaj4`,{
    host: `1509.ddns.net`,
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
var Models = require(`../../models/init-models`)(sequelize);

var bcrypt = require("bcryptjs");
const { BCRYPT_SALT } = require(`../../const/values.js`)

const uname = 'admin'
const pword = 'admin'

var user = Models.user.findOne({
	where : {
		nickname: uname
	}
}).then((user)=>{
	const hash_new_pw = bcrypt.hashSync(pword, BCRYPT_SALT);
	console.log(hash_new_pw)
	console.log(user)
	user.update({
		password: hash_new_pw
	}).then((res)=>{
		console.log("OK\n" + res.toJSON())
	}).catch((err)=>{
		console.log(err)
	})
})