INSERT INTO "user" (nickname, email, "password", "role")
	VALUES	('admin', 'admin@example.com', 'admin', 'Admin'),
    		('quantri', 'quantri@example.com', 'quantri', 'Admin'),
            ('qhuy', 'qhuy@example.com', 'qhuy', 'User'),
            ('tnga', 'tnga@example.com', 'tnga', 'User'),
    		('sthuan', 'sthuan@example.com', 'sthuan', 'User'), 
            ('coha9x', 'coha9x@example.com', 'coha9x', 'User'),
            ('vhai', 'vhai@example.com', 'vhai', 'User'),
            ('txphuc', 'txphuc@laundry-now.com', 'txphuc', 'User'),
            ('kzkhirata', 'kzkhirata@sun-asterisk.com', 'kzkhirata', 'User');
---- USER ID : USERNAME
-- 1: admin, 2: quantri, 3: qhuy, 4: tnga, 5: sthuan, 6: coha9x, 7: vhai, 8: txphuc, 9: kzkhirata

INSERT INTO "laundry_shop" ( user_id, shop_name, active)
	VALUES	(7, 'Tiệm giặt đồ ABA', TRUE),
    		(8, 'TXP Lightnight Laundry', TRUE),
    		(9,	'Subaya Sentaku', TRUE);

---- SHOP ID : SHOP
-- 1: 'Tiem giat do ABA', 2: 'TXP Lightnight Laundry', 3: 'Subahaya Sentaku'

INSERT INTO "shop_category" (shop_id, category_name, "hidden")
	VALUES	(1, 'Giặt thường', FALSE),
    		(1, 'Giặt nhanh', FALSE),
            (2, 'Tornado Laundry', FALSE),
            (2, 'Blizzard Laundry', FALSE),
            (2, 'Naruto Laundry', TRUE),
            (3, '素速い洗濯', FALSE);

---- shop_category ID : shop_category
-- 0: 'Giặt thường', 1: 'Giặt nhanh', 2: 'Tornado Laundry', 3: 'Blizzard Laundry', 4: 'Naruto Laundry', 5: '素速い洗濯'

INSERT INTO item (category_id, item_name, item_detail, item_status, item_price, "hidden")
	VALUES	(2, 'Giặt chăn', 'Giặt chăn nhanh hơn bình thường', 'Available', 5.0, FALSE),	-- 1
    		(2, 'Giặt mền', 'Giặt mền nhanh hơn bình thường', 'Available', 6.0, FALSE),		-- 2
            (3, 'Clothes', 'Washing clothes - Tornado Style', 'Available', 6.9, FALSE),		-- 3
            (6, '服', '普通の服の洗濯', 'Available', 2.0, FALSE),							 -- 4
            (6, '白い服', '白い服だけの洗濯', 'Available', 3.0, FALSE),					   -- 5
            (6, 'カラフルな服', 'カラフルな服だけの洗濯', 'Available', 9.9, FALSE),			  -- 6
            (1, 'Giặt ABC', 'Alj lkjlkajs sjdfk ajsldfkls jfksldf ksfljkasdf', 'Not Available', 0.0, TRUE),
            (1, 'Giặt DEF', 'wio fnaow owaie foasmd ivoz imovizxmvo mljlajl', 'Not Available', 0.0, TRUE),
            (1, 'Giặt GHI', 'wio fnaow owaie foasmd ivoz imovizxmvo mljlajl', 'Not Available', 0.0, TRUE),
            (1, 'Giặt KMN', 'wio fnaow owaie foasmd ivoz imovizxmvo mljlajl', 'Not Available', 0.0, TRUE);


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