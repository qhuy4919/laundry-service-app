// Import thư viện
const { Pool, Client } = require('pg')

// Thông tin user database, đừng để lộ ra ngoài
const uname = "laundry-online-db-user";
const pword = "2NVtfbx4sGdd0TL7gzSlGCrQnl8BO7Ekx1n86zjaj4";

// Tạo đối tượng client để giao tiếp với DB
const client= new Client({
	user: `${uname}`,
	password: `${pword}`,
	database: "online_laundry",
	port: 5432,
	host: "1509.ddns.net",
	ssl: { rejectUnauthorized: false }
})
client.connect()

// -- Từ đây trở lên không nên sửa gì hết
// -- --------------------------------------

// Thử kết nối đến DB và truy vấn bảng conn_test:
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

