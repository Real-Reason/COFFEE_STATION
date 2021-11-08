```mysql
--Size--
INSERT INTO coffee_station.`size`
(`type`)
VALUES('One Size');
INSERT INTO coffee_station.`size`
(`type`)
VALUES('S');
INSERT INTO coffee_station.`size`
(`type`)
VALUES('M');
INSERT INTO coffee_station.`size`
(`type`)
VALUES('L');
INSERT INTO coffee_station.`size`
(`type`)
VALUES('Tall');
INSERT INTO coffee_station.`size`
(`type`)
VALUES('Grande');
INSERT INTO coffee_station.`size`
(`type`)
VALUES('Venti');


--Category--
INSERT INTO coffee_station.category
(name)
VALUES('Coffee');
INSERT INTO coffee_station.category
(name)
VALUES('Non-Coffee');
INSERT INTO coffee_station.category
(name)
VALUES('Dessert');
INSERT INTO coffee_station.category
(name)
VALUES('Bakery');
INSERT INTO coffee_station.category
(name)
VALUES('ETC');

--Partner--
INSERT INTO coffee_station.partner
(email, password)
VALUES('partner0@coffee.station', 'ssafy');
INSERT INTO coffee_station.partner
(email, password)
VALUES('partner1@coffee.station', 'ssafy');
INSERT INTO coffee_station.partner
(email, password)
VALUES('partner2@coffee.station', 'ssafy');


--Customer--
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer0@coffee.station', '고객영', 'ssafy');
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer1@coffee.station', '고객일', 'ssafy');
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer2@coffee.station', '고객이', 'ssafy');
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer3@coffee.station', '고객삼', 'ssafy');
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer4@coffee.station', '고객사', 'ssafy');
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer5@coffee.station', '고객오', 'ssafy');
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer6@coffee.station', '고객육', 'ssafy');
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer7@coffee.station', '고객칠', 'ssafy');
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer8@coffee.station', '고객팔', 'ssafy');
INSERT INTO coffee_station.customer
(email, nickname, password)
VALUES('customer9@coffee.station', '고객구', 'ssafy');

--Shop--
INSERT INTO coffee_station.shop
(address, business_no, close_at, detail_address, instagram, intro, location, name, open_at, phone_number, status, zip_code, partner_id)
VALUES('서울특별시 성북구 동소문동7가 2-21', '8290901024', '오후 8시', '1층', '@0_0.j', '푸딩 찐맛집~ 너무 맛있다! 내가 주인이지만 맛있당. 마들렌도 맛있당~', ST_GeomFromText('POINT(37.5958770210597 127.01553408332)'), '후와리', '오전 10시 30분', '050-6210-9747', 'OPEN', '02830', 1);

INSERT INTO coffee_station.shop
(address, business_no, close_at, detail_address, instagram, intro, location, name, open_at, phone_number, status, zip_code, partner_id)
VALUES('서울특별시 성북구 아리랑로12길 3', '1234567890', '오후 11시', '2층', '@0_0.j', '스터디하기 좋은 카페. 마카롱 찐맛집ㅋ', ST_GeomFromText('POINT(37.5958770210597 127.01553408332)'), '아리랑로12길 3', '오후 1시 30분', '02-929-6664', 'READY', '02827', 2);

INSERT INTO coffee_station.shop
(address, business_no, close_at, detail_address, instagram, intro, location, name, open_at, phone_number, status, zip_code, partner_id)
VALUES('서울특별시 성북구 동선동3가 28', '6721200910', '오후 8시', '1층101호', '@0_0.j', '휘낭시에 아메리카노 맛집~ 분위기 좋고 유리잔 너무예쁨', ST_GeomFromText('POINT(37.5950596065769 127.020486965361)'), 'Mobler', '오후 12시', '050-6210-9747', 'OPEN', '02827', 3);

--Menu--
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods/DL_1444616_20200525172108461.png', 1, 'SALE', '아메리카노', 4000, 1, 1);
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8XxrBZvxtqfDdAfTfZonb2GlvSyYAZPZXli4PKd-5VC-5hjCcs76NMSDewwyuTDI8Qlc&usqp=CAU', 0, 'SALE', '망고스무디', 6000, 2, 1);
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://contents.sixshop.com/thumbnails/uploadedFiles/122679/product/image_1585185767953_750.jpg', 1, 'SOLD_OUT', '휘낭시에', 3800, 3, 1);
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/guest/image/e0xcwlaaBnhuIemLaGQD5P-jX1U.JPG', 0, 'NOT_SALE', '아포가토', 5500, 1, 1);

INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods/DL_1444616_20200525172108461.png', 1, 'SALE', '아메리카노', 4000, 1, 2);
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8XxrBZvxtqfDdAfTfZonb2GlvSyYAZPZXli4PKd-5VC-5hjCcs76NMSDewwyuTDI8Qlc&usqp=CAU', 0, 'SALE', '망고스무디', 6000, 2, 2);
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://contents.sixshop.com/thumbnails/uploadedFiles/122679/product/image_1585185767953_750.jpg', 1, 'SOLD_OUT', '휘낭시에', 3800, 3, 2);
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/guest/image/e0xcwlaaBnhuIemLaGQD5P-jX1U.JPG', 0, 'NOT_SALE', '아포가토', 5500, 1, 2);

INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods/DL_1444616_20200525172108461.png', 1, 'SALE', '아메리카노', 4000, 1, 3);
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8XxrBZvxtqfDdAfTfZonb2GlvSyYAZPZXli4PKd-5VC-5hjCcs76NMSDewwyuTDI8Qlc&usqp=CAU', 0, 'SALE', '망고스무디', 6000, 2, 3);
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://contents.sixshop.com/thumbnails/uploadedFiles/122679/product/image_1585185767953_750.jpg', 1, 'SOLD_OUT', '휘낭시에', 3800, 3, 3);
INSERT INTO coffee_station.menu
(img_url, is_signature, menu_status, name, price, category_id, shop_id)
VALUES('https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/guest/image/e0xcwlaaBnhuIemLaGQD5P-jX1U.JPG', 0, 'NOT_SALE', '아포가토', 5500, 1, 3);

--Menu_Size--
INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(0, 1, 1);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(0, 2, 1);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(0, 4, 1);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(0, 5, 2);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(500, 5, 3);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(800, 5, 4);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(0, 6, 1);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(0, 8, 1);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(0, 9, 5);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(500, 9, 6);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(1000, 9, 7);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(1000, 10, 1);

INSERT INTO coffee_station.menu_size
(price, menu_id, size_id)
VALUES(1000, 12, 1);

--Extra--
INSERT INTO coffee_station.extra
(name, price, menu_id)
VALUES('아이스', 500, 1);
INSERT INTO coffee_station.extra
(name, price, menu_id)
VALUES('아이스', 500, 5);
INSERT INTO coffee_station.extra
(name, price, menu_id)
VALUES('아이스', 500, 9);
INSERT INTO coffee_station.extra
(name, price, menu_id)
VALUES('시럽 추가', 0, 1);
INSERT INTO coffee_station.extra
(name, price, menu_id)
VALUES('시럽 추가', 0, 2);
INSERT INTO coffee_station.extra
(name, price, menu_id)
VALUES('시럽 추가', 0, 9);

--Orders--
INSERT INTO coffee_station.orders
(`date`, request, status, total_price, customer_id, shop_id)
VALUES('2021-11-08 12:39:59', '얼음 많이요!!', 'ORDERED', 16500, 1, 1);
--Order_Menu--
INSERT INTO coffee_station.order_menu
(price, quantity, menu_id, menu_size_id, order_id)
VALUES(4500, 1, 1, 1, 1);
INSERT INTO coffee_station.order_menu
(price, quantity, menu_id, menu_size_id, order_id)
VALUES(6000, 2, 2, 2, 1);
--Order_Menu_Extra--
INSERT INTO coffee_station.order_menu_extra
(extra_id, order_menu_id)
VALUES(1, 1);

--Orders--
INSERT INTO coffee_station.orders
(`date`, request, status, total_price, customer_id, shop_id)
VALUES('2021-11-08 12:59:55', '얼음 많이요!!', 'ORDERED', 4000, 2, 1);
--Order_Menu--
INSERT INTO coffee_station.order_menu
(price, quantity, menu_id, menu_size_id, order_id)
VALUES(4000, 1, 1, 1, 2);




--Orders--
INSERT INTO coffee_station.orders
(`date`, request, status, total_price, customer_id, shop_id)
VALUES('2021-11-07 13:33:33', '얼음 많이요!!', 'COMPLETED', 4500, 3, 2);
--Order_Menu--
INSERT INTO coffee_station.order_menu
(price, quantity, menu_id, menu_size_id, order_id)
VALUES(4500, 1, 5, 5, 2);

--Orders--
INSERT INTO coffee_station.orders
(`date`, request, status, total_price, customer_id, shop_id)
VALUES('2021-11-08 13:44:33', '얼음 많이요!!', 'ORDERED', 4000, 4, 2);
--Order_Menu--
INSERT INTO coffee_station.order_menu
(price, quantity, menu_id, menu_size_id, order_id)
VALUES(4000, 1, 5, 4, 3);

--Orders--
INSERT INTO coffee_station.orders
(`date`, request, status, total_price, customer_id, shop_id)
VALUES('2021-11-09 13:45:33', '얼음z 많이요z!!', 'COMPLETED', 8500, 4, 3);
--Order_Menu--
INSERT INTO coffee_station.order_menu
(price, quantity, menu_id, menu_size_id, order_id)
VALUES(4500, 1, 9, 10, 4);
INSERT INTO coffee_station.order_menu
(price, quantity, menu_id, order_id)
VALUES(3800, 1, 11, 4);

--Orders--
INSERT INTO coffee_station.orders
(`date`, request, status, total_price, customer_id, shop_id)
VALUES('2021-11-08 13:55:33', '', 'ORDERED', 4500, 5, 3);
--Order_Menu--
INSERT INTO coffee_station.order_menu
(price, quantity, menu_id, menu_size_id, order_id)
VALUES(4500, 1, 5, 10, 5);

--Customer_Menu--
INSERT INTO coffee_station.customer_menu
(customer_id, menu_id)
VALUES(1, 1);
INSERT INTO coffee_station.customer_menu
(customer_id, menu_id)
VALUES(1, 2);
INSERT INTO coffee_station.customer_menu
(customer_id, menu_id)
VALUES(1, 3);
INSERT INTO coffee_station.customer_menu
(customer_id, menu_id)
VALUES(1, 4);
INSERT INTO coffee_station.customer_menu
(customer_id, menu_id)
VALUES(2, 5);
INSERT INTO coffee_station.customer_menu
(customer_id, menu_id)
VALUES(3, 1);
INSERT INTO coffee_station.customer_menu
(customer_id, menu_id)
VALUES(4, 2);


--Customer_Shop--
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(1, 1);
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(2, 1);
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(3, 1);
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(4, 1);
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(5, 1);
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(6, 1);
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(1, 2);
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(1, 3);
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(2, 2);
INSERT INTO coffee_station.customer_shop
(customer_id, shop_id)
VALUES(8, 1);








```

