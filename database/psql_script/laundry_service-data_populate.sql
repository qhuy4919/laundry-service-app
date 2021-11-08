INSERT INTO "user" (nickname, email, "password", "role")
	VALUES	('admin', 'admin@example.com', 'admin', 'admin'),
    		('quantri', 'quantri@example.com', 'quantri', 'admin'),
            ('qhuy', 'qhuy@example.com', 'qhuy', 'user'),
            ('tnga', 'tnga@example.com', 'tnga', 'user'),
    		('sthuan', 'sthuan@example.com', 'sthuan', 'user'), 
            ('coha9x', 'coha9x@example.com', 'coha9x', 'user'),
            ('vhai', 'vhai@example.com', 'vhai', 'User'),
            ('txphuc', 'txphuc@laundry-now.com', 'txphuc', 'user'),
            ('kzkhirata', 'kzkhirata@sun-asterisk.com', 'kzkhirata', 'user');
---- USER ID : USERNAME
-- 1: admin, 2: quantri, 3: qhuy, 4: tnga, 5: sthuan, 6: coha9x, 7: vhai, 8: txphuc, 9: kzkhirata

INSERT INTO "laundry_shop" ( user_id, shop_name, shop_detail, active, shop_address, working_time, rating, follower_count)
	VALUES	(7, 'wow LAUNDRY !', '信じられないほど速い、信じられないほどきれい、信じられないほど安い!!', 
             	TRUE, '{"string": "123 Dong Da street, Da Nang city"}', '{"open":"08:00","close":"21:00"}', 5.0, 396),
    		(8, 'Secret Sauce - Laundry', '専用の自家製洗剤を使ったランドリー。 汚れは私たちの洗浄力に耐えることができません!', TRUE,
            '{"string": "55 Hai Phong street, Da Nang city"}', '{"open":"08:15","close":"19:00"}', 4.4, 115),
    		(9,	'Naruto Laundry', '螺旋丸の力で洗う！', TRUE,
            '{"string": "79 Nguyen Tat Thanh street, Da Nang city"}', '{"open":"10:15","close":"17:00"}', 4.1, 96),
            (1, 'Lightning Washing ⚡', '帯電した水で洗い、バクテリアを取り除きます⚡⚡！', TRUE,
           	'{"string": "11 Ham Nghi street, Da Nang city"}', '{"open":"7:15","close":"19:30"}', 4.0, 26),
            (2, '青空ランドリー', 'シンプル。高速。Tran Xuan Phuc様の大好きなランドリーショップ。', TRUE,
             '{"string": "99 Chau Thi Vinh Te street, Da Nang city"}', '{"open":"7:00","close":"22:00"}', 3.9, 1);

---- SHOP ID : SHOP
-- 1: 'Tiem giat do ABA', 2: 'TXP Lightnight Laundry', 3: 'Subahaya Sentaku'

INSERT INTO "shop_category" (shop_id, category_name, "hidden")
	VALUES	(1, 'Fast Wash', FALSE),
    		(1, 'Normal Wash', FALSE),
            (4, 'Tornado Laundry', FALSE),
            (4, 'Blizzard Laundry', FALSE),
            (3, 'Rasengan Laundry', TRUE),
            (5, '素速い洗濯', FALSE);

---- shop_category ID : shop_category
-- 0: 'Giặt thường', 1: 'Giặt nhanh', 2: 'Tornado Laundry', 3: 'Blizzard Laundry', 4: 'Naruto Laundry', 5: '素速い洗濯'

INSERT INTO item (category_id, item_name, item_detail, item_status, item_price, "hidden")
	VALUES	(2, 'Matress', 'Giặt chăn nhanh hơn bình thường', 'Available', 5000.0, FALSE),	-- 1
    		(2, 'Giặt mền', 'Giặt mền nhanh hơn bình thường', 'Available', 6000.0, FALSE),		-- 2
            (3, 'Clothes', 'Washing clothes - Tornado Style', 'Available', 7000.0, FALSE),		-- 3
            (6, '服', '普通の服の洗濯', 'Available', 1000.0, FALSE),							 -- 4
            (6, '白い服', '白い服だけの洗濯', 'Available', 3000.0, FALSE),					   -- 5
            (6, 'カラフルな服', 'カラフルな服だけの洗濯', 'Available', 9000.0, FALSE),			  -- 6
            (1, 'Giặt ABC', 'Alj lkjlkajs sjdfk ajsldfkls jfksldf ksfljkasdf', 'Not Available', 2500.0, TRUE),
            (1, 'Giặt DEF', 'wio fnaow owaie foasmd ivoz imovizxmvo mljlajl', 'Not Available', 3500.0, TRUE),
            (1, 'Giặt GHI', 'wio fnaow owaie foasmd ivoz imovizxmvo mljlajl', 'Not Available', 4000.0, TRUE),
            (1, 'Giặt KMN', 'wio fnaow owaie foasmd ivoz imovizxmvo mljlajl', 'Not Available', 1500.0, TRUE);


INSERT INTO "order" (user_id, shop_id, order_status, "total_cost", note)
	VALUES	(4, 1, 'Pending', 45.0, 'Giặt hộ em cái hihi'),   -- 1
    		(3, 3, 'Done', 20.0, '週末までに済ませてください'), -- 2
            (3, 3, 'Pending', 15.0, 'これも');					-- 3

INSERT INTO order_item (item_id, order_id, quantity)
	VALUES	(1, 1, 2),
    		(4, 2, 3),
            (5, 2, 6),
            (6, 2, 8);
                
INSERT INTO follower ( user_id, shop_id )
	VALUES 	(3, 3), 
    		(4, 2),
            (5, 2),
            (6, 2),
            (8, 2),
            (9, 3);