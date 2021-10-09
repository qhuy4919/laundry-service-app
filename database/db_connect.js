// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const { Pool, Client } = require('pg')
const uname = "laundry-online-db-user";
const pword = "2NVtfbx4sGdd0TL7gzSlGCrQnl8BO7Ekx1n86zjaj4";
const conectionString = `postgressql://${uname}:${pword}@1509.ddns.net:5432/online_laundry`
const client = new Client({
	connectionString: conectionString
})
client.connect()

// hiện tại chỉ có bảng conn_test
client.query('SELECT * FROM conn_test', function (err, res) {
	if (err) {
		console.log("Đã xảy ra lỗi, chụp ảnh log và liên hệ nvat");
		console.log(err, res);
	} else {
		console.log('Kết nối thành công. Kết quả truy vấn:');
		console.log(res.rows)
	}
	client.end()
});

// clinet.query(`CREATE TABLE [IF NOT EXISTS] user(
// 	ID string
// )`)
