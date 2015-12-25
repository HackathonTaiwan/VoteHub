CREATE DATABASE votehub;
USE votehub;
CREATE TABLE votes (
	id int NOT NULL AUTO_INCREMENT,
	target int NOT NULL,
	internal_ip VARCHAR(15) NOT NULL,
	ip VARCHAR(15) NOT NULL,
	os VARCHAR(32) NOT NULL,
	browser VARCHAR(32) NOT NULL,
	age int NOT NULL,
	user_agent VARCHAR(128) NOT NULL,
	date datetime NOT NULL DEFAULT NOW(),
	PRIMARY KEY (id)
);

