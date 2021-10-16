# Backend: laundry-service-app

Thử kết nối tới Remote Database Server.

## Setup trước khi phát triển
1. Cài đặt môi trường Node
2. Cài thư viện `pg` của npm
```
npm install -g pg
```

3. Git Clone cái repo này về
4. `cd` vào folder vừa clone về, `checkout` sang `backend`
5. `cd` vào folder `/database`
6. Chạy  
```
node db_connect_test.js
```

Để thử kết nối tới Database ở ngoài Internet.

7. Đọc dữ liệu xuất ra, nếu có lỗi báo cho @nvatuan. Nếu thành công, đọc tiếp bên dưới và bắt đầu làm

## Quan trọng
* DB sử dụng là Postgres 10
* Trong folder `/database/psql_script` có 2 file:
	1. `laundry_service-data_populate.sql` là File thêm dữ liệu vào DB 
	2. `laundry_service-main_table_build.sql` là File cấu trúc Table của DB, dùng file này để học về cấu trúc DB mà chúng ta dùng

	Có thể dùng 2 script này để tái tạo lại DB trong máy local các bạn. Nhưng **đừng chạy** 2 script trên lên DB online của chúng ta, nó sẽ xóa sạch dữ liệu.
* Trong folder `/database` có 2 file script:
	1. `db_connect_test.js` là File dùng để test kết nối tới DB
	2. `db_query.js` là File ví dụ cho một vài truy vấn mà chúng ta sẽ gọi
* Các bạn có thể `SELECT, INSERT, UPDATE, DELETE` mọi bảng trong DB nhưng hãy thống nhất là không `DELETE, UPDATE` các trường mà người khác tạo. 
