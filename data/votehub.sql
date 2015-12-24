CREATE TABLE votes {
	id int NOT NULL AUTO_INCREMENT,
	target int NOT NULL,
	ip VARCHAR(15) NOT NULL,
	os VARCHAR(32) NOT NULL,
	age int NOT NULL,
	date datetime NOT NULL DEFAULT NOW(),
	PRIMARY KEY (id)
};

