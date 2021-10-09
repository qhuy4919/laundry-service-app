const uname = "laundry-online-db-user";
const pword = "2NVtfbx4sGdd0TL7gzSlGCrQnl8BO7Ekx1n86zjaj4";
const {Pool, Client}=require('pg')

// const conectionString = `postgressql://${uname}:${pword}@1509.ddns.net:5432/online_laundry?ssl=true`

const client= new Client({
	user: `${uname}`,
	password: `${pword}`,
	database: "online_laundry",
	port: 5432,
	host: "1509.ddns.net",
	ssl: { rejectUnauthorized: false }
})
client.connect()

// hiện tại chỉ có bảng conn_test
client.query('SELECT * FROM conn_test', function(err, res) {
	if (err) {
		console.log("Đã xảy ra lỗi, chụp ảnh log và liên hệ nvat");
		console.log(err,res);
	} else {
		console.log('Kết nối thành công. Kết quả truy vấn:');
		console.log(res.rows)
	}
    client.end()
});
