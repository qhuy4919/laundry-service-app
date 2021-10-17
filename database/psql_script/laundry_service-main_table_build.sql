DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "order" CASCADE;
DROP TABLE IF EXISTS "follower" CASCADE; 
DROP TABLE IF EXISTS "item" CASCADE; 
DROP TABLE IF EXISTS "laundry_shop" CASCADE; 
DROP TABLE IF EXISTS "order_item" CASCADE; 
DROP TABLE IF EXISTS "order_review" CASCADE; 
DROP TABLE IF EXISTS "shop_category" CASCADE; 

----------------------------------- TABLE USER
CREATE TABLE "user"
(
 "id"         int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 nickname     varchar(256) NOT NULL UNIQUE,
 email        varchar(256) NOT NULL UNIQUE,
  
 "password"   varchar(256) NOT NULL,
 "name"       varchar(256) NULL,
 gender       VARCHAR(32) DEFAULT 'undisclosed',
 "role"       VARCHAR(16) DEFAULT 'user',
  
 profile_pic  varchar(1024) NULL,
 phone_number varchar(32) NULL,
 address      json NULL,
 birthday     date NULL,
 active       boolean NOT NULL DEFAULT TRUE,
  
 deleted_at	  TIMESTAMP,
 updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

----------------------------------- TABLE laundry_shop
CREATE TABLE laundry_shop
(
 "id"             int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 user_id          int REFERENCES "user" ("id"),
 
 shop_name        varchar(1024) NOT NULL,
 shop_address     json,
 shop_detail      TEXT DEFAULT '',
 shop_profile_pic varchar(1024) NULL,
  
 working_time     JSON NULL,
  
 follower_count	  INT DEFAULT 0,
 rating           decimal NULL,
 active           boolean NOT NULL DEFAULT FALSE,
 
 deleted_at	  TIMESTAMP,
 updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX __constraint_idx__laundry_shop__user_id ON laundry_shop (user_id);

----------------------------------- TABLE shop_category
CREATE TABLE shop_category
(
 "id"           int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 shop_id        int REFERENCES laundry_shop ("id") ON DELETE CASCADE ON UPDATE CASCADE,
 category_name  VARCHAR(256) NOT NULL,
  
 "hidden"       boolean NOT NULL DEFAULT TRUE,
 deleted_at	    TIMESTAMP
);
CREATE INDEX __constraint_idx__shop_category__shop_id ON shop_category (shop_id);

----------------------------------- TABLE item
CREATE TABLE item
(
 "id"        int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 category_id int REFERENCES shop_category ( "id" ) ON DELETE CASCADE ON UPDATE CASCADE,
 
 item_name   varchar(256) NOT NULL DEFAULT '',
 item_pic    varchar(1024) NULL DEFAULT NULL,
 item_detail varchar(1024) NOT NULL DEFAULT '',
 item_status VARCHAR(256) NOT NULL DEFAULT '',
 item_price  decimal NOT NULL DEFAULT 0.0,
 
 "hidden"     boolean NOT NULL DEFAULT TRUE,
 deleted_at	  TIMESTAMP,
 updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX __constraint_idx__item__category_id ON item (category_id);

----------------------------------- TABLE order
CREATE TABLE "order"
(
 "id"          int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 user_id       int REFERENCES "user" ( "id" ) ON DELETE CASCADE ON UPDATE CASCADE,
 shop_id       int REFERENCES laundry_shop ( "id" ) ON DELETE CASCADE ON UPDATE CASCADE,
 
 order_time    	timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 order_address 	json,
 order_status  	varchar(256) NOT NULL DEFAULT '',
 "total_cost"	DECIMAL NOT NULL DEFAULT 0.0,
 note			TEXT NOT NULL DEFAULT '',
  
 deleted_at	  TIMESTAMP,
 updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX __constraint_idx__order__user_id ON "order" (user_id);
CREATE INDEX __constraint_idx__order__shop_id ON "order" (shop_id);
CREATE INDEX __constraint_idx__order__order_state ON "order" (order_status);

----------------------------------- TABLE order_item
CREATE TABLE order_item
(
 item_id  int REFERENCES item ( "id" ),
 order_id int REFERENCES "order" ( "id" ),
 quantity int NOT NULL DEFAULT 0,
 
 PRIMARY KEY ( item_id, order_id )
);

CREATE INDEX __constraint_idx__order_item__order_id ON order_item ( order_id );
CREATE INDEX __constraint_idx__order_item__item_id ON order_item ( item_id );

----------------------------------- TABLE order_item
CREATE TABLE order_review
(
 "id"     int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 order_id int REFERENCES "order" ( "id" ),
  
 rating   decimal NULL,
 "comment"  TEXT NOT NULL DEFAULT '',
 
 deleted_at	  TIMESTAMP,
 updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX __constraint_idx__order_review__order_id ON order_review ( order_id );

----------------------------------- TABLE follower
CREATE TABLE follower
(
 user_id int REFERENCES "user" ( "id" ),
 shop_id int REFERENCES laundry_shop ( "id" ),
 
 PRIMARY KEY ( user_id, shop_id )
);

CREATE INDEX __constraint_idx__follower__user_id ON follower ( user_id );
CREATE INDEX __constraint_idx__follower__shop_id ON follower ( shop_id );
