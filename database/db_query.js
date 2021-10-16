// -- Đừng Edit khu vực này
const { Pool } = require('pg')
const uname = "laundry-online-db-user";
const pword = "2NVtfbx4sGdd0TL7gzSlGCrQnl8BO7Ekx1n86zjaj4";
const pool = new Pool({
	user: `${uname}`,
	password: `${pword}`,
	database: "online_laundry",
	port: 5432,
	host: "1509.ddns.net",
	ssl: { rejectUnauthorized: false },

	max: 5,
})
// -- --------------------------------------
// DB đã có sẵn các bảng và một vài dữ liệu
// Chúng ta sẽ thử query một vài câu truy vấn

// Hàm Test câu lệnh SQL. Thử truy vấn lên server và in ra kết quả vào màn hình.
async function tryQuery(sqlcommand, msg) {
	pool.query(sqlcommand, 
		function (err, res) {
			if (err) {
				console.log("Đã xảy ra lỗi, chụp ảnh log và liên hệ nvat");
				console.log(err, res);
			} else {
				console.log(msg)
				console.log(res.rows)
			}
	});
}

tryQuery('SELECT nickname FROM "user"', 
	"1. Tất cả user trong bảng user:");
tryQuery('SELECT shop_name FROM "laundry_shop"', 
	"2. Tất cả shop trong bảng laundry_shop:");

tryQuery('SELECT "user".nickname FROM "user" RIGHT JOIN "laundry_shop" ON "user".id = "laundry_shop".user_id;',
	"3. Tất cả user mà sở hữu một shop");

tryQuery(
	'SELECT laundry_shop.shop_name AS Shop, COUNT(follower.user_id) AS Follows '+
	'FROM laundry_shop JOIN follower ON laundry_shop.id = follower.shop_id '+
	'GROUP BY laundry_shop.shop_name;',
	"4. Hiển thị tất cả tên shop và số lượt follow mỗi shop đó");